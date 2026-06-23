from fastapi import APIRouter, Header
from app.utils.deps import get_current_user

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/")
def chat(message: dict, authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    user_msg = message.get("message")

    return {
        "reply": f"You said: {user_msg}. AI is coming soon 🚀"
    }