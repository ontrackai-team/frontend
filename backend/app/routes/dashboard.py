from fastapi import APIRouter, Header
from app.database import db
from app.utils.deps import get_current_user

router = APIRouter(prefix="/dashboard")

assessments = db["assessments"]
schedules = db["schedules"]

@router.get("/")
def dashboard(authorization: str = Header(...)):

    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    user_id = user["user_id"]

    total_assessments = assessments.count_documents(
        {"user_id": user_id}
    )

    pending = assessments.count_documents(
        {
            "user_id": user_id,
            "status": "pending"
        }
    )

    completed = assessments.count_documents(
        {
            "user_id": user_id,
            "status": "completed"
        }
    )

    total_schedules = schedules.count_documents(
        {"user_id": user_id}
    )

    return {
        "total_assessments": total_assessments,
        "pending": pending,
        "completed": completed,
        "total_schedules": total_schedules
    }