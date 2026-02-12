from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import re

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Utils ----------

def extract_text_from_pdf(file):
    text = ""
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + " "
    return text

def extract_keywords(text):
    words = re.findall(r"[a-zA-Z]+", text.lower())
    stopwords = {
        "and","or","the","is","in","to","with","for","of","on",
        "a","an","as","at","by","from"
    }
    return set(w for w in words if w not in stopwords and len(w) > 2)

def calculate_match_score(jd, resume):
    jd_words = extract_keywords(jd)
    resume_words = extract_keywords(resume)

    if not jd_words:
        return 0, []

    matched = jd_words.intersection(resume_words)
    score = int((len(matched) / len(jd_words)) * 100)
    return score, list(matched)

def eligibility(score):
    if score >= 70:
        return "✅ Eligible"
    elif score >= 40:
        return "⚠️ Partially Eligible"
    return "❌ Not Eligible"

# ---------- Routes ----------

@app.get("/")
def root():
    return {"message": "Resume Parser Backend is running 🚀"}

@app.post("/match_resume/")
async def match_resume(
    job_description: str = Form(...),
    resume: UploadFile = File(...)
):
    resume_text = extract_text_from_pdf(resume)

    score, matched_skills = calculate_match_score(
        job_description, resume_text
    )

    return {
        "match_score": score,
        "eligibility": eligibility(score),
        "matched_skills": matched_skills
    }
