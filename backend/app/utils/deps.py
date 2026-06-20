from fastapi import Depends, HTTPException
from jose import jwt
from app.config import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"


def get_current_user(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )