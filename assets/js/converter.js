/* ================================================================
   converter.js — Base64 → Image page logic
   Uses Blob + URL.createObjectURL for memory-safe preview
   ================================================================ */
(function(){
  'use strict';

  var _blobUrl = null;   // current object URL (revoke on clear/replace)
  var _mime    = null;   // current mime type

  /* ── Detect mime from raw base64 magic bytes ── */
  function detectMime(b64) {
    if (b64.startsWith('/9j/'))                       return 'image/jpeg';
    if (b64.startsWith('R0lGOD'))                     return 'image/gif';
    if (b64.startsWith('UklGR'))                      return 'image/webp';
    if (b64.startsWith('PHN2Z') || b64.startsWith('PD94b') || b64.startsWith('PHN2Z')) return 'image/svg+xml';
    if (b64.startsWith('Qk0'))                        return 'image/bmp';
    if (b64.startsWith('iVBOR'))                      return 'image/png';
    if (b64.startsWith('AAABAA') || b64.startsWith('AAABAAEAEBAQAAEABAAo')) return 'image/x-icon';
    return 'image/png'; // safe default
  }

  /* ── Decode base64 string to Blob ── */
  function b64ToBlob(b64, mime) {
    try {
      var byteStr = atob(b64);
      var ab = new ArrayBuffer(byteStr.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteStr.length; i++) ia[i] = byteStr.charCodeAt(i);
      return new Blob([ab], { type: mime });
    } catch(e) {
      return null;
    }
  }

  /* ── Revoke previous blob URL safely ── */
  function revokeBlob() {
    if (_blobUrl) {
      URL.revokeObjectURL(_blobUrl);
      _blobUrl = null;
    }
  }

  /* ── Main convert function ── */
  window.convertB64 = function() {
    var raw = document.getElementById('b64input').value.trim();
    var errEl = document.getElementById('err-box');
    errEl.classList.remove('visible');

    if (!raw) {
      showToast('Paste a Base64 string first', 'error');
      return;
    }

    /* Parse: handle data URL or raw base64 */
    var mime, b64clean;
    if (raw.startsWith('data:')) {
      var match = raw.match(/^data:([\w\/\+\-\.]+);base64,(.+)$/s);
      if (!match) {
        errEl.classList.add('visible');
        return;
      }
      mime = match[1];
      b64clean = match[2].replace(/\s+/g, '');
    } else {
      b64clean = raw.replace(/\s+/g, '');
      // Validate base64 charset
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(b64clean)) {
        errEl.classList.add('visible');
        return;
      }
      mime = detectMime(b64clean);
    }

    /* Build blob */
    var blob = b64ToBlob(b64clean, mime);
    if (!blob) {
      errEl.classList.add('visible');
      return;
    }

    /* Create object URL */
    revokeBlob();
    _blobUrl = URL.createObjectURL(blob);
    _mime    = mime;

    /* Load image to verify + get dimensions */
    var img = new Image();
    img.onload = function() {
      renderPreview(img, blob, mime);
      document.getElementById('dl-btn').disabled = false;
      showToast('Converted successfully', 'success');
    };
    img.onerror = function() {
      /* Some formats (SVG) may fail the Image() check — try direct src */
      if (mime === 'image/svg+xml') {
        var svgImg = document.createElement('img');
        svgImg.src = _blobUrl;
        svgImg.alt = 'Converted SVG';
        renderPreviewRaw(svgImg, blob, mime, 0, 0);
        document.getElementById('dl-btn').disabled = false;
        showToast('Converted successfully', 'success');
      } else {
        revokeBlob();
        _mime = null;
        errEl.classList.add('visible');
        document.getElementById('dl-btn').disabled = true;
      }
    };
    img.src = _blobUrl;
  };

  /* ── Render preview with metadata ── */
  function renderPreview(imgEl, blob, mime) {
    imgEl.alt = 'Converted image';
    imgEl.style.cssText = 'max-width:100%;max-height:520px;display:block;margin:1.25rem auto;border-radius:6px;';
    renderPreviewRaw(imgEl, blob, mime, imgEl.naturalWidth, imgEl.naturalHeight);
  }

  function renderPreviewRaw(imgEl, blob, mime, w, h) {
    var area = document.getElementById('preview-area');
    var ph   = document.getElementById('preview-ph');
    var meta = document.getElementById('img-meta');
    var badge = document.getElementById('fmt-badge');

    /* Swap in image */
    var old = area.querySelector('img');
    if (old) old.remove();
    ph.style.display = 'none';
    area.classList.add('loaded');
    area.insertBefore(imgEl, meta);

    /* Format badge */
    var ext = mime.split('/')[1]
      .replace('jpeg','JPG').replace('png','PNG').replace('gif','GIF')
      .replace('webp','WebP').replace('svg+xml','SVG')
      .replace('bmp','BMP').replace('x-icon','ICO')
      .toUpperCase();
    badge.textContent = ext;
    badge.classList.add('visible');

    /* Meta bar */
    var sizeKb = Math.round(blob.size / 1024);
    var sizeStr = sizeKb < 1024 ? sizeKb + ' KB' : (sizeKb/1024).toFixed(1) + ' MB';
    document.getElementById('m-dim').innerHTML  = w && h ? '<i class="fi fi-rr-expand"></i>' + w + ' × ' + h + 'px' : '';
    document.getElementById('m-type').innerHTML = '<i class="fi fi-rr-file-image"></i>' + mime;
    document.getElementById('m-size').innerHTML = '<i class="fi fi-rr-weight"></i>' + sizeStr;
    meta.classList.add('visible');

    if (!w || !h) document.getElementById('m-dim').style.display = 'none';
  }

  /* ── Download ── */
  window.downloadImage = function() {
    if (!_blobUrl || !_mime) return;
    var ext = _mime.split('/')[1]
      .replace('jpeg','jpg').replace('svg+xml','svg').replace('x-icon','ico');
    var a = document.createElement('a');
    a.href = _blobUrl;
    a.download = 'converted-image.' + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Downloading image…', 'download');
  };

  /* ── Clear ── */
  window.clearConverter = function() {
    document.getElementById('b64input').value = '';
    document.getElementById('err-box').classList.remove('visible');
    revokeBlob();
    _mime = null;
    var area = document.getElementById('preview-area');
    var old = area.querySelector('img');
    if (old) old.remove();
    document.getElementById('preview-ph').style.display = '';
    document.getElementById('img-meta').classList.remove('visible');
    document.getElementById('fmt-badge').classList.remove('visible');
    area.classList.remove('loaded');
    document.getElementById('dl-btn').disabled = true;
  };

  /* ── Keyboard: Ctrl/Cmd+Enter converts ── */
  document.addEventListener('DOMContentLoaded', function(){
    var ta = document.getElementById('b64input');
    if (!ta) return;
    ta.addEventListener('keydown', function(e){
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)){
        e.preventDefault();
        convertB64();
      }
    });
    /* Auto-convert on paste */
    ta.addEventListener('paste', function(){
      setTimeout(convertB64, 80);
    });
  });

  /* ── Cleanup blob URL on page unload ── */
  window.addEventListener('beforeunload', revokeBlob);

})();
