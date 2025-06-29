// client/src/s/Analyzer.js
import React, { useState } from 'react';
import './Analyzer.css';

// A small helper component to render the experience checkmark/cross
const ExperienceIcon = ({ text }) => {
  // A simple way to check for a match based on the text from the backend
  const resumeExp = parseInt(text.match(/Resume: (\d+)/)?.[1] || 0);
  const requiredExp = parseInt(text.match(/Required: (\d+)/)?.[1] || 0);
  
  const isMatch = resumeExp >= requiredExp;
  
  return <span className={isMatch ? 'icon-match' : 'icon-mismatch'}>{isMatch ? '✔' : '✖'}</span>;
};


const Analyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescriptionText, setJobDescriptionText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAnalysisResult(null);


      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        
        // It will print the exact URL being used for the API call.
        console.log("Attempting to connect to API at:", API_URL); 

    // try {
    //   // Replace it with this
    //   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/analyze`, {

      // const response = await fetch('http://localhost:5001/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText, jobDescriptionText }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please check the server.');
      }

      const data = await response.json();
      setAnalysisResult(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="analyzer-">
      <div className="-intro">
        <h1>Resume & Job Description Analyzer</h1>
        <p>Paste your content below to get an instant match score and keyword analysis.</p>
      </div>
      
      <div className="analyzer-container">
        <form onSubmit={handleSubmit} className="input-form">
          <div className="text-areas">
            <div className="textarea-group">
              <label>Your Resume</label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your full resume text..."
                required
              />
            </div>
            <div className="textarea-group">
              <label>Job Description</label>
              <textarea
                value={jobDescriptionText}
                onChange={(e) => setJobDescriptionText(e.target.value)}
                placeholder="Paste the target job description..."
                required
              />
            </div>
          </div>
          <button type="submit" className="analyze-button" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Generate Score'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {/* --- THIS IS THE UPDATED RESULTS SECTION --- */}
        {analysisResult && (
          <div className="results-container">
            {/* --- Left Column: Main Score --- */}
            <div className="score-visual">
              <div 
                className="score-circle" 
                style={{ '--score': analysisResult.score }}
              >
                <div className="score-circle-content">
                  <strong>{analysisResult.score}<span>%</span></strong>
                  <span>Overall Fit</span>
                </div>
              </div>
            </div>

            {/* --- Right Column: Detailed Analysis --- */}
            <div className="detailed-analysis">
              
              {/* --- NEW: Score Breakdown Component --- */}
              <div className="score-breakdown">
                <h3>Score Breakdown</h3>
                {analysisResult.analysisBreakdown && (
                  <>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Keyword Relevance</span>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{width: `${analysisResult.analysisBreakdown.keywordScore}%`}}></div>
                      </div>
                      <span className="breakdown-value">{Math.round(analysisResult.analysisBreakdown.keywordScore)}%</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Skill Coverage</span>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{width: `${analysisResult.analysisBreakdown.skillScore}%`}}></div>
                      </div>
                      <span className="breakdown-value">{Math.round(analysisResult.analysisBreakdown.skillScore)}%</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Experience Level</span>
                      <span className="experience-value">{analysisResult.analysisBreakdown.experienceMatch}</span>
                      <ExperienceIcon text={analysisResult.analysisBreakdown.experienceMatch} />
                    </div>
                  </>
                )}
              </div>

              {/* --- Keyword Lists --- */}
              <div className="keywords-analysis">
                <div className="keyword-list matched">
                  <h3>Matched Skills</h3>
                  {analysisResult.matchedKeywords.length > 0 ? (
                    <ul>
                      {analysisResult.matchedKeywords.map((keyword, index) => (
                        <li key={`match-${index}`}>{keyword}</li>
                      ))}
                    </ul>
                  ) : <p className="no-keywords">No required skills were found in your resume.</p>}
                </div>
                <div className="keyword-list missing">
                  <h3>Missing Skills</h3>
                   {analysisResult.missingKeywords.length > 0 ? (
                    <ul>
                      {analysisResult.missingKeywords.map((keyword, index) => (
                        <li key={`miss-${index}`}>{keyword}</li>
                      ))}
                    </ul>
                   ) : <p className="no-keywords">Great job! No major skills seem to be missing.</p>}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;