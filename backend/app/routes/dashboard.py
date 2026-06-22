from fastapi import APIRouter, Header
from datetime import datetime

from app.database import db
from app.utils.deps import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

assessments = db["assessments"]
@router.get("/stats")
def dashboard_stats(
    authorization: str = Header(...)
):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    docs = list(
        assessments.find(
            {"user_id": user["user_id"]}
        )
    )

    total = len(docs)

    completed = len([
        a for a in docs
        if a.get("status") == "Completed"
    ])

    pending = len([
        a for a in docs
        if a.get("status") != "Completed"
    ])

    today = datetime.today().date()

    upcoming = len([
        a for a in docs
        if datetime.strptime(
            a["due_date"],
            "%Y-%m-%d"
        ).date() >= today
    ])

    return {
        "total": total,
        "completed": completed,
        "pending": pending,
        "upcoming": upcoming
    }