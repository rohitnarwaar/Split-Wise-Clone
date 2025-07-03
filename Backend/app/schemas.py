from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    id: int
    name: str

class GroupCreate(BaseModel):
    name: str
    user_ids: List[int]

class GroupCreateWithNames(BaseModel):
    name: str
    members: List[str]

class GroupOut(BaseModel):
    id: int
    name: str
    user_ids: List[int]
    total_expenses: float

# ✅ NEW model for split item
class SplitItem(BaseModel):
    user_id: int
    amount: float

# ✅ Proper schema with optional & validated splits
class ExpenseCreate(BaseModel):
    description: str
    amount: float
    paid_by: int
    split_type: str
    splits: Optional[List[SplitItem]] = None

class Balance(BaseModel):
    owes: str
    to: str
    amount: float
