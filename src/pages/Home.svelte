<script>
  import { onMount, onDestroy } from 'svelte';
  let triggers = [];

  onMount(() => {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    if (gsap && ST) gsap.registerPlugin(ST);

    // ── VIDEO HERO MOUSE PARALLAX ──
    const heroVid = document.querySelector('.ci-video-hero video');
    let mx = window.innerWidth/2, my = window.innerHeight/2;
    const onMouseMove = e => {
      mx = e.clientX; my = e.clientY;
      if (heroVid && gsap) {
        const x = (mx/window.innerWidth  - .5) * -14;
        const y = (my/window.innerHeight - .5) * -10;
        gsap.to(heroVid, { x, y, duration: 1.5, ease: 'power2.out' });
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── CURSOR ──
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let rx = 0, ry = 0, rafId;
    const animCursor = () => {
      if (dot)  { dot.style.left  = mx + 'px'; dot.style.top  = my + 'px'; }
      rx += (mx - rx) * .12; ry += (my - ry) * .12;
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
      rafId = requestAnimationFrame(animCursor);
    };
    animCursor();
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // ── SCROLL PROGRESS ──
    const prog = document.getElementById('wn-progress');
    const onScroll = () => {
      if (!prog) return;
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (s / h * 100) + '%';
    };
    window.addEventListener('scroll', onScroll);

    // ── NAVBAR SCROLL ──
    const nav = document.querySelector('.cn-nav');
    const onNavScroll = () => nav && nav.classList.toggle('cn-scrolled', window.scrollY > 80);
    window.addEventListener('scroll', onNavScroll);

    // ── HERO TEXT REVEAL (runs after intro) ──
    if (gsap) {
      const words = document.querySelectorAll('.cn-headline .word');
      gsap.from(words,          { y:'110%', opacity:0, duration:1.1, stagger:.09, ease:'power4.out', delay:.2 });
      gsap.from('.cn-hero-label',{ y:20, opacity:0, duration:.8, ease:'power3.out', delay:.1 });
      gsap.from('.cn-sub',       { y:20, opacity:0, duration:.9, ease:'power3.out', delay:.7 });
      gsap.from('.cn-btns',      { y:20, opacity:0, duration:.8, ease:'power3.out', delay:.9 });
      gsap.from('.cn-nav',       { y:-50, opacity:0, duration:.9, ease:'power3.out' });
      gsap.from('.cn-location-badge',  { opacity:0, x:30, duration:.8, delay:1.0 });
      gsap.from('.cn-hero-scroll-hint',{ opacity:0, y:15, duration:.8, delay:1.3 });
      gsap.from('.cn-stats-strip .cn-stat-item', { y:40, opacity:0, stagger:.1, duration:.7, delay:1.1 });
    }

    // ── SCROLL REVEALS ──
    if (gsap && ST) {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        const t = gsap.from(el, { y:50, opacity:0, duration:.9, ease:'power3.out',
          scrollTrigger:{ trigger:el, start:'top 85%' } });
        triggers.push(t);
      });
      document.querySelectorAll('[data-stagger]').forEach(c => {
        const t = gsap.from(c.children, { y:50, opacity:0, duration:.7, stagger:.08, ease:'power3.out',
          scrollTrigger:{ trigger:c, start:'top 82%' } });
        triggers.push(t);
      });
      document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.count)||0, suffix = el.dataset.suffix||'';
        ST.create({ trigger:el, start:'top 90%', once:true,
          onEnter:()=>gsap.to({v:0},{v:target,duration:2.2,ease:'power2.out',
            onUpdate:function(){ el.textContent=Math.floor(this.targets()[0].v)+suffix; }}) });
      });
      gsap.fromTo('.cn-bridge-line',
        { height:0, opacity:0 },
        { height:'60%', opacity:1, duration:1.5, ease:'power2.out',
          scrollTrigger:{ trigger:'.cn-spiral-bridge', start:'top 70%' } });
      gsap.from('.cn-dest-strip-item', { opacity:0, y:60, stagger:.1, duration:.8, ease:'power3.out',
        scrollTrigger:{ trigger:'.cn-dest-strip', start:'top 80%' } });
    }

    // ── SPIRAL ──
    if (window.initSpiral) window.initSpiral();

    // ── SWIPER ──
    if (window.Swiper) {
      new window.Swiper('.testimonials-swiper', {
        slidesPerView:1, spaceBetween:20, loop:true,
        autoplay:{ delay:4000, disableOnInteraction:false },
        pagination:{ el:'.swiper-pagination', clickable:true },
        breakpoints:{ 640:{ slidesPerView:2 }, 1024:{ slidesPerView:3 } }
      });
    }

    // ── FAQ ──
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement, wasOpen = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!wasOpen) item.classList.add('active');
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onNavScroll);
      cancelAnimationFrame(rafId);
    };
  });

  onDestroy(() => {
    if (window.destroySpiral) window.destroySpiral();
    if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill());
  });
