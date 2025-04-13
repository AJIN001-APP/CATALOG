const imageUrls = [
    'https://i.ibb.co/pV3PXCj/9473.jpg',
    'https://i.ibb.co/pBxTJfQH/4673.jpg',
    'https://i.ibb.co/yc2xJh4f/3429.jpg',
    'https://i.ibb.co/qLwrpr5v/472.jpg',
    'https://i.ibb.co/VPq4sK5/1991.jpg',
    'https://i.ibb.co/WWzndPpf/2344.jpg',
    'https://i.ibb.co/hJBPmwD4/2311.jpg',
    'https://i.ibb.co/1JRt3ywT/5005.jpg',
    'https://i.ibb.co/76RgRzd/2401.jpg',
    'https://i.ibb.co/chwg8Y6M/3997.jpg',
    'https://i.ibb.co/HDFLqSjk/3801.jpg',
    'https://i.ibb.co/KcbhP68V/5780.jpg',
    'https://i.ibb.co/CKn1nRXH/5274.jpg',
    'https://i.ibb.co/7t336d43/2991.jpg',
    'https://i.ibb.co/vCcS9vkJ/5687.jpg',
    'https://i.ibb.co/994GH7JJ/7275.jpg',
    'https://i.ibb.co/jPkpVY6F/3665.jpg',
    'https://i.ibb.co/Ndvq6dDN/4862.jpg',
    'https://i.ibb.co/Kj65B76N/8817.jpg',
    'https://i.ibb.co/ZpRs6k57/8414.jpg',
    'https://i.ibb.co/gLdVQpVr/8578.jpg',
    'https://i.ibb.co/rhGtCj9/6401.jpg',
    'https://i.ibb.co/Q3wH9qGb/750.jpg',
    'https://i.ibb.co/svPkTLYW/5055.jpg',
    'https://i.ibb.co/SDfcZdnX/6328.jpg',
    'https://i.ibb.co/LVQZD9v/2929.jpg',
    'https://i.ibb.co/nMVnwV2p/2157.jpg',
    'https://i.ibb.co/7xmBf7Wk/2112.jpg',
    'https://i.ibb.co/H6v6vMc/1683.jpg',
    'https://i.ibb.co/whMZJJSJ/7022.jpg',
    'https://i.ibb.co/Rpf7kSkZ/4401.jpg',
    'https://i.ibb.co/spsQ1DK0/275.jpg'
];

document.addEventListener('DOMContentLoaded', () => {
    generateImageCards();
    setupEventListeners();
});

function generateImageCards() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Clear existing content
    
    imageUrls.forEach((imageUrl, index) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Image ${index + 1}`;
        img.loading = "lazy";
        
        const button = document.createElement('button');
        button.className = 'download-btn';
        button.textContent = 'Download';
        button.setAttribute('data-image', imageUrl);
        
        imageCard.appendChild(img);
        imageCard.appendChild(button);
        gallery.appendChild(imageCard);
    });
}

function setupEventListeners() {
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const imageUrl = button.getAttribute('data-image');
            await downloadImage(imageUrl);
        });
    });
}

async function downloadImage(imageUrl) {
    try {
        const response = await fetch(imageUrl, {
            mode: 'cors',
            headers: new Headers({
                'Origin': window.location.origin
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const fileName = `Niroshan_Image_${Date.now()}.jpg`;
        
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        }, 100);
        
    } catch (error) {
        console.error('Download failed:', error);
        // Fallback: Open in new tab if download fails
        window.open(imageUrl, '_blank');
    }
                      }
