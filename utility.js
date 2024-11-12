// Adjust the container height based on content
function adjustContainerHeight() {
    const container = document.getElementById('resume-container');
    if (window.innerWidth < 850) {
        // For mobile, enforce the aspect ratio by setting height based on width
        const width = container.clientWidth;
        container.style.height = `${width * (11 / 8.5)}px`;
    } else {
        // Desktop view: enforce max height
        container.style.height = 'auto';
        container.style.maxHeight = '1100px';
    }
}
window.addEventListener('resize', adjustContainerHeight);
window.addEventListener('load', adjustContainerHeight);

// Function to export the resume content to a PDF
function exportToPDF() {
    const resumeElement = document.getElementById('resume-content-wrapper');
    
    // Desktop styling to enforce full layout for PDF export
    const desktopStyles = `
        .container {
            width: 850px !important;
            height: 1100px !important;
            max-width: none !important;
            max-height: none !important;
            overflow: visible !important;
        }
        .left-column {
            width: 30% !important;
            display: block !important;
        }
        .right-column {
            width: 70% !important;
        }
        .toggle-btn {
            display: none !important;
        }
        body, .container, .left-column, .right-column {
            background-color: #ffffff !important;
            color: #000000 !important;
        }
        h1, h2, h3, p, ul, li, .subtext {
            color: #000000 !important;
        }
        .headshot {
            background-color: #ccc !important;
        }
    `;
    
    // Create a style element to apply desktop styles
    const styleElement = document.createElement('style');
    styleElement.innerHTML = desktopStyles;
    document.head.appendChild(styleElement);

    // PDF export options
    const options = {
        margin: 0.5,
        filename: 'Kieran_Kim-Murphy_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate PDF and remove the desktop style after completion
    html2pdf().set(options).from(resumeElement).save().then(() => {
        document.head.removeChild(styleElement); // Clean up by removing the style
    });
}

// Function to toggle the left column
function toggleLeftColumn() {
    const leftColumn = document.getElementById('left-column');
    const toggleBtn = document.getElementById('toggle-btn');
    
    leftColumn.classList.toggle('expanded');
    
    // Update the button text based on the expanded state
    if (leftColumn.classList.contains('expanded')) {
        toggleBtn.innerHTML = '&#8249;'; // Left arrow
    } else {
        toggleBtn.innerHTML = '&#8250;'; // Right arrow
    }
}
