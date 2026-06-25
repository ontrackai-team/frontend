from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_text(prompt: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful AI study assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content


def generate_study_plan(prompt: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a study planner AI."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content