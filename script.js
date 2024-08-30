// script.js

document.addEventListener('DOMContentLoaded', function () {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const analysisSection = document.getElementById('analysis-section');
    const resultsSection = document.getElementById('results-section');
    const progressBar = document.getElementById('progress');
    const timeRemaining = document.getElementById('time-remaining');
    const resultSummary = document.getElementById('result-summary');
    const confidenceValue = document.getElementById('confidence-value');
    const detailsButton = document.getElementById('details-button');
    const downloadReportButton = document.getElementById('download-report-button');
    const analysisBreakdown = document.getElementById('analysis-breakdown');
    const graphsSection = document.getElementById('graphs-section');
    const technicalInsights = document.getElementById('technical-insights');

    // Handle click event for the button to trigger file input
    uploadButton.addEventListener('click', function () {
        fileInput.click();
    });

    // Highlight the upload area when a file is dragged over it
    uploadArea.addEventListener('dragover', function (event) {
        event.preventDefault();
        uploadArea.classList.add('dragover');
    });

    // Remove highlight when the file is dragged away
    uploadArea.addEventListener('dragleave', function () {
        uploadArea.classList.remove('dragover');
    });

    // Handle drop event
    uploadArea.addEventListener('drop', function (event) {
        event.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = event.dataTransfer.files;
        handleFiles(files);
    });

    // Handle file input change
    fileInput.addEventListener('change', function () {
        const files = fileInput.files;
        handleFiles(files);
    });

    document.getElementById('footer-links').addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            const href = event.target.getAttribute('href');
            // Example logic for handling footer link clicks
            if (href === '#') {
                event.preventDefault();
                alert('Link to be implemented.');
            }
        }
    });
    document.getElementById('social-media-links').addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            // Example logic for handling social media clicks
            // Could be used to track clicks or open in a new tab
            event.target.setAttribute('target', '_blank');
        }
    });
    document.getElementById('contact-info').addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            const href = event.target.getAttribute('href');
            if (href.startsWith('mailto:')) {
                // Example action for mailto links, this will open user's default email client
            }
        }
    });

    // Function to handle file selection and processing
    function handleFiles(files) {
        if (files.length > 0) {
            alert(`Selected file: ${files[0].name}`);
            // Show analysis section
            analysisSection.style.display = 'block';
            resultsSection.style.display = 'none'; // Hide results section initially

            // Simulate analysis process
            simulateAnalysis();
        }
    }

    // Function to simulate video analysis process
    function simulateAnalysis() {
        let progress = 0;
        const analysisDuration = 10; // Simulate a 10-second analysis

        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            timeRemaining.innerText = `${Math.max(0, analysisDuration - (progress / 10)).toFixed(1)} seconds`;

            if (progress >= 100) {
                clearInterval(interval);
                // Show results after analysis
                showResults();
            }
        }, 1000);
    }

    // Function to show analysis results
    function showResults() {
        analysisSection.style.display = 'none'; // Hide analysis section
        resultsSection.style.display = 'block'; // Show results section

        // Simulate result data
        resultSummary.innerText = "Deep Fake Detected";
        confidenceValue.innerText = "98%";

        // Display detailed analysis
        detailsButton.addEventListener('click', function () {
            analysisBreakdown.style.display = 'block';
            graphsSection.style.display = 'block';
            technicalInsights.style.display = 'block';
        });

        // Placeholder for download report functionality
        downloadReportButton.addEventListener('click', function () {
            alert('Download report functionality will be implemented here.');
        });
    }
});
