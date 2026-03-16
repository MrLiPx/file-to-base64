/* ================================================================
   encoder.js — Image → Base64 converter logic
   Reads image via FileReader, generates blob: URL for preview link
   ================================================================ */
(function () {
  'use strict';

  var _dataUrl = null;
  var _blobUrl = null;
  var _fmt     = 'dataurl';

  /* ── Drop zone setup ── */
  document.addEventListener('DOMContentLoaded', function () {
    var dz = document.getElementById('dropzone');
    if (!dz) return;

    dz.addEventListener('dragenter', function (e) { e.preventDefault(); dz.classList.add('drag-over'); });
    dz.addEventListener('dragover',  function (e) { e.preventDefault(); dz.classList.add('drag-over'); });
    dz.addEventListener('dragleave', function (e) {
      if (!dz.contains(e.relatedTarget)) dz.classList.remove('drag-over');
    });
    dz.addEventListener('drop', function (e) {
      e.preventDefault();
      dz.classList.remove('drag-over');
      var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) handleFile(file);
      else showToast('Please drop an image file', 'error');
    });
    dz.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        document.getElementById('file-input').click();
      }
    });

    /* Paste from clipboard anywhere on page */
    document.addEventListener('paste', function (e) {
      var items = (e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData) || {}).items || [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          handleFile(items[i].getAsFile());
          break;
        }
      }
    });
  });

  /* ── Handle file ── */
  function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast('File too large \u2014 max 10 MB', 'error');
      return;
    }

    /* Revoke previous blob URL */
    if (_blobUrl) { URL.revokeObjectURL(_blobUrl); _blobUrl = null; }

    /* Create blob: URL for preview link (opens in new tab) */
    _blobUrl = URL.createObjectURL(file);

    var reader = new FileReader();
    reader.onload = function (e) {
      _dataUrl = e.target.result;

      /* Thumbnail — clickable, opens blob URL in new tab */
      var thumb = document.getElementById('dz-thumb');
      thumb.src   = _dataUrl;
      thumb.style.display = 'block';
      thumb.style.cursor  = 'pointer';
      thumb.title = 'Click to open in new tab';
      thumb.onclick = function () {
        window.open(_blobUrl, '_blank', 'noopener,noreferrer');
      };

      /* Blob URL link */
      renderBlobLink(_blobUrl);

      /* Drop zone label */
      var dzTitle = document.querySelector('.dz-title');
      if (dzTitle) dzTitle.textContent = file.name;

      document.getElementById('copy-btn').disabled  = false;
      document.getElementById('clear-btn').disabled = false;

      renderOutput();

      var sizeStr = file.size < 1024 * 1024
        ? Math.round(file.size / 1024) + ' KB'
        : (file.size / 1024 / 1024).toFixed(1) + ' MB';
      showToast('Image loaded \u2014 ' + sizeStr, 'success');
    };
    reader.onerror = function () {
      showToast('Failed to read file', 'error');
    };
    reader.readAsDataURL(file);
  }

  /* Expose so the inline onchange handler can call it */
  window.handleFile = function (file) { handleFile(file); };

  /* ── Render blob: URL as clickable link ── */
  function renderBlobLink(url) {
    var wrap = document.getElementById('blob-link-wrap');
    if (!wrap) return;
    wrap.innerHTML =
      '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="blob-link" title="Open image in new tab">' +
      '<i class="fi fi-rr-link" aria-hidden="true"></i>' +
      '<span class="blob-link-url">' + url + '</span>' +
      '<i class="fi fi-rr-arrow-right" aria-hidden="true"></i>' +
      '</a>';
    wrap.style.display = '';
  }

  /* ── Format toggle ── */
  window.setFmt = function (val) {
    _fmt = val;
    document.querySelectorAll('.fmt-toggle label').forEach(function (l) {
      l.classList.toggle('active', l.dataset.val === val);
    });
    renderOutput();
  };

  /* ── Render output textarea ── */
  function renderOutput() {
    if (!_dataUrl) return;
    var out = _fmt === 'raw' && _dataUrl.includes(',')
      ? _dataUrl.split(',')[1]
      : _dataUrl;
    var ta = document.getElementById('b64output');
    ta.value = out;
    var len = out.length;
    document.getElementById('char-count').textContent =
      len.toLocaleString() + ' characters (\u2248' +
      Math.round(len * 0.75 / 1024).toLocaleString() + ' KB decoded)';
  }

  /* ── Copy to clipboard ── */
  window.copyOutput = function () {
    var val = document.getElementById('b64output').value;
    if (!val) { showToast('Nothing to copy', 'error'); return; }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(val)
        .then(function () { showToast('Copied to clipboard', 'success'); })
        .catch(function ()  { fallbackCopy(); });
    } else {
      fallbackCopy();
    }
  };

  function fallbackCopy() {
    var ta = document.getElementById('b64output');
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    try {
      document.execCommand('copy');
      showToast('Copied to clipboard', 'success');
    } catch (e) {
      showToast('Copy failed \u2014 select and copy manually', 'error');
    }
  }

  /* ── Clear ── */
  window.clearUploader = function () {
    _dataUrl = null;
    _fmt     = 'dataurl';

    if (_blobUrl) { URL.revokeObjectURL(_blobUrl); _blobUrl = null; }

    var fi = document.getElementById('file-input');
    if (fi) fi.value = '';

    var thumb = document.getElementById('dz-thumb');
    thumb.style.display = 'none';
    thumb.src     = '';
    thumb.onclick = null;

    var blobWrap = document.getElementById('blob-link-wrap');
    if (blobWrap) { blobWrap.innerHTML = ''; blobWrap.style.display = 'none'; }

    document.getElementById('b64output').value      = '';
    document.getElementById('char-count').textContent = '';

    var dzTitle = document.querySelector('.dz-title');
    if (dzTitle) dzTitle.innerHTML = 'Drop image here, or <span class="dz-link">click to browse</span>';

    document.getElementById('copy-btn').disabled  = true;
    document.getElementById('clear-btn').disabled = true;

    document.querySelectorAll('.fmt-toggle label').forEach(function (l) {
      l.classList.toggle('active', l.dataset.val === 'dataurl');
    });
  };

  window.addEventListener('beforeunload', function () {
    if (_blobUrl) URL.revokeObjectURL(_blobUrl);
  });

})();
