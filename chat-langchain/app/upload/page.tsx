'use client';
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload_pdf/`, {
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
      backgroundColor: '#282c34',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: '#3c4049',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      }}>
        <div style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
          Add the PDF document that you want to add to your dataset
        </div>
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
              border: '1px solid #555',
              color: 'white',
              backgroundColor: '#2d313a',
              outline: 'none',
              fontSize: '16px', // Increased font size
            }}
          />
          {isSubmitting ? (
            <Spinner boxSize={30} color="#61dafb" />
          ) : (
            <button
              type="submit"
              style={{
                padding: '15px 30px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#61dafb',
                color: 'white',
                fontWeight: 'bold',
                marginTop: '10px',
              }}
            >
              Upload File
            </button>
          )}
        </form>
        {message && (
          <div style={{
            color: isError ? '#ff6b6b' : '#51cf66',
            marginTop: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
            padding: '10px',
            borderRadius: '4px',
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
