from fastapi import APIRouter, Header
from app.utils.deps import get_current_user
from app.database import db
from app.services.ai_service import generate_study_plan, generate_text

router = APIRouter(prefix="/ai", tags=["AI"])


# =========================
# STUDY PLAN (FROM ASSESSMENTS)
# =========================
@router.post("/study-plan")
def study_plan(authorization: str = Header(...)):

    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    # Get assessments from MongoDB
    assessments = list(
        db["assessments"].find(
            {"user_id": user["user_id"]},
            {"_id": 0}
        )
    )

    prompt = f"""
    You are an AI study planner.

    These are the student's assessments:
    {assessments}

    Create a weekly study plan.

    Return ONLY JSON:
    [
      {{
        "title": "Topic",
        "date": "Day 1",
        "time": "18:00"
      }}
    ]
    """

    plan = generate_study_plan(prompt)

    return {"plan": plan}


# =========================
# CHAT (AI ASSISTANT)
# =========================
from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(data: ChatRequest):

    prompt = f"""
    You are OnTrackAI Assistant.

    Help the student based on study planning, assessments, and productivity.

    User message:
    {data.message}
    """

    reply = generate_text(prompt)

    return {"reply": reply}