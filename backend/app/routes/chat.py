from fastapi import APIRouter, Header, Body
from app.utils.deps import get_current_user
from app.services.gemini_service import generate_text

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/")
def chat(message: dict = Body(...), authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    user_msg = message.get("message")

    ai_reply = generate_text(user_msg)

    return {"reply": ai_reply}