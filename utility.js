// Function to set the mobile or desktop layout based on screen width and height
function applyResponsiveLayout() {
    const isMobile = window.innerWidth < 850;
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.querySelector('.right-column');
    const toggleBtn = document.getElementById('toggle-btn');
    const leftParagraphs = leftColumn.querySelectorAll('p');
    const rightParagraphs = rightColumn.querySelectorAll('p');
    const leftHeaders = leftColumn.querySelectorAll('h1, h2, h3');
    const rightHeaders = rightColumn.querySelectorAll('h1, h2, h3');
    const leftLists = leftColumn.querySelectorAll('ul, li');
    const rightLists = rightColumn.querySelectorAll('ul, li');

    if (isMobile) {
        // Mobile layout adjustments
        leftColumn.classList.remove('expanded'); // Default to collapsed state
        toggleBtn.innerHTML = '&#8250;'; // Show right arrow

        // Hide left column content, grey out headers
        leftParagraphs.forEach(paragraph => {
            paragraph.style.display = 'none';
        });
        leftHeaders.forEach(header => {
            header.style.color = '#666666';
        });
        leftLists.forEach(list => {
            list.style.display = 'none';
        });

        // Ensure right column content is visible
        rightParagraphs.forEach(paragraph => {
            paragraph.style.display = '';
        });
        rightHeaders.forEach(header => {
            header.style.color = ''; // Reset to original color
        });
        rightLists.forEach(list => {
            list.style.display = '';
        });

        // Adjust container height to fit mobile screens in vertical mode
        const container = document.getElementById('resume-container');
        const aspectRatio = 11 / 8.5; // Standard aspect ratio for 8.5x11
        if (window.innerHeight / window.innerWidth < aspectRatio) {
            container.style.height = `${window.innerHeight - 40}px`; // Adjust for padding
        } else {
            container.style.height = 'auto';
        }
    } else {
        // Desktop layout adjustments
        leftParagraphs.forEach(paragraph => {
            paragraph.style.display = '';
        });
        leftHeaders.forEach(header => {
            header.style.color = '';
        });
        leftLists.forEach(list => {
            list.style.display = '';
        });

        rightParagraphs.forEach(paragraph => {
            paragraph.style.display = '';
        });
        rightHeaders.forEach(header => {
            header.style.color = '';
        });
        rightLists.forEach(list => {
            list.style.display = '';
        });

        // Reset toggle button and expanded state
        leftColumn.classList.remove('expanded');
        toggleBtn.innerHTML = ''; // Hide toggle button on desktop

        // Restore default height
        const container = document.getElementById('resume-container');
        container.style.height = 'auto';
    }
}

// Function to toggle the left column and update paragraph, header styles, and list visibility
function toggleLeftColumn() {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.querySelector('.right-column');
    const toggleBtn = document.getElementById('toggle-btn');
    const leftParagraphs = leftColumn.querySelectorAll('p');
    const rightParagraphs = rightColumn.querySelectorAll('p');
    const leftHeaders = leftColumn.querySelectorAll('h1, h2, h3');
    const rightHeaders = rightColumn.querySelectorAll('h1, h2, h3');
    const leftLists = leftColumn.querySelectorAll('ul, li');
    const rightLists = rightColumn.querySelectorAll('ul, li');

    // Toggle the expanded state
    leftColumn.classList.toggle('expanded');
    leftColumn.dataset.toggled = leftColumn.classList.contains('expanded'); // Save toggle state

    if (leftColumn.classList.contains('expanded')) {
        // Left column expanded - Show left column content, grey out right column
        leftParagraphs.forEach(paragraph => {
            paragraph.style.display = '';
        });
        leftHeaders.forEach(header => {
            header.style.color = '';
        });
        leftLists.forEach(list => {
            list.style.display = '';
        });

        // Hide right column content and grey out headers
        rightParagraphs.forEach(paragraph => {
            paragraph.style.display = 'none';
        });
        rightHeaders.forEach(header => {
            header.style.color = '#666666';
        });
        rightLists.forEach(list => {
            list.style.display = 'none';
        });

        // Update toggle button to show a left arrow
        toggleBtn.innerHTML = '&#8249;'; // Left arrow
    } else {
        // Left column collapsed - Show right column content, grey out left column
        leftParagraphs.forEach(paragraph => {
            paragraph.style.display = 'none';
        });
        leftHeaders.forEach(header => {
            header.style.color = '#666666';
        });
        leftLists.forEach(list => {
            list.style.display = 'none';
        });

        // Restore right column content and headers to original styles
        rightParagraphs.forEach(paragraph => {
            paragraph.style.display = '';
        });
        rightHeaders.forEach(header => {
            header.style.color = ''; // Restore original color
        });
        rightLists.forEach(list => {
            list.style.display = '';
        });

        // Update toggle button to show right arrow
        toggleBtn.innerHTML = '&#8250;'; // Right arrow
    }
}

// Function to apply toggle state on scroll to prevent reset
function applyToggleState() {
    const leftColumn = document.getElementById('left-column');
    if (leftColumn.dataset.toggled === 'true') {
        leftColumn.classList.add('expanded');
    }
}

// Event listeners
window.addEventListener('load', applyResponsiveLayout);
window.addEventListener('resize', applyResponsiveLayout);
window.addEventListener('scroll', applyToggleState);

// Function to export the resume content to a PDF
function exportToPDF() {
    const resumeElement = document.getElementById('resume-content-wrapper');

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
            display: block !important;
        }
        .left-column .toggle-btn {
            display: none !important;
        }
        .left-column.expanded, .right-column.expanded {
            width: 30% !important;
        }
        .left-column h1, .left-column h2, .left-column h3,
        .right-column h1, .right-column h2, .right-column h3,
        .left-column p, .right-column p,
        .left-column ul, .right-column ul,
        .left-column li, .right-column li {
            display: block !important;
            color: #000000 !important;
        }
        body, .container, .left-column, .right-column {
            background-color: #ffffff !important;
            color: #000000 !important;
        }
        .headshot {
            background-color: #ccc !important;
        }
    `;

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
        document.head.removeChild(styleElement); 
    });
}
