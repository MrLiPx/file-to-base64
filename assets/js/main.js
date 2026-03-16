/* ================================================================
   main.js — Shared: nav injection, toast, FAQ, active links
   ================================================================ */
(function () {
  'use strict';

  var BASE = '/base64-image-converter';

  /* ── Shared header HTML ── */
  var NAV_HTML =
    '<header class="site-header" role="banner">' +
    '  <div class="header-inner">' +
    '    <a href="' + BASE + '/" class="site-logo" aria-label="Base64 Converter home">' +
    '      <img src="' + BASE + '/assets/logo.png" alt="" width="32" height="32"/>' +
    '      <span>Base64 Converter</span>' +
    '    </a>' +
    '    <nav class="site-nav" aria-label="Main navigation">' +
    '      <a href="' + BASE + '/app/base64-to-image/" class="nav-link" data-page="base64-to-image">' +
    '        <i class="fi fi-rr-picture" aria-hidden="true"></i> B64 \u2192 Image' +
    '      </a>' +
    '      <a href="' + BASE + '/app/image-to-base64/" class="nav-link" data-page="image-to-base64">' +
    '        <i class="fi fi-rr-upload" aria-hidden="true"></i> Image \u2192 B64' +
    '      </a>' +
    '      <a href="https://r.mrlipx.com/tip" target="_blank" rel="noopener noreferrer" class="nav-tip" aria-label="Support this project">' +
    '        <i class="fi fi-rr-heart" aria-hidden="true"></i><span>Tip Jar</span>' +
    '      </a>' +
    '      <a href="https://github.com/MrLiPx/base64-image-converter" target="_blank" rel="noopener noreferrer" class="nav-link nav-github" aria-label="View source on GitHub">' +
    '        <i class="fi fi-brands-github" aria-hidden="true"></i>' +
    '        <span class="gh-label">GitHub</span>' +
    '      </a>' +
    '    </nav>' +
    '  </div>' +
    '</header>';

  /* ── Shared footer HTML ── */
  var FOOTER_HTML =
    '<footer class="site-footer" role="contentinfo">' +
    '  <div class="footer-inner">' +
    '    <span>\u00a9 2026 Base64 Image Converter \u2014' +
    '      <a href="https://github.com/MrLiPx/base64-image-converter" target="_blank" rel="noopener noreferrer">' +
    '        <i class="fi fi-brands-github" aria-hidden="true"></i> Open source (MIT)' +
    '      </a>' +
    '    </span>' +
    '    <nav class="footer-links" aria-label="Footer navigation">' +
    '      <a href="' + BASE + '/app/">Apps</a>' +
    '      <a href="' + BASE + '/privacy-policy/">Privacy</a>' +
    '      <a href="' + BASE + '/tos/">Terms</a>' +
    '      <a href="https://r.mrlipx.com/tip" target="_blank" rel="noopener noreferrer">' +
    '        <i class="fi fi-rr-heart" aria-hidden="true"></i> Tip Jar' +
    '      </a>' +
    '    </nav>' +
    '  </div>' +
    '</footer>';

  /* ── Inject header & footer ── */
  document.addEventListener('DOMContentLoaded', function () {
    var headerEl = document.getElementById('site-header-mount');
    if (headerEl) headerEl.outerHTML = NAV_HTML;

    var footerEl = document.getElementById('site-footer-mount');
    if (footerEl) footerEl.outerHTML = FOOTER_HTML;

    markActiveNav();
  });

  /* ── Active nav ── */
  function markActiveNav() {
    var path = window.location.pathname;
    document.querySelectorAll('.nav-link[data-page]').forEach(function (a) {
      var page = a.dataset.page;
      var active =
        page === 'base64-to-image' ? path.indexOf('base64-to-image') !== -1 :
        page === 'image-to-base64' ? path.indexOf('image-to-base64') !== -1 :
        page === 'app'             ? path.replace(/\/$/, '').endsWith('/app') :
        false;
      a.classList.toggle('active', active);
    });
  }

  /* ── Toast ── */
  var _toastTimer = null;
  window.showToast = function (msg, type) {
    clearTimeout(_toastTimer);
    var t = document.getElementById('toast');
    if (!t) return;
    var icons = {
      success:  'fi-rr-check-circle',
      error:    'fi-rr-cross-circle',
      info:     'fi-rr-info',
      download: 'fi-rr-download'
    };
    t.innerHTML =
      '<i class="fi ' + (icons[type] || icons.info) + '" aria-hidden="true"></i>' +
      '<span>' + msg + '</span>';
    t.classList.add('show');
    _toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2800);
  };

  /* ── FAQ accordion ── */
  window.toggleFaq = function (btn) {
    var item = btn.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (el) {
      el.classList.remove('open');
    });
    if (!isOpen) item.classList.add('open');
    btn.setAttribute('aria-expanded', String(!isOpen));
  };

  /* ── Escape closes FAQ ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
    }
  });

})();
