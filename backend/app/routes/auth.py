from fastapi import APIRouter, HTTPException

from app.models.user import UserRegister, UserLogin
from app.database import users_collection
from app.utils.security import (
    hash_password,
    verify_password
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

# Register
@router.post("/register")
def register(user: UserRegister):

    existing = users_collection.find_one(
        {"email": user.email}
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    })

    return {
        "message": "User registered successfully"
    }


# Login
@router.post("/login")
def login(user: UserLogin):

    db_user = users_collection.find_one(
        {"email": user.email}
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return {
        "message": "Login successful"
    }