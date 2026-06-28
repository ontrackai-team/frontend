from fastapi import APIRouter, HTTPException
from app.models.user import UserRegister, UserLogin
from app.database import users_collection, profiles_collection
from app.utils.jwt import create_access_token
from app.utils.security import hash_password, verify_password

router = APIRouter()


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

    result = users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    })

    # Create a profile for the new user
    profiles_collection.insert_one({
        "user_id": str(result.inserted_id),
        "bio": "",
        "goal": "",
        "avatar": "",
        "level": "Beginner"
    })

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(user: UserLogin):

    db_user = users_collection.find_one({
        "email": user.email
    })

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

    token = create_access_token({
        "user_id": str(db_user["_id"]),
        "email": db_user["email"]
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }
    @router.get("/me")
def get_me(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token)

    db_user = users_collection.find_one(
        {"_id": ObjectId(user["user_id"])},
        {"password": 0}
    )

    return clean_mongo(db_user)