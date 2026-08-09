import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google import genai

load_dotenv()

app = FastAPI()

# React frontend ko backend access karne ki permission
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


@app.get("/")
def root():
    return {
        "message": "AI Code Explainer API is running"
    }


@app.post("/api/analyze")
def analyze_code(data: dict):

    code = data.get("code", "")
    feature = data.get("feature", "Explain")

    prompt = f"""
You are an expert programming assistant.

The user wants to use the "{feature}" feature.

Analyze the following code.

Code:
{code}

Give a clear, beginner-friendly response.
Explain the important points and provide useful suggestions.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return {
        "result": response.text
    }