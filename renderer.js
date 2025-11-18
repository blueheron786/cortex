const { initEditor } = require('./src/editor/init');
const { openFile, setupAutoSave, getCurrentFile, setCurrentFile } = require('./src/file/operations');

// Small path helpers to avoid bundling Node's `path` in renderer (esbuild --platform=browser)
function basename(p) {
  if (!p) return '';
  return p.split(/[\\\/]/).pop();
}

function dirname(p) {
  if (!p) return '';
  const parts = p.split(/[\\\/]/);
  if (parts.length <= 1) return p;
  parts.pop();
  const sep = p.includes('\\') ? '\\' : '/';
  return parts.join(sep);
}

function joinPaths(a, b) {
  if (!a) return b;
  const sep = a.includes('\\') ? '\\' : '/';
  if (a.endsWith('\\') || a.endsWith('/')) return a + b;
  return a + sep + b;
}
const { renderFileTree } = require('./src/file/tree');
const { createMarkdownSerializer } = require('./src/markdown/serializer');
const { buildLinkIndex } = require('./src/markdown/link-resolver');
const { setupInternalLinkNavigation, addInternalLinkStyles } = require('./src/file/link-navigation');
const { SearchDialog } = require('./src/search/dialog');

// Global state
let fileTree = [];
let linkIndex = null;
let currentWorkspacePath = null;

// Initialize TurndownService
const turndownService = createMarkdownSerializer();

// Create editor with auto-save
const autoSaveCallback = setupAutoSave(null, turndownService);
const editor = initEditor(autoSaveCallback);

// Inject internal link styles
addInternalLinkStyles();

// Quick search dialog
const searchDialog = new SearchDialog();

// UI Elements
const openFolderBtn = document.querySelector('#open-folder-btn');
const fileTreeContainer = document.querySelector('#file-tree');

// Open folder handler
openFolderBtn.addEventListener('click', async () => {
  const folderPath = await window.api.openFolder();
  if (folderPath) {
    await loadWorkspace(folderPath);
  }
});

// Load workspace and setup internal links
async function loadWorkspace(folderPath) {
  const isDifferentWorkspace = currentWorkspacePath !== folderPath;
  currentWorkspacePath = folderPath;

  if (isDifferentWorkspace) {
    window._expandedDirectories = new Set();
  }
  
  // Load file tree
  fileTree = await window.api.readDir(folderPath);
  
  // Build link index for fast internal link resolution
  linkIndex = buildLinkIndex(fileTree);
  // Expose for runtime checks and to allow navigation handler to refresh index
  window._fileTree = fileTree;
  window._linkIndex = linkIndex;
  window._currentWorkspacePath = folderPath;
  
  // Setup internal link navigation
  setupInternalLinkNavigation(editor, fileTree, (filePath) => {
    openFile(filePath, editor, fileTree, setupInternalLinkNavigation);
  });

  // Update quick-search dialog with file list
  try {
    searchDialog.updateFiles(fileTree, folderPath);
    searchDialog.onSelect((filePath) => {
      openFile(filePath, editor, fileTree, setupInternalLinkNavigation);
    });
  } catch (err) {
    // If the dialog elements aren't present yet, ignore
  }
  
  // Render file tree
  // Keep last onFileClick globally so tree helpers can open files after creating them
  window._lastOnFileClick = (filePath) => openFile(filePath, editor, fileTree, setupInternalLinkNavigation);
  renderFileTree(fileTree, fileTreeContainer, 0, window._lastOnFileClick);
  
  // Save workspace path to settings
  await window.api.writeSettings({ lastWorkspacePath: folderPath });
  
  // Update UI
  document.querySelector('#workspace-name').textContent = folderPath.split(/[\\/]/).pop();
}

// Expose a reload helper so other modules can refresh the workspace
window.reloadWorkspace = async () => {
  if (window._currentWorkspacePath) {
    await loadWorkspace(window._currentWorkspacePath);
  }
};

// Load last workspace on startup
async function loadLastWorkspace() {
  const settings = await window.api.readSettings();
  if (settings.lastWorkspacePath) {
    try {
      // Verify the path still exists
      const exists = await window.api.readDir(settings.lastWorkspacePath);
      if (exists && exists.length >= 0) {
        await loadWorkspace(settings.lastWorkspacePath);
      }
    } catch (err) {
      console.log('Last workspace no longer exists');
    }
  }
}

// Initialize on load
loadLastWorkspace();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Cmd/Ctrl + O: Open folder
  if ((e.metaKey || e.ctrlKey) && e.key === 'o') {
    e.preventDefault();
    openFolderBtn.click();
  }
  
  // Cmd/Ctrl + S: Manual save (auto-save is already enabled)
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    // Save is automatic, but we can show a notification
    showNotification('Saved', 'success');
  }
  
  // Cmd/Ctrl + K: Quick link insert (optional)
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    showLinkInsertDialog();
  }

  // Cmd/Ctrl + P: Quick search
  if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
    e.preventDefault();
    try {
      searchDialog.open();
    } catch (err) {
      // ignore if dialog isn't available
    }
  }
});

