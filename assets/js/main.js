/* ================================================================
   main.js — Shared utilities: toast, FAQ, nav active state
   ================================================================ */
(function(){
  'use strict';

  /* ── Toast ── */
  let _toastTimer = null;
  window.showToast = function(msg, type) {
    clearTimeout(_toastTimer);
    const t = document.getElementById('toast');
    if (!t) return;
    // icon
    const icons = { success:'fi-rr-check-circle', error:'fi-rr-cross-circle', info:'fi-rr-info', download:'fi-rr-download' };
    const iconClass = icons[type] || icons.info;
    t.innerHTML = '<i class="fi ' + iconClass + '"></i><span>' + msg + '</span>';
    t.classList.add('show');
    _toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 2800);
  };

  /* ── FAQ accordion ── */
  window.toggleFaq = function(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function(el){
      el.classList.remove('open');
    });
    if (!isOpen) item.classList.add('open');
  };

  /* ── Keyboard: Escape closes open FAQ ── */
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      document.querySelectorAll('.faq-item.open').forEach(function(el){
        el.classList.remove('open');
      });
    }
  });

  /* ── Mark current nav link active ── */
  (function markNav(){
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link[data-page]').forEach(function(a){
      const page = a.dataset.page;
      const isActive =
        page === 'home'
          ? path.replace(/\/$/, '') === '/base64-image-converter' || path === '/base64-image-converter/'
          : path.includes(page);
      if (isActive) a.classList.add('active');
      else a.classList.remove('active');
    });
  })();

})();
