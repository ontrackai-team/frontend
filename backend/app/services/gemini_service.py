import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("GEMINI_API_KEY"))  # OR OpenAI key if using OpenAI

def generate_text(prompt: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful AI study planner."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content