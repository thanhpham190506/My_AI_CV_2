const snowContainer = document.querySelector('.snow');
const snowCount = 80;

for (let i = 0; i < snowCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    const size = Math.random() * 3 + 2;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.opacity = `${Math.random() * 0.7 + 0.3}`;
    snowflake.style.animationDuration = `${Math.random() * 10 + 8}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    snowflake.style.filter = `blur(${Math.random() * 0.7}px)`;
    snowContainer.appendChild(snowflake);
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    document.querySelectorAll('.parallax-bg').forEach((bg, index) => {
        const speed = 0.15 + index * 0.05;
        bg.style.transform = `translateY(${scrolled * -speed}px)`;
    });

    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const windowCenterY = window.innerHeight / 2;
        const distance = centerY - windowCenterY;
        const rotateX = distance * 0.008;
        section.style.transform = `perspective(1400px) rotateX(${rotateX}deg)`;
    });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 3D Hover Effects for Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * 16;
        const rotateY = ((x - rect.width / 2) / rect.width) * -16;
        card.style.transform = `translateY(-14px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
    });
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-fill');
            fill.style.width = fill.style.getPropertyValue('--fill');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-tier').forEach(skill => skillObserver.observe(skill));

const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Cảm ơn bạn đã liên hệ!');
    });
}
