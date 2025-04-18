// تفعيل قائمة التنقل المتجاوبة
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
    });
  }

  // إغلاق القائمة عند النقر على أي رابط
  const navLinks = document.querySelectorAll('.navbar-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navbarMenu.classList.remove('active');
    });
  });

  // تفعيل معرض الصور المكبر
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  let currentIndex = 0;
  const images = [];

  // جمع مسارات الصور
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const fullSrc = img.getAttribute('data-full') || img.src;
    images.push({
      src: fullSrc,
      alt: img.alt
    });

    item.addEventListener('click', function() {
      openLightbox(index);
    });
  });

  // فتح معرض الصور المكبر
  function openLightbox(index) {
    if (lightbox && images.length > 0) {
      currentIndex = index;
      updateLightboxImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // تحديث صورة معرض الصور المكبر
  function updateLightboxImage() {
    if (lightboxImg && images[currentIndex]) {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
    }
  }

  // إغلاق معرض الصور المكبر
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // الانتقال للصورة التالية
  if (lightboxNext) {
    lightboxNext.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightboxImage();
    });
  }

  // الانتقال للصورة السابقة
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightboxImage();
    });
  }

  // إغلاق معرض الصور المكبر عند النقر خارج الصورة
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // تفعيل زر تبديل الوضع الليلي/النهاري
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  
  // التحقق من وجود تفضيل مخزن
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        if (themeIcon) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        }
      } else {
        localStorage.setItem('theme', 'light');
        if (themeIcon) {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
      }
    });
  }

  // تفعيل التمرير السلس للروابط الداخلية
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
