window.addEventListener('scroll', function () {
    const scrollPosition = window.pageYOffset;
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        // Create parallax effect by moving the background slower than scroll speed
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    }
});
function animateCounter() {
    const counterElements = document.querySelectorAll('.stat-number');

    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);

            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    });
}

// Initialize counter animation when stats section comes into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// 3. Interactive Project Showcase - Hover for more info
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    const overlay = card.querySelector('.project-overlay');

    // Adjust overlay transition for smoother effect
    if (overlay) {
        overlay.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    // Create a 3D tilt effect on hover
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) - 0.5;
        const y = ((e.clientY - rect.top) / rect.height) - 0.5;

        this.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    });
});
function createParticleCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: '#1d3557',
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });
    }

    animate();

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

createParticleCanvas();

document.addEventListener('DOMContentLoaded', function () {
    // Initialize animations
    initAnimations();

    window.addEventListener('scroll', function () {
        initAnimations();
    });

    function initAnimations() {
        const animatedElements = document.querySelectorAll('.animate:not(.animated)');

        animatedElements.forEach(function (element) {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }

    // Add animation classes to elements
    function setupAnimations() {
        // Projects animation with alternating direction
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            if (index % 2 === 0) {
                card.classList.add('animate', 'fadeInLeft', `delay-${(index % 6) + 1}`);
            } else {
                card.classList.add('animate', 'fadeInRight', `delay-${(index % 6) + 1}`);
            }
        });

        // Team members zoom in
        const teamCards = document.querySelectorAll('#team .service-card');
        teamCards.forEach((card, index) => {
            card.classList.add('animate', 'zoomIn', `delay-${index + 1}`);
        });

        // Service cards fade up
        const serviceCards = document.querySelectorAll('#services .service-card');
        serviceCards.forEach((card, index) => {
            card.classList.add('animate', 'fadeInUp', `delay-${index + 1}`);
        });

        // Section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((title) => {
            title.classList.add('animate', 'fadeInUp');
        });

        // About content
        const aboutImage = document.querySelector('.about-image');
        const aboutText = document.querySelector('.about-text');
        if (aboutImage) aboutImage.classList.add('animate', 'fadeInLeft');
        if (aboutText) aboutText.classList.add('animate', 'fadeInRight');

        // Contact items staggered animation
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.classList.add('animate', 'fadeInLeft', `delay-${index + 1}`);
        });

        // Form fields staggered animation
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.classList.add('animate', 'fadeInRight', `delay-${index + 1}`);
        });
    }

    // Call setup animations
    setupAnimations();

    // Add hover effects to project cards with dynamic shadows
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Add dynamic background movement to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function (e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

            const heroSlider = document.querySelector('.hero-slider');
            if (heroSlider) {
                heroSlider.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    }

    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.animation = 'pulse 1s infinite';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.animation = '';
        });
    });
});

// Add this keyframe for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
        box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.4);
        }
        70% {
        box-shadow: 0 0 0 10px rgba(230, 57, 70, 0);
        }
        100% {
        box-shadow: 0 0 0 0 rgba(230, 57, 70, 0);
        }
    }
    `;
document.head.appendChild(style);

// Navigation menu toggle for mobile
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');


    mobileMenu.addEventListener('click', function () {
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    // Hero Slider
    const sliderItems = document.querySelectorAll('.slider-item');
    let currentSlide = 0;

    function nextSlide() {
        sliderItems[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % sliderItems.length;
        sliderItems[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Project Filtering
    document.querySelectorAll('.projects').forEach(section => {
        const filterBtns = section.querySelectorAll('.filter-btn');
        const projectCards = section.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all buttons in this section
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    });

    // Project Modal
    const modal = document.getElementById('projectModal');
    const body = document.body;

    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');

    function toggleBodyScroll(disable) {
        if (disable) {
            // Save the current scroll position
            const scrollY = window.scrollY;

            // Add styles to body to prevent scrolling while keeping position
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}px`;
            body.style.width = '100%';
            body.style.overflowY = 'scroll'; // Prevents layout shift
        } else {
            // Restore body scrolling and position
            const scrollY = parseInt(body.style.top || '0', 10) * -1;
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.overflowY = '';

            // Scroll back to original position
            window.scrollTo(0, scrollY);
        }
    }

 

    // Open modal on project click
    projectCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('h3').textContent;
            const location = this.querySelector('p').textContent;
            const img = this.querySelector('img').src;

            // Populate modal content with new structure
            modalContent.innerHTML = `
            <div class="modal-image-container">
                <img src="${img}" alt="${title}">
            </div>
            <div class="modal-text-content">
                <h2>${title}</h2>
                <p><strong>Location:</strong> ${location}</p>
                <p>This is a detailed description of the project. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div style="margin-top: 20px;">
                    <h3>Project Details</h3>
                    <ul style="list-style-type: disc; margin-left: 20px;">
                        <li><strong>Project Type:</strong> ${title.includes('Home') ? 'Residential' : 'Commercial'}</li>
                        <li><strong>Area:</strong> 350 sq. meters</li>
                        <li><strong>Completion:</strong> January 2025</li>
                        <li><strong>Client:</strong> ${title.includes('Home') ? 'Private Client' : 'Corporate Client'}</li>
                    </ul>
                </div>
                <a href="#contact" class="btn" style="margin-top: 20px;">Inquire About This Project</a>
            </div>
        `;

            // Show modal
            modal.classList.add('active');
            toggleBodyScroll(true);
        });
    });

    // Don't forget to handle closing the modal
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            modal.classList.remove('active');
            toggleBodyScroll(false);
        });
    }

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.classList.remove('active');
            toggleBodyScroll(false);
        }
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Basic validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // If all validations pass, show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            navMenu.style.display = '';

            // Scroll to section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active navigation item based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});
