document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // تحديد الصفحة النشطة في القائمة
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Language Switcher
    const langSwitch = document.querySelector('.lang-switch');
    langSwitch?.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        if (currentLang === 'ar') {
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
            langSwitch.textContent = 'عربي';
        } else {
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
            langSwitch.textContent = 'English';
        }
    });

    // Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تم استلام طلب الحجز بنجاح!');
        bookingForm.reset();
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 