
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

---

## Troubleshooting

- Ensure Python version is 3.8 or higher.  
- Verify that all backend dependencies are installed using `pip install -r requirements.txt`.  
- If the frontend fails to start, check that Node.js and npm are correctly installed.  
- Use developer tools and terminal logs to debug API communication issues.  

## About The AI Resume Analyzer

This tool is designed to bridge the gap between job seekers and their dream jobs. By leveraging the power of Google's Gemini Pro, it provides an intelligent analysis of resume text against a given job description. The goal is to offer actionable insights, helping candidates tailor their resumes more effectively and highlight their strengths.

The project is built with Python and Streamlit, and hosted on Vercel/Render, demonstrating a modern, scalable approach to deploying AI applications.

---

### **Current Limitations**

This project is a proof-of-concept, and it's important to be transparent about its current limitations. The tool provides a good starting point for analysis but should be used with the following in mind:

*   **Manual Text Input Only:** The current version does not support direct file uploads. Users must manually copy and paste the text from their resume (`.pdf`, `.docx`, `.txt`) into the text area. This can be tedious and may lead to formatting loss or copy-paste errors.

*   **Inability to Calculate Total Experience:** The AI does not perform calculations on date ranges. For example, it cannot read "Software Engineer (2020-Present)" and "Intern (2019-2020)" and conclude the user has ~4 years of total experience. It can only identify years of experience when it is explicitly stated as a number (e.g., "4 years of experience").

*   **Semantic Understanding Gaps:** The model's understanding is literal. It may not recognize that the word "four" is the same as the number "4". This is a classic Natural Language Understanding (NLU) challenge that a general-purpose model might miss without specific instructions.

*   **Stateless Application:** The application has no memory. It does not save your previous resumes, job descriptions, or analysis results. Each session starts fresh.

---

### **Future Scope & Advancements**

The current limitations provide a clear and exciting roadmap for future development. Here are the key features planned to make this tool more robust and user-friendly:

*   **Direct File Upload Support:** The top priority is to implement file uploading functionality. This will allow users to directly upload their resumes in various formats (`.pdf`, `.docx`, `.txt`), eliminating the need for manual copy-pasting and ensuring the document's full content is parsed accurately.

*   **Intelligent Experience Calculation:** Develop a feature that can parse date ranges from a resume, calculate the duration of each role, and sum them to provide an accurate "Total Years of Experience." This would also involve teaching the model to handle terms like "Present."

---

### **Future Scope & Advancements**

This project has a rich roadmap for future development. Here are some of the features and improvements we envision:

*   **Interactive Resume Suggestions:** Instead of just listing missing keywords, the tool could suggest specific sentences or bullet points. For example: "Consider adding a point about your experience with 'CI/CD pipelines' in your Project X description."

*   **Support for Multiple Formats:** Add support for uploading `.docx`, `.txt` files, or even analyzing a LinkedIn profile URL directly.

*   **Batch Analysis:** Allow a user to upload one resume and check it against multiple job descriptions simultaneously to identify their best-fit opportunities.

*   **Resume Versioning:** Enable users to save different versions of their resume and track which one performs better for specific types of roles.

*   **Interview Question Generation:** Based on the resume and the job description, generate a list of potential technical and behavioral interview questions the candidate might face.

---

## Author

**Aishwarya Lonarkar**  
- [LinkedIn](https://linkedin.com/in/aishwaryalonarkar)  
- [GitHub](https://github.com/aishwaryalonarkar)
