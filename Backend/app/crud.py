from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas
from .utils import calculate_equal_split, calculate_percentage_split, simplify_balances


def create_group(db: Session, group: schemas.GroupCreate):
    new_group = models.Group(name=group.name)
    db.add(new_group)
    db.commit()
    db.refresh(new_group)

    for uid in group.user_ids:
        db.add(models.GroupMember(group_id=new_group.id, user_id=uid))
    db.commit()

    return {
        "id": new_group.id,
        "name": new_group.name,
        "user_ids": group.user_ids,
        "total_expenses": 0.0
    }


def get_group_details(db: Session, group_id: int):
    group = db.query(models.Group).filter(models.Group.id == group_id).first()
    members = db.query(models.GroupMember).filter(models.GroupMember.group_id == group_id).all()
    expenses = db.query(models.Expense).filter(models.Expense.group_id == group_id).all()
    return {
        "id": group.id,
        "name": group.name,
        "user_ids": [m.user_id for m in members],
        "total_expenses": sum(e.amount for e in expenses)
    }


def add_expense(db: Session, group_id: int, expense: schemas.ExpenseCreate):
    new_expense = models.Expense(
        group_id=group_id,
        description=expense.description,
        amount=expense.amount,
        paid_by=expense.paid_by,
        split_type=expense.split_type
    )
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    members = db.query(models.GroupMember).filter(models.GroupMember.group_id == group_id).all()
    user_ids = [m.user_id for m in members]

    if expense.split_type == "equal":
        splits = calculate_equal_split(expense.amount, user_ids)
    elif expense.split_type == "percentage":
        splits = calculate_percentage_split(expense.amount, expense.splits)
    else:
        raise ValueError("Invalid split type")

    for s in splits:
        db.add(models.Split(expense_id=new_expense.id, user_id=s["user_id"], amount=s["amount"]))

    db.commit()
    return {"message": "Expense added successfully."}


def get_group_balances(db: Session, group_id: int):
    expenses = db.query(models.Expense).filter(models.Expense.group_id == group_id).all()
    splits = db.query(models.Split).join(models.Expense).filter(models.Expense.group_id == group_id).all()

    balances = {}  # {user_id: net_balance}
    for e in expenses:
        balances[e.paid_by] = balances.get(e.paid_by, 0) + e.amount

    for s in splits:
        balances[s.user_id] = balances.get(s.user_id, 0) - s.amount

    users = db.query(models.User).all()
    user_map = {u.id: u.name for u in users}

    simplified = simplify_balances(balances)

    return [{
        "owes": user_map[b["owes"]],
        "to": user_map[b["to"]],
        "amount": b["amount"]
    } for b in simplified]


def get_user_balances(db: Session, user_id: int):
    group_ids = db.query(models.GroupMember.group_id).filter(models.GroupMember.user_id == user_id).all()
    flat_ids = [g[0] for g in group_ids]
    all_balances = []

    for gid in flat_ids:
        balances = get_group_balances(db, gid)
        for b in balances:
            if user_id in [k for k, v in db.query(models.User.id, models.User.name).all() if v in [b["owes"], b["to"]]]:
                all_balances.append(b)

    return all_balances