</script>

<!-- CURSOR -->
<div id="wn-cursor">
  <div class="cursor-dot"></div>
  <div class="cursor-ring"></div>
</div>

<!-- PROGRESS -->
<div id="wn-progress"></div>

<!-- ═══ CINEMATIC NAVBAR ═══ -->
<nav class="cn-nav">
  <div class="cn-nav-inner">
    <a href="/" class="cn-logo">Where<em>Next</em>?</a>
    <ul class="cn-menu">
      <li><a href="#destinations">Destinations</a></li>
      <li><a href="#experiences">Experiences</a></li>
      <li><a href="#ai-planner">AI Planner</a></li>
      <li><a href="#stories">Stories</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="/login" class="cn-cta">Start Your Journey</a>
    <div class="cn-hamburger">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>

<!-- ═══ SECTION 1: CINEMATIC VIDEO HERO ═══ -->
<section class="ci-video-hero" id="hero">

  <!-- VIDEO BG -->
  <video autoplay muted loop playsinline>
    <source src="/car.mp4" type="video/mp4">
  </video>

  <!-- CINEMATIC LAYERS -->
  <div class="ci-hero-grade"></div>
  <div class="ci-hero-grain-layer"></div>
  <div class="ci-hero-vignette"></div>

  <!-- CONTENT -->
  <div class="cn-hero-content">
    <div class="cn-hero-label">AI-Powered Luxury Travel</div>
    <h1 class="cn-headline">
      <span class="line"><span class="word">Discover</span>&nbsp;<span class="word">Your</span></span>
      <span class="line"><span class="word"><em>Next</em></span>&nbsp;<span class="word">Escape</span></span>
    </h1>
    <p class="cn-sub">Luxury journeys powered by AI and crafted for your travel DNA.</p>
    <div class="cn-btns">
      <a href="/explore" class="cn-btn-primary">
        <span>Explore Destinations</span>
        <i class="ri-arrow-right-line"></i>
      </a>
      <a href="#ai-planner" class="cn-btn-ghost">
        <span>Start Planning</span>
        <i class="ri-sparkling-2-line"></i>
      </a>
    </div>
  </div>

  <!-- Scroll hint -->
  <div class="cn-hero-scroll-hint">
    <div class="cn-scroll-text">Scroll</div>
    <div class="cn-scroll-line"></div>
  </div>

  <!-- Location badge -->
  <div class="cn-location-badge">
    <div class="cn-loc-dot"></div>
    <div class="cn-loc-text">
      <span class="cn-loc-name">Norwegian Fjords</span>
      <span class="cn-loc-region">Scandinavia, Europe</span>
    </div>
  </div>

  <!-- Stats strip -->
  <div class="cn-stats-strip">
    <div class="cn-stat-item"><div class="cn-stat-num">500+</div><div class="cn-stat-label">Dream<br>Destinations</div></div>
    <div class="cn-stat-item"><div class="cn-stat-num">12K+</div><div class="cn-stat-label">Happy<br>Travelers</div></div>
    <div class="cn-stat-item"><div class="cn-stat-num">98%</div><div class="cn-stat-label">Satisfaction<br>Rate</div></div>
    <div class="cn-stat-item"><div class="cn-stat-num">150+</div><div class="cn-stat-label">Curated<br>Packages</div></div>
  </div>
</section>

