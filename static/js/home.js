/* ============================================
   JobFlow — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  /* ── hero search form ── */

  const searchForm = document.getElementById('heroSearchForm');

if (searchForm) {
  const searchQuery = document.getElementById('searchQuery');
  const searchLocation = document.getElementById('searchLocation');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const q = searchQuery?.value.trim();
    const loc = searchLocation?.value.trim();

    const params = new URLSearchParams();

    if (q) params.set('q', q);
    if (loc) params.set('location', loc);

    window.location.href = `search.html?${params.toString()}`;
  });
}

  /* ── Popular tag chips ── */
  document.querySelectorAll('.tag[data-search]').forEach(tag => {
    tag.addEventListener('click', () => {
      const q = tag.dataset.search;
      window.location.href = `search.html?q=${encodeURIComponent(q)}&type=tag`;
    });
  });

  /* ── Animate on scroll (Intersection Observer) ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.step-card, .job-card, .stat-card').forEach(el => {
    observer.observe(el);
  });

  /* ── Animated counters ── */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

});
