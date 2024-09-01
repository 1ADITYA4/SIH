// import { Client } from "./@gradio/client";

document.addEventListener('DOMContentLoaded', async () => {
    // Main upload and analysis handling
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const analysisSection = document.getElementById('analysis-section');
    const progress = document.getElementById('progress');
    const timeRemaining = document.getElementById('time-remaining');
    const resultsSection = document.getElementById('results-section');
    const summaryBox = document.getElementById('summary-box');
    const analysisBreakdown = document.getElementById('analysis-breakdown');
    const graphsSection = document.getElementById('graphs-section');
    const technicalInsights = document.getElementById('technical-insights');
    const detailsButton = document.getElementById('details-button');
    const downloadReportButton = document.getElementById('download-report-button');

    // Demo upload and result handling
    const demoFileInput = document.getElementById('demo-file-input');
    const demoUploadButton = document.getElementById('demo-upload-button');
    const demoResult = document.getElementById('demo-result');
    const demoResultText = document.getElementById('demo-result-text');
    const demoProgress = document.getElementById('demo-progress');

    // About Us dropdown handling
    const aboutUsButton = document.getElementById('about-us-btn');
    const aboutUsDropdown = document.getElementById('about-us-dropdown');
    const guessButtons = document.querySelectorAll(".guess-button");

    const urlInput = document.getElementById('url-input');
    const urlUploadButton = document.getElementById('url-upload-button');


    // Handle file selection for main analysis
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    if (fileInput && uploadButton) {
        uploadButton.addEventListener('click', () => {
            console.log('Button clicked');  // Check if button click is registered
            fileInput.click();
        });

        fileInput.addEventListener('change', (event) => {
            console.log('File input changed');  // Check if file input change is registered
            if (event.target.files.length > 0) {
                const file = event.target.files[0];
                if (isSupportedFileType(file)) {
                    startAnalysis(file);
                } else {
                    alert('Unsupported file type. Please upload a valid image or video.');
                }
            }
        });
    } else {
        console.error('Button or input element not found');  // Log if elements are missing
    }

    fileInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (isSupportedFileType(file)) {
                startAnalysis(file);
            } else {
                alert('Unsupported file type. Please upload a valid image or video.');
            }
        }
    });

    urlUploadButton.addEventListener('click', () => {
        const url = urlInput.value;
        if (url) {
            if (isValidURL(url) && isImageOrVideoURL(url)) {
                startAnalysis(url);
            } else {
                alert('Please enter a valid image or video URL.');
            }
        } else {
            alert('Please enter a URL.');
        }
    });

    document.getElementById('compress-button').addEventListener('click', async function () {
        alert('File compression is not yet implemented.');
        // Add your compression logic here
    });

    guessButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const answer = this.getAttribute("data-answer");
            const resultElement = this.parentElement.querySelector(".result");

            if (answer === "fake") {
                resultElement.textContent = "Correct! This is a deep fake.";
                resultElement.style.color = "green";
            } else {
                resultElement.textContent = "Incorrect. This is actually a deep fake.";
                resultElement.style.color = "red";
            }

            resultElement.style.display = "block";
        });
    });

    function isValidURL(url) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*' + // port and path
            '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // query string
            '(\\#[-a-zA-Z0-9_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    }

    function isImageOrVideoURL(url) {
        const imageVideoExtensions = /\.(mp4|avi|mov|png|jpeg|jpg|svg)$/i;
        return imageVideoExtensions.test(url);
    }

    function isSupportedFileType(file) {
        const supportedTypes = ['video/mp4', 'video/avi', 'video/mov', 'image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
        return supportedTypes.includes(file.type);
    }

    // Simulate the main video analysis process
    function startAnalysis(fileOrUrl) {
        analysisSection.style.display = 'block';
        resultsSection.style.display = 'none';
        progress.style.width = '0%';
        timeRemaining.textContent = 'Calculating...';

        let progressValue = 0;
        const interval = setInterval(() => {
            progressValue += 10;
            progress.style.width = `${progressValue}%`;

            if (progressValue >= 100) {
                clearInterval(interval);
                showResults();
            }
        }, 500);

        if (typeof fileOrUrl === 'string') {
            fetch(fileOrUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    analyzeBlob(blob);
                })
                .catch(error => {
                    console.error('Error fetching the file:', error);
                    alert('Error fetching the file. Please check the URL and try again.');
                });
        } else {
            analyzeBlob(fileOrUrl); // Pass file directly to analyzeBlob
        }
    }

    function analyzeBlob(blob) {
        console.log('Analyzing blob:', blob);
        // Simulate analysis completion
        setTimeout(showResults, 2000);
    }

    function showResults() {
        analysisSection.style.display = 'none';
        resultsSection.style.display = 'block';
        summaryBox.style.display = 'block';
        analysisBreakdown.style.display = 'none';
        graphsSection.style.display = 'none';
        technicalInsights.style.display = 'none';
    }

    detailsButton.addEventListener('click', () => {
        analysisBreakdown.style.display = 'block';
        graphsSection.style.display = 'block';
        technicalInsights.style.display = 'block';
    });

    downloadReportButton.addEventListener('click', () => {
        alert('Downloading report...');
    });

    // Handle demo file selection
    demoUploadButton.addEventListener('click', () => {
        demoFileInput.click();
    });

    demoFileInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            startDemoAnalysis();
        }
    });

    // Simulate the demo analysis process
    function startDemoAnalysis(isDemo = false) {
        let progress = 0;
        const analysisDuration = 10; // Simulate a 10-second analysis
    
        const interval = setInterval(() => {
            progress += 10;
    
            if (isDemo) {
                demoProgress.style.width = `${progress}%`;
                demoResultText.textContent = 'Processing...';
            } else {
                progress.style.width = `${progress}%`;
                timeRemaining.innerText = `${Math.max(0, analysisDuration - (progress / 10)).toFixed(1)} seconds`;
            }
    
            if (progress >= 100) {
                clearInterval(interval);
                if (isDemo) {
                    demoResultText.textContent = 'Deep Fake Detected!';
                } else {
                    alert("Analysis Complete!");
                    // Reset or move to next steps
                    progressBar.style.width = '0%';
                    timeRemaining.innerText = "Calculating...";
                    analysisSection.style.display = 'none';
                }
            }
        }, isDemo ? 300 : 1000); // Different intervals for demo and real analysis
    }

    // Toggle About Us dropdown visibility
    aboutUsButton.addEventListener('click', (e) => {
        e.preventDefault();
        aboutUsDropdown.style.display = aboutUsDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close About Us dropdown if clicked outside
    window.addEventListener('click', (e) => {
        if (!aboutUsButton.contains(e.target) && !aboutUsDropdown.contains(e.target)) {
            aboutUsDropdown.style.display = 'none';
        }
    });

    // async function fetchAndPredictImage(imageUrl, clientURL, endpoint) {
    //     try {
    //         // Fetch the image from the provided URL
    //         const response = await fetch(imageUrl);
    //         if (!response.ok) {
    //             throw new Error(`Failed to fetch image: ${response.statusText}`);
    //         }
    //         const imageBlob = await response.blob();
    
    //         // Connect to the client using the provided clientURL
    //         const client = await Client.connect(clientURL);
    //         if (!client) {
    //             throw new Error("Failed to connect to the client");
    //         }
    
    //         // Make a prediction request with the image using the provided endpoint
    //         const result = await client.predict(endpoint, {
    //             image: imageBlob,
    //         });
    
    //         // Return the prediction result
    //         return result;
    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //         return null; // Or handle error appropriately
    //     }
    // }
    
    // Usage example
    // fetchAndPredictImage(
    //     "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png",
    //     "Kxngh/SIH_DeepSecure",
    //     "/predict"
    // ).then(result => {
    //     if (result) {
    //         console.log("Prediction result:", result);
    //     } else {
    //         console.log("Prediction failed.");
    //     }
    // });
    
      
      
});
