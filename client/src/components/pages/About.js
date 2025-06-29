import React from 'react';
import './About.css'; // We will create this CSS file next

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>Smarter Applications, Better Results.</h1>
        <p>This tool was built to demystify the job application process, giving you the insights to stand out.</p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <h3>The 'Why'</h3>
          <p>Job hunting is tough. Many great candidates are overlooked by automated systems (ATS) simply because their resume isn't optimized. This app provides instant, data-driven feedback to help you tailor your resume effectively for each role.</p>
        </div>

        <div className="about-card">
          <h3>The 'How'</h3>
          <p>This app uses custom AI engine, built with Python and Scikit-learn, doesn't just match words. It uses <strong>TF-IDF</strong> to weigh keyword importance and <strong>Cosine Similarity</strong> to score the contextual relevance between your resume and the job description.</p>
        </div>
        
        <div className="about-card">
          <h3>The Technology</h3>
          <ul>
            <li><strong>Frontend:</strong> React.js</li>
            <li><strong>Backend:</strong> Python with Flask</li>
            <li><strong>AI/NLP:</strong> Scikit-learn library</li>
            <li><strong>Deployment:</strong> Ready for the cloud!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;