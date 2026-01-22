// ============================================
// EDITORIAL PORTFOLIO - JAVASCRIPT
// Smooth animations and interactions
// ============================================

// ============================================
// PRELOADER
// ============================================
(function() {
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('counter');
    const body = document.body;
    
    if (!preloader || !counter) return;
    
    // Block scrolling
    body.classList.add('preloader-active');
    
    let currentProgress = 0;
    let targetProgress = 0;
    let animationFrameId = null;
    let fontsLoaded = false;
    const startTime = Date.now();
    
    // Check font loading
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            fontsLoaded = true;
        });
    }
    
    // Simulate loading progress
    function updateProgress() {
        // Check if images are loaded
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;
        
        images.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                }, { once: true });
            }
        });
        
        // Simulate progress based on time and resources
        const elapsed = Date.now() - startTime;
        const timeProgress = Math.min(50, elapsed / 15); // 50% from time (faster)
        const resourceProgress = totalImages > 0 ? (loadedImages / totalImages) * 40 : 40; // 40% from images
        const fontProgress = fontsLoaded ? 10 : 0; // 10% from fonts
        
        targetProgress = Math.min(100, timeProgress + resourceProgress + fontProgress);
        
        // Start animation if not already running
        if (!animationFrameId) {
            animateCounter();
        }
    }
    
    function animateCounter() {
        if (currentProgress < targetProgress) {
            const diff = targetProgress - currentProgress;
            currentProgress += Math.max(1, diff * 0.25); // Faster increment
            currentProgress = Math.min(currentProgress, targetProgress);
            counter.textContent = Math.floor(currentProgress);
            
            animationFrameId = requestAnimationFrame(() => {
                animationFrameId = null;
                animateCounter();
            });
        } else if (targetProgress >= 100 && currentProgress >= 100) {
            checkComplete();
        }
    }
    
    function checkComplete() {
        counter.textContent = '100';
        animationFrameId = null;
        
        // Hold at 100% for 300ms
        setTimeout(() => {
            // Fade out and slide up
            preloader.classList.add('hide');
            
            // Remove from DOM after animation
            setTimeout(() => {
                preloader.style.display = 'none';
                body.classList.remove('preloader-active');
                
                // Trigger main site animations
                window.dispatchEvent(new Event('preloaderComplete'));
            }, 600);
        }, 300);
    }
    
    // Start progress simulation immediately
    updateProgress();
    
    // Update progress periodically (faster updates)
    const progressInterval = setInterval(() => {
        updateProgress();
        if (currentProgress >= 100 && targetProgress >= 100) {
            clearInterval(progressInterval);
        }
    }, 30);
    
    // Fallback: ensure we reach 100% even if resources load slowly (faster timeout)
    setTimeout(() => {
        targetProgress = 100;
        if (!animationFrameId) {
            animateCounter();
        }
    }, 1200);
})();

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(253, 251, 247, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.background = 'rgba(253, 251, 247, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// ============================================
// SCROLL REVEAL ANIMATIONS (Intersection Observer)
// ============================================
const revealObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on index
            const delay = index * 100; // 100ms stagger
            setTimeout(() => {
                entry.target.classList.add('revealed');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

// Observe all main sections
document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(section);
});

// Observe project items with staggered delays
document.querySelectorAll('.project-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
    
    const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    projectObserver.observe(item);
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s`;
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate subtitle
                const subtitle = document.querySelector('.skills-subtitle');
                if (subtitle && !subtitle.classList.contains('animate')) {
                    subtitle.classList.add('animate');
                }
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillObserver.observe(category);
});

// Observe section headings
document.querySelectorAll('.section-heading').forEach((heading) => {
    // Split heading into words
    const text = heading.textContent;
    const words = text.split(' ');
    heading.innerHTML = words.map((word, index) => {
        let extraClass = '';
        if (word === 'ME') {
            extraClass = ' about-me-large';
        } else if (word === 'I' || word === 'MADE') {
            extraClass = ' projects-i-made';
        }
        return `<span class="word${extraClass}" style="transition-delay: ${index * 0.1}s">${word}</span>`;
    }).join(' ');
    
    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                headingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    headingObserver.observe(heading);
});

// Observe contact section
const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                const contactInfo = entry.target.querySelector('.contact-info');
                const contactHeadline = entry.target.querySelector('.contact-headline');
                
                if (contactInfo) {
                    contactInfo.classList.add('animate');
                }
                if (contactHeadline) {
                    contactHeadline.classList.add('animate');
                    // Initialize random letter animations
                    initRandomLetterAnimations(contactHeadline);
                }
                
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    contactObserver.observe(contactSection);
}

// ============================================
// RANDOM LETTER ANIMATIONS FOR CONTACT HEADLINE
// ============================================
function initRandomLetterAnimations(headline) {
    const word1Letters = Array.from(headline.querySelectorAll('.letter.word1'));
    const word2Letters = Array.from(headline.querySelectorAll('.letter.word2'));
    const word3Letters = Array.from(headline.querySelectorAll('.letter.word3'));
    
    // Function to get random letter from array
    function getRandomLetter(letters) {
        return letters[Math.floor(Math.random() * letters.length)];
    }
    
    // Create rounds - one letter from each word per round
    const rounds = 10; // Number of animation rounds
    const animationDuration = 0.5; // Animation duration in seconds (faster)
    const breakDuration = 3; // Break between rounds in seconds
    const roundDuration = animationDuration + breakDuration; // Total time per round
    
    for (let round = 0; round < rounds; round++) {
        const delay = round * roundDuration;
        
        // Get random letters from each word for this round
        const letter1 = getRandomLetter(word1Letters);
        const letter2 = getRandomLetter(word2Letters);
        const letter3 = getRandomLetter(word3Letters);
        
        // Set animation delay and ensure animation is enabled for this round
        if (letter1) {
            letter1.style.animation = 'slideOutIn 3.5s ease-in-out';
            letter1.style.animationDelay = `${delay}s`;
        }
        if (letter2) {
            letter2.style.animation = 'slideOutIn 3.5s ease-in-out';
            letter2.style.animationDelay = `${delay}s`;
        }
        if (letter3) {
            letter3.style.animation = 'slideOutIn 3.5s ease-in-out';
            letter3.style.animationDelay = `${delay}s`;
        }
    }
}

// Observe about text
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    aboutObserver.observe(aboutText);
}

// Observe about image
const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    imageObserver.observe(aboutImage);
}

// ============================================
// HERO ANIMATIONS ON LOAD
// ============================================
function startHeroAnimations() {
    const heroName = document.querySelector('.hero-name');
    const heroRole = document.querySelector('.hero-role');
    const heroIntro = document.querySelector('.hero-intro');
    const heroLinks = document.querySelector('.hero-links');
    const coffeeMug = document.querySelector('.coffee-mug-container');
    
    setTimeout(() => {
        if (heroName) heroName.classList.add('animate');
    }, 100);

    setTimeout(() => {
        if (heroRole) heroRole.classList.add('animate');
    }, 300);
    
    setTimeout(() => {
        if (heroIntro) heroIntro.classList.add('animate');
    }, 500);
    
    setTimeout(() => {
        if (heroLinks) heroLinks.classList.add('animate');
    }, 700);
    
    setTimeout(() => {
        if (coffeeMug) {
            coffeeMug.style.opacity = '0';
            coffeeMug.style.transform = 'translateX(30px) scale(0.9)';
            coffeeMug.style.transition = 'opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s';
            coffeeMug.style.opacity = '1';
            coffeeMug.style.transform = 'translateX(0) scale(1)';
        }
    }, 900);
}

// Start hero animations after preloader completes
window.addEventListener('preloaderComplete', startHeroAnimations);

// Fallback: if preloader doesn't run, start animations on load
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader || preloader.style.display === 'none') {
        startHeroAnimations();
    }
});

// ============================================
// HOVER INTERACTIONS
// ============================================

// Buttons & Links - Scale up and color shift
document.querySelectorAll('.btn-submit, .hero-link, .contact-link, .social-link').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.03) translateY(-2px)';
        this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Project thumbnails - Zoom effect
document.querySelectorAll('.project-image img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08)';
        this.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Skill list items - Scale up
document.querySelectorAll('.skill-list li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
        this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ============================================
// ANIMATED UNDERLINES ON TEXT LINKS
// ============================================
document.querySelectorAll('a:not(.nav-logo)').forEach(link => {
    // Create underline element
    const underline = document.createElement('span');
    underline.className = 'link-underline';
    underline.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: currentColor;
        transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    
    // Make link position relative
    link.style.position = 'relative';
    link.style.display = 'inline-block';
    
    // Add underline
    link.appendChild(underline);
    
    link.addEventListener('mouseenter', function() {
        underline.style.width = '100%';
    });
    
    link.addEventListener('mouseleave', function() {
        underline.style.width = '0';
    });
});

// ============================================
// CUSTOM CURSOR (Micro-interaction)
// ============================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.innerHTML = `
    <div class="smiley-face">
        <div class="smiley-eyes">
            <div class="eye left-eye"></div>
            <div class="eye right-eye"></div>
        </div>
        <div class="smiley-mouth"></div>
    </div>
`;
cursor.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.3s ease, opacity 0.3s ease;
    display: none;
    opacity: 1;
`;
document.body.appendChild(cursor);

// Show cursor on desktop only
if (window.matchMedia('(pointer: fine)').matches) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });
    
    // Hide cursor when mouse leaves the viewport
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Also hide when mouse goes outside document bounds
    document.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget && !e.toElement) {
            cursor.style.opacity = '0';
        }
    });
    
    // Show cursor when mouse enters the document
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    // Interactive elements - enlarge cursor
    const interactiveElements = document.querySelectorAll('a, button, .project-image, .skill-list li, .btn-submit');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        formStatus.className = 'form-status';
        formStatus.textContent = '';
        formStatus.style.display = 'none';
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message')
        };
        
        // Validate
        if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.service || !data.message) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Please fill in all fields.';
            formStatus.style.display = 'block';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Please enter a valid email address.';
            formStatus.style.display = 'block';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Simulate form submission
        setTimeout(() => {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been sent. I\'ll get back to you soon.';
            formStatus.style.display = 'block';
            contactForm.reset();
            submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        }, 1500);
    });
}

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// ============================================
// SMOOTH PAGE LOAD
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log(`
✨ Abhay Tiwari — Portfolio
Built with HTML, CSS, and JavaScript
Editorial design with smooth animations
`);
