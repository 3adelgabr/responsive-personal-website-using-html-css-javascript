document.addEventListener('DOMContentLoaded', () => {
    // عناصر قائمة التنقل والرموز
    let menuIcon = document.querySelector('#menu-icon');
    let closeIcon = document.querySelector('#close-icon');
    let navbar = document.querySelector('.navbar');

    // مؤشر الفأرة المخصص
    var cursor = document.getElementById('cursor');
    var socialMediaLinks = document.querySelectorAll('.home-content a, .contact a');
    
    // إخفاء وإظهار المؤشر عند التمرير على روابط وسائل التواصل الاجتماعي
    function hideCursor() {
        cursor.classList.add('hidden');
    }
    
    function showCursor() {
        cursor.classList.remove('hidden');
    }
    
    // تطبيق الإجراء على جميع الروابط
    socialMediaLinks.forEach(function(link) {
        link.addEventListener('mouseover', hideCursor);
        link.addEventListener('mouseout', showCursor);
    });
    

    // تحديث موقع المؤشر المخصص
    document.addEventListener('mousemove', function(e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
    });

    // عرض وإخفاء القائمة عند النقر على الرموز
    closeIcon.style.display = 'none';
    menuIcon.onclick = () => {
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        navbar.classList.add('active');
    };

    closeIcon.onclick = () => {
        closeIcon.style.display = 'none';
        menuIcon.style.display = 'block';
        navbar.classList.remove('active');
    };

    /*==== تفعيل رابط القسم أثناء التمرير ====*/
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        let top = window.scrollY;

        sections.forEach(sec => {
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });

        let header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 100);
    };

    /*==== تفعيل مكتبة ScrollReveal ====*/
    ScrollReveal({
        reset: true,
        distance: '80px',
        duration: 1200,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading, .blog-post', {origin: 'top'});
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form, .portfolio-filters', {origin: 'top'});
    ScrollReveal().reveal('.home-content h1, .about-img', {origin: 'left'});
    ScrollReveal().reveal('.home-content p, .about-content, .social-media', {origin: 'right'});

    /*==== تفعيل مكتبة Typed.js ====*/
  /*  const typed = new Typed('.multiple-text', {
        strings: [' UX/UI Product Designer', ' Frontend Developer', ' Educational Content Creator', ' Instructor UI/UX'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    }); */
    

    /*==== تأثير العين ====*/
    function follow(event) {
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(function(eye) {
            let rect = eye.getBoundingClientRect();
            let x = rect.left + (rect.width / 2);
            let y = rect.top + (rect.height / 2);
            let radian = Math.atan2(event.clientY - y, event.clientX - x);
            let rotation = (radian * (180 / Math.PI)) + 180;
            eye.style.transform = "rotate(" + rotation + "deg)";
        });
    }

    document.querySelector('body').addEventListener('mousemove', follow);

    /*==== تأثير الموجة عند النقر ====*/
    document.addEventListener('click', function(e) {
        var ripple = document.createElement('span');
        ripple.classList.add('ripple');
        document.body.appendChild(ripple);

        var x = e.clientX;
        var y = e.clientY;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        ripple.addEventListener('animationend', function() {
            ripple.remove();
        });

        var clickSound = new Audio('click.mp3');
        clickSound.play();
    });

    /*==== تأثير العيون مع النافذة المنبثقة ====*/
    var eyes = document.querySelectorAll('.eye');
    var popup = document.getElementById('customAlert');
    var sound = document.getElementById('warning-sound');

    function showPopup() {
        popup.classList.add('show');
        sound.play();
    }

    function hidePopup() {
        popup.classList.remove('show');
    }

    eyes.forEach(function(eye) {
        eye.addEventListener('mouseover', function() {
            showPopup();
        });
        eye.addEventListener('mouseleave', function() {
            hidePopup();
        });
    });

    document.addEventListener('click', function(event) {
        if (!popup.contains(event.target) && !Array.from(eyes).some(eye => eye.contains(event.target))) {
            hidePopup();
        }
    });

    /*==== شريط التمرير ====*/
    const filled = document.querySelector('.filled');

    function update() {
        filled.style.width = `${((window.scrollY) / (document.body.scrollHeight - window.innerHeight) * 100)}%`;
        requestAnimationFrame(update);
    }
    update();

    /*==== صوت الكتابة في نموذج الاتصال ====*/
    const typingSound = document.getElementById('typing-sound');
    const contactFormInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

    let typingTimeout;

    function playTypingSound() {
        if (typingSound.paused) {
            typingSound.currentTime = 0;
            typingSound.play();
        }

        clearTimeout(typingTimeout);

        typingTimeout = setTimeout(() => {
            typingSound.pause();
            typingSound.currentTime = 0;
        }, 300);
    }

    contactFormInputs.forEach(input => {
        input.addEventListener('input', playTypingSound);
    });
});

/*==== حدث الضغط على زر تحميل السيرة الذاتية ====*/
document.querySelector('.btncv').addEventListener('click', function() {
    var fileUrl = 'https://drive.google.com/file/d/1R6uxhmY9OkFFUJoa_6U4kTmwRXPT9-y3/view?usp=sharing';
    var link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'cv.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.addEventListener("scroll", function() {
    const topUpButton = document.getElementById("top-up");
    const secondSection = document.querySelector(".about"); // تأكد من استخدام الكلاس أو الـID الصحيح للقسم الثاني
    
    if (window.scrollY >= secondSection.offsetTop) {
        topUpButton.classList.add("show");
    } else {
        topUpButton.classList.remove("show");
    }
});

document.getElementById("top-up").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


const quantity = 20;
const container = document.getElementById('fireflies-container');

for (let i = 0; i < quantity; i++) {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');

    // Randomize position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    firefly.style.left = `${x}px`;
    firefly.style.top = `${y}px`;

    // Randomize animation duration
    const duration = Math.random() * 4 + 4; // between 2s and 5s
    firefly.style.animationDuration = `${duration}s`;

    container.appendChild(firefly);
}



// Email