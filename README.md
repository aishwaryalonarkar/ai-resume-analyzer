
# AI Resume Analyzer + Job Match Scorer

AI Resume Analyzer + Job Match Scorer is a web application designed to help job seekers assess how well their resume aligns with a given job description. By leveraging natural language processing (NLP) techniques implemented using Python and NLTK, this tool calculates a similarity score, highlights keyword gaps, and provides actionable suggestions to improve resume relevance.

The system consists of a React frontend for user interaction and a Python backend API for processing and analysis.

---

## Features

- Upload or paste resume and job description text inputs  
- Calculates a similarity score indicating the match between resume and job description  
- Highlights missing or underrepresented keywords and skills in the resume  
- Provides a detailed keyword coverage and alignment breakdown  
- Implements NLP processing entirely in the backend using NLTK  
- Privacy focused — no third-party API calls or data leakage  

---

## Technology Stack

- **Frontend:** React  
- **Backend:** Python (Flask)  
- **NLP:** NLTK (tokenization, stemming, TF-IDF vectorization)  
- **API:** RESTful communication between frontend and backend  

---

## How It Works

1. Users enter their resume and a target job description in the React frontend UI.  
2. The frontend sends the input texts to the backend API.  
3. The backend preprocesses the texts using NLTK: tokenizing, stemming, removing stopwords.  
4. TF-IDF vectors are computed for both texts.  
5. Cosine similarity between the vectors is calculated to produce a match score.  
6. Keywords present in the job description but missing or rare in the resume are identified.  
7. The backend returns the match score and keyword analysis to the frontend.  
8. The frontend displays the results with clear visual feedback and suggestions.  

---

## Getting Started

### Prerequisites

- Python 3.8 or newer  
- Node.js (v16 or newer) and npm  

---

### Backend Setup

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/ai-resume-analyzer.git
   cd ai-resume-analyzer/backend
   ```  
2. Create and activate a Python virtual environment:  
   ```bash
   python3 -m venv venv
   source venv/bin/activate    # On Windows: venv\Scripts\activate
   ```  
3. Install required Python packages:  
   ```bash
   pip install -r requirements.txt
   ```  
4. Run the Flask backend server:  
   ```bash
   python app.py
   ```  
   By default, this runs the backend on `http://localhost:5001`.  

---

### Frontend Setup

1. Open a new terminal window/tab.  
2. Navigate to the frontend directory:  
   ```bash
   cd ../frontend
   ```  
3. Install npm dependencies:  
   ```bash
   npm install
   ```  
4. Start the React development server:  
   ```bash
   npm start
   ```  
   The frontend will be served on `http://localhost:3000`.  

---

## Usage Instructions

- Open your browser to `http://localhost:3000`.  
- Enter or paste your resume text into the Resume input box.  
- Enter or paste the job description text into the Job Description input box.  
- Click the Generate Score button to send the data to the backend for processing.  
- View the computed match score and keyword analysis results displayed on the page.  
- Use the suggestions to refine and tailor your resume for the job description.  

---

## Project Structure

```

/ai-resume-analyzer
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
├── server/
│   ├── app.py
│   └── skills_db.json
└── .gitignore
│
└── README.md
```

## Future Enhancements

- Support for parsing PDF and DOCX resume uploads.  
- User accounts with saved analyses and history.  
- Custom weighting for skills and keywords.  
- Enhanced visualizations and reporting dashboards.  
- Integration of transformer-based NLP models for deeper semantic matching.  
- Recruiter interface for batch resume screening.  

---

## Troubleshooting

- Ensure Python version is 3.8 or higher.  
- Verify that all backend dependencies are installed using `pip install -r requirements.txt`.  
- If the frontend fails to start, check that Node.js and npm are correctly installed.  
- Use developer tools and terminal logs to debug API communication issues.  

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Author

**Aishwarya Lonarkar**  
- [LinkedIn](https://linkedin.com/in/aishwaryalonarkar)  
- [GitHub](https://github.com/aishwaryalonarkar)
