from fastapi import FastAPI, Depends, APIRouter, Request
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware
from app.models import User
from app.chat import router as chat_router
import app.crud as crud
import app.schemas as schemas
import app.models as models

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(chat_router)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/groups")
def create_group(group: schemas.GroupCreateWithNames, db: Session = Depends(get_db)):
    print("Creating group with names:", group.members)
    user_ids = []

    for name in group.members:
        user = db.query(User).filter(User.name == name).first()
        if not user:
            user = User(name=name)
            db.add(user)
            db.commit()
            db.refresh(user)
        user_ids.append(user.id)

    group_data = schemas.GroupCreate(name=group.name, user_ids=user_ids)
    return crud.create_group(db, group_data)

@app.get("/groups/{group_id}")
def get_group(group_id: int, db: Session = Depends(get_db)):
    return crud.get_group_details(db, group_id)

@app.get("/groups")
def get_all_groups(db: Session = Depends(get_db)):
    groups = db.query(models.Group).all()
    result = []

    for group in groups:
        members = db.query(models.GroupMember).filter(models.GroupMember.group_id == group.id).all()
        user_ids = [m.user_id for m in members]
        users = db.query(models.User).filter(models.User.id.in_(user_ids)).all()

        result.append({
            "id": group.id,
            "name": group.name,
            "members": [{"id": u.id, "name": u.name} for u in users]
        })

    return result

@app.get("/groups/by-name/{group_name}/balances")
def get_group_balances_by_name(group_name: str, db: Session = Depends(get_db)):
    group = db.query(models.Group).filter(models.Group.name == group_name).first()
    if not group:
        return {"error": "Group not found"}
    return crud.get_group_balances(db, group.id)

@app.get("/users/by-name/{username}/balances")
def get_user_balances_by_name(username: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.name == username).first()
    if not user:
        return {"error": "User not found"}
    return crud.get_user_balances(db, user.id)

@app.post("/groups/{group_id}/expenses")
def add_expense(group_id: int, expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    return crud.add_expense(db, group_id, expense)

@app.get("/groups/{group_id}/balances")
def get_group_balances(group_id: int, db: Session = Depends(get_db)):
    return crud.get_group_balances(db, group_id)

@app.get("/users/{user_id}/balances")
def get_user_balances(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_balances(db, user_id)
