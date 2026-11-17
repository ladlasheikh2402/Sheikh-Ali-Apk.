/* LEGAL.JS — highlights the current section in the "On this page" list (privacy / terms) */
(function () {
  'use strict';
  var toc = document.querySelector('.legal-toc');
  if (!toc) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var map = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]')).map(function (a) {
    return { a: a, el: document.getElementById(a.getAttribute('href').slice(1)) };
  }).filter(function (m) { return m.el; });
  if (!map.length) return;

  var current = null, ticking = false;
  function set(a) {
    if (current === a) return;
    if (current) { current.classList.remove('is-active'); current.removeAttribute('aria-current'); }
    current = a; a.classList.add('is-active'); a.setAttribute('aria-current', 'location');
    var ol = a.closest('ol');                       // phone: keep the active chip centred in its row
    if (ol && ol.scrollWidth > ol.clientWidth && getComputedStyle(ol).display === 'flex') {
      ol.scrollTo({ left: a.parentNode.offsetLeft - (ol.clientWidth - a.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    }
  }
  function update() {
    ticking = false;
    var best = map[0];
    map.forEach(function (m) { if (m.el.getBoundingClientRect().top <= window.innerHeight * 0.32) best = m; });
    set(best.a);
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
