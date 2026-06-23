from fastapi import APIRouter, Header
from app.utils.deps import get_current_user
from app.database import db
from app.services.ai import generate_study_plan

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/study-plan")
def study_plan(authorization: str = Header(...)):

    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    assessments = list(db["assessments"].find(
        {"user_id": user["user_id"]}
    ))

    plan = generate_study_plan(assessments)

    return {"plan": plan}s