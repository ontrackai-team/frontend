from fastapi import APIRouter, Header
from app.utils.deps import get_current_user
from app.database import db
from app.services.ai_service import generate_study_plan, generate_text
from datetime import datetime

router = APIRouter(prefix="/ai", tags=["AI"])

schedules_collection = db["schedules"]
assessments_collection = db["assessments"]


# =========================
# STUDY PLAN (AUTO FLOW)
# =========================
@router.post("/study-plan")
def study_plan(authorization: str = Header(...)):

    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    # 1. GET assessments
    assessments = list(
        assessments_collection.find(
            {"user_id": user["user_id"]},
            {"_id": 0}
        )
    )

    # 2. AI prompt
    prompt = f"""
    You are an AI study planner.

    Based on these assessments:
    {assessments}

    Create a study plan.

    Return ONLY JSON list:
    [
      {
        "title": "Topic",
        "date": "2026-06-26",
        "duration": 2
      }
    ]
    """

    plan_text = generate_study_plan(prompt)

    # 3. Convert AI response (IMPORTANT)
    try:
        import json
        plan = json.loads(plan_text)
    except:
        plan = []

    # 4. SAVE to schedule collection
    saved = []

    for item in plan:
        schedule = {
            "title": item.get("title"),
            "date": item.get("date"),
            "duration": item.get("duration", 1),
            "status": "pending",
            "user_id": user["user_id"]
        }

        result = schedules_collection.insert_one(schedule)
        saved.append({
            "id": str(result.inserted_id),
            **schedule
        })

    return {
        "message": "Study plan generated and saved",
        "plan": saved
    }


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

    Help the student with studying, schedules, productivity.

    User: {data.message}
    """

    reply = generate_text(prompt)

    return {"reply": reply}