// Modern Portfolio 2025 - Ultra Advanced JavaScript
// =====================================================

class ModernPortfolio {
    constructor() {
        this.isLoaded = false;
        this.animations = new Map();
        this.observers = new Map();
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.cursor = { x: 0, y: 0 };
        
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    async start() {
        try {
            // Initialize core systems
            await this.initializeLoadingScreen();
            await this.initializeCursor();
            await this.initializeParticles();
            await this.initializeNavigation();
            await this.initializeScrollAnimations();
            await this.initializeInteractions();
            
            // Mark as loaded
            this.isLoaded = true;
            console.log('🚀 Modern Portfolio 2025 initialized successfully!');
            
        } catch (error) {
            console.error('❌ Error initializing portfolio:', error);
        }
    }

    // =====================================
    // LOADING SCREEN SYSTEM
    // =====================================
    
    async initializeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.querySelector('.loading-progress');
        const percentage = document.querySelector('.loading-percentage');
        
        if (!loadingScreen) return;

        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    this.startMainAnimations();
                }, 500);
            }
            
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            if (percentage) {
                percentage.textContent = `${Math.floor(progress)}%`;
            }
        }, 100);
    }

    startMainAnimations() {
        // Trigger hero animations
        this.animateHeroElements();
        
        // Initialize AOS-like animations
        this.initializeScrollAnimations();
    }

    animateHeroElements() {
        const heroElements = document.querySelectorAll('[data-aos]');
        
        heroElements.forEach((element, index) => {
            const delay = element.dataset.aosDelay || index * 100;
            
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, parseInt(delay));
        });
    }

    // =====================================
    // CUSTOM CURSOR SYSTEM
    // =====================================
    
    async initializeCursor() {
        const cursor = document.getElementById('custom-cursor');
        const follower = document.getElementById('cursor-follower');
        
        if (!cursor || !follower) return;

        const cursorDot = cursor.querySelector('.cursor-dot');
        const cursorOutline = cursor.querySelector('.cursor-outline');

        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Smooth cursor animation
        const animateCursor = () => {
            // Lerp for smooth movement
            this.cursor.x += (this.mouse.x - this.cursor.x) * 0.1;
            this.cursor.y += (this.mouse.y - this.cursor.y) * 0.1;

            // Update cursor position
            if (cursorDot) {
                cursorDot.style.left = `${this.cursor.x}px`;
                cursorDot.style.top = `${this.cursor.y}px`;
            }

            if (cursorOutline) {
                cursorOutline.style.left = `${this.cursor.x}px`;
                cursorOutline.style.top = `${this.cursor.y}px`;
            }

            // Update follower with more delay
            if (follower) {
                const followerX = this.cursor.x + (this.mouse.x - this.cursor.x) * 0.05;
                const followerY = this.cursor.y + (this.mouse.y - this.cursor.y) * 0.05;
                
                follower.style.left = `${followerX}px`;
                follower.style.top = `${followerY}px`;
            }

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Cursor interactions
        this.setupCursorInteractions(cursorOutline, follower);
    }

    setupCursorInteractions(cursorOutline, follower) {
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], .btn');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (cursorOutline) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorOutline.style.borderColor = 'var(--accent-purple)';
                }
                if (follower) {
                    follower.style.transform = 'scale(2)';
                    follower.style.opacity = '0.8';
                }
            });

            element.addEventListener('mouseleave', () => {
                if (cursorOutline) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }
                if (follower) {
                    follower.style.transform = 'scale(1)';
                    follower.style.opacity = '0.6';
                }
            });
        });
    }

    // =====================================
    // PARTICLE SYSTEM
    // =====================================
    
    async initializeParticles() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -10;
                this.speed = Math.random() * 2 + 0.5;
                this.size = Math.random() * 3 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = this.getRandomColor();
            }

            getRandomColor() {
                const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.y += this.speed;
                
                if (this.y > canvas.height + 10) {
                    this.reset();
                }

                // Mouse interaction
                const dx = this.mouse.x - this.x;
                const dy = this.mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    this.x -= dx * force * 0.01;
                    this.y -= dy * force * 0.01;
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Create particles
        for (let i = 0; i < 50; i++) {
            this.particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach(particle => {
                particle.mouse = this.mouse;
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    // =====================================
    // NAVIGATION SYSTEM
    // =====================================
    
    async initializeNavigation() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navProgress = document.querySelector('.nav-progress');

        if (!navbar) return;

        // Scroll effects
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update progress bar
            if (navProgress) {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = (currentScrollY / windowHeight) * 100;
                navProgress.style.transform = `scaleX(${Math.min(scrolled / 100, 1)})`;
            }

            // Update active nav link
            this.updateActiveNavLink();
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', this.throttle(handleScroll, 16));

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Close mobile menu
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
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

    // =====================================
    // SCROLL ANIMATIONS
    // =====================================
    
    async initializeScrollAnimations() {
        // Create intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Trigger specific animations
                    this.triggerElementAnimations(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with data-aos
        document.querySelectorAll('[data-aos]').forEach(element => {
            observer.observe(element);
        });

        this.observers.set('scroll', observer);
    }

    triggerElementAnimations(element) {
        // Counter animations
        if (element.classList.contains('stat-number')) {
            this.animateCounter(element);
        }

        // Progress bar animations
        if (element.classList.contains('skill-item')) {
            this.animateSkillProgress(element);
        }

        // Text reveal animations
        if (element.querySelector('.text-reveal')) {
            this.animateTextReveal(element);
        }
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
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

    animateSkillProgress(element) {
        const skillLevel = element.getAttribute('data-skill');
        const progressBar = element.querySelector('.progress-bar');
        
        if (progressBar && skillLevel) {
            setTimeout(() => {
                progressBar.style.width = `${skillLevel}%`;
            }, Math.random() * 500);
        }
    }

    animateTextReveal(element) {
        const textElements = element.querySelectorAll('.text-reveal');
        
        textElements.forEach((text, index) => {
            setTimeout(() => {
                text.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // =====================================
    // INTERACTIVE ELEMENTS
    // =====================================
    
    async initializeInteractions() {
        // Initialize all interactive components
        this.initializeButtons();
        this.initializeForms();
        this.initializeCards();
        this.initializeSocialLinks();
    }

    initializeButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add ripple effect
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });

            // Enhanced hover effects
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.02)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initializeForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                // Floating label effect
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });

                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });

                // Real-time validation
                input.addEventListener('input', () => {
                    this.validateInput(input);
                });
            });

            // Form submission
            form.addEventListener('submit', (e) => {
                this.handleFormSubmit(e, form);
            });
        });
    }

    validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        
        input.classList.remove('error', 'success');
        
        if (value) {
            if (type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(value)) {
                    input.classList.add('success');
                } else {
                    input.classList.add('error');
                }
            } else {
                input.classList.add('success');
            }
        }
    }

    handleFormSubmit(event, form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        this.showNotification('Thank you! Your message has been sent.', 'success');
    }

    initializeCards() {
        const cards = document.querySelectorAll('.about-card, .contact-card, .skill-category');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardGlow(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeCardGlow(card);
            });

            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                this.addCardTilt(e, card);
            });
        });
    }

    addCardGlow(card) {
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '0.3';
        }
    }

    removeCardGlow(card) {
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '0';
        }
        
        // Reset tilt
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }

    addCardTilt(event, card) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    initializeSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const tooltip = link.querySelector('.social-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateY(-10px)';
                }
            });

            link.addEventListener('mouseleave', () => {
                const tooltip = link.querySelector('.social-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translateY(0)';
                }
            });
        });
    }

    // =====================================
    // UTILITY FUNCTIONS
    // =====================================
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${this.getNotificationColor(type)};
            color: white;
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-xl);
            z-index: var(--z-toast);
            transform: translateX(400px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 300px;
            backdrop-filter: blur(20px);
        `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Manual close
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.removeNotification(notification);
            });
        }
    }

    getNotificationColor(type) {
        const colors = {
            success: 'var(--accent-emerald)',
            error: '#ef4444',
            warning: 'var(--accent-amber)',
            info: 'var(--accent-purple)'
        };
        return colors[type] || colors.info;
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    throttle(func, limit) {
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

    debounce(func, wait) {
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

    // =====================================
    // CLEANUP
    // =====================================
    
    destroy() {
        // Clean up observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        
        // Clear animations
        this.animations.clear();
        
        console.log('🧹 Portfolio cleaned up');
    }
}

// Initialize the portfolio when DOM is ready
const portfolio = new ModernPortfolio();

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: var(--font-family-primary);
        font-weight: 500;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .input-focus {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--accent-purple);
        transition: width 0.3s ease;
    }
    
    .form-group.focused .input-focus {
        width: 100%;
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
    }
    
    .form-group input.success,
    .form-group textarea.success {
        border-color: var(--accent-emerald);
    }
    
    .social-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-tertiary);
        color: var(--text-primary);
        padding: 0.5rem 1rem;
        border-radius: var(--radius-lg);
        font-size: var(--text-sm);
        font-weight: 500;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        white-space: nowrap;
        z-index: var(--z-tooltip);
    }
    
    .social-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: var(--bg-tertiary);
    }
`;

document.head.appendChild(style);

// Export for potential external use
window.ModernPortfolio = ModernPortfolio;