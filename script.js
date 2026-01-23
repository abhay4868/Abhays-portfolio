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

// Observe project items: slide-in images when scrolling down from skills into projects
document.querySelectorAll('.project-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`;
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('slide-in');
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    
    projectObserver.observe(item);
});

// E-Commerce Platform title: fade + slide up once on scroll into view
const ecommerceTitle = document.querySelector('.project-title--scroll-reveal');
if (ecommerceTitle) {
    const titleRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                titleRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
    titleRevealObserver.observe(ecommerceTitle);
}

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

// ============================================
// SKILLS "WHAT I HAVE" SPREAD / GATHER DURING SCROLL
// ============================================
(function() {
    const subtitle = document.getElementById('skillsSubtitle');
    const skillsSection = document.getElementById('skills');
    if (!subtitle || !skillsSection) return;

    const letters = subtitle.querySelectorAll('.subtitle-letter:not([data-space])');
    const spaces = subtitle.querySelectorAll('.subtitle-letter[data-space]');
    const totalLetters = letters.length;
    const spreadDistance = 200;
    let ticking = false;

    // Precompute spread transforms: each letter moves in a different direction (fan out)
    const spreadTransforms = [];
    for (let i = 0; i < totalLetters; i++) {
        const angle = (i / Math.max(1, totalLetters - 1)) * Math.PI * 1.8 - Math.PI * 0.9;
        spreadTransforms.push({
            x: Math.cos(angle) * spreadDistance,
            y: Math.sin(angle) * spreadDistance
        });
    }

    function easeProgress(t) {
        return t * t * (3 - 2 * t);
    }

    function updateLetters(progress) {
        const p = easeProgress(progress);
        letters.forEach((el, i) => {
            const t = spreadTransforms[i];
            if (t) {
                const x = t.x * p;
                const y = t.y * p;
                el.style.transform = `translate(${x}px, ${y}px)`;
            }
            el.style.opacity = String(1 - p);
        });
        spaces.forEach((el) => {
            el.style.opacity = String(1 - p);
        });
    }

    function onScroll() {
        const top = subtitle.getBoundingClientRect().top;
        const h = window.innerHeight;

        // Zone: subtitle moves from ~35% viewport height down to just above viewport (-80px)
        // While scrolling down through this zone, progress 0 → 1 (spread + fade)
        // While scrolling up, progress 1 → 0 (gather + appear)
        const topStart = h * 0.35;
        const topEnd = -80;
        let progress = (topStart - top) / (topStart - topEnd);
        progress = Math.max(0, Math.min(1, progress));

        updateLetters(progress);

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('load', onScroll);
    window.addEventListener('resize', onScroll);
    onScroll();
})();

// Observe section headings
document.querySelectorAll('.section-heading').forEach((heading) => {
    if (heading.id === 'projects-heading') {
        const projectHeadingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('animate');
            });
        }, { threshold: 0.3 });
        projectHeadingObserver.observe(heading);
        return;
    }
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
    let animationInitialized = false;
    
    function initializeContactAnimations() {
        if (animationInitialized) return;
        
        const contactInfo = contactSection.querySelector('.contact-info');
        const contactHeadline = contactSection.querySelector('.contact-headline');
        
        if (contactInfo) {
            contactInfo.classList.add('animate');
        }
        if (contactHeadline) {
            contactHeadline.classList.add('animate');
            // Initialize random letter animations
            initRandomLetterAnimations(contactHeadline);
            animationInitialized = true;
        }
    }
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeContactAnimations();
            }
        });
    }, { threshold: 0.2 });
    
    contactObserver.observe(contactSection);
    
    // Initialize immediately if section is already visible on load
    setTimeout(() => {
        if (contactSection.getBoundingClientRect().top < window.innerHeight * 1.5) {
            initializeContactAnimations();
        }
    }, 100);
    
    // Also initialize on page load after a short delay to ensure DOM is ready
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!animationInitialized && contactSection.getBoundingClientRect().top < window.innerHeight * 1.5) {
                initializeContactAnimations();
            }
        }, 500);
    });
}

