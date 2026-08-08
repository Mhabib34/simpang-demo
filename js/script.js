document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.hamburger');
  var nav = document.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      burger.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Header scroll: transparent → white (only on pages with .hero)
  var header = document.querySelector('header.site');
  var hasHero = !!document.querySelector('.hero');
  if (header) {
    if (hasHero) {
      var onScroll = function () {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    } else {
      // No hero → always white header
      header.classList.add('scrolled');
    }
  }

  document.querySelectorAll('.tabs').forEach(function (tabGroup) {
    var buttons = tabGroup.querySelectorAll('button');
    var targetSelector = tabGroup.getAttribute('data-target');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        if (targetSelector) {
          var cat = btn.getAttribute('data-cat');
          document.querySelectorAll(targetSelector + ' [data-cat-item]').forEach(function (item) {
            item.style.display = (cat === 'semua' || item.getAttribute('data-cat-item') === cat) ? '' : 'none';
          });
        }
      });
    });
  });

  document.querySelectorAll('[data-search-target]').forEach(function (input) {
    input.addEventListener('input', function () {
      var q = input.value.toLowerCase();
      var target = document.querySelector(input.getAttribute('data-search-target'));
      if (!target) return;
      target.querySelectorAll('[data-search-item]').forEach(function (item) {
        var txt = item.getAttribute('data-search-item').toLowerCase();
        item.style.display = txt.indexOf(q) > -1 ? '' : 'none';
      });
    });
  });

  document.querySelectorAll('.gallery-grid figure').forEach(function (fig) {
    fig.addEventListener('click', function () {
      var lb = document.querySelector('.lightbox');
      if (!lb) return;
      lb.querySelector('img').src = fig.querySelector('img').src;
      lb.classList.add('open');
    });
  });
  document.querySelectorAll('.lightbox .close, .lightbox').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.target.classList.contains('lightbox') || e.target.classList.contains('close')) {
        document.querySelector('.lightbox').classList.remove('open');
      }
    });
  });

  document.querySelectorAll('.rating-row').forEach(function (row) {
    row.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        row.querySelectorAll('button').forEach(function (b) { b.classList.remove('sel'); });
        btn.classList.add('sel');
      });
    });
  });

  document.querySelectorAll('form[data-dummy-submit]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.getAttribute('data-dummy-submit');
      var note = form.querySelector('.form-note');
      if (note) { note.textContent = msg; note.style.display = 'block'; }
    });
  });

  document.querySelectorAll('.map-pin-dot').forEach(function (pin) {
    pin.addEventListener('click', function () {
      var panelItem = document.querySelector('[data-pin-for="' + pin.getAttribute('data-pin') + '"]');
      document.querySelectorAll('.map-panel .card').forEach(function (c) { c.style.borderColor = 'var(--border)'; });
      if (panelItem) panelItem.style.borderColor = 'var(--primary)';
    });
  });

  document.querySelectorAll('.dropdown-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var dropdown = trigger.parentElement;
      document.querySelectorAll('.dropdown').forEach(function (d) {
        if (d !== dropdown) {
          d.classList.remove('open');
        }
      });
      dropdown.classList.toggle('open');
    });
  });

  document.addEventListener('click', function (e) {
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });
});
