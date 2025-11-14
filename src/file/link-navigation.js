const { resolveInternalLink, getPageNameFromHref, buildLinkIndex } = require('../markdown/link-resolver');

// Setup click handler for internal links
function setupInternalLinkNavigation(editor, fileTree, onNavigate) {
  console.log('setupInternalLinkNavigation fileTree:', fileTree);
  console.log('Debugging fileTree structure:', JSON.stringify(fileTree, null, 2));
  const editorElement = editor.view.dom;
  // Remove any previous handler
  if (editorElement._internalLinkHandler) {
    editorElement.removeEventListener('click', editorElement._internalLinkHandler);
  }
  // Remove any previous observer
  if (editorElement._internalLinkObserver) {
    try {
      editorElement._internalLinkObserver.disconnect();
    } catch (err) {}
    delete editorElement._internalLinkObserver;
  }
  // Store the current handler to allow cleanup if needed
  const clickHandler = async (e) => {
    // Check if clicked element is a link
    const link = e.target.closest('a');
    if (!link) return;
    
    // Prefer href, but fall back to data-href (some renderers may strip non-HTTP hrefs)
    let href = link.getAttribute('href');
    if (!href || href === '') {
      href = link.getAttribute('data-href') || href;
    }
    // Accept hash-based internal hrefs (#internal:Page) and normalize them to internal:Page
    if (href && href.startsWith('#internal:')) {
      href = href.slice(1); // remove the leading '#'
    }
    // Accept same-origin internal path format (/__internal__/Page)
    if (href && href.startsWith('/__internal__/')) {
      href = 'internal:' + href.slice('/__internal__/'.length);
    }
    // Debug log for all link clicks
    console.log('Link clicked:', href);
    
    // Only handle internal links
    if (!href || !href.startsWith('internal:')) {
      // Let external links open normally
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        e.preventDefault();
        if (window.api && typeof window.api.openExternal === 'function') {
          window.api.openExternal(href);
        }
      }
      return;
    }
    
    e.preventDefault();
    
    const pageName = getPageNameFromHref(href);
    console.log('Internal link pageName:', pageName);
    if (!pageName) return;

    // Try to resolve using provided fileTree, or runtime cached index
    let resolvedFilePath = resolveInternalLink(pageName, fileTree, window._linkIndex);
    console.log('Initial resolveInternalLink result:', resolvedFilePath);

    // If resolved but file no longer exists on disk, try refreshing the index from workspace
    async function fileExists(path) {
      try {
        const content = await window.api.readFile(path);
        return content !== null;
      } catch (err) {
        return false;
      }
    }

    if (resolvedFilePath) {
      const exists = await fileExists(resolvedFilePath);
      if (!exists && window._currentWorkspacePath) {
        console.log('Resolved path missing on disk, rebuilding index from workspace...');
        const freshTree = await window.api.readDir(window._currentWorkspacePath);
        const freshIndex = buildLinkIndex(freshTree);
        // update runtime cache
        window._fileTree = freshTree;
        window._linkIndex = freshIndex;
        // retry resolution
        resolvedFilePath = resolveInternalLink(pageName, freshTree, freshIndex);
        console.log('Post-refresh resolveInternalLink result:', resolvedFilePath);
      }
    }

    if (resolvedFilePath) {
      console.log('Internal link resolved to:', resolvedFilePath);
      // Navigate to the file
      onNavigate(resolvedFilePath);
      console.log('onNavigate called for:', resolvedFilePath);
      // Handle anchor navigation if present
      const anchorMatch = href.match(/#(.+)$/);
      if (anchorMatch) {
        const headingText = anchorMatch[1];
        setTimeout(() => scrollToHeading(editor, headingText), 100);
      }
    } else {
      // File not found - show notification
      console.warn(`Internal link target not found: ${pageName}`);
      showLinkNotFoundNotification(pageName);
    }
  };
  editorElement.addEventListener('click', clickHandler);
  editorElement._internalLinkHandler = clickHandler;
  
  console.log('Event listener attached to:', editor.view.dom);
  // Sync anchors in the editor DOM with underlying document marks.
  // Some environments/renderers may clear the `href` attribute for non-standard schemes;
  // ensure we still surface the internal target on the element as `data-href` so
  // the click handler can resolve it reliably.
  function findLinkMarkForText(text) {
    let found = null;
    editor.state.doc.descendants((node) => {
      if (found) return false;
      if (node.isText && node.text === text && node.marks && node.marks.length) {
        for (const m of node.marks) {
          if (m.type.name === 'link' && m.attrs && m.attrs.href) {
            found = m.attrs.href;
            return false;
          }
        }
      }
      return true;
    });
    return found;
  }

  function syncAnchors() {
    const anchors = editor.view.dom.querySelectorAll('a.internal-link');
    anchors.forEach(a => {
      const raw = a.getAttribute('href');
      const data = a.getAttribute('data-href');
      if ((raw === null || raw === '') && (!data || data === '')) {
        const page = findLinkMarkForText(a.textContent || a.innerText || '');
        if (page) {
          a.setAttribute('data-href', page);
          // Also set a safe same-origin href so the element is treated as a link visually
          try {
            a.setAttribute('href', `/__internal__/${page.replace(/^internal:/, '')}`);
          } catch (err) {
            // ignore if setting href fails for any reason
          }
        }
      }
    });
  }

  // Initial sync and observe for changes (debounced)
  syncAnchors();
  let moTimer = null;
  // Create MutationObserver from the same window as the editor DOM when possible
  let MutationObserverCtor = null;
  try {
    if (editor.view && editor.view.dom && editor.view.dom.ownerDocument && editor.view.dom.ownerDocument.defaultView && editor.view.dom.ownerDocument.defaultView.MutationObserver) {
      MutationObserverCtor = editor.view.dom.ownerDocument.defaultView.MutationObserver;
    } else if (typeof MutationObserver !== 'undefined') {
      MutationObserverCtor = MutationObserver;
    }
  } catch (err) {
    MutationObserverCtor = (typeof MutationObserver !== 'undefined') ? MutationObserver : null;
  }

  if (MutationObserverCtor) {
    const mo = new MutationObserverCtor(() => {
      if (moTimer) clearTimeout(moTimer);
      moTimer = setTimeout(syncAnchors, 50);
    });
    try {
      mo.observe(editor.view.dom, { childList: true, subtree: true, characterData: true });
      editorElement._internalLinkObserver = mo;
    } catch (err) {
      // Some environments may not support observing the node; ignore silently
    }
  }
  
  // Return cleanup function
  return () => {
    editorElement.removeEventListener('click', clickHandler);
    delete editorElement._internalLinkHandler;
  };
}

