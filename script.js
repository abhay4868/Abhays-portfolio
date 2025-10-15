// Floating Dots and Connecting Lines Animation
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.dot');
    const svg = document.querySelector('.connections');
    
    if (dots.length > 0 && svg) {
        // Create connecting lines between nearby dots
        function createConnections() {
            // Clear existing lines
            svg.innerHTML = `
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:rgba(255, 255, 255, 0.4);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:rgba(255, 255, 255, 0.1);stop-opacity:0" />
                    </linearGradient>
                </defs>
            `;
            
            // Calculate connections between dots
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dot1 = dots[i];
                    const dot2 = dots[j];
                    
                    const rect1 = dot1.getBoundingClientRect();
                    const rect2 = dot2.getBoundingClientRect();
                    
                    const x1 = (rect1.left + rect1.width / 2) / window.innerWidth * 100;
                    const y1 = (rect1.top + rect1.height / 2) / window.innerHeight * 100;
                    const x2 = (rect2.left + rect2.width / 2) / window.innerWidth * 100;
                    const y2 = (rect2.top + rect2.height / 2) / window.innerHeight * 100;
                    
                    // Calculate distance
                    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    
                    // Only connect dots that are close enough
                    if (distance < 30) {
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', x1);
                        line.setAttribute('y1', y1);
                        line.setAttribute('x2', x2);
                        line.setAttribute('y2', y2);
                        line.setAttribute('stroke', 'url(#lineGradient)');
                        line.setAttribute('stroke-width', '1');
                        line.setAttribute('stroke-opacity', '0.6');
                        line.style.animation = 'pulseLine 3s ease-in-out infinite';
                        line.style.animationDelay = Math.random() * 3 + 's';
                        
                        svg.appendChild(line);
                    }
                }
            }
        }
        
        // Create initial connections
        createConnections();
        
        // Update connections on window resize
        window.addEventListener('resize', createConnections);
        
        // Update connections periodically for dynamic effect
        setInterval(createConnections, 5000);
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'white';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Simple Project Cards Slide Animation
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    let hasAnimated = false;

    // Set initial state for all project cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(100px)';
        card.style.transition = 'all 0.6s ease';
    });

    // Simple intersection observer for projects section
    const projectsSection = document.querySelector('.projects');
    
    if (projectsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    console.log('Projects section visible - starting slide animation');
                    
                    // Animate cards one by one
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateX(0)';
                            console.log(`Card ${index + 1} animated`);
                        }, index * 200); // 200ms delay between each card
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        observer.observe(projectsSection);
    }

    // Fallback: If intersection observer doesn't work, animate after 3 seconds
    setTimeout(() => {
        if (!hasAnimated) {
            console.log('Fallback: Starting slide animation');
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, index * 200);
            });
        }
    }, 3000);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const firstName = contactForm.querySelector('input[placeholder="First Name"]').value;
        const lastName = contactForm.querySelector('input[placeholder="Last Name"]').value;
        const phone = contactForm.querySelector('input[placeholder="Phone No."]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const productType = contactForm.querySelector('select').value;
        const address = contactForm.querySelector('input[placeholder="Address"]').value;
        const city = contactForm.querySelector('input[placeholder="City"]').value;
        
        // Simple validation
        if (!firstName || !lastName || !phone || !email || !productType || !address || !city) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
            showNotification('Please enter a valid 10-digit phone number', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for your enquiry! I\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
    }
`;
document.head.appendChild(style);

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Add a subtle animation to the hero title
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Parallax effect for hero section - disabled on small screens to avoid off-screen jitter
function handleHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    if (isSmall) {
        hero.style.transform = 'translateY(0)';
        window.removeEventListener('scroll', parallaxScrollHandler);
        return;
    }
    window.addEventListener('scroll', parallaxScrollHandler);
}

function parallaxScrollHandler() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const rate = scrolled * -0.3;
    hero.style.transform = `translateY(${rate}px)`;
}

window.addEventListener('load', handleHeroParallax);
window.addEventListener('resize', handleHeroParallax);

// Service cards hover effect removed to avoid interfering with flip

// Project cards 3D tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Enable touch-activated hover effects for mobile (mirror desktop hover)
function enableTouchHover(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        // Add on touchstart
        el.addEventListener('touchstart', () => {
            // Remove from siblings within same scroller/grid to avoid many active states
            const siblings = el.parentElement ? el.parentElement.querySelectorAll(selector) : [];
            siblings.forEach(s => { if (s !== el) s.classList.remove('touch-active'); });
            el.classList.add('touch-active');
        }, { passive: true });

        // Remove on touchend after a short delay to let animation show
        el.addEventListener('touchend', () => {
            setTimeout(() => el.classList.remove('touch-active'), 180);
        }, { passive: true });

        // Fallback: toggle on click for devices that fire click only
        el.addEventListener('click', () => {
            el.classList.toggle('touch-active');
            setTimeout(() => el.classList.remove('touch-active'), 220);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    enableTouchHover('.service-card');
    enableTouchHover('.project-card');
    enableTouchHover('.cert-card');
    // Enable touch-activated hover for skill items on mobile
    enableTouchHover('.skill-item');
    // Enable touch-activated hover for testimonial cards
    enableTouchHover('.testimonial-card');
    // Enable touch-activated hover for profile cards (about section)
    enableTouchHover('.profile-card');

    // Cursor-follow hover for skill cards (white glow + tilt)
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            // Move white glow pseudo-element via CSS variables
            card.style.setProperty('--glowX', `${x - 70}px`);
            card.style.setProperty('--glowY', `${y - 70}px`);

            // Subtle tilt towards cursor
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 18;
            const rotateY = (centerX - x) / 18;
            card.style.transform = `translateY(-6px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            // Hide glow and reset transform
            card.style.setProperty('--glowX', `-9999px`);
            card.style.setProperty('--glowY', `-9999px`);
            card.style.transform = '';
        });
    });

    // Trigger contact line animations when contact section becomes visible
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Allow animations to run via CSS
                    contactSection.classList.add('contact-animate-start');
                    // Make sure delays are set
                    contactSection.querySelectorAll('.contact-anim-line').forEach(el => {
                        const delayAttr = el.getAttribute('data-delay');
                        if (delayAttr) el.style.setProperty('--delay', delayAttr + 'ms');
                    });
                    contactObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25, rootMargin: '0px 0px -60px 0px' });
        contactObserver.observe(contactSection);
    }

    // Removed projects mobile slider nav

    // Tap/keyboard to flip service cards (scoped to single card, no bubbling)
    document.querySelectorAll('.service-card').forEach(card => {
        const isMobile = window.matchMedia('(hover: none), (max-width: 768px)').matches;
        const toggle = (e) => {
            e.stopPropagation();
            if (isMobile) {
                // On mobile: persistent toggle, and close others
                document.querySelectorAll('.service-card.touch-active').forEach(other => {
                    if (other !== card) other.classList.remove('touch-active');
                });
                card.classList.toggle('touch-active');
            } else {
                // On desktop: temporary toggle
                card.classList.add('touch-active');
                setTimeout(() => card.classList.remove('touch-active'), 1200);
            }
        };
        card.addEventListener('click', toggle);
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle(e);
            }
        });
        // Support touchstart explicitly for faster response
        card.addEventListener('touchstart', (e) => {
            toggle(e);
        }, { passive: true });
    });
});