<!-- ═══ SECTION 2: SPIRAL BRIDGE → EXISTING SPIRAL ═══ -->
<section class="cn-spiral-bridge">
  <div class="cn-bridge-label">↓ Entering Your Travel Universe ↓</div>
  <div class="cn-bridge-line"></div>

  <!-- Original spiral canvas -->
  <div id="webgl-container" style="position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;">
    <canvas id="webgl-canvas" style="width:100%;height:100%;display:block;"></canvas>
  </div>

  <div class="hero-overlay" style="position:absolute;inset:0;z-index:2;
    background:linear-gradient(to bottom,rgba(8,8,8,.6) 0%,rgba(8,8,8,.1) 40%,rgba(8,8,8,.7) 100%);
    pointer-events:none;">
  </div>

  <div class="hero-content" style="position:relative;z-index:3;max-width:1440px;
    margin:0 auto;padding:0 48px;text-align:center;">
    <p class="hero-label">Where Next? — AI Travel Intelligence</p>
    <h2 style="font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,7vw,6rem);
      font-weight:700;color:#fff;letter-spacing:-.02em;line-height:1;margin-bottom:24px;">
      Your Journey,<br><em style="font-style:italic;color:rgba(255,255,255,.45)">Reimagined.</em>
    </h2>
    <p style="font-family:'Space Grotesk',sans-serif;font-size:1rem;
      color:rgba(255,255,255,.4);max-width:400px;margin:0 auto 40px;line-height:1.7;">
      Handpicked destinations, expert-crafted itineraries, and unforgettable moments.
    </p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
      <a href="/explore" class="cn-btn-primary">
        <span>Start Exploring</span>
        <i class="ri-arrow-right-line"></i>
      </a>
      <a href="#destinations" class="cn-btn-ghost">See Destinations</a>
    </div>
  </div>
</section>

<!-- ═══ DESTINATIONS STRIP ═══ -->
<section class="section" id="destinations" style="background:#080808;padding:80px 0 0;">
  <div class="container" data-reveal>
    <div class="section-header">
      <div class="section-label">Top Picks</div>
      <h2 class="section-title" style="color:#fff;">Stunning Destinations</h2>
      <p class="section-subtitle">Explore our handpicked collection of the world's most awe-inspiring places.</p>
    </div>
  </div>
  <div class="cn-dest-strip">
    {#each [
      {img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',name:'Bali',region:'Indonesia'},
      {img:'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80',name:'Amalfi Coast',region:'Italy'},
      {img:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',name:'Paris',region:'France'},
      {img:'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80',name:'Venice',region:'Italy'},
      {img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',name:'Kyoto',region:'Japan'}
    ] as d}
      <div class="cn-dest-strip-item">
        <img src={d.img} alt={d.name} loading="lazy" />
        <div class="cn-dest-info">
          <h3>{d.name}</h3>
          <p>{d.region}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- ═══ PACKAGES ═══ -->
<section class="section section-dark" id="packages">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Featured</div>
      <h2 class="section-title">Popular Packages</h2>
      <p class="section-subtitle">Hand-crafted itineraries designed for unforgettable experiences.</p>
    </div>
    <div class="pkg-grid" data-stagger>
      {#each [
        {img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',badge:'Best Seller',name:'Maldives Luxury Escape',days:'5',loc:'Maldives',rating:'4.9',price:'$2,499'},
        {img:'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',badge:'Popular',name:'Swiss Alps Adventure',days:'7',loc:'Switzerland',rating:'4.8',price:'$3,199'},
        {img:'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80',badge:'New',name:'Greek Islands Tour',days:'6',loc:'Greece',rating:'4.7',price:'$1,899'}
      ] as p}
        <div class="pkg-card">
          <div class="pkg-card-img">
            <img src={p.img} alt={p.name} loading="lazy" />
            <div class="pkg-badge">{p.badge}</div>
          </div>
          <div class="pkg-card-body">
            <h3>{p.name}</h3>
            <div class="pkg-meta">
              <span><i class="ri-time-line"></i> {p.days} Days</span>
              <span><i class="ri-map-pin-line"></i> {p.loc}</span>
              <span><i class="ri-star-fill"></i> {p.rating}</span>
            </div>
            <div class="pkg-price"><span class="amount">{p.price}</span><span class="per">/ person</span></div>
            <a href="/explore" class="btn btn-primary btn-sm">View Details <i class="ri-arrow-right-s-line"></i></a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══ FEATURES ═══ -->
<section class="section" id="experiences">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Why Us</div>
      <h2 class="section-title">Why Choose Where Next</h2>
      <p class="section-subtitle">We go beyond ordinary to craft journeys that stay with you forever.</p>
    </div>
    <div class="features-grid" data-stagger>
      {#each [
        {icon:'ri-shield-check-line',title:'100% Trusted',desc:'Verified partners, secure payments, and transparent pricing on every booking.'},
        {icon:'ri-hand-heart-line',title:'Curated Experiences',desc:'Handpicked itineraries crafted by local experts who know every hidden gem.'},
        {icon:'ri-customer-service-2-line',title:'24/7 Support',desc:'Round-the-clock assistance from our dedicated travel concierge team.'},
        {icon:'ri-price-tag-3-line',title:'Best Price Guarantee',desc:"Find a lower price elsewhere? We'll match it — no questions asked."}
      ] as f}
        <div class="feature-card">
          <div class="feature-icon"><i class={f.icon}></i></div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══ TESTIMONIALS ═══ -->
<section class="section section-dark testimonials-section" id="stories">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Reviews</div>
      <h2 class="section-title">What Travelers Say</h2>
      <p class="section-subtitle">Real stories from real adventurers who trusted us with their journeys.</p>
    </div>
    <div class="swiper testimonials-swiper">
      <div class="swiper-wrapper">
        {#each [
          {text:'"Our Bali trip was absolutely magical. Every detail was planned to perfection."',name:'Sarah Mitchell',role:'Bali, 2025',avatar:'https://i.pravatar.cc/100?img=32'},
          {text:'"The Swiss Alps package exceeded every expectation. World class service."',name:'James Rodriguez',role:'Switzerland, 2025',avatar:'https://i.pravatar.cc/100?img=12'},
          {text:'"Best travel agency we\'ve ever used. Truly 5-star service."',name:'Priya Sharma',role:'Maldives, 2026',avatar:'https://i.pravatar.cc/100?img=47'},
          {text:'"Effortless booking, gorgeous itinerary, and memories for a lifetime."',name:'Emma Chen',role:'Greece, 2025',avatar:'https://i.pravatar.cc/100?img=68'}
        ] as t}
          <div class="swiper-slide">
            <div class="testimonial-card">
              <div class="testimonial-stars">★★★★★</div>
              <p class="testimonial-text">{t.text}</p>
              <div class="testimonial-author">
                <img class="testimonial-avatar" src={t.avatar} alt={t.name} />
                <div>
                  <div class="testimonial-name">{t.name}</div>
                  <div class="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</section>

