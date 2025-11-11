// Module imports
const { initEditor } = require('./src/editor/init');
const { createMarkdownSerializer } = require('./src/markdown/serializer');
const { openFile, setupAutoSave } = require('./src/file/operations');
const { renderFileTree } = require('./src/file/tree');
const { SearchDialog } = require('./src/search/dialog');

// State
let editor = null;
let workspacePath = null;
let searchDialog = null;
const turndownService = createMarkdownSerializer();

// Workspace management
async function loadWorkspace(folderPath) {
  workspacePath = folderPath;
  const items = await window.api.readDir(folderPath);
  const fileTree = document.querySelector('#file-tree');
  renderFileTree(items, fileTree, 0, (filePath) => openFile(filePath, editor));
  
  // Update search dialog with new file list
  if (searchDialog) {
    searchDialog.updateFiles(items, folderPath);
  }
  
  // Save workspace path
  await window.api.writeSettings({ lastWorkspacePath: folderPath });
}

// Event listeners
document.querySelector('#open-folder-btn').addEventListener('click', async () => {
  const folderPath = await window.api.openFolder();
  if (folderPath) {
    loadWorkspace(folderPath);
  }
});

// Sidebar resize functionality (desktop only)
const sidebar = document.querySelector('#sidebar');
const resizeHandle = document.querySelector('#resize-handle');
let isResizing = false;

// Only enable resize on desktop
if (!window.api.isCapacitor) {
  resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    
    const newWidth = e.clientX;
    const minWidth = 150;
    const maxWidth = 600;
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      sidebar.style.width = newWidth + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });
}

// Initialize
async function init() {
  editor = initEditor(() => {
    setupAutoSave(editor, turndownService)();
  });
  
  // Initialize search dialog
  searchDialog = new SearchDialog();
  searchDialog.onSelect((filePath) => {
    openFile(filePath, editor);
  });
  
  // Setup CTRL+P keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      searchDialog.open();
    }
  });
  
  // On mobile, auto-load the vault folder
  if (window.api.isCapacitor) {
    const folderPath = await window.api.openFolder();
    if (folderPath) {
      await loadWorkspace(folderPath);
    }
  } else {
    // On desktop, load last workspace
    const settings = await window.api.readSettings();
    if (settings.lastWorkspacePath) {
      loadWorkspace(settings.lastWorkspacePath);
    }
  }
}

init();
