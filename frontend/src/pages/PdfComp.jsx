import { useEffect, useState } from 'react';
import './PdfComp.css';
import { useLocation } from "react-router-dom";
import axios from 'axios';

function PdfComp() {
  const location = useLocation();
  const { pdfId } = location.state || {};
  const [showPdf, setShowPdf] = useState(null);

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