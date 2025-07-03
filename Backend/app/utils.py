from typing import List, Dict


def calculate_equal_split(amount: float, user_ids: List[int]) -> List[Dict]:
    share = round(amount / len(user_ids), 2)
    return [{"user_id": uid, "amount": share} for uid in user_ids]


def calculate_percentage_split(amount: float, splits: List[Dict]) -> List[Dict]:
    result = []
    for s in splits:
        split_amount = round((s["percent"] / 100) * amount, 2)
        result.append({"user_id": s["user_id"], "amount": split_amount})
    return result


def simplify_balances(balances: Dict[int, float]) -> List[Dict]:
    """Converts net balances to a list of payments between users"""
    debtors = []
    creditors = []
    transactions = []

    for user_id, balance in balances.items():
        if balance < 0:
            debtors.append((user_id, -balance))
        elif balance > 0:
            creditors.append((user_id, balance))

    i, j = 0, 0
    while i < len(debtors) and j < len(creditors):
        d_id, d_amt = debtors[i]
        c_id, c_amt = creditors[j]

        pay = min(d_amt, c_amt)
        transactions.append({
            "owes": d_id,
            "to": c_id,
            "amount": round(pay, 2)
        })

        debtors[i] = (d_id, d_amt - pay)
        creditors[j] = (c_id, c_amt - pay)

        if debtors[i][1] == 0:
            i += 1
        if creditors[j][1] == 0:
            j += 1

    return transactions
