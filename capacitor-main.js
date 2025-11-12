/**
 * Capacitor entry point for mobile
 */
import { capacitorAPI } from './src/capacitor-api.js';
import { initEditor } from './src/editor/init.js';
import { createMarkdownSerializer } from './src/markdown/serializer.js';
import { openFile, setupAutoSave } from './src/file/operations.js';
import { renderFileTree } from './src/file/tree.js';
import { SearchDialog } from './src/search/dialog.js';

// Expose API
window.api = capacitorAPI;
window.api.isElectron = false;
window.api.isCapacitor = true;

// State
let editor = null;
let workspacePath = null;
let searchDialog = null;
const turndownService = createMarkdownSerializer();

async function loadWorkspace(folderPath) {
  workspacePath = folderPath;
  const items = await window.api.readDir(folderPath);
  const fileTree = document.querySelector('#file-tree');
  
  if (items.length === 0) {
    fileTree.innerHTML = '<div class="empty-state">No files yet.<br>Tap <strong>+ New File</strong> to create your first note!</div>';
  } else {
    renderFileTree(items, fileTree, 0, (filePath) => openFile(filePath, editor));
  }
  
  if (searchDialog) {
    searchDialog.updateFiles(items, folderPath);
  }
  
  await window.api.writeSettings({ lastWorkspacePath: folderPath });
}

async function init() {
  const menuToggle = document.querySelector('#menu-toggle');
  const sidebar = document.querySelector('#sidebar');
  const openFolderBtn = document.querySelector('#open-folder-btn');
  const newFileBtn = document.querySelector('#new-file-btn');
  
  // Menu toggle
  if (menuToggle) {
    menuToggle.classList.remove('hidden');
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('mobile-hidden'));
    sidebar.addEventListener('click', (e) => {
      if (e.target.classList.contains('file-item')) {
        sidebar.classList.add('mobile-hidden');
      }
    });
  }
  
  // Folder picker
  if (openFolderBtn) {
    openFolderBtn.textContent = 'Choose Folder';
    openFolderBtn.addEventListener('click', async () => {
      const folderPath = await window.api.openFolder();
      if (folderPath) {
        await loadWorkspace(folderPath);
        const h3 = document.querySelector('#sidebar-header h3');
        h3.innerHTML = 'Your Vault<br><small style="font-size: 10px; font-weight: normal; color: #808080;">' + 
                      (folderPath.includes('content://') ? 'Custom folder' : folderPath) + '</small>';
      }
    });
  }

  // New file
  if (newFileBtn) {
    newFileBtn.classList.remove('hidden');
    newFileBtn.addEventListener('click', async () => {
      const fileName = prompt('Enter new file name (without .md):');
      if (!fileName) return;
      
      const sanitizedName = fileName.trim().replace(/[^a-zA-Z0-9-_\s]/g, '');
      if (!sanitizedName) {
        alert('Invalid file name');
        return;
      }
      
      const filePath = workspacePath ? `${workspacePath}/${sanitizedName}.md` : `${sanitizedName}.md`;
      const success = await window.api.writeFile(filePath, '# ' + sanitizedName + '\n\n');
      
      if (success) {
        await loadWorkspace(workspacePath);
        await openFile(filePath, editor);
      }
    });
  }

  editor = initEditor(() => setupAutoSave(editor, turndownService)());
  
  searchDialog = new SearchDialog();
  searchDialog.onSelect((filePath) => openFile(filePath, editor));
  
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      searchDialog.open();
    }
  });
  
  // Load vault
  const h3 = document.querySelector('#sidebar-header h3');
  h3.textContent = 'Your Vault';
  
  const folderPath = await window.api.openFolder();
  if (folderPath) {
    await loadWorkspace(folderPath);
    h3.innerHTML = 'Your Vault<br><small style="font-size: 10px; font-weight: normal; color: #808080;">' + 
                  (folderPath.includes('content://') ? 'Custom folder' : folderPath) + '</small>';
  } else {
    document.querySelector('#file-tree').innerHTML = '<div class="empty-state">Tap <strong>Choose Folder</strong> to select where to store your notes</div>';
  }
}

init();
