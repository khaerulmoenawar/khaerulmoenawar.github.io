document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorText = document.querySelector('.cursor-text');
    
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    let isHovering = false;

    // Cursor movement
    function moveCursor(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    // Smooth cursor animation
    function animateCursor() {
        posX += (mouseX - posX) / 6;
        posY += (mouseY - posY) / 6;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        
        cursorFollower.style.left = `${posX}px`;
        cursorFollower.style.top = `${posY}px`;

        if (isHovering) {
            cursorText.style.left = `${mouseX + 30}px`;
            cursorText.style.top = `${mouseY + 30}px`;
        }

        requestAnimationFrame(animateCursor);
    }

    // Initialize cursor
    document.addEventListener('mousemove', moveCursor);
    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('[data-cursor-hover]');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
            
            if (el.dataset.cursorText) {
                cursorText.textContent = el.dataset.cursorText;
                cursorText.style.opacity = '1';
                isHovering = true;
            }
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
            cursorText.style.opacity = '0';
            isHovering = false;
        });
    });

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;
            
            // Using Formspree for form submission
            fetch('https://formsubmit.co/khaerulramdani29@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    submitButton.innerHTML = 'Message sent!';
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                // Show error message
                submitButton.innerHTML = 'Error sending';
                console.error('Error:', error);
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                }, 3000);
            });
        });
    }

    // Animate elements when scrolling
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section');
        
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
    document.querySelectorAll('.section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Hero text animation
    const heroLines = document.querySelectorAll('.hero-title .line');
    
    heroLines.forEach((line, index) => {
        line.style.transform = 'translateY(100%)';
        line.style.transition = `transform 0.8s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            line.style.transform = 'translateY(0)';
        }, 500);
    });
});