// Smooth reveal animation for sections
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Staggered reveal for My Skills cards
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    const skillItems = skillsSection.querySelectorAll('.skill-item');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsSection.classList.add('skills-visible');
                // Staggered delays
                skillItems.forEach((item, idx) => {
                    item.style.transitionDelay = `${Math.min(idx * 80, 600)}ms`;
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });

    skillsObserver.observe(skillsSection);
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add a subtle fade-in effect to the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Trigger thank-you confetti when section becomes visible
    const thankSection = document.getElementById('thank-you');
    if (thankSection) {
        const confetti = thankSection.querySelector('.confetti');
        const emojis = thankSection.querySelectorAll('.thank-emoji span');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Restart confetti animation by cloning nodes
                    if (confetti) {
                        confetti.querySelectorAll('span').forEach((p, idx) => {
                            p.style.animation = 'none';
                            // force reflow
                            void p.offsetWidth;
                            p.style.animation = '';
                        });
                    }
                    // Restart emoji animation
                    if (emojis) {
                        emojis.forEach(e => {
                            e.style.animation = 'none';
                            void e.offsetWidth;
                            e.style.animation = '';
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(thankSection);
    }
});

// Console welcome message
console.log(`
🚀 Welcome to Abhay Tiwari's Portfolio!
💻 Built with HTML, CSS, and JavaScript
🎨 Modern, responsive design inspired by Wow Ceramics
📱 Mobile-friendly interface
✨ Interactive animations and effects

Contact: abhay.tiwari@email.com
GitHub: github.com/abhay4868
`);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add smooth scrolling to all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add a subtle pulse animation to the CTA button
const ctaButton = document.querySelector('.nav-cta .btn');
if (ctaButton) {
    setInterval(() => {
        ctaButton.style.transform = 'scale(1.05)';
        setTimeout(() => {
            ctaButton.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
}

// Interactive Snowfall Effect - Simple and Direct
let mouseX = 0;
let mouseY = 0;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Create individual snowflakes that react to cursor
function createInteractiveSnowflakes() {
    // Create 50 individual snowflakes
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: snowfall-individual ${Math.random() * 10 + 5}s linear infinite;
        `;
        
        document.body.appendChild(snowflake);
    }
}

// Create snowfall animation for individual snowflakes
const snowflakeStyle = document.createElement('style');
snowflakeStyle.textContent = `
    @keyframes snowfall-individual {
        0% {
            transform: translateY(-100vh) translateX(0);
        }
        100% {
            transform: translateY(100vh) translateX(0);
        }
    }
`;
document.head.appendChild(snowflakeStyle);

// Initialize snowflakes
createInteractiveSnowflakes();

// Make snowflakes react to cursor
document.addEventListener('mousemove', (e) => {
    const snowflakes = document.querySelectorAll('.snowflake');
    
    snowflakes.forEach(snowflake => {
        const rect = snowflake.getBoundingClientRect();
        const snowflakeX = rect.left + rect.width / 2;
        const snowflakeY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - snowflakeX, 2) + 
            Math.pow(e.clientY - snowflakeY, 2)
        );
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            const angle = Math.atan2(e.clientY - snowflakeY, e.clientX - snowflakeX);
            
            const pushX = Math.cos(angle) * force * 30;
            const pushY = Math.sin(angle) * force * 30;
            
            snowflake.style.transform = `translate(${pushX}px, ${pushY}px)`;
            snowflake.style.transition = 'transform 0.1s ease';
        } else {
            snowflake.style.transform = 'translate(0, 0)';
            snowflake.style.transition = 'transform 0.3s ease';
        }
    });
});

// Also make the global snow layers react
document.addEventListener('mousemove', (e) => {
    const globalSnow = document.querySelector('body::before');
    if (globalSnow) {
        const deltaX = (e.clientX - window.innerWidth / 2) / 20;
        const deltaY = (e.clientY - window.innerHeight / 2) / 20;

        document.body.style.setProperty('--mouse-x', `${deltaX}px`);
        document.body.style.setProperty('--mouse-y', `${deltaY}px`);
    }
});

/* Cursor Tracker - REMOVED */

// Dynamic Text Animation Controller
function initDynamicText() {
    const words = document.querySelectorAll('.dynamic-word');
    let currentIndex = 0;
    
    function showNextWord() {
        // Remove active class from all words
        words.forEach(word => {
            word.classList.remove('active', 'fade-out');
        });
        
        // Add fade-out class to current word
        if (words[currentIndex - 1]) {
            words[currentIndex - 1].classList.add('fade-out');
        }
        
        // Show current word
        if (words[currentIndex]) {
            words[currentIndex].classList.add('active');
        }
        
        // Move to next word
        currentIndex = (currentIndex + 1) % words.length;
    }
    
    // Start the animation
    showNextWord();
    
    // Set interval to change words every 2 seconds
    setInterval(showNextWord, 2000);
}

// Initialize dynamic text when DOM is loaded
document.addEventListener('DOMContentLoaded', initDynamicText);

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    if (!form || !submitBtn || !formStatus) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        formStatus.className = 'form-status loading';
        formStatus.textContent = 'Sending your message...';
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            service: formData.get('service'),
            address: formData.get('address'),
            city: formData.get('city'),
            message: formData.get('message')
        };
        
        try {
            // Using EmailJS service (free and reliable)
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: 'service_portfolio',
                    template_id: 'template_contact',
                    user_id: 'YOUR_USER_ID',
                    template_params: {
                        from_name: `${data.firstName} ${data.lastName}`,
                        from_email: data.email,
                        phone: data.phone,
                        service: data.service,
                        address: data.address,
                        city: data.city,
                        message: data.message,
                        to_email: 'abhu9513@gmail.com'
                    }
                })
            });
            
            if (response.ok) {
                // Success
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                form.reset();
            } else {
                throw new Error('Failed to send email');
            }
            
        } catch (error) {
            // Error - fallback to mailto
            const subject = `New Contact Form Submission from ${data.firstName} ${data.lastName}`;
            const body = `
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}
Address: ${data.address}
City: ${data.city}
Message: ${data.message}
            `.trim();
            
            const mailtoLink = `mailto:abhu9513@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoLink);
            
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Opening your email client to send the message...';
            form.reset();
        }
        
        // Reset button
        submitBtn.textContent = 'Submit Form';
        submitBtn.disabled = false;
    });
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', initContactForm);

// Add CSS for interactive snow animation
const interactiveSnowStyle = document.createElement('style');
interactiveSnowStyle.textContent = `
    @keyframes snowfall-interactive {
        0% {
            transform: translateY(-100vh) translateX(0);
        }
        100% {
            transform: translateY(100vh) translateX(0);
        }
    }
    
    .interactive-snow {
        animation: snowfall-interactive 7s linear infinite;
    }
    
    /* Hover effects for sections */
    section:hover::before {
        transform: translateX(5px) translateY(3px) !important;
        transition: transform 0.2s ease;
    }
    
    .hero:hover::before,
    .hero:hover::after {
        transform: translateX(8px) translateY(5px) !important;
        transition: transform 0.2s ease;
    }
`;
document.head.appendChild(interactiveSnowStyle);