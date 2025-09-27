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
                
                setTimeout(() => {
                    currentSection.classList.remove('section-active', 'section-exit', 'exit-to-top', 'exit-to-bottom');
                }, 500);
            }
            
            // Smooth scroll to target with a slight delay to allow transition to start
            setTimeout(() => {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }, 50);
            
            // Add entrance effect to target section
            setTimeout(() => {
                target.classList.add('section-active', 'section-enter');
                
                setTimeout(() => {
                    target.classList.remove('section-enter', 'enter-from-top', 'enter-from-bottom');
                    // Remove the transition tracking attribute
                    document.body.removeAttribute('data-transition');
                }, 800);
            }, 300);
        }
    });
});

// Helper function to get section index for determining direction
function getSectionIndex(sectionId) {
    const sections = ['home', 'about', 'blogs', 'skills', 'timeline', 'contact'];
    return sections.indexOf(sectionId);
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
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
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .cert-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active class to current navigation item
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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
});