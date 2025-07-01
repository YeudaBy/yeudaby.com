// Modern Portfolio JavaScript

// Portfolio projects data
const portfolioProjects = [
    {
        id: 1,
        title: "Jusic • Kosher Music Player",
        description: "A modern music streaming platform designed for the Jewish community. Features include playlist management, offline listening, and kosher music curation. Built with React and powered by Lomdaat technologies.",
        image: "/images/jusic-screenshot.jpeg",
        tags: ["React", "TypeScript", "Music API", "PWA"],
        links: {
            live: "https://jusic.app/",
            github: null
        },
        inDevelopment: true,
        featured: true
    },
    {
        id: 2,
        title: "Call Counter • Yedidim Hotline",
        description: "An Android application for tracking emergency hotline calls. Helps dispatchers monitor call volumes and maintain team motivation. Features real-time statistics and performance analytics.",
        image: "/images/call-counter-screenshot.jpeg",
        tags: ["Kotlin", "Android", "Firebase", "Analytics"],
        links: {
            live: null,
            github: "https://github.com/YeudaBy/YedidimCallCounter"
        },
        inDevelopment: false,
        featured: true
    },
    {
        id: 3,
        title: "K-tube • Kosher YouTube",
        description: "A curated video platform providing safe, family-friendly content. Features advanced filtering, parental controls, and community moderation. Designed for the Hadran community.",
        image: "/images/ktube-screenshot.jpeg",
        tags: ["React", "Video API", "Content Filtering", "Community"],
        links: {
            live: "https://ktube.app/",
            github: null
        },
        inDevelopment: true,
        featured: true
    }
];

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Show loading screen briefly for better UX
    setTimeout(() => {
        hideLoadingScreen();
    }, 1500);

    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializePortfolio();
    initializeAnimations();
    initializeContactForm();
    initializeStatCounters();
}

// Loading Screen
function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Set active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Close mobile menu if open
    if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}

// Portfolio
function initializePortfolio() {
    renderPortfolioProjects();
    initializePortfolioNavigation();
}

function renderPortfolioProjects() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioDots = document.querySelector('.portfolio-dots');
    
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = '';
    portfolioDots.innerHTML = '';

    portfolioProjects.forEach((project, index) => {
        // Create project card
        const projectCard = createProjectCard(project);
        portfolioGrid.appendChild(projectCard);

        // Create navigation dot
        const dot = document.createElement('div');
        dot.className = `portfolio-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => scrollToProject(index));
        portfolioDots.appendChild(dot);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'portfolio-item';
    
    const statusBadge = project.inDevelopment 
        ? '<span class="portfolio-tag">In Development</span>' 
        : '<span class="portfolio-tag">Live</span>';

    const liveLink = project.links.live 
        ? `<a href="${project.links.live}" target="_blank" class="portfolio-link">
             <i class="fas fa-external-link-alt"></i> View Live
           </a>` 
        : '';

    const githubLink = project.links.github 
        ? `<a href="${project.links.github}" target="_blank" class="portfolio-link">
             <i class="fab fa-github"></i> View Code
           </a>` 
        : '';

    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="portfolio-image" loading="lazy">
        <div class="portfolio-content">
            <h3 class="portfolio-title">${project.title}</h3>
            <p class="portfolio-description">${project.description}</p>
            <div class="portfolio-tags">
                ${project.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                ${statusBadge}
            </div>
            <div class="portfolio-links">
                ${liveLink}
                ${githubLink}
            </div>
        </div>
    `;

    return card;
}

function initializePortfolioNavigation() {
    const prevBtn = document.querySelector('.portfolio-nav.prev');
    const nextBtn = document.querySelector('.portfolio-nav.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => navigatePortfolio('prev'));
        nextBtn.addEventListener('click', () => navigatePortfolio('next'));
    }
}

let currentProjectIndex = 0;

function navigatePortfolio(direction) {
    const totalProjects = portfolioProjects.length;
    
    if (direction === 'prev') {
        currentProjectIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
    } else {
        currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
    }
    
    scrollToProject(currentProjectIndex);
}

function scrollToProject(index) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioDots = document.querySelectorAll('.portfolio-dot');
    
    if (portfolioItems[index]) {
        portfolioItems[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
    
    // Update active dot
    portfolioDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentProjectIndex = index;
}

// Animations
function initializeAnimations() {
    // Add stagger effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.about-card, .skill-category, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Stat Counters
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add floating label effect
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

function handleFormSubmit(e) {
    // Form validation can be added here
    const formData = new FormData(e.target);
    const name = formData.get('subject');
    const email = formData.get('email');
    const message = formData.get('body');
    
    if (!name || !email || !message) {
        e.preventDefault();
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        e.preventDefault();
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const debouncedScroll = debounce(updateActiveNavLink, 10);
const throttledNavbarScroll = throttle(handleNavbarScroll, 16);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('scroll', throttledNavbarScroll);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // Could send error to analytics service here
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        portfolioProjects,
        isValidEmail,
        debounce,
        throttle
    };
}