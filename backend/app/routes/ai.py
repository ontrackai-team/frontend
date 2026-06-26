from fastapi import APIRouter, Header
from app.utils.json_encoder import clean_mongo
from app.utils.deps import get_current_user
from app.database import db
from app.services.ai_service import generate_study_plan, generate_text
from pydantic import BaseModel
import json
import re

router = APIRouter(prefix="/ai", tags=["AI"])

schedules_collection = db["schedules"]
assessments_collection = db["assessments"]


# =========================
# STUDY PLAN
# =========================
@router.post("/study-plan")
def study_plan(authorization: str = Header(...)):

    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    # 1. GET assessments
    assessments = list(
        assessments_collection.find(
            {"user_id": user["user_id"]}
        )
    )

    assessments = clean_mongo(assessments)

    # 2. PROMPT
    prompt = f"""
    You are a study planner AI.

    IMPORTANT RULES:
    - Return ONLY valid JSON
    - NO markdown
    - NO explanations

    Format:
    [
      {{
        "title": "Topic",
        "date": "YYYY-MM-DD",
        "duration": 2
      }}
    ]

    Assessments:
    {json.dumps(assessments)}
    """

    plan_text = generate_study_plan(prompt)

    # 3. CLEAN JSON
    def clean_json(text: str):
        text = text.strip()
        text = re.sub(r"```json", "", text)
        text = re.sub(r"```", "", text)
        return text.strip()

    try:
        cleaned = clean_json(plan_text)
        plan = json.loads(cleaned)
    except Exception as e:
        print("AI PARSE ERROR:", e)
        print("RAW RESPONSE:", plan_text)
        plan = []

    # 4. SAVE TO DB
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

        schedule["id"] = str(result.inserted_id)
        saved.append(schedule)

    # 🔥 FINAL FIX: ensure NO ObjectId ever leaks
    return clean_mongo({
        "message": "Study plan generated successfully",
        "plan": saved
    })


# =========================
# CHAT
# =========================
class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(data: ChatRequest, authorization: str = Header(...)):

    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    assessments = list(
        assessments_collection.find(
            {"user_id": user["user_id"]}
        )
    )
    assessments = clean_mongo(assessments)

    schedules = list(
        schedules_collection.find(
            {"user_id": user["user_id"]}
        )
    )
    schedules = clean_mongo(schedules)

    prompt = f"""
    You are OnTrackAI Assistant.

    USER MESSAGE:
    {data.message}

    USER ASSESSMENTS:
    {json.dumps(assessments)}

    USER SCHEDULE:
    {json.dumps(schedules)}

    Give helpful study advice.
    """

    reply = generate_text(prompt)

    return {"reply": reply}