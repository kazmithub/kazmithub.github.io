// Theme switcher functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('checkbox');
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    // If theme was previously saved, use that theme
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    } else if (prefersDarkScheme.matches) {
        // If no saved preference, but OS prefers dark mode
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
        localStorage.setItem('theme', 'dark');
    }
    
    // Add event listener for theme toggle
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Enhanced smooth scrolling for navigation links with section transitions
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Get the current active section
                const currentSection = document.querySelector('section.section-active') || 
                                      document.querySelector('section:in-viewport');
                
                // Add a custom data attribute to body to track the transition
                document.body.setAttribute('data-transition', `${currentSection ? currentSection.id : 'none'}-to-${target.id}`);
                
                // Add transition effect to current section
                if (currentSection && currentSection !== target) {
                    currentSection.classList.add('section-exit');
                    
                    // Add specific transition class based on navigation direction
                    const currentIndex = getSectionIndex(currentSection.id);
                    const targetIndex = getSectionIndex(target.id);
                    
                    if (currentIndex < targetIndex) {
                        // Moving down
                        currentSection.classList.add('exit-to-top');
                        target.classList.add('enter-from-bottom');
                    } else {
                        // Moving up
                        currentSection.classList.add('exit-to-bottom');
                        target.classList.add('enter-from-top');
                    }
                    
                    // Increase exit animation duration
                    setTimeout(() => {
                        currentSection.classList.remove('section-active', 'section-exit', 'exit-to-top', 'exit-to-bottom');
                    }, 1000); // Increased from 500ms to 1000ms
                }
                
                // Add subtle transition effects
                
                // Create simple fade effect
                const fade = document.createElement('div');
                fade.classList.add('fade-effect');
                document.body.appendChild(fade);
                
                // Add subtle flash effect to the body during transition
                document.body.classList.add('page-transition');
                
                // Add gentle transition to all sections
                document.querySelectorAll('section').forEach(section => {
                    section.style.transition = 'all 0.8s ease-in-out';
                });
                
                // Create subtle text transition effect
                document.querySelectorAll('h1, h2, h3').forEach(text => {
                    text.style.transition = 'all 0.7s ease-out';
                    text.style.filter = 'blur(3px)';
                    text.style.opacity = '0.8';
                    
                    setTimeout(() => {
                        text.style.filter = 'blur(0)';
                        text.style.opacity = '1';
                    }, 500);
                });
                
                // Add subtle 3D effect to the page
                document.body.style.transition = 'transform 0.8s ease-out';
                document.body.style.transformStyle = 'preserve-3d';
                document.body.style.perspective = '1000px';
                document.body.style.transform = 'rotateX(2deg) scale(0.98)';
                
                setTimeout(() => {
                    document.body.style.transform = 'rotateX(0) scale(1)';
                }, 800);
                
                // Smooth scroll to target with a slight delay
                setTimeout(() => {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 110); // 10% longer
                
                // Add entrance effect to target section with longer delay
                setTimeout(() => {
                    target.classList.add('section-active', 'section-enter');
                    
                    // Longer duration for entrance animation
                    setTimeout(() => {
                        target.classList.remove('section-enter', 'enter-from-top', 'enter-from-bottom');
                        // Remove the transition tracking attribute
                        document.body.removeAttribute('data-transition');
                    }, 1320); // 10% longer
                }, 440); // 10% longer
                
                // Remove effects after animation completes
                setTimeout(() => {
                    document.body.classList.remove('page-transition');
                    if (fade.parentNode) fade.remove();
                }, 1200);
            }
        });
    });

    // Helper function to get section index for determining direction
    function getSectionIndex(sectionId) {
        const sections = ['home', 'about', 'services', 'blogs', 'skills', 'timeline', 'contact'];
        return sections.indexOf(sectionId);
    }

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (window.scrollY > 50) {
            navbar.style.background = isDarkMode ? 'rgba(18, 18, 18, 0.98)' : 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = isDarkMode ? '0 2px 20px rgba(0, 0, 0, 0.3)' : '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = isDarkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Update navbar background when theme changes
    themeToggle.addEventListener('change', function() {
        const navbar = document.querySelector('.navbar');
        const isDarkMode = this.checked;
        
        if (window.scrollY > 50) {
            navbar.style.background = isDarkMode ? 'rgba(18, 18, 18, 0.98)' : 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = isDarkMode ? '0 2px 20px rgba(0, 0, 0, 0.3)' : '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = isDarkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .cert-item, .service-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add active class to current navigation item
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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

    // Enhanced section transition observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all sections
                document.querySelectorAll('section').forEach(section => {
                    section.classList.remove('section-active');
                });
                // Add active class to current section
                entry.target.classList.add('section-active');
                
                // If this is the skills section, animate the skill bars
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
    });

    // Skills bar animation function with filling animation but no unfilling
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        // Store which bars have already been animated
        if (!window.animatedBars) {
            window.animatedBars = new Set();
        }
        
        skillBars.forEach((bar, index) => {
            const barId = bar.parentElement.parentElement.querySelector('.skill-name').textContent;
            const targetWidth = bar.getAttribute('data-width');
            
            // If this specific bar hasn't been animated yet
            if (!window.animatedBars.has(barId)) {
                // Start with width 0 for the initial animation
                bar.style.width = '0%';
                
                // Animate to target width with a slight delay for cascade effect
                setTimeout(() => {
                    bar.style.width = targetWidth;
                    bar.classList.add('skill-animated');
                    
                    // Mark this bar as animated
                    window.animatedBars.add(barId);
                }, index * 100);
            } else {
                // For already animated bars, just ensure they're at target width
                bar.style.width = targetWidth;
            }
        });
    }

    // Observe all sections for transitions
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Check if skills section is already in view on page load
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        const isInView = (
            rect.top >= -300 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 300
        );

        if (isInView) {
            // Small delay to ensure DOM is fully rendered
            setTimeout(animateSkillBars, 300);
        }
    }

    // ========== TYPING ANIMATION ==========
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const roles = [
            'Solutions Architect',
            'DevOps Professional',
            'Cloud Infrastructure Expert',
            'Terraform Specialist',
            'AWS Certified Architect'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        function typeText() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typedElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typedElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        }

        setTimeout(typeText, 1000);
    }

    // ========== HERO PARTICLES ==========
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            const hero = canvas.parentElement;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 60; i++) {
            particles.push(new Particle());
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== BLOG ROW STAGGER ANIMATION ==========
    const blogRows = document.querySelectorAll('.blog-row');
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                blogObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    blogRows.forEach(row => blogObserver.observe(row));

    // ========== COUNTER ANIMATION FOR STATS ==========
    const stats = document.querySelectorAll('.stat[data-count]');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                const h3 = entry.target.querySelector('h3');
                const suffix = h3.textContent.includes('+') ? '+' : h3.textContent.includes('%') ? '%' : '';
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    h3.textContent = Math.floor(current) + suffix;
                }, 30);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // ========== READING PROGRESS BAR (Blog Pages) ==========
    if (document.querySelector('.blog-post-content')) {
        const progressBar = document.createElement('div');
        progressBar.classList.add('reading-progress');
        document.body.prepend(progressBar);

        window.addEventListener('scroll', () => {
            const content = document.querySelector('.blog-post-content');
            const rect = content.getBoundingClientRect();
            const contentTop = rect.top + window.scrollY;
            const contentHeight = content.offsetHeight;
            const scrolled = window.scrollY - contentTop;
            const progress = Math.min(Math.max(scrolled / (contentHeight - window.innerHeight), 0), 1);
            progressBar.style.width = (progress * 100) + '%';
        });
    }
});