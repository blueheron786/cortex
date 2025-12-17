const { initEditor } = require('./src/editor/init');
const { openFile, setupAutoSave, setCurrentFile } = require('./src/file/operations');
const { renderFileTree } = require('./src/file/tree');
const { createMarkdownSerializer } = require('./src/markdown/serializer');
const { buildLinkIndex } = require('./src/markdown/link-resolver');
const { setupInternalLinkNavigation, addInternalLinkStyles } = require('./src/file/link-navigation');
const { SearchDialog } = require('./src/search/dialog');
const { basename } = require('./src/ui/path-utils');
const { FilenameInput } = require('./src/ui/filename-input');
const { showNotification } = require('./src/ui/notifications');
const { setupKeyboardShortcuts } = require('./src/ui/keyboard-shortcuts');
const { showLinkInsertDialog } = require('./src/ui/link-dialog');
const { attachLinkContextMenu } = require('./src/ui/link-context-menu');

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
const workspaceNameEl = document.querySelector('#workspace-name');
const filenameInputEl = document.querySelector('#editor-filename-input');
const editorContainer = document.querySelector('#editor');

// Initialize filename input manager
const filenameInput = new FilenameInput(filenameInputEl);

// Set initial state
filenameInput.reset();
updateWorkspaceName(null);

function updateWorkspaceName(folderPath) {
  if (!workspaceNameEl) return;
  workspaceNameEl.textContent = folderPath ? basename(folderPath) : 'No workspace';
}

// Expose functions for backward compatibility
window.focusFilenameInput = (options) => filenameInput.focus(options);
window.syncFilenameInput = (filePath) => filenameInput.setFromPath(filePath);
window.showNotification = showNotification;

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
    setCurrentFile(null);
    filenameInput.reset();
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
  updateWorkspaceName(folderPath);
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

// Setup keyboard shortcuts
setupKeyboardShortcuts({
  editor,
  turndownService,
  openFolderBtn,
  searchDialog,
  onShowLinkDialog: () => showLinkInsertDialog(editor, linkIndex)
});

// Attach internal link navigation handler
setupInternalLinkNavigation(editor, fileTree, (filePath) => {
  openFile(filePath, editor, fileTree, setupInternalLinkNavigation);
});

// Attach external-link context menu behavior
attachLinkContextMenu(editorContainer, { showNotification });