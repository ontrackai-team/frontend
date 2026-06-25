from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai import generate_study_plan
from app.services.gemini_service import generate_text

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
    You are a study planner AI.

    Create a DAILY study plan in JSON format ONLY.

    Subject: {data.subject}
    Days Left: {data.days_left}
    Hours Per Day: {data.hours_per_day}

    Return format:
    [
      {{
        "title": "Topic",
        "date": "Day 1",
        "suggested_time": "2 hours"
      }}
    ]
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

    Help students with:
    - studying
    - assessments
    - schedules
    - productivity
    - time management

    User message:
    {data.message}
    """

    response = generate_text(prompt)

    return {"reply": response}