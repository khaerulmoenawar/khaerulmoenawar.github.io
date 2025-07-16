// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Sticky Navigation on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would normally send the form data to a server
        // For this example, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animate elements when scrolling
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about, .projects, .contact');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.about, .projects, .contact').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
// Trigger once on page load
animateOnScroll();