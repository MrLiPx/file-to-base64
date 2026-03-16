/* ================================================================
   uploader.js — Image → Base64 page logic
   ================================================================ */
(function(){
  'use strict';

  var _dataUrl = null;
  var _fmt     = 'dataurl'; // 'dataurl' | 'raw'

  /* ── Drop zone setup ── */
  document.addEventListener('DOMContentLoaded', function(){
    var dz = document.getElementById('dropzone');
    if (!dz) return;

    dz.addEventListener('dragenter', function(e){ e.preventDefault(); dz.classList.add('drag-over'); });
    dz.addEventListener('dragover',  function(e){ e.preventDefault(); dz.classList.add('drag-over'); });
    dz.addEventListener('dragleave', function(e){
      if (!dz.contains(e.relatedTarget)) dz.classList.remove('drag-over');
    });
    dz.addEventListener('drop', function(e){
      e.preventDefault(); dz.classList.remove('drag-over');
      var file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) handleFile(file);
      else showToast('Please drop an image file', 'error');
    });

    /* Paste image anywhere on page */
    document.addEventListener('paste', function(e){
      var items = (e.clipboardData || e.originalEvent.clipboardData).items;
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
    var maxMB = 10;
    if (file.size > maxMB * 1024 * 1024) {
      showToast('File too large — max ' + maxMB + ' MB', 'error');
      return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
      _dataUrl = e.target.result;

      /* Thumbnail */
      var thumb = document.getElementById('dz-thumb');
      thumb.src = _dataUrl;
      thumb.style.display = 'block';

      /* Update drop zone appearance */
      var dzTitle = document.querySelector('.dz-title');
      if (dzTitle) dzTitle.textContent = file.name;

      document.getElementById('copy-btn').disabled  = false;
      document.getElementById('clear-btn').disabled = false;

      renderOutput();

      var sizeStr = file.size < 1024*1024
        ? Math.round(file.size/1024) + ' KB'
        : (file.size/1024/1024).toFixed(1) + ' MB';
      showToast('Image loaded — ' + sizeStr, 'success');
    };
    reader.onerror = function(){
      showToast('Failed to read file', 'error');
    };
    reader.readAsDataURL(file);
  }
  window.handleFile = function(file){ handleFile(file); };

  /* ── Format toggle ── */
  window.setFmt = function(val) {
    _fmt = val;
    document.querySelectorAll('.fmt-toggle label').forEach(function(l){
      l.classList.toggle('active', l.dataset.val === val);
    });
    renderOutput();
  };

  /* ── Render output textarea ── */
  function renderOutput() {
    if (!_dataUrl) return;
    var out = _fmt === 'raw'
      ? (_dataUrl.includes(',') ? _dataUrl.split(',')[1] : _dataUrl)
      : _dataUrl;
    document.getElementById('b64output').value = out;
    var len = out.length;
    document.getElementById('char-count').textContent =
      len.toLocaleString() + ' characters (~' +
      Math.round(len * 0.75 / 1024).toLocaleString() + ' KB decoded)';
  }

  /* ── Copy ── */
  window.copyOutput = function() {
    var val = document.getElementById('b64output').value;
    if (!val) { showToast('Nothing to copy', 'error'); return; }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(val).then(function(){
        showToast('Copied to clipboard', 'success');
      }).catch(function(){
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  };
  function fallbackCopy() {
    var ta = document.getElementById('b64output');
    ta.select();
    ta.setSelectionRange(0, 99999);
    try {
      document.execCommand('copy');
      showToast('Copied to clipboard', 'success');
    } catch(e) {
      showToast('Copy failed — please select and copy manually', 'error');
    }
  }

  /* ── Clear ── */
  window.clearUploader = function() {
    _dataUrl = null;
    _fmt = 'dataurl';
    var fi = document.getElementById('file-input');
    if (fi) fi.value = '';
    document.getElementById('b64output').value = '';
    document.getElementById('char-count').textContent = '';
    var thumb = document.getElementById('dz-thumb');
    thumb.style.display = 'none';
    thumb.src = '';
    var dzTitle = document.querySelector('.dz-title');
    if (dzTitle) dzTitle.innerHTML = 'Drop image here, or <span class="dz-link">click to browse</span>';
    document.getElementById('copy-btn').disabled  = true;
    document.getElementById('clear-btn').disabled = true;
    // Reset format toggle
    document.querySelectorAll('.fmt-toggle label').forEach(function(l){
      l.classList.toggle('active', l.dataset.val === 'dataurl');
    });
  };

})();
