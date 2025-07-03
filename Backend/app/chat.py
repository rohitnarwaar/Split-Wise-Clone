from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Group, Expense, User
import google.generativeai as genai
import os

router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/chat")
async def chat_with_bot(request: Request, db: Session = Depends(get_db)):
    try:
        body = await request.json()
        query = body.get("query")

        if not query:
            return {"error": "Query is required"}

        # Try to find a matching group by name (case-insensitive)
        all_groups = db.query(Group).all()
        matched_group = None
        for group in all_groups:
            if group.name.lower() in query.lower():
                matched_group = group
                break

        if not matched_group:
            return {"response": "Sorry, I couldn't find a matching group/trip name in your query."}

        # Fetch relevant context (expenses and users) from DB
        expenses = db.query(Expense).filter(Expense.group_id == matched_group.id).all()
        users = db.query(User).all()
        user_map = {u.id: u.name for u in users}

        context = f"Group Name: {matched_group.name}\n\nExpenses:\n"
        for e in expenses:
            payer_name = user_map.get(e.paid_by, f"User {e.paid_by}")
            context += f"- {payer_name} paid ₹{e.amount} for '{e.description}'\n"

        prompt = f"""
        You are a smart assistant helping users with their group expenses.

        User query: {query}

        Group Info and Expenses:
        {context}

        Respond clearly and helpfully.
        """

        model = genai.GenerativeModel("gemini-1.5-flash")
        result = model.generate_content(prompt)

        return {"response": result.text.strip()}

    except Exception as e:
        return {"error": str(e)}
