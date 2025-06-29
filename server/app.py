import re
import json # <-- CHANGED: Import the json library
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import nltk
from nltk.tokenize import word_tokenize

# --- Initial NLTK Download ---
try:
    nltk.data.find('tokenizers/punkt')
except nltk.downloader.DownloadError:
    nltk.download('punkt')

# --- Initialize Flask App ---
app = Flask(__name__)
CORS(app) 

# --- 1. LOAD SKILLS FROM EXTERNAL JSON FILE ---
# This function loads our skills database and flattens it into a single set for efficient searching.
def load_skills_from_file(filepath='skills_db.json'):
    try:
        with open(filepath, 'r') as f:
            skills_data = json.load(f)
        # Flatten the dictionary of lists into a single set of skills
        all_skills = set(
            skill.lower() for category_skills in skills_data.values() for skill in category_skills
        )
        return all_skills, skills_data
    except FileNotFoundError:
        print(f"ERROR: The skills file was not found at {filepath}")
        return set(), {} # Return empty set if file is missing
    except json.JSONDecodeError:
        print(f"ERROR: The skills file at {filepath} is not a valid JSON.")
        return set(), {}

# <-- CHANGED: Load skills on application start
ALL_SKILLS_SET, SKILLS_CATEGORIZED = load_skills_from_file()

# # --- 2. HELPER FUNCTIONS (Now more robust) ---
# def extract_skills(text, skill_set): # <-- CHANGED: Now accepts the skill_set as an argument
#     """
#     Extracts predefined skills from text by tokenizing and matching against the provided skill_set.
#     """
#     text_lower = text.lower()
#     text_normalized = re.sub(r'[/,()]', ' ', text_lower)
#     tokens = set(word_tokenize(text_normalized))
#     found_skills = skill_set.intersection(tokens)
    
#     # Check for multi-word skills (e.g., "spring boot", "natural language processing")
#     for skill in skill_set:
#         if ' ' in skill and skill in text_lower:
#             found_skills.add(skill)
#         # Check for skills with dots that might be missed by tokenization
#         if '.' in skill and skill in text_lower: 
#             found_skills.add(skill)

#     return found_skills


# Replace the old extract_skills function with this one

def extract_skills(text, skill_set):
    """
    Extracts predefined skills from text by tokenizing and matching against the provided skill_set.
    Now includes a robust safety net to download NLTK data if missing during runtime.
    """
    text_lower = text.lower()
    text_normalized = re.sub(r'[/,()]', ' ', text_lower)
    
    # --- NEW: Add a try/except block around the part that fails ---
    try:
        tokens = set(word_tokenize(text_normalized))
    except LookupError:
        # This is our safety net. If any tokenizer data is missing,
        # it will be caught here. We then download the main 'punkt'
        # package, which usually resolves all related dependencies.
        print("NLTK 'punkt' resource missing or incomplete. Re-downloading...")
        nltk.download('punkt')
        # Try tokenizing again after the download
        tokens = set(word_tokenize(text_normalized))

    found_skills = skill_set.intersection(tokens)
    
    # Check for multi-word skills
    for skill in skill_set:
        if ' ' in skill and skill in text_lower:
            found_skills.add(skill)
        if '.' in skill and skill in text_lower: 
            found_skills.add(skill)

    return found_skills
    
def extract_experience(text):
    pattern = r'(\d+)\+?\s*ye?a?rs?'
    matches = re.findall(pattern, text, re.IGNORECASE)
    if not matches:
        return 0
    return max([int(year) for year in matches])

# --- 3. THE MAIN ANALYSIS FUNCTION ---
def analyze_texts(resume_text, job_description_text):
    # Keyword Relevance (Cosine Similarity)
    try:
        documents = [resume_text, job_description_text]
        tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf_vectorizer.fit_transform(documents)
        keyword_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0] * 100
    except ValueError:
        keyword_score = 0

    # Explicit Skill Matching using our loaded skills
    resume_skills = extract_skills(resume_text, ALL_SKILLS_SET) # <-- CHANGED
    job_skills = extract_skills(job_description_text, ALL_SKILLS_SET) # <-- CHANGED
    
    matched_skills = resume_skills.intersection(job_skills)
    missing_skills = job_skills.difference(resume_skills)
    
    skill_score = (len(matched_skills) / len(job_skills)) * 100 if job_skills else 100

    # Experience Matching
    resume_exp = extract_experience(resume_text)
    job_exp = extract_experience(job_description_text)
    experience_match_bonus = 100 if resume_exp >= job_exp else 0
    if job_exp == 0 and resume_exp == 0:
        experience_match_bonus = 100
    
    # Final Weighted Score Calculation
    final_score = (keyword_score * 0.5) + (skill_score * 0.4) + (experience_match_bonus * 0.1)
    
    return {
        'score': min(int(final_score), 100),
        'matchedKeywords': sorted(list(matched_skills)),
        'missingKeywords': sorted(list(missing_skills)),
        'analysisBreakdown': {
            'keywordScore': round(keyword_score, 2),
            'skillScore': round(skill_score, 2),
            'experienceMatch': f"Resume: {resume_exp} yrs, Required: {job_exp} yrs"
        }
    }


# --- API Endpoints ---
@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        resume_text = data.get('resumeText')
        job_description_text = data.get('jobDescriptionText')
        if not resume_text or not job_description_text:
            return jsonify({'error': 'Resume and Job Description text are required.'}), 400
        analysis_result = analyze_texts(resume_text, job_description_text)
        return jsonify(analysis_result)
    except Exception as e:
        print(f"An error occurred during analysis: {e}")
        return jsonify({'error': 'An error occurred during analysis.'}), 500

# <-- NEW FEATURE: An endpoint to see what skills the system knows about
@app.route('/api/skills', methods=['GET'])
def get_skills():
    if not SKILLS_CATEGORIZED:
        return jsonify({"error": "Skills database not loaded or empty."}), 500
    return jsonify(SKILLS_CATEGORIZED)


# --- Start the Server ---
# if __name__ == '__main__':
#     app.run(debug=True, port=5001)
# Find this at the bottom of server/app.py

if __name__ == '__main__':
    # The 'debug=True' is removed for production
    # The 'port' is no longer hardcoded
    app.run() 