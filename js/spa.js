document.addEventListener('DOMContentLoaded', function() {
    // تحريك الخدمات عند التمرير
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => observer.observe(card));

    // حجز الخدمات
    const bookButtons = document.querySelectorAll('.service-card .btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.closest('.service-card').querySelector('h3').textContent;
            localStorage.setItem('selectedService', service);
            window.location.href = 'booking.html';
        });
    });

    // معرض الصور
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <span class="close">&times;</span>
                <img src="${this.src}" alt="${this.alt}">
            `;
            document.body.appendChild(lightbox);

            lightbox.querySelector('.close').addEventListener('click', () => {
                lightbox.remove();
            });
        });
    });
}); 