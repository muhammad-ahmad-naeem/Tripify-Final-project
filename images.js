/* Tripify image map — local filenames resolve to hosted travel photos */
const TRIPIFY_IMAGES = {
    'background.jpg': 'https://picsum.photos/seed/pakistan-hero/1920/1080',
    'hunza-valley.jpg': 'https://picsum.photos/seed/hunza-valley/1200/800',
    'hunza-tour.jpg': 'https://picsum.photos/seed/hunza-tour/1200/800',
    'swat-valley.jpg': 'https://picsum.photos/seed/swat-valley/1200/800',
    'swat-tour.jpg': 'https://picsum.photos/seed/swat-tour/1200/800',
    'skardu.jpg': 'https://picsum.photos/seed/skardu/1200/800',
    'skardu-tour.jpg': 'https://picsum.photos/seed/skardu-tour/1200/800',
    'northern-tour.jpg': 'https://picsum.photos/seed/northern-pakistan/1200/800',
    'cultural-festival.jpg': 'https://picsum.photos/seed/cultural-festival/1200/800',
    'kalash-festival.jpg': 'https://picsum.photos/seed/kalash-festival/1200/800',
    'adventure-tour.jpg': 'https://picsum.photos/seed/adventure-hike/1200/800'
};

const TRIPIFY_FALLBACK = 'https://picsum.photos/seed/tripify-fallback/1200/800';

function resolveTripifyImage(src) {
    if (!src || src.startsWith('http') || src.startsWith('data:')) {
        return src;
    }
    const file = src.split('/').pop().split('?')[0];
    return TRIPIFY_IMAGES[file] || TRIPIFY_FALLBACK;
}

function initTripifyImages() {
    document.querySelectorAll('img').forEach((img) => {
        const original = img.getAttribute('src');
        const resolved = resolveTripifyImage(original);
        if (resolved && resolved !== original) {
            img.src = resolved;
        }
        img.loading = img.loading || 'lazy';
        img.decoding = 'async';
        img.onerror = function handleImageError() {
            if (this.src !== TRIPIFY_FALLBACK) {
                this.src = TRIPIFY_FALLBACK;
            }
        };
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function onLoad() {
                this.style.opacity = '1';
            }, { once: true });
        }
    });
}

window.TRIPIFY_IMAGES = TRIPIFY_IMAGES;
window.initTripifyImages = initTripifyImages;
