from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import generate_text, generate_study_plan

router = APIRouter(prefix="/ai", tags=["AI"])


# =========================
# STUDY PLAN
# =========================
class StudyPlanRequest(BaseModel):
    subject: str
    days_left: int
    hours_per_day: int


@router.post("/study-plan")
def study_plan(data: StudyPlanRequest):

    prompt = f"""
    Create study plan for:
    Subject: {data.subject}
    Days: {data.days_left}
    Hours/day: {data.hours_per_day}
    """

    plan = generate_study_plan(prompt)

    return {"plan": plan}


# =========================
# CHAT
# =========================
class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(data: ChatRequest):

    prompt = f"""
    You are OnTrackAI Assistant.

    User: {data.message}
    """

    reply = generate_text(prompt)

    return {"reply": reply}