/* =========================================================================
   CINEMATIC GLITCH NOIR JS ENGINE
   Handles Loading Curtain, Smooth Scroll, 3D Tilt, Magnetic Buttons, and Canvas Grain
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── 1. LOADING CURTAIN & HERO ANIMATION ─── */
    const curtain = document.getElementById('curtain');
    const heroTitle = document.getElementById('hero-title');
    
    // Split hero title into span characters for staggered animation
    if (heroTitle) {
        const text = heroTitle.getAttribute('data-text');
        heroTitle.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            
            if (char === ' ') {
                span.className = 'char-space';
                span.innerHTML = '&nbsp;';
            } else {
                span.className = 'char';
                span.textContent = char;
            }
            heroTitle.appendChild(span);
        }
    }

    // Trigger entrance sequence
    setTimeout(() => {
        if (curtain) curtain.classList.add('open');
        
        setTimeout(() => {
            const chars = document.querySelectorAll('.hero-title .char');
            chars.forEach((char, index) => {
                setTimeout(() => {
                    char.classList.add('visible');
                }, index * 80); // 80ms stagger
            });
            
            // Also reveal any standard reveal-text elements in hero
            document.querySelectorAll('.hero .reveal-text').forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, 600 + (i * 200));
            });
        }, 800); // Wait for curtain to mostly open
    }, 500); // Initial load delay


    /* ─── 2. GRAIN CANVAS EFFECT ─── */
    const canvas = document.getElementById('grain-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

        function noise(ctx) {
            const imageData = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(imageData.data.buffer);
            const len = buffer32.length;
            
            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.1) {
                    buffer32[i] = 0xffffffff; // white pixel
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }
        
        let frame = 0;
        function loop() {
            frame++;
            if (frame % 4 === 0) { // Throttle for performance, gritty feel
                noise(ctx);
            }
            requestAnimationFrame(loop);
        }
        loop();
    }


    /* ─── 3. MOUSE SPOTLIGHT LERP & HERO PARALLAX ─── */
    const spotlight = document.getElementById('spotlight');
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    
    if (spotlight && !window.matchMedia('(hover: none)').matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let spotX = mouseX;
        let spotY = mouseY;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Hero Parallax (Depth Effect)
            if (heroBg && window.scrollY < window.innerHeight) {
                const xOffset = (mouseX / window.innerWidth - 0.5) * 20;
                const yOffset = (mouseY / window.innerHeight - 0.5) * 20;
                heroBg.style.transform = `translate3d(calc(-50% + ${-xOffset}px), calc(-10% + ${-yOffset}px), 0) scale(1.05)`;
                if (heroContent) {
                    heroContent.style.transform = `translate3d(${xOffset * 1.5}px, ${yOffset * 1.5}px, 0)`;
                }
            }
        }, { passive: true });
        
        function updateSpotlight() {
            // LERP for liquid inertia
            spotX += (mouseX - spotX) * 0.15;
            spotY += (mouseY - spotY) * 0.15;
            
            spotlight.style.left = `${spotX}px`;
            spotlight.style.top = `${spotY}px`;
            requestAnimationFrame(updateSpotlight);
        }
        updateSpotlight();
    }

    /* ─── 3.5 CUSTOM CURSOR ─── */
    const customCursor = document.querySelector('.custom-cursor');
    const customCursorFollower = document.querySelector('.custom-cursor-follower');
    
    if (customCursor && customCursorFollower && !window.matchMedia('(hover: none)').matches) {
        document.body.classList.add('has-custom-cursor');
        let cursorX = window.innerWidth / 2;
        let cursorY = window.innerHeight / 2;
        let followerX = cursorX;
        let followerY = cursorY;
        
        window.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            customCursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
        });
        
        const updateFollower = () => {
            followerX += (cursorX - followerX) * 0.2;
            followerY += (cursorY - followerY) * 0.2;
            customCursorFollower.style.transform = `translate3d(calc(${followerX}px - 50%), calc(${followerY}px - 50%), 0)`;
            requestAnimationFrame(updateFollower);
        };
        updateFollower();
        
        // Hover states for links and clickables
        const clickables = document.querySelectorAll('a, button, .work-card, .mobile-nav-toggle');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                customCursor.classList.add('active');
                customCursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                customCursor.classList.remove('active');
                customCursorFollower.classList.remove('active');
            });
        });
    }


    /* ─── 4. HORIZONTAL SCROLL LOGIC ─── */
    const workSection = document.querySelector('.work-section');
    const horizontalScroll = document.getElementById('horizontal-scroll');
    
    if (workSection && horizontalScroll) {
        let currentX = 0;
        let targetX = 0;
        let isAnimating = false;

        const lerpAnimation = () => {
            currentX += (targetX - currentX) * 0.08;
            horizontalScroll.style.transform = `translate3d(-${currentX}px, 0, 0)`;
            
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
            const maxTranslate = horizontalScroll.scrollWidth - containerWidth + 120; // 120px padding buffer
            
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

        window.addEventListener('scroll', updateScroll, { passive: true });
        window.addEventListener('resize', updateScroll, { passive: true });
        updateScroll();
    }


    /* ─── 5. 3D TILT EFFECT ON CARDS ─── */
    const tiltContainers = document.querySelectorAll('[data-tilt]');
    
    if (!window.matchMedia('(hover: none)').matches) {
        tiltContainers.forEach(container => {
            const inner = container.querySelector('.card-inner');
            const glow = container.querySelector('.card-glow');
            
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate rotation (center is 0, edges are max 15deg)
                const xPct = x / rect.width - 0.5;
                const yPct = y / rect.height - 0.5;
                const rotateX = yPct * -15;
                const rotateY = xPct * 15;
                
                container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                if (inner) inner.style.transform = `translateZ(30px)`;
                if (glow) {
                    glow.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
                    glow.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
                }
            });
            
            container.addEventListener('mouseleave', () => {
                container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                if (inner) inner.style.transform = `translateZ(0)`;
            });
        });
    }

    
    /* ─── 6. INTERSECTION OBSERVERS (Reveal & Stats Counter) ─── */
    
    // Standard Reveal
    const revealElements = document.querySelectorAll('.reveal-text:not(.hero .reveal-text)');
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNum = parseInt(target.getAttribute('data-target'), 10);
                let currentNum = 0;
                const duration = 2000; // 2 seconds
                const frames = 60;
                const increment = finalNum / (duration / (1000 / frames));
                
                const updateCounter = () => {
                    currentNum += increment;
                    if (currentNum < finalNum) {
                        target.innerText = Math.ceil(currentNum);
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.innerText = finalNum;
                        target.classList.add('counted');
                    }
                };
                
                updateCounter();
                obs.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => statsObserver.observe(num));


    /* ─── 7. MAGNETIC BUTTONS (Design Polish) ─── */
    const magnets = document.querySelectorAll('[data-magnetic]');
    
    if (!window.matchMedia('(hover: none)').matches) {
        magnets.forEach(magnet => {
            magnet.addEventListener('mousemove', (e) => {
                const rect = magnet.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Pull element slightly towards cursor (0.3 drag intensity)
                magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            magnet.addEventListener('mouseleave', () => {
                magnet.style.transform = `translate(0px, 0px)`;
            });
        });
    }


    /* ─── 8. ACTIVE NAV ON SCROLL & MOBILE TOGGLE & PROGRESS ─── */
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    const updateNav = () => {
        let current = '';
        const scrollY = window.scrollY;
        
        // Scroll Progress mapping
        if (scrollProgress) {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollY / totalScroll;
            scrollProgress.style.transform = `scaleX(${progress})`;
        }
        
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
    window.addEventListener('scroll', updateNav, { passive: true });

    // Smooth scroll via Nav
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Close mobile menu if open
            if (sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            }

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Mobile Sidebar Toggle
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            sidebar.classList.toggle('mobile-open');
        });
    }
});
