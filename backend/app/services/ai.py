from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_study_plan(assessments):
    prompt = f"""
    You are an AI study planner.

    Create a weekly study plan based on:

    {assessments}

    Return simple daily schedule.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful study planner AI."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content