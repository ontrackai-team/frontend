import os
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


# =========================
# CHAT / TEXT GENERATION
# =========================
def generate_text(prompt: str):
    try:
        response = model.generate_content(prompt)
        return response.text

    except ResourceExhausted:
        raise Exception(
            "Daily free-tier request limit reached. Please try again tomorrow."
        )

    except Exception as e:
        raise Exception(f"Gemini Error: {str(e)}")


# =========================
# STUDY PLAN (STRICT JSON)
# =========================
def generate_study_plan(prompt: str):
    strict_prompt = f"""
    You MUST return ONLY valid JSON.
    NO markdown.
    NO explanation.
    NO text before or after.

    Format:
    [
      {{
        "title": "Topic",
        "date": "YYYY-MM-DD",
        "duration": 2
      }}
    ]

    {prompt}
    """

    try:
        response = model.generate_content(strict_prompt)
        return response.text

    except ResourceExhausted:
        raise Exception(
            "Daily free-tier request limit reached. Please try again tomorrow."
        )

    except Exception as e:
        raise Exception(f"Gemini Error: {str(e)}")