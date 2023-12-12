import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');  // State to store the message
  const [isError, setIsError] = useState(false);  // State to store if an error occurred

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // Reset the message when a new file is selected
    setMessage('');
    setIsError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:8081/upload_pdf/', {
          method: 'POST',
          body: formData,
        });

        // If the response is not OK, throw an error
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setMessage(data.message);  // Set the success message
        setIsError(false);  // Reset the error state
      } catch (error) {
        setMessage(error.toString());  // Set the error message
        setIsError(true);  // Update the error state
      }
      // Clear the message after 5 seconds, regardless of success or error
      setTimeout(() => {
        setMessage('');
        setIsError(false);
      }, 5000);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
      {/* Conditionally render the message */}
      {message && (
        <div style={{ color: isError ? 'red' : 'green', marginTop: '10px' }}>
          {message}
        </div>
      )}
    </div>
  );
}
