from fastapi import APIRouter
from pydantic import BaseModel

from app.services.gemini_service import generate_text

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)

class StudyPlanRequest(BaseModel):
    subject: str
    days_left: int
    hours_per_day: int


@router.post("/study-plan")
def study_plan(data: StudyPlanRequest):

    prompt = f"""
    Create a study plan.

    Subject: {data.subject}
    Days Left: {data.days_left}
    Hours Per Day: {data.hours_per_day}

    Return a simple daily study schedule.
    """

    plan = generate_text(prompt)

    return {
        "plan": plan
    }