// ============================================
// RANDOM LETTER ANIMATIONS FOR CONTACT HEADLINE
// ============================================
function initRandomLetterAnimations(headline) {
    // Clear any existing animations first
    const allLetters = Array.from(headline.querySelectorAll('.letter'));
    allLetters.forEach(letter => {
        letter.style.animation = 'none';
        letter.style.animationDelay = '0s';
    });
    
    // Force reflow to reset
    void headline.offsetHeight;
    
    const word1Letters = Array.from(headline.querySelectorAll('.letter.word1'));
    const word2Letters = Array.from(headline.querySelectorAll('.letter.word2'));
    const word3Letters = Array.from(headline.querySelectorAll('.letter.word3'));
    
    // Function to get random letter from array
    function getRandomLetter(letters) {
        return letters[Math.floor(Math.random() * letters.length)];
    }
    
    // Create rounds - one letter from each word per round
    const rounds = 10; // Number of animation rounds
    const roundDuration = 3.5; // Total time per round (0.5s animation + 3s break)
    
    for (let round = 0; round < rounds; round++) {
        const delay = round * roundDuration;
        
        // Get random letters from each word for this round
        const letter1 = getRandomLetter(word1Letters);
        const letter2 = getRandomLetter(word2Letters);
        const letter3 = getRandomLetter(word3Letters);
        
        // Set animation with infinite loop - each animation is 3.5s (one round), delayed by round * 3.5s
        // This creates a continuous loop where each round repeats
        if (letter1) {
            letter1.style.animation = `slideOutIn 3.5s ease-in-out ${delay}s infinite`;
        }
        if (letter2) {
            letter2.style.animation = `slideOutIn 3.5s ease-in-out ${delay}s infinite`;
        }
        if (letter3) {
            letter3.style.animation = `slideOutIn 3.5s ease-in-out ${delay}s infinite`;
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

// Observe about images (all three overlap; when first is in view, reveal all)
const aboutImages = document.querySelector('.about-images');
const aboutImageEls = document.querySelectorAll('.about-image');
if (aboutImages && aboutImageEls.length) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutImageEls.forEach((el) => el.classList.add('animate'));
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    imageObserver.observe(aboutImages);
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

// Show cursor on all devices (desktop and mobile)
let isHoveringHeadline = false;
let isTouching = false;

// Function to update cursor position
function updateCursorPosition(x, y) {
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    if (!isHoveringHeadline) {
        cursor.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    }
    cursor.style.opacity = '1';
}

cursor.style.display = 'block';

// Mouse events (desktop)
document.addEventListener('mousemove', (e) => {
    if (!isTouching) {
        updateCursorPosition(e.clientX, e.clientY);
    }
});

// Touch events (mobile)
document.addEventListener('touchstart', (e) => {
    isTouching = true;
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateCursorPosition(touch.clientX, touch.clientY);
    }
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateCursorPosition(touch.clientX, touch.clientY);
    }
}, { passive: true });

document.addEventListener('touchend', () => {
    isTouching = false;
    // Keep cursor visible briefly after touch ends
    setTimeout(() => {
        if (!isTouching) {
            cursor.style.opacity = '0.5';
        }
    }, 300);
}, { passive: true });

// Hide cursor when mouse leaves the viewport
document.addEventListener('mouseleave', () => {
    if (!isTouching) {
        cursor.style.opacity = '0';
    }
});

// Also hide when mouse goes outside document bounds
document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && !e.toElement && !isTouching) {
        cursor.style.opacity = '0';
    }
});

