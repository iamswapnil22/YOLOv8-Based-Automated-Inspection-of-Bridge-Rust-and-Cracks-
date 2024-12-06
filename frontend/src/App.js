import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import documentsLogo from './documents.png';

function App() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);
  const [downloadLink, setDownloadLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    setFiles([...fileList]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    setFiles([...fileList]);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const data = await response.json();
      setMessage(data.message || 'Files uploaded successfully');
      setResults(data.results || []);
      const downloadData = data.results && data.results.find(item => item.download_link);
      if (downloadData) {
        setDownloadLink(downloadData.download_link);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessage('Failed to upload files');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <Navbar />
      <header className="App-header" id="home">
        <br /><br />
        <h1>Bridge Defect Detection and Analysis System</h1>
      </header>
      <main>
        <div className="upload-container" id="upload">
          <div className="upload-box">
            <input
              type="file"
              className="file-input"
              multiple
              webkitdirectory="true"  // This allows folder upload
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button className="upload-button" onClick={() => document.querySelector('.file-input').click()}>
              <img src={documentsLogo} alt='file logo' className='file-logo' />
              <p className='button-text'>CHOOSE FOLDER</p>
            </button>
            <p>or drop files here</p>
          </div>
          <div className="files-box">
            {files.length > 0 && (
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
          <button className="upload-button upload" onClick={handleUpload} disabled={loading}>
            {loading ? 'UPLOADING...' : 'UPLOAD FILES'}
          </button>
          {loading && <div className="loading-bar"></div>}
          {message && <div className="message">{message}</div>}
          {results.length > 0 && (
            <div className="results">
              <h2>Classification Results</h2>
              {/* Calculation of stats */}
              {(() => {
                console.log(results);

                const totalImages = results.length;
                // Count unique images with rust
                const rustImages = results.filter(result =>
                  result.labels.includes('Corrosion')
                );

                // Count unique images with cracks
                const crackImages = results.filter(result =>
                  result.labels.includes('crack')
                );

                // Combine rust and crack images, avoiding duplicates
                const defectiveImagesSet = new Set([
                  ...rustImages.map(result => result.file),
                  ...crackImages.map(result => result.file)
                ]);

                const defectiveImagesCount = defectiveImagesSet.size;
                const defectivePercentage = (defectiveImagesCount / totalImages) * 100;

                return (
                  <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <p><strong>Total Images:</strong> {totalImages}</p>
                    <p><strong>Total Images with Rust:</strong> {rustImages.length}</p>
                    <p><strong>Total Images with Cracks:</strong> {crackImages.length}</p>
                    <p><strong>Percentage of Defective Images:</strong> {defectivePercentage.toFixed(2)}%</p>
                  </div>
                );
              })()}
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {results.map((result, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: '20px',
                      borderBottom: '1px solid #ddd',
                      paddingBottom: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={`data:image/png;base64,${result.image}`}
                        alt={`result-${index}`}
                        style={{
                          width: '150px',
                          height: 'auto',
                          marginRight: '20px',
                          borderRadius: '8px',
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{result.file}</div>
                        <div style={{ color: '#555', fontSize: '14px' }}>   
                          {Array.from(new Set(result.labels)).join(', ')}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {downloadLink && (
            <a className="upload-button download" href={downloadLink} download>
              DOWNLOAD RESULTS
            </a>
          )}
        </div>
        <div className="description">
          <p>
            With Bridge Inspection, you can upload images from a bridge inspection and have them automatically classified for defects such as rust and cracks.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
