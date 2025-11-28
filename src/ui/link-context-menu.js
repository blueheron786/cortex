// showLinkContextMenu and attachLinkContextMenu
function showLinkContextMenu(linkEl, x, y, showNotification) {
  // Remove any existing menu
  const existing = document.querySelector('.custom-context-menu');
  if (existing) existing.remove();

  const menu = document.createElement('div');
  menu.className = 'custom-context-menu';
  menu.style.position = 'absolute';
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.style.background = '#0f1724';
  menu.style.border = '1px solid rgba(255,255,255,0.06)';
  menu.style.boxShadow = '0 6px 18px rgba(2,6,23,0.6)';
  menu.style.zIndex = 3000;
  menu.style.padding = '4px 0';
  menu.style.minWidth = '110px';
  menu.style.borderRadius = '6px';

  const copyUrl = document.createElement('div');
  copyUrl.textContent = 'Copy URL';
  copyUrl.style.padding = '6px 10px';
  copyUrl.style.cursor = 'pointer';
  copyUrl.style.color = '#e5e7eb';
  copyUrl.style.fontSize = '13px';
  copyUrl.addEventListener('mouseenter', () => copyUrl.style.background = '#111827');
  copyUrl.addEventListener('mouseleave', () => copyUrl.style.background = 'transparent');

  copyUrl.addEventListener('click', () => {
    try {
      if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(linkEl.href);
      } else if (window && typeof window.require === 'function') {
        // Fallback for Electron renderer that may provide clipboard via ipc
        try {
          const { clipboard } = require('electron');
          clipboard.writeText(linkEl.href);
        } catch (e) {
          // ignore
        }
      }
    } catch (e) {
      // ignore clipboard failures
    }
    if (typeof showNotification === 'function') showNotification('URL copied!', 'success');
    menu.remove();
  });

  menu.appendChild(copyUrl);
  document.body.appendChild(menu);

  function cleanup(e) {
    if (!menu.contains(e.target)) {
      menu.remove();
      document.removeEventListener('click', cleanup);
    }
  }
  setTimeout(() => document.addEventListener('click', cleanup), 0);
}

function attachLinkContextMenu(container, options = {}) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  const showNotification = options.showNotification || (() => {});

  el.addEventListener('contextmenu', (e) => {
    const link = e.target.closest('a');
    if (!link || !link.href) return;
    // Only show for external links
    if (link.href.startsWith('http://') || link.href.startsWith('https://')) {
      e.preventDefault();
      showLinkContextMenu(link, e.pageX, e.pageY, showNotification);
    }
  });
}

module.exports = { showLinkContextMenu, attachLinkContextMenu };
