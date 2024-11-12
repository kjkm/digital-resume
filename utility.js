// Toggle functionality for the left column on mobile
function toggleLeftColumn() {
    if(navigator.vibrate) {
        navigator.vibrate(50);
    }

    const leftColumn = document.getElementById('left-column');
    const toggleBtn = document.getElementById('toggle-btn');
    const isExpanded = leftColumn.classList.contains('expanded');

    leftColumn.classList.toggle('expanded', !isExpanded);
    leftColumn.dataset.toggled = !isExpanded ? 'true' : 'false';
    toggleBtn.innerHTML = isExpanded ? '&#8250;' : '&#8249;';
    
    applyColumnVisibility(!isExpanded);
}

// Apply column visibility for mobile toggling
function applyColumnVisibility(showLeftColumn) {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.querySelector('.right-column');
    const leftParagraphs = leftColumn.querySelectorAll('p');
    const rightParagraphs = rightColumn.querySelectorAll('p');
    const leftHeaders = leftColumn.querySelectorAll('h1, h2, h3');
    const rightHeaders = rightColumn.querySelectorAll('h1, h2, h3');
    const leftLists = leftColumn.querySelectorAll('ul, li');
    const rightLists = rightColumn.querySelectorAll('ul, li');

    if (showLeftColumn) {
        leftParagraphs.forEach(paragraph => paragraph.style.display = '');
        leftHeaders.forEach(header => header.style.color = '');
        leftLists.forEach(list => list.style.display = ''); 
        rightParagraphs.forEach(paragraph => paragraph.style.display = 'none');
        rightHeaders.forEach(header => header.style.color = '#666666');
        rightLists.forEach(list => list.style.display = 'none');
    } else {
        leftParagraphs.forEach(paragraph => paragraph.style.display = 'none');
        leftHeaders.forEach(header => header.style.color = '#666666');
        leftLists.forEach(list => list.style.display = 'none');
        rightParagraphs.forEach(paragraph => paragraph.style.display = '');
        rightHeaders.forEach(header => header.style.color = '');
        rightLists.forEach(list => list.style.display = '');
    }
}

function applyResponsiveLayout() {
    const container = document.getElementById('resume-container');
    const leftColumn = document.getElementById('left-column');
    const toggleBtn = document.getElementById('toggle-btn');

    if (window.innerWidth >= 850) {
        resetToDesktopLayout();
        container.style.maxHeight = '1100px'; // Limit height on desktop
    } else {
        container.style.maxHeight = 'none'; // Remove max-height on mobile
        const isExpanded = leftColumn.dataset.toggled === 'true';
        applyColumnVisibility(isExpanded);
        toggleBtn.style.display = 'block';
    }
}

function resetToDesktopLayout() {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.querySelector('.right-column');
    const toggleBtn = document.getElementById('toggle-btn');

    leftColumn.classList.remove('expanded');
    rightColumn.classList.remove('expanded');
    leftColumn.dataset.toggled = 'false';

    // Reset content visibility and color for both columns
    leftColumn.querySelectorAll('p, ul, li').forEach(element => element.style.display = '');
    leftColumn.querySelectorAll('h1, h2, h3').forEach(header => header.style.color = '');
    rightColumn.querySelectorAll('p, ul, li').forEach(element => element.style.display = '');
    rightColumn.querySelectorAll('h1, h2, h3').forEach(header => header.style.color = '');

    // Reset toggle button arrow to the default (>)
    toggleBtn.innerHTML = '&#8250;'; // Right arrow symbol
}

// Event listeners to apply layout on load and resize
window.addEventListener('load', applyResponsiveLayout);
window.addEventListener('resize', applyResponsiveLayout);

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
