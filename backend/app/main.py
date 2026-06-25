from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.schedules import router as schedule_router
from app.database import client

from app.routes.dashboard import router as dashboard_router

from app.routes.assessments import router as assessment_router
from app.routes.ai import router as ai_router
from app.routes import chat

# =====================
# CREATE APP FIRST
# =====================
app = FastAPI(title="OnTrackAI API")


# =====================
# DB TEST ROUTE
# =====================
@app.get("/db-test")
def db_test():
    try:
        client.admin.command("ping")
        return {"status": "MongoDB connected ✅"}
    except Exception as e:
        return {
            "status": "MongoDB NOT connected ❌",
            "error": str(e)
        }


# =====================
# CORS
# =====================
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://frontend-black-kappa-17.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================
# ROUTES
# =====================
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(schedule_router, tags=["Schedules"])
app.include_router(dashboard_router)
app.include_router(assessment_router)
app.include_router(ai_router)
app.include_router(chat.router)


# =====================
# ROOT
# =====================
@app.get("/")
def root():
    return {"message": "OnTrackAI Backend Running 🚀"}