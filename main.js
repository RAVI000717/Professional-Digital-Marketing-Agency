// Initialize AOS with optimized settings
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with performance optimizations
    AOS.init({
        duration: 600,
        once: true,
        mirror: false,
        disable: 'mobile'
    });

    // Navbar scroll effect
    const header = document.querySelector('.header');
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 100) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
                scrollTimeout = null;
            }, 50);
        }
    });

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    // Show all items initially
    portfolioItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.display = 'block';
    });

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filter items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Trigger click on 'All' button to initialize
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.click();
    }

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60 FPS
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Start counter animation when element is in view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe stats container
    const statsContainer = document.querySelector('.about-stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }

    // Optimize animations with requestAnimationFrame
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + (obj.getAttribute('data-suffix') || '+');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Get Started button functionality
    const getStartedBtn = document.querySelector('.contact-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Hero CTA buttons functionality
    const heroCTAButtons = document.querySelectorAll('.hero-cta .btn');
    heroCTAButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Portfolio preview functionality
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        const previewBtn = card.querySelector('.portfolio-preview');
        if (previewBtn) {
            previewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const image = card.querySelector('img');
                const title = card.querySelector('h3');
                const description = card.querySelector('.portfolio-description');
                
                // Create and show modal
                const modal = document.createElement('div');
                modal.className = 'portfolio-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <img src="${image.src}" alt="${image.alt}">
                        <h3>${title.textContent}</h3>
                        <p>${description.textContent}</p>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Close modal functionality
                const closeBtn = modal.querySelector('.close-modal');
                closeBtn.addEventListener('click', () => modal.remove());
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.remove();
                });
            });
        }
    });

    // Service box click functionality
    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const content = box.querySelector('.service-content');
            const front = box.querySelector('.service-front');
            const back = box.querySelector('.service-back');
            
            if (content.style.transform === 'rotateY(180deg)') {
                content.style.transform = 'rotateY(0deg)';
            } else {
                content.style.transform = 'rotateY(180deg)';
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } catch (error) {
                console.error('Error submitting form:', error);
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'An error occurred. Please try again later.';
                contactForm.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Form validation
    const contactFormValidation = document.querySelector('.contact-form');
    if (contactFormValidation) {
        contactFormValidation.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show a success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.classList.add('success');
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                        this.reset();
                    }, 3000);
                }, 2000);
            }
        });
    }

    // Particle animation
    function createParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = 15 + Math.random() * 10;
            const size = 2 + Math.random() * 8;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDuration = `${duration}s`;
        });
    }

    createParticles();

    // Consultation Modal Functionality
    const consultationButtons = document.querySelectorAll('[data-modal="consultation"]');
    const consultationModal = document.getElementById('consultation-modal');
    const consultationForm = document.getElementById('consultation-form');

    if (consultationButtons && consultationModal) {
        // Open modal
        consultationButtons.forEach(button => {
            button.addEventListener('click', () => {
                consultationModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close modal
        const closeModal = () => {
            consultationModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        };

        // Close on X button click
        const modalClose = consultationModal.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Close on outside click
        consultationModal.addEventListener('click', (e) => {
            if (e.target === consultationModal) {
                closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && consultationModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Handle form submission
        if (consultationForm) {
            consultationForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = consultationForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                try {
                    // Collect form data
                    const formData = new FormData(consultationForm);
                    const formDataObj = Object.fromEntries(formData.entries());

                    // Simulate API call (replace with your actual API endpoint)
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thank you! We will contact you soon to schedule your consultation.';
                    consultationForm.reset();
                    consultationForm.appendChild(successMessage);

                    // Close modal after delay
                    setTimeout(() => {
                        closeModal();
                        successMessage.remove();
                    }, 3000);

                } catch (error) {
                    console.error('Error submitting form:', error);
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'An error occurred. Please try again later.';
                    consultationForm.appendChild(errorMessage);

                    setTimeout(() => {
                        errorMessage.remove();
                    }, 5000);
                } finally {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
        }
    }

    // Consultation Form Handling
    document.getElementById('consultationForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to your backend
        // For now, we'll just show a success message
        alert('Thank you for your interest! We will contact you shortly.');
        this.reset();
    });

    // Debounce function for performance optimization
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Optimize resize event handling
    const handleResize = debounce(() => {
        // Add any resize-specific logic here
    }, 250);

    window.addEventListener('resize', handleResize);

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your backend
            // For now, we'll just show a success message
            const button = e.target.querySelector('button');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            button.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.backgroundColor = '';
                e.target.reset();
            }, 3000);
        });
    }

    // Smooth scroll for footer links
    document.querySelectorAll('.footer-links a[href^="#"]').forEach(anchor => {
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
});
