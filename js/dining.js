document.addEventListener('DOMContentLoaded', function() {
    // تبديل قوائم الطعام
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = {
        'breakfast': [
            { name: 'فطور عربي', price: '85 ريال', description: 'تشكيلة من المأكولات العربية التقليدية' },
            { name: 'فطور إنجليزي', price: '95 ريال', description: 'بيض، نقانق، فاصوليا، خبز محمص' }
        ],
        'lunch': [
            { name: 'برجر لحم واجيو', price: '120 ريال', description: 'لحم واجيو مع جبنة شيدر وصلصة خاصة' },
            { name: 'سلمون مشوي', price: '140 ريال', description: 'سلمون طازج مع خضروات موسمية' }
        ],
        'dinner': [
            { name: 'ستيك تندرلوين', price: '180 ريال', description: 'لحم بقري مع صلصة الفطر' },
            { name: 'باستا ثمار البحر', price: '150 ريال', description: 'باستا مع تشكيلة من المأكولات البحرية' }
        ]
    };

    function updateMenu(category) {
        const menuContainer = document.querySelector('.menu-items');
        menuContainer.innerHTML = '';
        
        menuItems[category].forEach(item => {
            menuContainer.innerHTML += `
                <div class="menu-item">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <span class="price">${item.price}</span>
                </div>
            `;
        });
    }

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            updateMenu(this.dataset.category);
        });
    });

    // حجز طاولة
    const reservationForm = document.getElementById('reservationForm');
    
    reservationForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // التحقق من التاريخ والوقت
        const date = this.querySelector('[name="date"]').value;
        const time = this.querySelector('[name="time"]').value;
        const guests = this.querySelector('[name="guests"]').value;

        if (isValidReservation(date, time)) {
            showNotification('تم حجز طاولتك بنجاح!', 'success');
            this.reset();
        } else {
            showNotification('عذراً، هذا الوقت غير متاح. الرجاء اختيار وقت آخر.', 'error');
        }
    });
});

function isValidReservation(date, time) {
    // التحقق من توفر الموعد
    return true; // يمكن إضافة منطق التحقق الفعلي هنا
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