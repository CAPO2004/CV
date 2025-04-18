// تفعيل القائمة المتجاوبة
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// إغلاق القائمة عند النقر على أي رابط
document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
    });
});

// تفعيل التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// تفعيل تأثير ظهور الأقسام عند التمرير
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// تفعيل معرض الصور المكبر
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxPrev = document.querySelector('.lightbox-prev');
let currentIndex = 0;

// فتح معرض الصور المكبر
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const fullImgSrc = item.querySelector('img').getAttribute('data-full');
        lightboxImg.setAttribute('src', fullImgSrc);
        currentIndex = index;
        lightbox.classList.add('active');
    });
});

// إغلاق معرض الصور المكبر
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// التنقل بين الصور
lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const fullImgSrc = galleryItems[currentIndex].querySelector('img').getAttribute('data-full');
    lightboxImg.setAttribute('src', fullImgSrc);
});

lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const fullImgSrc = galleryItems[currentIndex].querySelector('img').getAttribute('data-full');
    lightboxImg.setAttribute('src', fullImgSrc);
});

// إغلاق معرض الصور المكبر عند النقر خارج الصورة
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// تفعيل زر تبديل الوضع الليلي/النهاري
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

// التحقق من وجود تفضيل مخزن
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// تفعيل تأثير التمرير للقائمة
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // تحديث الرابط النشط في القائمة
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
});

// منع تسجيل العنصر المخصص footer-btn
customElements.define = (function(originalDefine) {
    return function(name, constructor, options) {
        if (name === 'footer-btn' || name.includes('manus')) {
            console.log('Blocked registration of:', name);
            return;
        }
        return originalDefine.call(this, name, constructor, options);
    };
})(customElements.define);

// إزالة أي عناصر footer-btn موجودة
function removeUnwantedElements() {
    const elementsToRemove = document.querySelectorAll('footer-btn, .manus-badge, [class*="manus"]');
    elementsToRemove.forEach(el => el.remove());
    
    // إزالة أي سكريبت يحتوي على footer-btn
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (script.textContent && (
            script.textContent.includes('footer-btn') || 
            script.textContent.includes('manus') ||
            script.textContent.includes('FooterBtn')
        )) {
            script.remove();
        }
    });
}

// تنفيذ الدالة عند تحميل الصفحة وبشكل دوري
document.addEventListener('DOMContentLoaded', removeUnwantedElements);
window.addEventListener('load', removeUnwantedElements);
setInterval(removeUnwantedElements, 1000); // تنفيذ كل ثانية للتأكد من عدم إضافة العناصر لاحقاً
