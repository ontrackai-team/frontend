from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.schedules import router as schedule_router

app = FastAPI()

origins = [
    "https://frontend-black-kappa-17.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(schedule_router)

@app.get("/")
def root():
    return {
        "message": "OnTrackAI Backend Running"
    }