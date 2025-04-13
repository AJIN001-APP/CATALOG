document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const splitButton = document.getElementById('splitButton');
    const preview = document.getElementById('preview');
    const downloadLinks = document.getElementById('download-links');
    const filenameDisplay = document.getElementById('filename-display');
    
    let image = new Image();
    
    // Handle image upload
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            image.src = event.target.result;
            filenameDisplay.textContent = 'Selected file: ' + file.name;
            filenameDisplay.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });
    
    // Handle split button click
    splitButton.addEventListener('click', function() {
        if (!image.src) {
            alert('Please upload an image first!');
            return;
        }
        
        // Create canvas for splitting
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const imgWidth = image.width;
        const imgHeight = image.height;
        
        // Calculate part dimensions (split into 3 columns and 2 rows)
        const partWidth = Math.floor(imgWidth / 3);
        const partHeight = Math.floor(imgHeight / 2);
        
        // Clear previous results
        preview.innerHTML = '';
        downloadLinks.innerHTML = '';
        
        // Split image into 6 parts (2 rows x 3 columns)
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 3; col++) {
                // Set canvas size for this part
                canvas.width = partWidth;
                canvas.height = partHeight;
                
                // Draw the image part
                ctx.drawImage(
                    image,
                    col * partWidth,      // source x
                    row * partHeight,     // source y
                    partWidth,            // source width
                    partHeight,           // source height
                    0,                    // destination x
                    0,                    // destination y
                    partWidth,            // destination width
                    partHeight            // destination height
                );
                
                // Add watermark to the bottom-right part
                if (row === 1 && col === 2) {
                    ctx.font = 'bold 20px Arial';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                    ctx.textAlign = 'right';
                    ctx.fillText('NIROSHAN  ', partWidth - 10, partHeight - 10);
                }
                
                // Create data URL for this part
                const dataUrl = canvas.toDataURL('image/png');
                
                // Create preview image element
                const imgElement = document.createElement('img');
                imgElement.src = dataUrl;
                imgElement.classList.add('image-part');
                preview.appendChild(imgElement);
                
                // Create download link
                const downloadLink = document.createElement('a');
                downloadLink.href = dataUrl;
                downloadLink.download = `part_${row}_${col}.png`;
                downloadLink.textContent = `Part ${row * 3 + col + 1}`;
                downloadLinks.appendChild(downloadLink);
                
                // Add space between links
                downloadLinks.appendChild(document.createTextNode(' '));
            }
        }
        
        // Add animation to preview images
        const parts = document.querySelectorAll('.image-part');
        parts.forEach((part, index) => {
            setTimeout(() => {
                part.classList.add('fade-in');
            }, index * 100);
        });
    });
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
