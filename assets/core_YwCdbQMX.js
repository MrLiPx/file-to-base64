/* ================================================================
   core.js v1.1.0 — Shared layout: header/footer, toast, FAQ,
   theme (dark/light/system), mobile nav, skip link, keyboard nav
   ================================================================ */
(function () {
  'use strict';

  var BASE = '/base64-image-converter';

  /* ── Theme system ── */
  var THEME_KEY = 'b64cv-theme';
  var _pref = 'system';

  function _osTheme() {
    return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  }
  function _effective(p) { return (p === 'dark' || p === 'light') ? p : _osTheme(); }

  function _applyTheme(pref, persist) {
    if (pref !== 'dark' && pref !== 'light' && pref !== 'system') pref = 'system';
    _pref = pref;
    var eff = _effective(pref);
    document.documentElement.setAttribute('data-theme', eff);
    document.documentElement.classList.toggle('dark', eff === 'dark');
    if (persist !== false) { try { localStorage.setItem(THEME_KEY, pref); } catch (_) {} }
    _syncThemeUI();
  }

  function _syncThemeUI() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var eff = _effective(_pref);
    btn.setAttribute('aria-label', 'Switch to ' + (eff === 'dark' ? 'light' : 'dark') + ' theme');
    btn.innerHTML = eff === 'dark'
      ? '<i class="fi fi-rr-sun" aria-hidden="true"></i>'
      : '<i class="fi fi-rr-moon" aria-hidden="true"></i>';
  }

  /* Init theme before paint */
  (function () {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light' || saved === 'system') _pref = saved;
    } catch (_) {}
    var eff = _effective(_pref);
    document.documentElement.setAttribute('data-theme', eff);
    document.documentElement.classList.toggle('dark', eff === 'dark');
  }());

  /* Listen for OS theme change */
  try {
    window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', function () {
      if (_pref === 'system') {
        var eff = _osTheme();
        document.documentElement.setAttribute('data-theme', eff);
        document.documentElement.classList.toggle('dark', eff === 'dark');
        _syncThemeUI();
      }
    });
  } catch (_) {}

  /* Public toggle */
  window.toggleTheme = function () {
    var eff = _effective(_pref);
    _applyTheme(eff === 'dark' ? 'light' : 'dark', true);
    var label = _effective(_pref) === 'dark' ? 'Dark mode' : 'Light mode';
    showToast(label, 'info');
  };

  /* ── Build header HTML ── */
  function buildHeader() {
    return '<header class="site-header" role="banner">' +
      '<a class="skip-link" href="#main">Skip to main content</a>' +
      '<div class="header-inner">' +
        '<a href="' + BASE + '/" class="site-logo" aria-label="Base64 Converter home">' +
          '<img src="' + BASE + '/assets/logo.png" alt="" width="32" height="32"/>' +
          '<span>Base64 Converter</span>' +
        '</a>' +
        '<nav class="site-nav" id="site-nav" aria-label="Main navigation">' +
          '<a href="' + BASE + '/app/base64-to-image/" class="nav-link" data-page="base64-to-image">' +
            '<i class="fi fi-rr-picture" aria-hidden="true"></i> B64 \u2192 Image' +
          '</a>' +
          '<a href="' + BASE + '/app/image-to-base64/" class="nav-link" data-page="image-to-base64">' +
            '<i class="fi fi-rr-upload" aria-hidden="true"></i> Image \u2192 B64' +
          '</a>' +
          '<a href="https://r.mrlipx.com/tip" target="_blank" rel="noopener noreferrer" class="nav-tip" aria-label="Support this project">' +
            '<i class="fi fi-rr-heart" aria-hidden="true"></i><span>Tip Jar</span>' +
          '</a>' +
          '<a href="https://github.com/MrLiPx/base64-image-converter" target="_blank" rel="noopener noreferrer" class="nav-link nav-github" aria-label="View source on GitHub">' +
            '<i class="fi fi-brands-github" aria-hidden="true"></i>' +
            '<span class="gh-label">GitHub</span>' +
          '</a>' +
        '</nav>' +
        '<div class="nav-actions">' +
          '<button id="theme-toggle" class="nav-icon-btn" onclick="toggleTheme()" aria-label="Toggle theme" title="Toggle dark/light mode">' +
            '<i class="fi fi-rr-moon" aria-hidden="true"></i>' +
          '</button>' +
          '<button id="nav-hamburger" class="nav-icon-btn nav-hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="site-nav" onclick="toggleMobileNav()">' +
            '<i class="fi fi-rr-bars-staggered" aria-hidden="true"></i>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</header>';
  }

  /* ── Footer HTML ── */
  var FOOTER_HTML =
    '<footer class="site-footer" role="contentinfo">' +
    '<div class="footer-inner">' +
    '<span>\u00a9 2026 Base64 Image Converter \u2014' +
    '<a href="https://github.com/MrLiPx/base64-image-converter" target="_blank" rel="noopener noreferrer">' +
    '<i class="fi fi-brands-github" aria-hidden="true"></i> Open source (MIT)' +
    '</a>' +
    '</span>' +
    '<nav class="footer-links" aria-label="Footer navigation">' +
    '<a href="' + BASE + '/app/">Apps</a>' +
    '<a href="' + BASE + '/privacy-policy/">Privacy</a>' +
    '<a href="' + BASE + '/tos/">Terms</a>' +
    '<a href="https://r.mrlipx.com/tip" target="_blank" rel="noopener noreferrer">' +
    '<i class="fi fi-rr-heart" aria-hidden="true"></i> Tip Jar' +
    '</a>' +
    '</nav>' +
    '</div>' +
    '</footer>';

  /* ── Mobile nav toggle ── */
  var _navOpen = false;
  window.toggleMobileNav = function () {
    _navOpen = !_navOpen;
    var nav = document.getElementById('site-nav');
    var btn = document.getElementById('nav-hamburger');
    if (nav) nav.classList.toggle('mobile-open', _navOpen);
    if (btn) {
      btn.setAttribute('aria-expanded', String(_navOpen));
      btn.innerHTML = _navOpen
        ? '<i class="fi fi-rr-cross" aria-hidden="true"></i>'
        : '<i class="fi fi-rr-bars-staggered" aria-hidden="true"></i>';
    }
  };

  /* Close mobile nav on outside click */
  document.addEventListener('click', function (e) {
    if (!_navOpen) return;
    var nav = document.getElementById('site-nav');
    var btn = document.getElementById('nav-hamburger');
    if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
      _navOpen = false;
      nav.classList.remove('mobile-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '<i class="fi fi-rr-bars-staggered" aria-hidden="true"></i>';
    }
  });

  /* ── Inject on DOM ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    var headerEl = document.getElementById('site-header-mount');
    if (headerEl) headerEl.outerHTML = buildHeader();

    var footerEl = document.getElementById('site-footer-mount');
    if (footerEl) footerEl.outerHTML = FOOTER_HTML;

    markActiveNav();
    _syncThemeUI();
  });

  /* ── Active nav link ── */
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

  /* ── Toast notifications ── */
  var _toastTimer = null;
  window.showToast = function (msg, type) {
    clearTimeout(_toastTimer);
    var t = document.getElementById('toast');
    if (!t) return;
    var icons = { success:'fi-rr-check', error:'fi-rr-cross', info:'fi-rr-info', download:'fi-rr-download' };
    t.innerHTML =
      '<i class="fi ' + (icons[type] || icons.info) + '" aria-hidden="true"></i>' +
      '<span>' + msg + '</span>';
    t.className = 'show' + (type ? ' toast-' + type : '');
    _toastTimer = setTimeout(function () { t.className = ''; }, 2800);
  };

  /* ── FAQ accordion ── */
  window.toggleFaq = function (btn) {
    var item = btn.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (el) {
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      el.classList.remove('open');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  /* ── Keyboard shortcuts ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      /* Close FAQ */
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        el.classList.remove('open');
      });
      /* Close mobile nav */
      if (_navOpen) window.toggleMobileNav();
    }
    /* Alt+T → toggle theme */
    if (e.altKey && e.key === 't') {
      e.preventDefault();
      window.toggleTheme();
    }
  });

})();
