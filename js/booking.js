document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const bookingTabs = document.querySelectorAll('.booking-tab');
    
    // تهيئة التاريخ والوقت
    initializeDateTimeInputs();

    // التبديل بين أنواع الحجز
    bookingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            bookingTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            updateBookingForm(this.textContent);
        });
    });

    // معالجة نموذج الحجز
    bookingForm?.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const bookingData = Object.fromEntries(formData);

        if (validateBooking(bookingData)) {
            try {
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'جاري الحجز...';

                // محاكاة عملية الحجز
                await new Promise(resolve => setTimeout(resolve, 1500));

                showNotification('تم الحجز بنجاح!', 'success');
                this.reset();
                
                // إرسال تأكيد بالبريد
                sendConfirmationEmail(bookingData);
            } catch (error) {
                showNotification('حدث خطأ في الحجز. الرجاء المحاولة مرة أخرى.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'تأكيد الحجز';
            }
        }
    });
});

function initializeDateTimeInputs() {
    const dateInput = document.querySelector('input[type="date"]');
    const timeInput = document.querySelector('input[type="time"]');

    // تعيين الحد الأدنى للتاريخ إلى اليوم
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // تعيين أوقات العمل
    timeInput.min = "09:00";
    timeInput.max = "21:00";
}

function updateBookingForm(type) {
    const serviceSelect = document.querySelector('select[name="service"]');
    
    switch(type) {
        case 'حجز الجولف':
            serviceSelect.innerHTML = `
                <option value="">اختر الخدمة</option>
                <option value="golf_course">ملعب الجولف</option>
                <option value="golf_lesson">درس جولف</option>
                <option value="golf_equipment">تأجير معدات</option>
            `;
            break;
        case 'حجز السبا':
            serviceSelect.innerHTML = `
                <option value="">اختر الخدمة</option>
                <option value="massage">مساج</option>
                <option value="facial">معالجة الوجه</option>
                <option value="body_treatment">معالجة الجسم</option>
            `;
            break;
        case 'حجز المطعم':
            serviceSelect.innerHTML = `
                <option value="">اختر الوقت</option>
                <option value="breakfast">فطور</option>
                <option value="lunch">غداء</option>
                <option value="dinner">عشاء</option>
            `;
            break;
    }
}

function validateBooking(data) {
    if (!data.service) {
        showNotification('الرجاء اختيار الخدمة', 'error');
        return false;
    }

    if (!data.date || !data.time) {
        showNotification('الرجاء اختيار التاريخ والوقت', 'error');
        return false;
    }

    if (!data.name || !data.email || !data.phone) {
        showNotification('الرجاء إكمال جميع البيانات الشخصية', 'error');
        return false;
    }

    return true;
}

function sendConfirmationEmail(bookingData) {
    // يمكن إضافة منطق إرسال البريد هنا
    console.log('Sending confirmation email:', bookingData);
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