// Optional: Show link insert dialog with autocomplete
function showLinkInsertDialog() {
  if (!linkIndex || linkIndex.size === 0) {
    showNotification('No workspace open', 'error');
    return;
  }
  
  // Create a simple dialog
  const dialog = document.createElement('div');
  dialog.className = 'link-dialog';
  dialog.innerHTML = `
    <div class="link-dialog-content">
      <h3>Insert Internal Link</h3>
      <input type="text" id="link-search" placeholder="Search for a page..." autocomplete="off">
      <div id="link-suggestions"></div>
      <div class="link-dialog-buttons">
        <button id="link-cancel">Cancel</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(dialog);
  
  const input = dialog.querySelector('#link-search');
  const suggestions = dialog.querySelector('#link-suggestions');
  
  // Focus input
  input.focus();
  
  // Search and show suggestions
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    suggestions.innerHTML = '';
    
    if (query.length === 0) {
      return;
    }
    
    // Search through link index
    const matches = [];
    linkIndex.forEach((filePath, pageName) => {
      if (pageName.toLowerCase().includes(query) && !pageName.endsWith('.md')) {
        matches.push({ pageName, filePath });
      }
    });
    
    // Show top 10 matches
    matches.slice(0, 10).forEach(match => {
      const item = document.createElement('div');
      item.className = 'link-suggestion-item';
      item.textContent = match.pageName;
      item.title = match.filePath;
      
      item.addEventListener('click', () => {
        insertInternalLink(match.pageName);
        document.body.removeChild(dialog);
      });
      
      suggestions.appendChild(item);
    });
  });
  
  // Handle Enter key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const firstSuggestion = suggestions.querySelector('.link-suggestion-item');
      if (firstSuggestion) {
        firstSuggestion.click();
      } else if (input.value.trim()) {
        // Insert link even if not found (creates a broken link)
        insertInternalLink(input.value.trim());
        document.body.removeChild(dialog);
      }
    } else if (e.key === 'Escape') {
      document.body.removeChild(dialog);
    }
  });
  
  // Cancel button
  dialog.querySelector('#link-cancel').addEventListener('click', () => {
    document.body.removeChild(dialog);
  });
  
  // Click outside to close
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      document.body.removeChild(dialog);
    }
  });
}

// Insert internal link at cursor position
function insertInternalLink(pageName, displayText) {
  const { state } = editor;
  const { from, to } = state.selection;
  editor
    .chain()
    .focus()
    .insertContentAt({ from, to }, [
      {
        type: 'text',
        text: displayText || pageName,
        marks: [
          {
            type: 'link',
            attrs: {
              // Use a hash-based href so it survives DOM sanitizers but still looks like a link.
              // Use a normal same-origin path so browsers keep the href attribute
              href: `/__internal__/${pageName}`,
              // Keep original target in data-href for resolution
              dataHref: `internal:${pageName}`,
              class: 'internal-link'
            }
          }
        ]
      },
      { type: 'text', text: ' ' }
    ])
    .run();
}

// Simple notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 1000;
    animation: slideIn 0.3s ease;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add CSS for link dialog
const style = document.createElement('style');
style.textContent = `
  .link-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }
  
  .link-dialog-content {
    background: white;
    padding: 24px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  .link-dialog-content h3 {
    margin-top: 0;
    margin-bottom: 16px;
  }
  
  #link-search {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  #link-search:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }
  
  #link-suggestions {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 16px;
  }
  
  .link-suggestion-item {
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.15s;
  }
  
  .link-suggestion-item:hover {
    background: #f3f4f6;
  }
  
  .link-dialog-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  
  .link-dialog-buttons button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  #link-cancel {
    background: #e5e7eb;
    color: #374151;
  }
  
  #link-cancel:hover {
    background: #d1d5db;
  }
`;
document.head.appendChild(style);

// Attach internal link navigation handler only once after editor initialization
setupInternalLinkNavigation(editor, fileTree, (filePath) => {
  openFile(filePath, editor, fileTree, setupInternalLinkNavigation);
});

// Allow clicking the editor header to rename the current file
const editorHeader = document.querySelector('#editor-header');
if (editorHeader) {
  editorHeader.addEventListener('click', (e) => {
    const current = getCurrentFile();
    if (!current) return;

    const oldBase = basename(current);
    const dir = dirname(current);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldBase.replace(/\.md$/, '');
    input.style.minWidth = '200px';
    // Replace header content with input
    editorHeader.innerHTML = '';
    editorHeader.appendChild(input);
    input.select();
    input.focus();

    let finished = false;
    const restore = () => {
      editorHeader.textContent = oldBase;
    };

    const finish = async (save) => {
      if (finished) return;
      finished = true;
      const newNameRaw = input.value.trim();
      if (!save || !newNameRaw) {
        restore();
        return;
      }

      let newName = newNameRaw;
      if (!newName.toLowerCase().endsWith('.md')) newName += '.md';

      const newPath = joinPaths(dir, newName);
      const success = await window.api.renameFile(current, newPath);
      if (success) {
        setCurrentFile(newPath);
        await window.reloadWorkspace();
        if (typeof window._lastOnFileClick === 'function') {
          window._lastOnFileClick(newPath);
        }
        showNotification('Renamed', 'success');
      } else {
        showNotification('Rename failed', 'error');
        restore();
      }
    };

    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        finish(true);
      } else if (ev.key === 'Escape') {
        finish(false);
      }
    });

    input.addEventListener('blur', () => finish(true));
  });
}

// Expose notification helper to other modules (tree.js uses it)
window.showNotification = showNotification;