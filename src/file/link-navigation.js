const { resolveInternalLink, getPageNameFromHref } = require('../markdown/link-resolver');

// Setup click handler for internal links
function setupInternalLinkNavigation(editor, fileTree, onNavigate) {
  const editorElement = editor.view.dom;
  
  // Store the current handler to allow cleanup if needed
  const clickHandler = (e) => {
    // Check if clicked element is a link
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
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
    
    if (!pageName) return;
    
    // Resolve the page name to a file path
    const filePath = resolveInternalLink(pageName, fileTree);
    
    if (filePath) {
      // Navigate to the file
      onNavigate(filePath);
      
      // Handle anchor navigation if present
      const anchorMatch = href.match(/#(.+)$/);
      if (anchorMatch) {
        const headingText = anchorMatch[1];
        // Small delay to let the file load first
        setTimeout(() => scrollToHeading(editor, headingText), 100);
      }
    } else {
      // File not found - show notification
      console.warn(`Internal link target not found: ${pageName}`);
      showLinkNotFoundNotification(pageName);
    }
  };
  
  editorElement.addEventListener('click', clickHandler);
  
  // Return cleanup function
  return () => {
    editorElement.removeEventListener('click', clickHandler);
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
    /* Internal links */
    .ProseMirror a[href^="internal:"] {
      color: #7c3aed;
      text-decoration: none;
      cursor: pointer;
      border-bottom: 1px dashed #7c3aed;
      transition: all 0.15s;
    }
    
    .ProseMirror a[href^="internal:"]:hover {
      color: #6d28d9;
      border-bottom-style: solid;
      background-color: rgba(124, 58, 237, 0.05);
    }
    
    /* External links */
    .ProseMirror a:not([href^="internal:"]) {
      color: #2563eb;
      text-decoration: none;
      border-bottom: 1px solid #93c5fd;
    }
    
    .ProseMirror a:not([href^="internal:"]):hover {
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