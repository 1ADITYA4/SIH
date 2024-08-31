document.addEventListener('DOMContentLoaded', () => {
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

    // Handle file selection for main analysis
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    guessButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const answer = this.getAttribute("data-answer");
            const challengeItem = this.parentElement;
            const resultElement = challengeItem.querySelector(".result");

            // Logic to check the answer (for demo purposes, assume all answers are "fake")
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

    fileInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            startAnalysis();
        }
    });

    // Simulate the main video analysis process
    function startAnalysis() {
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
    function startDemoAnalysis() {
        demoResult.style.display = 'block';
        demoResultText.textContent = 'Processing...';
        demoProgress.style.width = '0%';

        let demoProgressValue = 0;
        const demoInterval = setInterval(() => {
            demoProgressValue += 20;
            demoProgress.style.width = `${demoProgressValue}%`;

            if (demoProgressValue >= 100) {
                clearInterval(demoInterval);
                demoResultText.textContent = 'Deep Fake Detected!';
            }
        }, 300);
    }

    // Toggle About Us dropdown visibility
    aboutUsButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (aboutUsDropdown.style.display === 'block') {
            aboutUsDropdown.style.display = 'none';
        } else {
            aboutUsDropdown.style.display = 'block';
        }
    });

    // Close About Us dropdown if clicked outside
    window.addEventListener('click', (e) => {
        if (!aboutUsButton.contains(e.target) && !aboutUsDropdown.contains(e.target)) {
            aboutUsDropdown.style.display = 'none';
        }
    });
});
