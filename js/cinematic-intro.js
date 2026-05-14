/* ═══ WHERE NEXT? — CINEMATIC INTRO ENGINE ═══ */
window.CinematicIntro = (function () {

  function init() {
    buildDOM();
    startTimeline();
  }

  /* ─────────────────────────────────────────
     BUILD DOM
  ───────────────────────────────────────── */
  function buildDOM() {
    const root = document.getElementById('cn-intro');
    if (!root) return;
    root.innerHTML = `
      <!-- GRAIN OVERLAY -->
      <canvas id="ci-grain" style="position:absolute;inset:0;width:100%;height:100%;z-index:20;pointer-events:none;opacity:.55;mix-blend-mode:overlay;"></canvas>

      <!-- AMBIENT PARTICLES -->
      <canvas id="ci-particles" style="position:absolute;inset:0;width:100%;height:100%;z-index:18;pointer-events:none;"></canvas>

      <!-- CABIN INTERIOR -->
      <div id="ci-cabin">
        <!-- Curved wall paneling -->
        <div class="ci-wall"></div>
      </div>

      <!-- THE WINDOW -->
      <div id="ci-window-wrap">
        <div id="ci-window-outer">
          <div id="ci-window-frame">
            <div class="ci-win-shade"></div>
            <!-- inner border plastic bevel -->
            <div class="ci-win-inner-bevel"></div>
            <div class="ci-win-glow"></div>
            <!-- reflection streaks -->
            <div class="ci-win-refl ci-wr1"></div>
            <div class="ci-win-refl ci-wr2"></div>
            <!-- VIDEO INSIDE WINDOW -->
            <div id="ci-win-content">
              <video id="ci-vid" autoplay muted loop playsinline>
                <source src="/car.mp4" type="video/mp4">
              </video>
              <div class="ci-grade"></div>
              <div class="ci-fog"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- FOREGROUND SEATS -->
      <div id="ci-seats">
        <div class="ci-seat ci-seat-left"></div>
        <div class="ci-seat ci-seat-right">
          <div class="ci-seat-headrest">
             <div class="ci-seat-headrest-cloth"></div>
          </div>
          <div class="ci-seat-body"></div>
        </div>
      </div>



      <!-- LOGO + TEXT OVERLAY -->
      <div id="ci-text">
        <div class="ci-tagline">A New Way to Travel</div>
        <div class="ci-brand">WHERE NEXT?</div>
        <div class="ci-sub">Curated journeys powered by AI.</div>
      </div>

      <!-- PROGRESS LINE -->
      <div id="ci-progress-wrap">
        <div id="ci-progress-fill"></div>
        <div id="ci-progress-label">Loading Experience</div>
      </div>

      <!-- WHITE FLASH for final transition -->
      <div id="ci-flash"></div>
    `;
  }

  /* ─────────────────────────────────────────
     FILM GRAIN
  ───────────────────────────────────────── */
  function initGrain() {
    const c = document.getElementById('ci-grain');
    if (!c) return;
    const ctx = c.getContext('2d');
    function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    function draw() {
      const img = ctx.createImageData(c.width, c.height);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = d[i+1] = d[i+2] = v; d[i+3] = 18;
      }
      ctx.putImageData(img, 0, 0);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ─────────────────────────────────────────
     AMBIENT PARTICLES
  ───────────────────────────────────────── */
  function initParticles() {
    const c = document.getElementById('ci-particles');
    if (!c) return;
    const ctx = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    const pts = Array.from({length: 60}, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .12,
      a: Math.random() * .25 + .05
    }));
    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,160,255,${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ─────────────────────────────────────────
     CABIN BREATHING
  ───────────────────────────────────────── */
  function initCabinBreath() {
    const root = document.getElementById('cn-intro');
    if (!root || !window.gsap) return;
    gsap.to(root, {
      y: -4, duration: 2.8, ease: 'sine.inOut',
      yoyo: true, repeat: -1
    });
  }

  /* ─────────────────────────────────────────
     MAIN TIMELINE
  ───────────────────────────────────────── */
  function startTimeline() {
    if (!window.gsap) { fallback(); return; }
    const gsap = window.gsap;

    initGrain();
    initParticles();
    initCabinBreath();

    const fill = document.getElementById('ci-progress-fill');
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // ── 0.0s  TOTAL DARKNESS, nothing visible ──
    gsap.set('#ci-cabin', { opacity: 0 });
    gsap.set('#ci-seats', { opacity: 0 });
    gsap.set('#ci-window-wrap', { opacity: 0 });
    gsap.set('#ci-text', { opacity: 0 });
    gsap.set('#ci-win-content video', { opacity: 0 });
    gsap.set('#ci-flash', { opacity: 0, pointerEvents: 'none' });

    // progress bar tween helper
    tl.to(fill, { width: '100%', duration: 9.5, ease: 'none' }, 0);

    // ── 0.5s  CABIN BEGINS TO EMERGE ──
    tl.to('#ci-cabin', { opacity: 1, duration: 3.5, ease: 'power1.inOut' }, 0.5);
    tl.to('#ci-seats', { opacity: 1, duration: 3.5, ease: 'power1.inOut' }, 0.5);

    // ── 1.5s  WINDOW GLOWS ON ──
    tl.to('#ci-window-wrap', { opacity: 1, duration: 2.5 }, 1.5);

    // ── 2.5s  VIDEO FADES IN INSIDE WINDOW ──
    tl.to('#ci-win-content video', { opacity: 1, duration: 3, ease: 'power1.inOut' }, 2.5);

    // ── 4.5s  BRAND TEXT REVEALS ──
    tl.fromTo('.ci-tagline',
      { opacity: 0, y: 14, letterSpacing: '0.5em' },
      { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 1.2 }, 4.5);
    tl.fromTo('.ci-brand',
      { opacity: 0, y: 20, letterSpacing: '0.15em' },
      { opacity: 1, y: 0, letterSpacing: '0.3em', duration: 1.5 }, 5.0);
    tl.fromTo('.ci-sub',
      { opacity: 0, y: 12 },
      { opacity: 0.55, y: 0, duration: 1.2 }, 5.8);

    // ── 7.0s  WINDOW STARTS EXPANDING ──
    tl.to('#ci-progress-wrap', { opacity: 0, duration: 0.6 }, 7.0);
    tl.to('#ci-text', { opacity: 0, y: -20, duration: 0.8 }, 7.2);
    tl.to('#ci-cabin', { opacity: 0, duration: 1.2 }, 7.0);
    tl.to('#ci-seats', { opacity: 0, scale: 1.05, duration: 1.2 }, 7.0);

    // Window grows + camera pushes in
    tl.to('#ci-window-frame', {
      width: '100vw', height: '100vh',
      borderRadius: 0,
      duration: 2.4,
      ease: 'power3.inOut'
    }, 7.4);
    tl.to('#ci-window-outer', {
      width: '100vw', height: '100vh',
      borderRadius: 0, padding: 0,
      duration: 2.4,
      ease: 'power3.inOut'
    }, 7.4);
    tl.to('#ci-window-wrap', {
      width: '100vw', height: '100vh',
      duration: 2.4,
      ease: 'power3.inOut'
    }, 7.4);
    tl.to('.ci-win-shade', { opacity: 0, duration: 0.5 }, 7.4);
    tl.to('#ci-win-content video', {
      scale: 1.08,
      duration: 2.4,
      ease: 'power3.inOut'
    }, 7.4);
    tl.to('.ci-grade', { opacity: 0, duration: 1.6 }, 8.0);

    // ── 9.5s  WHITE/BLACK FLASH ──
    tl.to('#ci-flash', { opacity: 1, duration: 0.35, ease: 'power2.in' }, 9.5);

    // ── DONE — reveal homepage ──
    tl.add(() => {
      const intro = document.getElementById('cn-intro');
      const home  = document.getElementById('cn-home');
      if (intro) gsap.to(intro, { opacity: 0, duration: 0.4, onComplete: () => { intro.style.display = 'none'; }});
      if (home)  { home.style.display = 'block'; gsap.from(home, { opacity: 0, duration: 0.8 }); }
    }, 9.8);
  }

  function fallback() {
    const intro = document.getElementById('cn-intro');
    const home  = document.getElementById('cn-home');
    setTimeout(() => {
      if (intro) intro.style.display = 'none';
      if (home)  home.style.display  = 'block';
    }, 3000);
  }

  return { init };
})();
