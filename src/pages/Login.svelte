<script>
  function handleLogin(e) {
    e.preventDefault();
    alert("Login successful! (Demo)");
  }
</script>

<div class="login-page">
  <!-- Left: Visual -->
  <div class="login-visual">
    <img
      src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80"
      alt="Mountain sunrise"
    />
    <div class="login-visual-overlay"></div>
    <div class="login-visual-text">
      <h2>Your next adventure<br />is one click away.</h2>
      <p>Join 12,000+ travelers exploring the world with Where Next.</p>
    </div>
  </div>

  <!-- Right: Form -->
  <div class="login-form-side">
    <div class="login-card">
      <a
        href="/"
        class="logo"
        style="color:var(--text);margin-bottom:40px;display:inline-block;font-size:1.6rem"
        >where<span>next</span></a
      >
      <h1>Welcome back</h1>
      <p class="subtitle">Sign in to continue planning your trips.</p>

      <form on:submit={handleLogin}>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            required
          />
        </div>
        <div class="form-row">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" class="login-btn">Sign In</button>
      </form>

      <div class="divider">or continue with</div>

      <div class="social-logins">
        <button class="social-btn" type="button"
          ><i class="ri-google-fill"></i> Google</button
        >
        <button class="social-btn" type="button"
          ><i class="ri-apple-fill"></i> Apple</button
        >
      </div>

      <div class="login-footer">
        Don't have an account? <a href="#">Sign up free</a>
      </div>
    </div>
  </div>
</div>
