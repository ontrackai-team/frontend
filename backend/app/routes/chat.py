from fastapi import APIRouter, Header
from app.utils.deps import get_current_user
from app.services.ai_service import generate_text

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/")
def chat(message: dict, authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    user_msg = message.get("message")

    # 🔥 CALL REAL AI HERE
    ai_reply = generate_text(user_msg)

    return {
        "reply": ai_reply
    }