import { useEffect, useState } from 'react';
import './PdfComp.css';
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import './landingPage.css';
import axios from 'axios';

function PdfComp() {
  const location = useLocation();
  const { pdfId } = location.state || {};
  const [showPdf, setShowPdf] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const goBack = () => {
    navigate(-1); // Navigate to the previous page
  }

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get(`http://localhost:3001/apip/see/${pdfId}`);
      const pdfName = result.data.pdf
      const pdfUrl = `http://localhost:3001/files/${pdfName}`; // Create a URL for the PDF blob
      setShowPdf(pdfUrl);
    } catch (error) {
      console.error("Error fetching the PDF", error);
    }
  };

  return (
    <div className="pdf-container">
      <div className="pdf-navbar">
        <nav className="Lan-navbar">
          <ul className="Lan-nav-links">
            <li>
              <button className='back-button' onClick={goBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z" fill="#1D1B20"/>
                </svg>&nbsp;
                Back
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="pdf-content">
        {showPdf && (
          <iframe 
            src={showPdf} 
            width="100%" 
            height="720px" 
            title="PDF Viewer" 
            frameBorder="0"
          />
        )}
      </div>
    </div>
  );
}

export default PdfComp;
