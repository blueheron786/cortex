// Module imports
const { initEditor } = require('./src/editor/init');
const { createMarkdownSerializer } = require('./src/markdown/serializer');
const { openFile, setupAutoSave } = require('./src/file/operations');
const { renderFileTree } = require('./src/file/tree');

// State
let editor = null;
let workspacePath = null;
const turndownService = createMarkdownSerializer();

// Workspace management
async function loadWorkspace(folderPath) {
  workspacePath = folderPath;
  const items = await window.api.readDir(folderPath);
  const fileTree = document.querySelector('#file-tree');
  renderFileTree(items, fileTree, 0, (filePath) => openFile(filePath, editor));
  
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

// Initialize
async function init() {
  editor = initEditor(() => {
    setupAutoSave(editor, turndownService)();
  });
  
  // Load last workspace
  const settings = await window.api.readSettings();
  if (settings.lastWorkspacePath) {
    loadWorkspace(settings.lastWorkspacePath);
  }
}

init();
