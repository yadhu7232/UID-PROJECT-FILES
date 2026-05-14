/* ══════ script.js — Where Next ══════ */

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── Mobile menu ──
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('ri-menu-line');
    icon.classList.toggle('ri-close-line');
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.querySelector('i').className = 'ri-menu-line';
    });
  });
}

// ── GSAP Animations ──
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Hero fade-up (staggered)
  gsap.from('.hero-content > *', {
    y: 50, opacity: 0, duration: 1.1, stagger: 0.12,
    ease: 'power3.out', delay: 0.2
  });
  gsap.from('.scroll-indicator', { opacity: 0, y: 15, duration: 0.8, delay: 1.2 });

  // Scroll reveals
  document.querySelectorAll('[data-reveal]').forEach(el => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // Stagger children
  document.querySelectorAll('[data-stagger]').forEach(container => {
    gsap.from(container.children, {
      y: 50, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: container, start: 'top 82%' }
    });
  });

  // Counter animation
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to({ v: 0 }, {
          v: target, duration: 2.2, ease: 'power2.out',
          onUpdate: function () { el.textContent = Math.floor(this.targets()[0].v) + suffix; }
        });
      }
    });
  });

  // Parallax tilt on destination cards
  document.querySelectorAll('.dest-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 8, rotateX: -y * 8,
        transformPerspective: 800,
        duration: 0.4, ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
    });
  });

  // Magnetic hover on CTA buttons
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' });
    });
  });
}

// ── FAQ Accordion ──
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasOpen) item.classList.add('active');
  });
});

// ── Swiper ──
if (typeof Swiper !== 'undefined') {
  new Swiper('.testimonials-swiper', {
    slidesPerView: 1, spaceBetween: 20, loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
  });
}

// ── Filter buttons (Explore page) ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── Login form ──
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login successful! (Demo)');
  });
}

// ── Smooth anchor scrolling ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
