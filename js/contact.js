document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm?.addEventListener('submit', async function(e) {
        e.preventDefault();

        // التحقق من صحة البيانات
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        if (validateForm(data)) {
            try {
                // إظهار حالة التحميل
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'جاري الإرسال...';

                // محاكاة إرسال البيانات
                await new Promise(resolve => setTimeout(resolve, 1500));

                showNotification('تم إرسال رسالتك بنجاح!', 'success');
                this.reset();
            } catch (error) {
                showNotification('حدث خطأ. الرجاء المحاولة مرة أخرى.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'إرسال';
            }
        }
    });

    // تحريك الخريطة
    initializeMap();
});

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.length < 3) {
        showNotification('الرجاء إدخال اسم صحيح', 'error');
        return false;
    }

    if (!emailRegex.test(data.email)) {
        showNotification('الرجاء إدخال بريد إلكتروني صحيح', 'error');
        return false;
    }

    if (!data.message || data.message.length < 10) {
        showNotification('الرجاء إدخال رسالة أطول', 'error');
        return false;
    }

    return true;
}

function initializeMap() {
    // يمكن إضافة تكامل مع خرائط Google هنا
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// التعامل مع نموذج الاتصال
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // جمع البيانات من النموذج
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
    console.log('بيانات النموذج:', formData);
    
    // إظهار رسالة نجاح (يمكن تعديلها حسب الحاجة)
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    
    // إعادة تعيين النموذج
    this.reset();
});

// تهيئة خريطة Google (يجب إضافة مفتاح API الخاص بك)
function initMap() {
    const location = { lat: 24.7136, lng: 46.6753 }; // تغيير الإحداثيات حسب موقعك
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#242f3e"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"lightness": -80}]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#746855"}]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#d59563"}]
            }
        ]
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'منتجع هول إن ون للجولف'
    });
}

// إضافة سكريبت خريطة Google عند تحميل الصفحة
window.addEventListener('load', function() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}); 