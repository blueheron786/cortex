// Module imports
import { initEditor } from './src/editor/init.js';
import { createMarkdownSerializer } from './src/markdown/serializer.js';
import { openFile, setupAutoSave } from './src/file/operations.js';
import { renderFileTree } from './src/file/tree.js';
import { SearchDialog } from './src/search/dialog.js';

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
  
  // Show empty state if no files
  if (items.length === 0 && window.api && window.api.isCapacitor === true) {
    fileTree.innerHTML = '<div class="empty-state">No files yet.<br>Tap <strong>+ New File</strong> to create your first note!</div>';
  } else {
    renderFileTree(items, fileTree, 0, (filePath) => openFile(filePath, editor));
  }
  
  // Update search dialog with new file list
  if (searchDialog) {
    searchDialog.updateFiles(items, folderPath);
  }
  
  // Save workspace path
  await window.api.writeSettings({ lastWorkspacePath: folderPath });
}

// Initialize
async function init() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('#menu-toggle');
  const sidebar = document.querySelector('#sidebar');
  
  if (menuToggle && window.api && window.api.isCapacitor === true) {
    menuToggle.classList.remove('hidden');
    
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-hidden');
    });
    
    // Close sidebar when a file is selected on mobile
    sidebar.addEventListener('click', (e) => {
      if (e.target.classList.contains('file-item')) {
        sidebar.classList.add('mobile-hidden');
      }
    });
  }
  
  // Setup event listeners first
  const openFolderBtn = document.querySelector('#open-folder-btn');
  console.log('Open folder button found:', openFolderBtn);
  console.log('window.api at init:', window.api);

  if (openFolderBtn) {
    openFolderBtn.addEventListener('click', async () => {
      console.log('Open folder clicked');
      console.log('window.api:', window.api);
      console.log('window.api.isCapacitor:', window.api?.isCapacitor);
      console.log('window.api.isElectron:', window.api?.isElectron);
      
      // Check if running on Capacitor (mobile) or Electron (desktop)
      if (window.api && window.api.isCapacitor === true) {
        // On mobile, show info about where files are stored
        alert('Your files are stored in:\nDocuments/cortex-vault/\n\nYou can access them with any file manager app on your device.');
      } else {
        // On desktop, open folder picker
        console.log('Calling openFolder...');
        const folderPath = await window.api.openFolder();
        console.log('Got folder path:', folderPath);
        if (folderPath) {
          await loadWorkspace(folderPath);
        }
      }
    });
  }

  // New file button (mobile only)
  const newFileBtn = document.querySelector('#new-file-btn');
  if (newFileBtn) {
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
        // Reload the workspace to show the new file
        await loadWorkspace(workspacePath);
        // Open the new file
        await openFile(filePath, editor);
      } else {
        alert('Failed to create file');
      }
    });
  }

  // Sidebar resize functionality (desktop only)
  const resizeHandle = document.querySelector('#resize-handle');
  let isResizing = false;

  // Only enable resize on desktop
  if (!window.api || window.api.isCapacitor !== true) {
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
  
  // Mobile-specific UI adjustments
  if (window.api && window.api.isCapacitor === true) {
    // Change button labels for mobile
    const openFolderBtn = document.querySelector('#open-folder-btn');
    openFolderBtn.textContent = 'Choose Folder';
    document.querySelector('#new-file-btn').classList.remove('hidden');
    
    // Update sidebar header
    const sidebarH3 = document.querySelector('#sidebar-header h3');
    sidebarH3.textContent = 'Your Vault';
    
    // Try to load existing folder or prompt user to choose one
    const folderPath = await window.api.openFolder();
    if (folderPath) {
      await loadWorkspace(folderPath);
      // Update header to show location
      sidebarH3.innerHTML = 'Your Vault<br><small style="font-size: 10px; font-weight: normal; color: #808080;">' + 
                            (folderPath.includes('content://') ? 'Custom folder' : folderPath) + '</small>';
    } else {
      // Show a message prompting to choose folder
      const fileTree = document.querySelector('#file-tree');
      fileTree.innerHTML = '<div class="empty-state">Tap <strong>Choose Folder</strong> to select where to store your notes</div>';
    }
    
    // If no files exist, create a welcome file
    const fileTree = document.querySelector('#file-tree');
    if (!fileTree.children.length) {
      const welcomePath = 'cortex-vault/Welcome.md';
      const welcomeContent = `# Welcome to Cortex on Android! 📱

Your markdown vault is stored in:
**Documents/cortex-vault/**

## Getting Started

- Tap **+ New File** to create a new note
- Use **CTRL+P** (or tap search) to quickly find files
- Your files auto-save as you type
- Access your files with any file manager app

## Features

✅ Full markdown editing with TipTap
✅ Quick search across all files
✅ Auto-save (no need to manually save!)
✅ Touch-optimized interface
✅ Task lists, tables, code blocks, and more!

Start typing below or create a new file to get started! ✍️
`;
      await window.api.writeFile(welcomePath, welcomeContent);
      await loadWorkspace(folderPath);
      await openFile(welcomePath, editor);
    }
  } else {
    // Desktop: load last workspace
    const settings = await window.api.readSettings();
    if (settings.lastWorkspacePath) {
      loadWorkspace(settings.lastWorkspacePath);
    }
  }
}

init();
