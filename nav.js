/**
 * nav.js — Think Energy Universal Navigation & Mobile Drawer
 * Handles hamburger toggle, outside clicks, Escape key, and body scroll locking.
 */
function initMobileNav() {
  const toggle = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileNavClose');
  if (!toggle || !drawer) return;

  function openDrawer() {
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) {
      setTimeout(function() {
        closeBtn.focus();
      }, 50);
    }
  }

  function closeDrawer(restoreFocus) {
    if (restoreFocus === undefined) restoreFocus = true;
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (restoreFocus && window.innerWidth < 768) {
      try {
        toggle.focus();
      } catch (err) {}
    }
  }

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeDrawer(true);
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeDrawer(true);
    });
  }

  // Close when clicking outside drawer content
  document.addEventListener('click', function(e) {
    if (drawer.classList.contains('is-open')) {
      const content = drawer.querySelector('.mobile-nav-content');
      const header = drawer.querySelector('.mobile-nav-header');
      if (content && !content.contains(e.target) && (!header || !header.contains(e.target)) && !toggle.contains(e.target)) {
        closeDrawer(true);
      }
    }
  });

  // Close when clicking any navigation link or CTA inside drawer
  drawer.querySelectorAll('.mobile-nav-link, .mobile-nav-phone, .mobile-nav-cta').forEach(function(el) {
    el.addEventListener('click', function() {
      closeDrawer(false);
    });
  });

  // Keyboard navigation & Focus Trap
  drawer.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusables = Array.from(drawer.querySelectorAll(focusableSelectors)).filter(function(el) {
        return !el.hasAttribute('disabled') && el.offsetParent !== null;
      });
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === drawer) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer(true);
    }
  });

  // Close if window resized to >= 768px
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && drawer.classList.contains('is-open')) {
      closeDrawer(false);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileNav);
} else {
  initMobileNav();
}
