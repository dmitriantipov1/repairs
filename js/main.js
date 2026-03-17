/**
 * NOVA REMONT - Main JavaScript
 * Architectural Edition
 */

// ============================================
// Header scroll effect
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// ============================================
// Mobile menu toggle
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('header__hamburger--active');
    mobileMenu.classList.toggle('mobile-menu--active');
    document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('header__hamburger--active');
        mobileMenu.classList.remove('mobile-menu--active');
        document.body.style.overflow = '';
    });
});

// ============================================
// Portfolio filters
// ============================================
const filterButtons = document.querySelectorAll('.portfolio__filter');
const portfolioItems = document.querySelectorAll('.portfolio__item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active filter
        filterButtons.forEach(btn => btn.classList.remove('portfolio__filter--active'));
        button.classList.add('portfolio__filter--active');

        const filter = button.dataset.filter;

        // Filter items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ============================================
// Stats counter animation
// ============================================
const statsNumbers = document.querySelectorAll('.stats__number');
let statsAnimated = false;

const animateCounter = (element) => {
    const target = parseInt(element.dataset.target);
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statsNumbers.forEach(num => animateCounter(num));
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// Reviews slider
// ============================================
const reviewsSlider = document.getElementById('reviewsSlider');
const reviewsPrev = document.getElementById('reviewsPrev');
const reviewsNext = document.getElementById('reviewsNext');

if (reviewsSlider && reviewsPrev && reviewsNext) {
    const scrollAmount = 430;

    reviewsPrev.addEventListener('click', () => {
        reviewsSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    reviewsNext.addEventListener('click', () => {
        reviewsSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// ============================================
// Calculator
// ============================================
const calcSteps = document.querySelectorAll('.calculator__step');
const calcProgress = document.getElementById('calcProgress');
const calcOptions = document.querySelectorAll('.calculator__option');
const areaRange = document.getElementById('areaRange');
const areaValue = document.getElementById('areaValue');
const estimateValue = document.getElementById('estimateValue');

let currentStep = 1;
let selectedType = null;
let selectedPrice = 9900;
let selectedArea = 50;

const typeNames = {
    turnkey: 'Под ключ',
    capital: 'Капитальный',
    cosmetic: 'Косметический',
    design: 'Дизайнерский'
};

const updateProgress = () => {
    if (calcProgress) {
        calcProgress.style.width = (currentStep / 3 * 100) + '%';
    }
};

const showStep = (step) => {
    calcSteps.forEach(s => s.classList.remove('calculator__step--active'));
    const stepElement = document.querySelector(`[data-step="${step}"]`);
    if (stepElement) {
        stepElement.classList.add('calculator__step--active');
    }
    currentStep = step;
    updateProgress();

    if (step === 3) {
        const summaryType = document.getElementById('summaryType');
        const summaryArea = document.getElementById('summaryArea');
        const summaryPrice = document.getElementById('summaryPrice');

        if (summaryType) summaryType.textContent = typeNames[selectedType] || '—';
        if (summaryArea) summaryArea.textContent = selectedArea + ' м²';
        if (summaryPrice) summaryPrice.textContent = (selectedPrice * selectedArea).toLocaleString('ru-RU') + ' ₽';
    }
};

const updateEstimate = () => {
    if (estimateValue) {
        const estimate = selectedPrice * selectedArea;
        estimateValue.textContent = estimate.toLocaleString('ru-RU') + ' ₽';
    }
};

// Option selection
calcOptions.forEach(option => {
    option.addEventListener('click', () => {
        calcOptions.forEach(o => o.classList.remove('calculator__option--selected'));
        option.classList.add('calculator__option--selected');
        selectedType = option.dataset.type;
        selectedPrice = parseInt(option.dataset.price);
        updateEstimate();
    });
});

// Range slider
if (areaRange) {
    areaRange.addEventListener('input', () => {
        selectedArea = parseInt(areaRange.value);
        if (areaValue) areaValue.textContent = selectedArea;
        updateEstimate();
    });
}

// Navigation buttons
document.getElementById('calcNext1')?.addEventListener('click', () => {
    if (selectedType) {
        showStep(2);
    } else {
        if (calcOptions[0]) calcOptions[0].click();
        showStep(2);
    }
});

document.getElementById('calcNext2')?.addEventListener('click', () => showStep(3));
document.getElementById('calcPrev2')?.addEventListener('click', () => showStep(1));
document.getElementById('calcPrev3')?.addEventListener('click', () => showStep(2));

// ============================================
// FAQ Accordion
// ============================================
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    if (question) {
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('faq__item--open');

            // Close all items
            faqItems.forEach(i => i.classList.remove('faq__item--open'));

            // Open clicked item if it was closed
            if (!isOpen) {
                item.classList.add('faq__item--open');
            }
        });
    }
});

// ============================================
// Fade-in-up animations
// ============================================
const fadeElements = document.querySelectorAll('.fade-in-up');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// ============================================
// Active navigation highlight on scroll
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header__nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('header__nav-link--active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('header__nav-link--active');
                }
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
});

sections.forEach(section => navObserver.observe(section));

// ============================================
// Smooth scroll for all anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();

            // Close mobile menu if open
            hamburger.classList.remove('header__hamburger--active');
            mobileMenu.classList.remove('mobile-menu--active');
            document.body.style.overflow = '';

            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
