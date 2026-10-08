(function () {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('.nav-links');
  const savedTheme = localStorage.getItem('bca-portfolio-theme');

  if (savedTheme) root.dataset.theme = savedTheme;

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      localStorage.setItem('bca-portfolio-theme', next);
      themeButton.textContent = next === 'light' ? '☀' : '◐';
      themeButton.setAttribute('aria-label', next === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    });
  }

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
  }

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const glow = document.querySelector('.cursor-glow');
  if (glow && matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  const form = document.querySelector('#contact-form');
  const formMessage = document.querySelector('#form-message');
  if (form && formMessage) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      formMessage.textContent = name
        ? `Thanks, ${name}! This demo form is ready to connect to your email service or backend.`
        : 'Thanks! This demo form is ready to connect to your email service or backend.';
      formMessage.style.display = 'block';
      form.reset();
    });
  }

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