// Show cursor when mouse enters the document
document.addEventListener('mouseenter', () => {
    if (!isTouching) {
        cursor.style.opacity = '1';
    }
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
    
    // Touch events for mobile
    el.addEventListener('touchstart', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }, { passive: true });
    
    el.addEventListener('touchend', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }, { passive: true });
});
    
    // Change cursor to smiley face emoji when hovering/touching over "FEEL LIKE COLLABORATING"
    setTimeout(() => {
        const contactHeadline = document.querySelector('.contact-headline');
        
        if (contactHeadline) {
            const originalCursorHTML = cursor.innerHTML;
            let lastX = 0;
            let lastY = 0;
            let rotation = 0;
            
            // Function to transform cursor to smiley face
            function transformToSmiley() {
                isHoveringHeadline = true;
                
                // First, fade out the current cursor content
                cursor.style.opacity = '0';
                cursor.style.transition = 'opacity 0.2s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                
                // Wait for fade out, then change size and content
                setTimeout(() => {
                    // Change cursor to show custom smiley face at 100px size with smooth transition
                    cursor.style.setProperty('width', '100px', 'important');
                    cursor.style.setProperty('height', '100px', 'important');
                    cursor.style.setProperty('min-width', '100px', 'important');
                    cursor.style.setProperty('min-height', '100px', 'important');
                    
                    // Create custom smiley face with separate eyes
                    const smileyContainer = document.createElement('div');
                smileyContainer.id = 'smiley-cursor-container';
                smileyContainer.style.cssText = `
                    width: 100px;
                    height: 100px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                
                    // Face circle (yellow background)
                    const face = document.createElement('div');
                face.style.cssText = `
                    width: 100px;
                    height: 100px;
                    background: #FFD700;
                    border-radius: 50%;
                    position: relative;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                `;
                
                    // Eyes container
                    const eyesContainer = document.createElement('div');
                eyesContainer.id = 'smiley-eyes-container';
                eyesContainer.style.cssText = `
                    position: absolute;
                    top: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 20px;
                    width: 100%;
                    justify-content: center;
                `;
                
                    // Left eye (using > symbol)
                    const leftEye = document.createElement('div');
                leftEye.id = 'smiley-left-eye';
                leftEye.textContent = '>';
                leftEye.style.cssText = `
                    font-size: 30px;
                    color: #000;
                    font-weight: bold;
                    line-height: 1;
                    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    transform-origin: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                
                    // Right eye (using > symbol - both point same direction)
                    const rightEye = document.createElement('div');
                rightEye.id = 'smiley-right-eye';
                rightEye.textContent = '>';
                rightEye.style.cssText = `
                    font-size: 30px;
                    color: #000;
                    font-weight: bold;
                    line-height: 1;
                    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    transform-origin: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                
                    // Mouth
                    const mouth = document.createElement('div');
                mouth.style.cssText = `
                    position: absolute;
                    bottom: 25px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 20px;
                    border: 3px solid #000;
                    border-top: none;
                    border-radius: 0 0 40px 40px;
                    background: transparent;
                `;
                
                    eyesContainer.appendChild(leftEye);
                    eyesContainer.appendChild(rightEye);
                    face.appendChild(eyesContainer);
                    face.appendChild(mouth);
                    smileyContainer.appendChild(face);
                
                    cursor.innerHTML = '';
                    cursor.appendChild(smileyContainer);
                    
                    // Fade in and scale up smoothly
                    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    cursor.style.opacity = '0';
                    
                    // Trigger reflow for smooth animation
                    void cursor.offsetWidth;
                    
                    // Animate to full size and opacity
                    setTimeout(() => {
                        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                        cursor.style.opacity = '1';
                        cursor.style.transition = 'opacity 0.3s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    }, 10);
                    
                    cursor.style.pointerEvents = 'none';
                }, 200);
            }
            
            // Function to update eyes based on movement
            function updateEyes(currentX, currentY) {
                if (!isHoveringHeadline) return;
                
                // Clear previous reset timeout
                if (window.eyeResetTimeout) {
                    clearTimeout(window.eyeResetTimeout);
                }
                
                // Calculate direction only if we have previous position
                if (lastX !== 0 || lastY !== 0) {
                    const deltaX = currentX - lastX;
                    const deltaY = currentY - lastY;
                    
                    // Get eye elements
                    const leftEye = document.getElementById('smiley-left-eye');
                    const rightEye = document.getElementById('smiley-right-eye');
                    
                    if (leftEye && rightEye) {
                        // Calculate movement intensity with reduced sensitivity (0.2 instead of 0.5)
                        // Reduced max movement range for smoother, less sensitive response
                        const moveX = Math.max(-6, Math.min(6, deltaX * 0.2));
                        const moveY = Math.max(-6, Math.min(6, deltaY * 0.2));
                        
                        // Calculate angle for eye rotation based on direction
                        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
                        
                        // Move and rotate eyes in the same direction as cursor movement
                        // Eyes move in the direction of movement and rotate to point that way
                        leftEye.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${angle}deg)`;
                        rightEye.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${angle}deg)`;
                    }
                }
                
                lastX = currentX;
                lastY = currentY;
                
                // Reset eyes to center after 300ms of no movement (smoother reset)
                window.eyeResetTimeout = setTimeout(() => {
                    const leftEye = document.getElementById('smiley-left-eye');
                    const rightEye = document.getElementById('smiley-right-eye');
                    if (leftEye && rightEye) {
                        leftEye.style.transform = 'translate(0, 0) rotate(0deg)';
                        rightEye.style.transform = 'translate(0, 0) rotate(0deg)';
                    }
                }, 300);
            }
            
            // Function to restore original cursor
            function restoreOriginalCursor() {
                isHoveringHeadline = false;
                lastX = 0;
                lastY = 0;
                
                // Reset eyes to center
                const leftEye = document.getElementById('smiley-left-eye');
                const rightEye = document.getElementById('smiley-right-eye');
                if (leftEye && rightEye) {
                    leftEye.style.transform = 'translate(0, 0) rotate(0deg)';
                    rightEye.style.transform = 'translate(0, 0) rotate(0deg)';
                }
                
                if (window.eyeResetTimeout) {
                    clearTimeout(window.eyeResetTimeout);
                }
                
                // Smooth fade out and scale down
                cursor.style.transition = 'opacity 0.2s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
                cursor.style.opacity = '0';
                
                // Wait for fade out, then restore original cursor
                setTimeout(() => {
                    cursor.style.removeProperty('width');
                    cursor.style.removeProperty('height');
                    cursor.style.removeProperty('min-width');
                    cursor.style.removeProperty('min-height');
                    cursor.innerHTML = originalCursorHTML;
                    
                    // Fade in original cursor
                    setTimeout(() => {
                        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                        cursor.style.opacity = '1';
                        cursor.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    }, 10);
                }, 200);
            }
            
            // Mouse events (desktop)
            contactHeadline.addEventListener('mouseenter', () => {
                transformToSmiley();
            });
            
            contactHeadline.addEventListener('mousemove', (e) => {
                updateEyes(e.clientX, e.clientY);
            });
            
            contactHeadline.addEventListener('mouseleave', () => {
                restoreOriginalCursor();
            });
            
            // Touch events (mobile)
            contactHeadline.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (e.touches.length > 0) {
                    const touch = e.touches[0];
                    lastX = touch.clientX;
                    lastY = touch.clientY;
                    transformToSmiley();
                    updateCursorPosition(touch.clientX, touch.clientY);
                }
            }, { passive: false });
            
            contactHeadline.addEventListener('touchmove', (e) => {
                e.preventDefault();
                if (e.touches.length > 0) {
                    const touch = e.touches[0];
                    updateEyes(touch.clientX, touch.clientY);
                    updateCursorPosition(touch.clientX, touch.clientY);
                }
            }, { passive: false });
            
            contactHeadline.addEventListener('touchend', (e) => {
                e.preventDefault();
                restoreOriginalCursor();
            }, { passive: false });
            
            contactHeadline.addEventListener('touchcancel', (e) => {
                e.preventDefault();
                restoreOriginalCursor();
            }, { passive: false });
        }
    }, 500);

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
