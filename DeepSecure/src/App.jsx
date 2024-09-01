import React, { useState } from 'react';

// Utility functions
const isValidURL = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*' + // port and path
        '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // query string
        '(\\#[-a-zA-Z0-9_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
};

const isImageOrVideoURL = (url) => {
    const imageVideoExtensions = /\.(mp4|avi|mov|png|jpeg|jpg|svg)$/i;
    return imageVideoExtensions.test(url);
};

const isSupportedFileType = (file) => {
    const supportedTypes = ['video/mp4', 'video/avi', 'video/mov', 'image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    return supportedTypes.includes(file.type);
};

// Main Component
const App = () => {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [isDemo, setIsDemo] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            if (isSupportedFileType(selectedFile)) {
                startAnalysis(selectedFile);
            } else {
                alert('Unsupported file type. Please upload a valid image or video.');
            }
        }
    };

    const handleUrlUpload = () => {
        if (url) {
            if (isValidURL(url) && isImageOrVideoURL(url)) {
                startAnalysis(url);
            } else {
                alert('Please enter a valid image or video URL.');
            }
        } else {
            alert('Please enter a URL.');
        }
    };

    const startAnalysis = (fileOrUrl) => {
        setShowResults(false);
        setProgress(0);

        let interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setShowResults(true);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);

        if (typeof fileOrUrl === 'string') {
            fetch(fileOrUrl)
                .then(response => response.blob())
                .then(blob => analyzeBlob(blob))
                .catch(error => {
                    console.error('Error fetching the file:', error);
                    alert('Error fetching the file. Please check the URL and try again.');
                });
        } else {
            analyzeBlob(fileOrUrl);
        }
    };

    const analyzeBlob = (blob) => {
        console.log('Analyzing blob:', blob);
        setTimeout(() => {
            setShowResults(true);
        }, 2000);
    };

    const handleDemoUpload = () => {
        setIsDemo(true);
        startDemoAnalysis(true);
    };

    const startDemoAnalysis = (isDemo) => {
        let demoProgress = 0;
        const analysisDuration = 10; // Simulate a 10-second analysis

        let interval = setInterval(() => {
            demoProgress += 10;
            if (isDemo) {
                setProgress(demoProgress);
                if (demoProgress >= 100) {
                    clearInterval(interval);
                    alert('Deep Fake Detected!');
                }
            } else {
                setProgress(demoProgress);
                if (demoProgress >= 100) {
                    clearInterval(interval);
                    alert('Analysis Complete!');
                    setProgress(0);
                }
            }
        }, isDemo ? 300 : 1000);
    };

    return (
        <div>
            <div id="upload-section">
                <input type="file" id="file-input" onChange={handleFileChange} style={{ display: 'none' }} />
                <button onClick={() => document.getElementById('file-input').click()}>Upload File</button>
                <input type="text" id="url-input" value={url} onChange={(e) => setUrl(e.target.value)} />
                <button onClick={handleUrlUpload}>Upload URL</button>
                <button onClick={handleDemoUpload}>Upload Demo</button>
            </div>

            <div id="analysis-section" style={{ display: showResults ? 'none' : 'block' }}>
                <div id="progress" style={{ width: `${progress}%`, background: 'blue', height: '20px' }}></div>
                <div id="time-remaining">Calculating...</div>
            </div>

            {showResults && (
                <div id="results-section">
                    <div id="summary-box">Summary of Analysis</div>
                    <div id="analysis-breakdown" style={{ display: 'none' }}>Analysis Breakdown</div>
                    <div id="graphs-section" style={{ display: 'none' }}>Graphs Section</div>
                    <div id="technical-insights" style={{ display: 'none' }}>Technical Insights</div>
                    <button id="details-button" onClick={() => {
                        document.getElementById('analysis-breakdown').style.display = 'block';
                        document.getElementById('graphs-section').style.display = 'block';
                        document.getElementById('technical-insights').style.display = 'block';
                    }}>Show Details</button>
                    <button id="download-report-button">Download Report</button>
                </div>
            )}
        </div>
    );
};

export default App;
