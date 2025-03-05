// وظائف مساعدة مشتركة بين جميع الصفحات

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// التحقق من صحة رقم الهاتف
function isValidPhone(phone) {
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return phoneRegex.test(phone);
}

// تنسيق التاريخ
function formatDate(date) {
    return new Date(date).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// تنسيق الوقت
function formatTime(time) {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// إظهار رسالة تأكيد
function showConfirmation(message) {
    return new Promise((resolve, reject) => {
        const confirm = window.confirm(message);
        if (confirm) {
            resolve(true);
        } else {
            reject(false);
        }
    });
}

// تحميل الصور بشكل متأخر
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// تصدير الوظائف
export {
    isValidEmail,
    isValidPhone,
    formatDate,
    formatTime,
    showConfirmation,
    lazyLoadImages
}; 