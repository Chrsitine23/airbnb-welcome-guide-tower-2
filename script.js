// Rest N Play — Guest Guide
// Navigation, copy helpers, icons and small accessibility enhancements.

let currentPage = 'cover';

function showPage(pageId, pushHistory = true) {
  const target = document.getElementById(pageId);
  if (!target) return;

  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
    page.setAttribute('aria-hidden', 'true');
  });

  target.classList.add('active');
  target.setAttribute('aria-hidden', 'false');

  currentPage = pageId;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto'
  });

  if (pushHistory) {
    history.pushState({ page: pageId }, '', `#${pageId}`);
  }

  refreshIcons();

  // Stop any video that may still be playing on another page.
  document.querySelectorAll('video').forEach(video => {
    if (!target.contains(video)) {
      video.pause();
    }
  });

  // Move keyboard focus to the page heading when available.
  const heading = target.querySelector('.content-header h2, .menu-title, .cover-title');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    requestAnimationFrame(() => heading.focus({ preventScroll: true }));
  }
}

function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons({
      attrs: {
        'stroke-width': 1.7
      }
    });
  }
}

async function copyText(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const text = el.textContent.trim();
  const btn = el.parentElement?.querySelector('.copy-btn');

  try {
    await navigator.clipboard.writeText(text);
    showCopyState(btn, 'Copied');
  } catch (error) {
    // Fallback for browsers where Clipboard API is unavailable.
    const range = document.createRange();
    range.selectNodeContents(el);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      showCopyState(btn, 'Copied');
    } catch (fallbackError) {
      showCopyState(btn, 'Copy manually');
    }

    selection.removeAllRanges();
  }
}

function showCopyState(button, message) {
  if (!button) return;

  const original = button.dataset.originalText || button.textContent;
  button.dataset.originalText = original;
  button.textContent = message;
  button.classList.add('is-copied');

  window.clearTimeout(button._copyTimer);

  button._copyTimer = window.setTimeout(() => {
    button.textContent = original;
    button.classList.remove('is-copied');
  }, 1600);
}

function openInitialPage() {
  const hash = window.location.hash.replace('#', '').trim();

  if (hash && document.getElementById(hash)) {
    showPage(hash, false);
  } else {
    showPage('cover', false);
  }
}

window.addEventListener('popstate', () => {
  const hash = window.location.hash.replace('#', '').trim();
  showPage(hash || 'cover', false);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page').forEach(page => {
    page.setAttribute('aria-hidden', page.classList.contains('active') ? 'false' : 'true');
  });

  openInitialPage();
  refreshIcons();
});