// Scroll to a heading in the current document
function scrollToHeading(editor, headingText) {
  const { state } = editor;
  const { doc } = state;
  
  let targetPos = null;
  
  // Normalize heading text for comparison
  const normalizedTarget = headingText.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const text = node.textContent;
      const normalizedText = text.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      if (normalizedText === normalizedTarget) {
        targetPos = pos;
        return false; // Stop searching
      }
    }
  });
  
  if (targetPos !== null) {
    const dom = editor.view.domAtPos(targetPos);
    if (dom.node) {
      const element = dom.node.nodeType === 1 
        ? dom.node 
        : dom.node.parentElement;
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Flash the heading briefly to show where we scrolled
        element.style.transition = 'background-color 0.5s';
        element.style.backgroundColor = '#fef3c7';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 1000);
      }
    }
  }
}

// Show notification when link target doesn't exist
function showLinkNotFoundNotification(pageName) {
  const notification = document.createElement('div');
  notification.className = 'link-notification';
  notification.innerHTML = `
    <strong>Page not found</strong><br>
    <span style="font-size: 0.9em;">"${pageName}" doesn't exist in this workspace</span>
  `;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Add CSS for internal links styling
function addInternalLinkStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Internal links (match either href or data-href) */
    .ProseMirror a[href^="internal:"],
    .ProseMirror a[data-href^="internal:"] {
      color: #7c3aed;
      text-decoration: none;
      cursor: pointer;
      border-bottom: 1px dashed #7c3aed;
      transition: all 0.15s;
    }

    .ProseMirror a[href^="internal:"],
    .ProseMirror a[href^="#internal:"],
    .ProseMirror a[href^="/__internal__/"] ,
    .ProseMirror a[data-href^="internal:"]:hover {
      color: #6d28d9;
      border-bottom-style: solid;
      background-color: rgba(124, 58, 237, 0.05);
    }

    /* External links (those that are not internal via href or data-href) */
    .ProseMirror a:not([href^="internal:"]):not([data-href^="internal:"]) {
      color: #2563eb;
      text-decoration: none;
      border-bottom: 1px solid #93c5fd;
    }

    .ProseMirror a:not([href^="internal:"]):not([data-href^="internal:"]):hover {
      color: #1d4ed8;
      background-color: rgba(37, 99, 235, 0.05);
    }
    
    /* Animations */
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

module.exports = {
  setupInternalLinkNavigation,
  scrollToHeading,
  showLinkNotFoundNotification,
  addInternalLinkStyles
};