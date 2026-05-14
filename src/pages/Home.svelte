<script>
  import { onMount, onDestroy } from "svelte";

  let triggers = [];

  onMount(() => {
    // Initialize spiral
    if (window.initSpiral) window.initSpiral();

    // Wait a tick for DOM to be ready
    requestAnimationFrame(() => {
      const gsap = window.gsap;
      const ST = window.ScrollTrigger;
      if (!gsap || !ST) return;
      gsap.registerPlugin(ST);

      // Hero fade-up
      gsap.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".scroll-indicator", {
        opacity: 0,
        y: 15,
        duration: 0.8,
        delay: 1.2,
      });

      // Scroll reveals
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        const t = gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        triggers.push(t);
      });

      // Stagger children
      document.querySelectorAll("[data-stagger]").forEach((c) => {
        const t = gsap.from(c.children, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: c, start: "top 82%" },
        });
        triggers.push(t);
      });

      // Counters
      document.querySelectorAll(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || "";
        ST.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(
              { v: 0 },
              {
                v: target,
                duration: 2.2,
                ease: "power2.out",
                onUpdate: function () {
                  el.textContent = Math.floor(this.targets()[0].v) + suffix;
                },
              },
            );
          },
        });
      });

      // 3D tilt on dest cards
      document.querySelectorAll(".dest-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          gsap.to(card, {
            rotateY: ((e.clientX - r.left) / r.width - 0.5) * 8,
            rotateX: -((e.clientY - r.top) / r.height - 0.5) * 8,
            transformPerspective: 800,
            duration: 0.4,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.6,
            ease: "elastic.out(1,0.4)",
          });
        });
      });

      // Magnetic buttons
      document.querySelectorAll(".btn-primary, .nav-cta").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.2,
            y: (e.clientY - r.top - r.height / 2) * 0.2,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1,0.3)",
          });
        });
      });

      // Swiper
      if (window.Swiper) {
        new window.Swiper(".testimonials-swiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          autoplay: { delay: 4000, disableOnInteraction: false },
          pagination: { el: ".swiper-pagination", clickable: true },
          breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          },
        });
      }

      // FAQ
      document.querySelectorAll(".faq-question").forEach((q) => {
        q.addEventListener("click", () => {
          const item = q.parentElement;
          const wasOpen = item.classList.contains("active");
          document
            .querySelectorAll(".faq-item")
            .forEach((i) => i.classList.remove("active"));
          if (!wasOpen) item.classList.add("active");
        });
      });
    });
  });

  onDestroy(() => {
    if (window.destroySpiral) window.destroySpiral();
    if (window.ScrollTrigger)
      window.ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>

<!-- Hero with Video + Auto-Rolling Spiral -->
<section class="hero" id="hero">
  <video
    class="hero-video"
    autoplay
    muted
    loop
    playsinline
    poster="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80"
  >
    <source
      src="https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4"
      type="video/mp4"
    />
  </video>
  <div id="webgl-container">
    <canvas id="webgl-canvas"></canvas>
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <p class="hero-label">Travel beyond the ordinary</p>
    <h1>Find your<br /><em>next story.</em></h1>
    <p class="hero-subtitle">
      Handpicked destinations, expert-crafted itineraries, and unforgettable
      moments — all in one place.
    </p>
    <div class="hero-btns">
      <a href="/explore" class="btn btn-primary"
        >Start Exploring <i class="ri-arrow-right-line"></i></a
      >
      <a href="#destinations" class="btn btn-ghost">See Destinations</a>
    </div>
  </div>
  <div class="scroll-indicator">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<!-- Marquee -->
<div class="marquee">
  <div class="marquee-track">
    <span>Bali</span><span>Santorini</span><span>Paris</span><span
      >Maldives</span
    ><span>Tokyo</span><span>Iceland</span><span>Amalfi Coast</span><span
      >Patagonia</span
    ><span>Swiss Alps</span><span>Kyoto</span><span>Venice</span><span
      >New Zealand</span
    >
    <span>Bali</span><span>Santorini</span><span>Paris</span><span
      >Maldives</span
    ><span>Tokyo</span><span>Iceland</span><span>Amalfi Coast</span><span
      >Patagonia</span
    ><span>Swiss Alps</span><span>Kyoto</span><span>Venice</span><span
      >New Zealand</span
    >
  </div>
</div>

<!-- Stats -->
<section class="stats">
  <div class="stats-grid">
    <div data-reveal>
      <div class="stat-num" data-count="500" data-suffix="+">0</div>
      <div class="stat-label">Destinations</div>
    </div>
    <div data-reveal>
      <div class="stat-num" data-count="12000" data-suffix="+">0</div>
      <div class="stat-label">Happy Travelers</div>
    </div>
    <div data-reveal>
      <div class="stat-num" data-count="98" data-suffix="%">0</div>
      <div class="stat-label">Satisfaction Rate</div>
    </div>
    <div data-reveal>
      <div class="stat-num" data-count="150" data-suffix="+">0</div>
      <div class="stat-label">Tour Packages</div>
    </div>
  </div>
</section>

<!-- Destinations -->
<section class="section" id="destinations">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Top Picks</div>
      <h2 class="section-title">Stunning Destinations</h2>
      <p class="section-subtitle">
        Explore our handpicked collection of the world's most awe-inspiring
        places.
      </p>
    </div>
    <div class="dest-grid" data-stagger>
      <div class="dest-card">
        <img
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80"
          alt="Bali"
          loading="lazy"
        />
        <div class="dest-card-overlay"></div>
        <div class="dest-card-info">
          <div class="dest-card-rating"><i class="ri-star-fill"></i> 4.9</div>
          <h3>Bali, Indonesia</h3>
          <p>Temples, rice terraces & beaches</p>
        </div>
      </div>
      <div class="dest-card">
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80"
          alt="Amalfi"
          loading="lazy"
        />
        <div class="dest-card-overlay"></div>
        <div class="dest-card-info">
          <div class="dest-card-rating"><i class="ri-star-fill"></i> 4.8</div>
          <h3>Amalfi Coast, Italy</h3>
          <p>Cliffside villages & azure waters</p>
        </div>
      </div>
      <div class="dest-card">
        <img
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80"
          alt="Paris"
          loading="lazy"
        />
        <div class="dest-card-overlay"></div>
        <div class="dest-card-info">
          <div class="dest-card-rating"><i class="ri-star-fill"></i> 4.9</div>
          <h3>Paris, France</h3>
          <p>Art, culture & culinary delights</p>
        </div>
      </div>
      <div class="dest-card">
        <img
          src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80"
          alt="Venice"
          loading="lazy"
        />
        <div class="dest-card-overlay"></div>
        <div class="dest-card-info">
          <div class="dest-card-rating"><i class="ri-star-fill"></i> 4.7</div>
          <h3>Venice, Italy</h3>
          <p>Canals, gondolas & history</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Packages -->
<section class="section section-dark" id="packages">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Featured</div>
      <h2 class="section-title">Popular Packages</h2>
      <p class="section-subtitle">
        Hand-crafted itineraries designed for unforgettable experiences.
      </p>
    </div>
    <div class="pkg-grid" data-stagger>
      <div class="pkg-card">
        <div class="pkg-card-img">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80"
            alt="Maldives"
            loading="lazy"
          />
          <div class="pkg-badge">Best Seller</div>
        </div>
        <div class="pkg-card-body">
          <h3>Maldives Luxury Escape</h3>
          <div class="pkg-meta">
            <span><i class="ri-time-line"></i> 5 Days</span><span
              ><i class="ri-map-pin-line"></i> Maldives</span
            ><span><i class="ri-star-fill"></i> 4.9</span>
          </div>
          <div class="pkg-price">
            <span class="amount">$2,499</span><span class="per">/ person</span>
          </div>
          <a href="/explore" class="btn btn-primary btn-sm"
            >View Details <i class="ri-arrow-right-s-line"></i></a
          >
        </div>
      </div>
      <div class="pkg-card">
        <div class="pkg-card-img">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80"
            alt="Alps"
            loading="lazy"
          />
          <div class="pkg-badge">Popular</div>
        </div>
        <div class="pkg-card-body">
          <h3>Swiss Alps Adventure</h3>
          <div class="pkg-meta">
            <span><i class="ri-time-line"></i> 7 Days</span><span
              ><i class="ri-map-pin-line"></i> Switzerland</span
            ><span><i class="ri-star-fill"></i> 4.8</span>
          </div>
          <div class="pkg-price">
            <span class="amount">$3,199</span><span class="per">/ person</span>
          </div>
          <a href="/explore" class="btn btn-primary btn-sm"
            >View Details <i class="ri-arrow-right-s-line"></i></a
          >
        </div>
      </div>
      <div class="pkg-card">
        <div class="pkg-card-img">
          <img
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80"
            alt="Greece"
            loading="lazy"
          />
          <div class="pkg-badge">New</div>
        </div>
        <div class="pkg-card-body">
          <h3>Greek Islands Tour</h3>
          <div class="pkg-meta">
            <span><i class="ri-time-line"></i> 6 Days</span><span
              ><i class="ri-map-pin-line"></i> Greece</span
            ><span><i class="ri-star-fill"></i> 4.7</span>
          </div>
          <div class="pkg-price">
            <span class="amount">$1,899</span><span class="per">/ person</span>
          </div>
          <a href="/explore" class="btn btn-primary btn-sm"
            >View Details <i class="ri-arrow-right-s-line"></i></a
          >
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Why Choose Us -->
<section class="section">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Why Us</div>
      <h2 class="section-title">Why Choose Where Next</h2>
      <p class="section-subtitle">
        We go beyond ordinary to craft journeys that stay with you forever.
      </p>
    </div>
    <div class="features-grid" data-stagger>
      <div class="feature-card">
        <div class="feature-icon"><i class="ri-shield-check-line"></i></div>
        <h3>100% Trusted</h3>
        <p>
          Verified partners, secure payments, and transparent pricing on every
          booking.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><i class="ri-hand-heart-line"></i></div>
        <h3>Curated Experiences</h3>
        <p>
          Handpicked itineraries crafted by local experts who know every hidden
          gem.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <i class="ri-customer-service-2-line"></i>
        </div>
        <h3>24/7 Support</h3>
        <p>
          Round-the-clock assistance from our dedicated travel concierge team.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><i class="ri-price-tag-3-line"></i></div>
        <h3>Best Price Guarantee</h3>
        <p>
          Find a lower price elsewhere? We'll match it — no questions asked.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="section section-dark testimonials-section" id="testimonials">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Reviews</div>
      <h2 class="section-title">What Travelers Say</h2>
      <p class="section-subtitle">
        Real stories from real adventurers who trusted us with their journeys.
      </p>
    </div>
    <div class="swiper testimonials-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="testimonial-card">
            <div class="testimonial-stars">
              <i class="ri-star-fill"></i><i class="ri-star-fill"></i><i
                class="ri-star-fill"
              ></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i>
            </div>
            <p class="testimonial-text">
              "Our Bali trip was absolutely magical. Every detail was planned to
              perfection."
            </p>
            <div class="testimonial-author">
              <img
                class="testimonial-avatar"
                src="https://i.pravatar.cc/100?img=32"
                alt="Sarah"
              />
              <div>
                <div class="testimonial-name">Sarah Mitchell</div>
                <div class="testimonial-role">Bali, 2025</div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="testimonial-card">
            <div class="testimonial-stars">
              <i class="ri-star-fill"></i><i class="ri-star-fill"></i><i
                class="ri-star-fill"
              ></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i>
            </div>
            <p class="testimonial-text">
              "The Swiss Alps package exceeded every expectation. World class
              service."
            </p>
            <div class="testimonial-author">
              <img
                class="testimonial-avatar"
                src="https://i.pravatar.cc/100?img=12"
                alt="James"
              />
              <div>
                <div class="testimonial-name">James Rodriguez</div>
                <div class="testimonial-role">Switzerland, 2025</div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="testimonial-card">
            <div class="testimonial-stars">
              <i class="ri-star-fill"></i><i class="ri-star-fill"></i><i
                class="ri-star-fill"
              ></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i>
            </div>
            <p class="testimonial-text">
              "Best travel agency we've ever used. Truly 5-star service."
            </p>
            <div class="testimonial-author">
              <img
                class="testimonial-avatar"
                src="https://i.pravatar.cc/100?img=47"
                alt="Priya"
              />
              <div>
                <div class="testimonial-name">Priya Sharma</div>
                <div class="testimonial-role">Maldives, 2026</div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="testimonial-card">
            <div class="testimonial-stars">
              <i class="ri-star-fill"></i><i class="ri-star-fill"></i><i
                class="ri-star-fill"
              ></i><i class="ri-star-fill"></i><i class="ri-star-half-fill"></i>
            </div>
            <p class="testimonial-text">
              "Effortless booking, gorgeous itinerary, and memories for a
              lifetime."
            </p>
            <div class="testimonial-author">
              <img
                class="testimonial-avatar"
                src="https://i.pravatar.cc/100?img=68"
                alt="Emma"
              />
              <div>
                <div class="testimonial-name">Emma Chen</div>
                <div class="testimonial-role">Greece, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</section>

<!-- Gallery -->
<section class="section" id="gallery">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Moments</div>
      <h2 class="section-title">Travel Gallery</h2>
      <p class="section-subtitle">
        A glimpse into the extraordinary moments that await you.
      </p>
    </div>
    <div class="gallery-grid" data-stagger>
      <div class="gallery-item g-tall">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80"
          alt="Valley"
          loading="lazy"
        />
      </div>
      <div class="gallery-item g-wide">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80"
          alt="Mountains"
          loading="lazy"
        />
      </div>
      <div class="gallery-item">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80"
          alt="Forest"
          loading="lazy"
        />
      </div>
      <div class="gallery-item">
        <img
          src="https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=400&q=80"
          alt="Lake"
          loading="lazy"
        />
      </div>
      <div class="gallery-item g-wide">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80"
          alt="Balloons"
          loading="lazy"
        />
      </div>
      <div class="gallery-item g-tall">
        <img
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80"
          alt="Camping"
          loading="lazy"
        />
      </div>
      <div class="gallery-item">
        <img
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80"
          alt="Sunset"
          loading="lazy"
        />
      </div>
      <div class="gallery-item">
        <img
          src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&q=80"
          alt="Beach"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section" id="faq">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Support</div>
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-subtitle">
        Everything you need to know before booking your next adventure.
      </p>
    </div>
    <div class="faq-list" data-reveal>
      <div class="faq-item active">
        <div class="faq-question">
          <span>How do I book a travel package?</span><i class="ri-add-line"
          ></i>
        </div>
        <div class="faq-answer">
          Browse our packages on the Explore page, select your preferred trip,
          and click "Book Now". You'll be guided through a simple checkout
          process with secure payment options.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          <span>Can I customize my itinerary?</span><i class="ri-add-line"></i>
        </div>
        <div class="faq-answer">
          Absolutely! All our packages are fully customizable. Contact our
          travel concierge to tailor any trip to your preferences, budget, and
          schedule.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          <span>What's your cancellation policy?</span><i class="ri-add-line"
          ></i>
        </div>
        <div class="faq-answer">
          We offer free cancellation up to 30 days before departure.
          Cancellations within 14-30 days receive a 50% refund.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          <span>Are flights included in the packages?</span><i
            class="ri-add-line"
          ></i>
        </div>
        <div class="faq-answer">
          Most premium packages include flights. Budget-friendly options may be
          accommodation-only. Each listing clearly states what's included.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          <span>Do you offer group discounts?</span><i class="ri-add-line"></i>
        </div>
        <div class="faq-answer">
          Yes! Groups of 4 or more receive up to 15% off. Contact our team for
          custom group pricing.
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Newsletter -->
<section class="section section-dark">
  <div class="container newsletter" data-reveal>
    <div class="section-label">Stay Updated</div>
    <h2 class="section-title">Get Travel Inspiration</h2>
    <p class="section-subtitle" style="margin:0 auto 0">
      Join 12,000+ travelers who receive our weekly curated destination guides.
    </p>
    <form
      class="newsletter-form"
      on:submit|preventDefault={() => alert("Subscribed! (Demo)")}
    >
      <input type="email" placeholder="Enter your email" required />
      <button class="btn btn-primary" type="submit">Subscribe</button>
    </form>
  </div>
</section>
