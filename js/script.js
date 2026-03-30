/* =========================================================================
   CORRUPTED GRID JS LOGIC
   Handles Smooth Scrolling, Section tracking, Horizontal Parallax, and Glitches
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. HORIZONTAL SCROLL LOGIC FOR WORK SECTION (CINEMATIC LERP PHYSICS)
    const workSection = document.querySelector('.work-section');
    const horizontalScroll = document.querySelector('.horizontal-scroll');
    
    if (workSection && horizontalScroll) {
        let currentX = 0;
        let targetX = 0;
        let isAnimating = false;

        const lerpAnimation = () => {
            // Apply advanced Linear Interpolation for buttery smooth physics
            currentX += (targetX - currentX) * 0.08;
            
            // Output to GPU via 3D transform
            horizontalScroll.style.transform = `translate3d(-${currentX}px, 0, 0)`;
            
            // If we are close enough to target, stop the animation loop to save battery
            if (Math.abs(targetX - currentX) > 0.5) {
                requestAnimationFrame(lerpAnimation);
            } else {
                horizontalScroll.style.transform = `translate3d(-${targetX}px, 0, 0)`;
                isAnimating = false;
            }
        };

        const updateScroll = () => {
            const sectionTop = workSection.offsetTop;
            const sectionHeight = workSection.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;
            
            const scrollContainer = document.querySelector('.scroll-container');
            const containerWidth = scrollContainer ? scrollContainer.offsetWidth : window.innerWidth;
            const maxTranslate = horizontalScroll.scrollWidth - containerWidth;
            
            // STRICT BOUNDARY CLAMPING: Re-syncing math even if scrolled quickly
            if (scrollY < sectionTop) {
                targetX = 0;
            } else if (scrollY > sectionTop + sectionHeight - windowHeight) {
                targetX = maxTranslate;
            } else {
                const scrollPercentage = (scrollY - sectionTop) / (sectionHeight - windowHeight);
                targetX = scrollPercentage * maxTranslate;
            }

            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(lerpAnimation);
            }
        };

        // Passive listeners force the browser to prioritize smooth scrolling
        window.addEventListener('scroll', updateScroll, { passive: true });
        window.addEventListener('resize', updateScroll, { passive: true });
        updateScroll(); // Initial execution
    }

    // 2. ACTIVE NAV LINKS UPDATE ON SCROLL & SMOOTH SCROLLING
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateNav = () => {
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop - window.innerHeight / 2 && scrollY < sectionTop + sectionHeight - window.innerHeight / 2) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateNav);

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // 3. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal-text');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. MOUSE MOVEMENT NOISE GLITCH EFFECT
    const noiseOverlay = document.getElementById('noise-overlay');
    let lastMouseTime = Date.now();
    let originalOp = null;
    
    if(noiseOverlay) {
        originalOp = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--noise-op'));
        window.addEventListener('mousemove', () => {
            const now = Date.now();
            if (now - lastMouseTime < 20) {
                noiseOverlay.style.opacity = (originalOp * 2.5).toString();
                setTimeout(() => {
                    noiseOverlay.style.opacity = originalOp.toString();
                }, 100);
            }
            lastMouseTime = now;
        });
    }

    // 5. REMOVE LOADING CLASS
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);

});
