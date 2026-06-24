// ===== NAVBAR: sticky shadow + hamburger =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
});

// ===== CAROUSEL / DEPOIMENTOS =====
const track = document.getElementById('carouselTrack');
const slides = track.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const dots = document.querySelectorAll('.carousel-dot');
let current = 0;
let autoTimer;

function goToSlide(n) {
  current = ((n % slides.length) + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function startAuto() {
  autoTimer = setInterval(() => goToSlide(current + 1), 5000);
}

function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

prevBtn.addEventListener('click', () => { goToSlide(current - 1); resetAuto(); });
nextBtn.addEventListener('click', () => { goToSlide(current + 1); resetAuto(); });

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(Number(dot.dataset.index));
    resetAuto();
  });
});

// Swipe (touch)
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { goToSlide(diff > 0 ? current + 1 : current - 1); resetAuto(); }
}, { passive: true });

startAuto();

// ===== INTERSECTION OBSERVER (fade-in) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
