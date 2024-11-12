// Adjust the container height based on content
function adjustContainerHeight() {
    const container = document.getElementById('resume-container');
    const contentHeight = container.scrollHeight;
    if (window.innerWidth < 850 && contentHeight > container.clientHeight) {
        container.style.height = `${contentHeight}px`;
    } else if (window.innerWidth >= 850) {
        container.style.height = 'auto';
        container.style.maxHeight = '1100px';
    }
}
window.addEventListener('resize', adjustContainerHeight);
window.addEventListener('load', adjustContainerHeight);

// Function to export the resume content to a PDF
function exportToPDF() {
    const resumeElement = document.getElementById('resume-content-wrapper');
    const lightModeStyles = `
        body, .container, .left-column, .right-column { background-color: #ffffff !important; color: #000000 !important; }
        h1, h2, h3, p, ul, li, .subtext { color: #000000 !important; }
        .headshot { background-color: #ccc !important; }
        .container { border: 1px solid #333 !important; box-shadow: none !important; }
    `;
    const styleElement = document.createElement('style');
    styleElement.innerHTML = lightModeStyles;
    document.head.appendChild(styleElement);
    const options = {
        margin: 0.5,
        filename: 'Kieran_Kim-Murphy_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(resumeElement).save().then(() => {
        document.head.removeChild(styleElement);
    });
}