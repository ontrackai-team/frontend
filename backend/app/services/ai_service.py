import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def generate_text(prompt: str):
    response = model.generate_content(prompt)
    return response.text


def generate_study_plan(prompt: str):
    response = model.generate_content(prompt)
    return response.text