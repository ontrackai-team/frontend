
import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


# =========================
# CHAT / TEXT GENERATION
# =========================
def generate_text(prompt: str):
    response = model.generate_content(prompt)
    return response.text


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

    response = model.generate_content(strict_prompt)
    return response.text