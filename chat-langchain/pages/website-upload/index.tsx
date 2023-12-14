import React, { useState } from 'react';
import { Spinner } from "@chakra-ui/react";

const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

export default function WebsiteForm() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearMessage = () => {
    setMessage('');
    setIsError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    setMessage('');
    
    if (!isValidUrl(url)) {
      setMessage('Please enter a valid website URL.');
      setIsError(true);
      setTimeout(clearMessage, 5000);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8081/upload_website_data/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Website data uploaded successfully.');
      } else {
        throw new Error('Failed to upload website data.');
      }
    } catch (error) {
      setMessage(error.message || 'An error occurred.');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(clearMessage, 5000);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
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
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
      }}>
        <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
          Add the link of the website that you want to add to your dataset
        </h1>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            style={{
              marginBottom: '20px',
              padding: '20px',
              borderRadius: '4px',
              border: isError ? '1px solid #ff6b6b' : '1px solid #555',
              color: 'white',
              backgroundColor: '#2d313a',
              outline: 'none',
              width: '100%',
              fontSize: '16px',
            }}
          />
          {!isSubmitting && (
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
              Submit URL
            </button>
          )}
          {isSubmitting && (
            <>
              <Spinner boxSize={30} color="#61dafb" />
              <p style={{ marginTop: '10px', color: '#ff6b6b' }}>
                This can take time depending upon the size of data, please be patient!!
                Contact admin if any error occurs.
              </p>
            </>
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
