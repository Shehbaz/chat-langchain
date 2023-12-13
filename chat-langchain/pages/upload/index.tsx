import { useState } from 'react';
import { Spinner } from "@chakra-ui/react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setMessage('');
      setIsError(false);
    } else {
      setMessage('Please select a PDF file.');
      setIsError(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      setIsError(true);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8081/upload_pdf/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setMessage(data.message);
      setIsError(false);
    } catch (error) {
      setMessage(error.toString());
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setMessage('');
      setIsError(false);
    }, 9000);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#282c34', // Dark background for better contrast
      color: 'white'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: '#3c4049', // Card color changed to blend with background
        padding: '30px',
        borderRadius: '12px', // Rounded corners for a softer look
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Softer shadow
      }}>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              marginBottom: '20px',
              padding: '15px', // Increased padding for a larger touch area
              borderRadius: '4px',
              border: '1px solid #555', // Subtle border color
              color: 'white',
              backgroundColor: '#2d313a', // Matching the card color
              outline: 'none' // Removing the default focus outline
            }}
          />
          {isSubmitting ? (
            <Spinner boxSize={30} color="#61dafb" /> // Using a brighter color for the spinner
          ) : (
            <button
              type="submit"
              style={{
                padding: '15px 30px', // Larger button for a more tactile feel
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#61dafb', // A bright color for the button to stand out
                color: 'white',
                fontWeight: 'bold',
                marginTop: '10px', // Added space above the button
              }}
            >
              Upload File
            </button>
          )}
        </form>
        {message && (
          <div style={{
            color: isError ? '#ff6b6b' : '#51cf66', // Red for error, green for success
            marginTop: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
            padding: '10px', // Padding to make the message stand out
            borderRadius: '4px', // Rounded corners for the message box
            backgroundColor: isError ? '#1e2029' : '#1e2029', // Subtle background for error/success message
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