<!-- ═══ GALLERY ═══ -->
<section class="section" id="gallery">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Moments</div>
      <h2 class="section-title">Travel Gallery</h2>
      <p class="section-subtitle">A glimpse into the extraordinary moments that await you.</p>
    </div>
    <div class="gallery-grid" data-stagger>
      <div class="gallery-item g-tall"><img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80" alt="Valley" loading="lazy" /></div>
      <div class="gallery-item g-wide"><img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80" alt="Mountains" loading="lazy" /></div>
      <div class="gallery-item"><img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80" alt="Forest" loading="lazy" /></div>
      <div class="gallery-item"><img src="https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=400&q=80" alt="Lake" loading="lazy" /></div>
      <div class="gallery-item g-wide"><img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80" alt="Balloons" loading="lazy" /></div>
      <div class="gallery-item g-tall"><img src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80" alt="Camping" loading="lazy" /></div>
      <div class="gallery-item"><img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80" alt="Sunset" loading="lazy" /></div>
      <div class="gallery-item"><img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&q=80" alt="Beach" loading="lazy" /></div>
    </div>
  </div>
</section>

<!-- ═══ FAQ ═══ -->
<section class="section" id="faq">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Support</div>
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-subtitle">Everything you need to know before booking your next adventure.</p>
    </div>
    <div class="faq-list" data-reveal>
      {#each [
        {q:'How do I book a travel package?',a:"Browse our packages on the Explore page, select your preferred trip, and click 'Book Now'. You'll be guided through a simple checkout process with secure payment options."},
        {q:'Can I customize my itinerary?',a:"Absolutely! All our packages are fully customizable. Contact our travel concierge to tailor any trip to your preferences, budget, and schedule."},
        {q:"What's your cancellation policy?",a:'We offer free cancellation up to 30 days before departure. Cancellations within 14-30 days receive a 50% refund.'},
        {q:'Are flights included in the packages?',a:"Most premium packages include flights. Budget-friendly options may be accommodation-only. Each listing clearly states what's included."},
        {q:'Do you offer group discounts?',a:'Yes! Groups of 4 or more receive up to 15% off. Contact our team for custom group pricing.'}
      ] as f, i}
        <div class="faq-item" class:active={i===0}>
          <div class="faq-question"><span>{f.q}</span><i class="ri-add-line"></i></div>
          <div class="faq-answer">{f.a}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══ NEWSLETTER ═══ -->
<section class="section section-dark" id="contact">
  <div class="container newsletter" data-reveal>
    <div class="section-label">Stay Updated</div>
    <h2 class="section-title">Get Travel Inspiration</h2>
    <p class="section-subtitle" style="margin:0 auto 0">Join 12,000+ travelers who receive our weekly curated destination guides.</p>
    <form class="newsletter-form" on:submit|preventDefault={() => alert('Subscribed! (Demo)')}>
      <input type="email" placeholder="Enter your email" required />
      <button class="btn btn-primary" type="submit">Subscribe</button>
    </form>
  </div>
</section>
