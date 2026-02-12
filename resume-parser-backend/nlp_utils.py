import re

SKILLS_DB = [
    "python", "java", "react", "node", "nlp",
    "machine learning", "deep learning",
    "sql", "mongodb", "data analysis"
]

def extract_skills(text: str):
    text = text.lower()
    found_skills = []

    for skill in SKILLS_DB:
        if skill in text:
            found_skills.append(skill)

    return list(set(found_skills))


def calculate_match_score(job_skills, resume_skills):
    if not job_skills:
        return 0

    matched = set(job_skills) & set(resume_skills)
    score = (len(matched) / len(job_skills)) * 100

    return round(score, 2), list(matched)


def get_eligibility(score):
    if score >= 70:
        return "Eligible"
    elif score >= 40:
        return "Partially Eligible"
    else:
        return "Not Eligible"
