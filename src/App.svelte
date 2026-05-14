<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Home from './pages/Home.svelte';
  import Explore from './pages/Explore.svelte';
  import Login from './pages/Login.svelte';

  let currentPath = window.location.pathname;

  function normalizePath(p) {
    return p === '/' ? '/' : p.replace(/\/$/, '');
  }

  function navigate(path) {
    window.scrollTo(0, 0);
    history.pushState({}, '', path);
    currentPath = normalizePath(path);
  }

  onMount(() => {
    currentPath = normalizePath(window.location.pathname);
    window.addEventListener('popstate', () => {
      currentPath = normalizePath(window.location.pathname);
    });
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a || !a.href) return;
      const url = new URL(a.href);
      if (url.origin !== window.location.origin) return;
      if (url.hash && normalizePath(url.pathname) === currentPath) return;
      if (['/explore', '/login', '/'].includes(normalizePath(url.pathname))) {
        e.preventDefault();
        navigate(url.pathname);
      }
    });
  });

  $: isLogin   = currentPath === '/login';
  $: isExplore = currentPath === '/explore';
  $: isHome    = !isLogin && !isExplore;

  // Navbar scroll — only needed for explore/login
  let scrolled = false;
  onMount(() => {
    const onScroll = () => { scrolled = window.scrollY > 60; };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  let menuOpen = false;
  function toggleMenu() { menuOpen = !menuOpen; }
  function closeMenu() { menuOpen = false; }
</script>

{#if !isHome && !isLogin}
<!-- Non-home navbar -->
<nav class="navbar" class:scrolled={scrolled} id="navbar">
  <div class="nav-container">
    <a href="/" class="logo">where<span>next</span></a>
    <ul class="nav-menu" class:open={menuOpen} id="navMenu">
      <li><a href="/" on:click={closeMenu}>Home</a></li>
      <li><a href="/explore" class="active" on:click={closeMenu}>Explore</a></li>
      <li><a href="/#destinations" on:click={closeMenu}>Destinations</a></li>
      <li><a href="/#gallery" on:click={closeMenu}>Gallery</a></li>
    </ul>
    <div class="nav-right">
      <a href="/login" class="nav-cta">Sign In</a>
      <button class="mobile-toggle" on:click={toggleMenu}>
        <i class={menuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
      </button>
    </div>
  </div>
</nav>
{/if}

<!-- Page content -->
{#key currentPath}
<div in:fade={{ duration: 250, delay: 100 }} out:fade={{ duration: 150 }}>
  {#if isLogin}
    <Login />
  {:else if isExplore}
    <Explore />
  {:else}
    <Home />
  {/if}
</div>
{/key}

{#if !isHome && !isLogin}
<!-- Footer only on explore -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo">where<span>next</span></a>
        <p>Your trusted partner for extraordinary travel experiences around the globe. Let us take you places.</p>
        <div class="footer-social">
          <a href="#"><i class="ri-instagram-line"></i></a>
          <a href="#"><i class="ri-twitter-x-line"></i></a>
          <a href="#"><i class="ri-facebook-fill"></i></a>
          <a href="#"><i class="ri-youtube-line"></i></a>
        </div>
      </div>
      <div><h4>Company</h4><ul class="footer-links"><li><a href="#">About Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li><li><a href="#">Blog</a></li></ul></div>
      <div><h4>Support</h4><ul class="footer-links"><li><a href="#">Help Center</a></li><li><a href="#">Contact Us</a></li><li><a href="#">Cancellation</a></li><li><a href="#">Safety</a></li></ul></div>
      <div><h4>Legal</h4><ul class="footer-links"><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li><li><a href="#">Cookie Policy</a></li><li><a href="#">Sitemap</a></li></ul></div>
    </div>
  </div>
  <div class="footer-bottom"><div class="container">© 2026 Where Next. All rights reserved.</div></div>
</footer>
{/if}

{#if isHome}
<!-- Home gets its own dark footer -->
<footer class="footer" style="background:#080808;">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo" style="color:#fff;">where<span>next</span></a>
        <p>Your trusted partner for extraordinary travel experiences around the globe.</p>
        <div class="footer-social">
          <a href="#"><i class="ri-instagram-line"></i></a>
          <a href="#"><i class="ri-twitter-x-line"></i></a>
          <a href="#"><i class="ri-facebook-fill"></i></a>
          <a href="#"><i class="ri-youtube-line"></i></a>
        </div>
      </div>
      <div><h4>Company</h4><ul class="footer-links"><li><a href="#">About Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Blog</a></li></ul></div>
      <div><h4>Support</h4><ul class="footer-links"><li><a href="#">Help Center</a></li><li><a href="#">Contact Us</a></li><li><a href="#">Safety</a></li></ul></div>
      <div><h4>Legal</h4><ul class="footer-links"><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li><li><a href="#">Cookies</a></li></ul></div>
    </div>
  </div>
  <div class="footer-bottom"><div class="container">© 2026 Where Next? All rights reserved.</div></div>
</footer>
{/if}
