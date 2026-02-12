import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Example skills database (expand later)
SKILLS_DB = ["python", "java", "sql", "excel", "communication", "nlp", "react", "aws"]

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    tokens = nltk.word_tokenize(text)
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]
    return tokens

def extract_skills(text):
    tokens = preprocess_text(text)
    skills_found = [skill for skill in SKILLS_DB if skill in tokens]
    return skills_found

def extract_experience(text):
    pattern = r'(\d+)\+?\s?(years|yrs)'
    matches = re.findall(pattern, text.lower())
    total_exp = sum(int(match[0]) for match in matches)
    return total_exp
