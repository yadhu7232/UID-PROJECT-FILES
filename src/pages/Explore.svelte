<script>
  import { onMount, onDestroy } from "svelte";

  let activeFilter = "All";
  function setFilter(f) {
    activeFilter = f;
  }

  onMount(() => {
    requestAnimationFrame(() => {
      const gsap = window.gsap;
      const ST = window.ScrollTrigger;
      if (!gsap || !ST) return;
      gsap.registerPlugin(ST);

      document.querySelectorAll("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      document.querySelectorAll("[data-stagger]").forEach((c) => {
        gsap.from(c.children, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: c, start: "top 82%" },
        });
      });
      document.querySelectorAll(".btn-primary").forEach((btn) => {
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
    });
  });

  onDestroy(() => {
    if (window.ScrollTrigger)
      window.ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>

<!-- Explore Hero -->
<section class="explore-hero">
  <img
    class="explore-hero-bg"
    src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
    alt="Hot air balloons"
  />
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <p class="hero-label">Find Your Perfect Trip</p>
    <h1>Explore Packages</h1>
    <form class="search-bar" on:submit|preventDefault>
      <input type="text" placeholder="Search destinations, packages..." />
      <button class="btn btn-primary" type="submit"
        ><i class="ri-search-line"></i> Search</button
      >
    </form>
  </div>
</section>

<!-- Filters + Grid -->
<section class="section">
  <div class="container">
    <div class="filters" data-reveal>
      {#each ["All", "Beach", "Mountain", "City", "Adventure", "Luxury"] as f}
        <button
          class="filter-btn"
          class:active={activeFilter === f}
          on:click={() => setFilter(f)}>{f}</button
        >
      {/each}
    </div>
    <div class="explore-grid" data-stagger>
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
          <a
            href="#"
            class="btn btn-primary btn-sm"
            style="width:100%;justify-content:center">View Details</a
          >
        </div>
      </div>
      <div class="pkg-card">
        <div class="pkg-card-img">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80"
            alt="Swiss Alps"
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
          <a
            href="#"
            class="btn btn-primary btn-sm"
            style="width:100%;justify-content:center">View Details</a
          >
        </div>
      </div>
      <div class="pkg-card">
        <div class="pkg-card-img">
          <img
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80"
            alt="Santorini"
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
          <a
            href="#"
            class="btn btn-primary btn-sm"
            style="width:100%;justify-content:center">View Details</a
          >
        </div>
      </div>
      <div class="pkg-card">
        <div class="pkg-card-img">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80"
            alt="Paris"
            loading="lazy"
          />
        </div>
        <div class="pkg-card-body">
          <h3>Romantic Paris Getaway</h3>
          <div class="pkg-meta">
            <span><i class="ri-time-line"></i> 4 Days</span><span
              ><i class="ri-map-pin-line"></i> France</span
            ><span><i class="ri-star-fill"></i> 4.9</span>
          </div>
          <div class="pkg-price">
            <span class="amount">$1,599</span><span class="per">/ person</span>
          </div>
          <a
            href="#"
            class="btn btn-primary btn-sm"
            style="width:100%;justify-content:center">View Details</a
          >
        </div>
      </div>
      <div class="pkg-card">
        <div class="pkg-card-img">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80"
            alt="Bali"
            loading="lazy"
          />
          <div class="pkg-badge">Trending</div>
        </div>
        <div class="pkg-card-body">
          <h3>Bali Cultural Journey</h3>
          <div class="pkg-meta">
            <span><i class="ri-time-line"></i> 8 Days</span><span
              ><i class="ri-map-pin-line"></i> Indonesia</span
            ><span><i class="ri-star-fill"></i> 4.8</span>
          </div>
          <div class="pkg-price">
            <span class="amount">$1,299</span><span class="per">/ person</span>
          </div>
          <a
            href="#"
            class="btn btn-primary btn-sm"
            style="width:100%;justify-content:center">View Details</a
          >
        </div>
      </div>
      <div class="pkg-card">
        <div class="pkg-card-img">
          <img
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80"
            alt="Safari"
            loading="lazy"
          />
        </div>
        <div class="pkg-card-body">
          <h3>African Safari Expedition</h3>
          <div class="pkg-meta">
            <span><i class="ri-time-line"></i> 10 Days</span><span
              ><i class="ri-map-pin-line"></i> Kenya</span
            ><span><i class="ri-star-fill"></i> 4.9</span>
          </div>
          <div class="pkg-price">
            <span class="amount">$4,299</span><span class="per">/ person</span>
          </div>
          <a
            href="#"
            class="btn btn-primary btn-sm"
            style="width:100%;justify-content:center">View Details</a
          >
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Trending -->
<section class="section section-dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Hot Right Now</div>
      <h2 class="section-title">Trending Destinations</h2>
    </div>
    <div class="trending-grid" data-stagger>
      <div class="trending-card">
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80"
          alt="Italy"
          loading="lazy"
        />
        <div class="trending-card-overlay"></div>
        <div class="trending-card-info">
          <h3>Amalfi Coast</h3>
          <p>Starting at $1,899</p>
        </div>
      </div>
      <div class="trending-card">
        <img
          src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80"
          alt="Venice"
          loading="lazy"
        />
        <div class="trending-card-overlay"></div>
        <div class="trending-card-info">
          <h3>Venice</h3>
          <p>Starting at $1,499</p>
        </div>
      </div>
      <div class="trending-card">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80"
          alt="Valley"
          loading="lazy"
        />
        <div class="trending-card-overlay"></div>
        <div class="trending-card-info">
          <h3>Norwegian Fjords</h3>
          <p>Starting at $2,799</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section">
  <div class="container">
    <div class="cta-section" data-reveal>
      <div class="section-label">Ready?</div>
      <h2>Start Planning Your Dream Trip</h2>
      <p>Join 12,000+ travelers who've discovered the world with Where Next.</p>
      <a href="/login" class="btn btn-primary"
        >Get Started <i class="ri-arrow-right-line"></i></a
      >
    </div>
  </div>
</section>
