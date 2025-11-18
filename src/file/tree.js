const globalRuntime = typeof window !== 'undefined' ? window : globalThis;

function getExpandedDirectories() {
  if (!globalRuntime._expandedDirectories) {
    globalRuntime._expandedDirectories = new Set();
  }
  return globalRuntime._expandedDirectories;
}

function rememberDirectoryState(dirPath, expanded) {
  if (!dirPath) return;
  const expandedDirs = getExpandedDirectories();
  if (expanded) expandedDirs.add(dirPath);
  else expandedDirs.delete(dirPath);
}

function ensureDirectoryChainExpanded(dirPath) {
  if (!dirPath) return;
  const expandedDirs = getExpandedDirectories();
  let current = dirPath;
  while (current && !expandedDirs.has(current)) {
    expandedDirs.add(current);
    const parent = dirname(current);
    if (!parent || parent === current) break;
    current = parent;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function findFileElementByPath(targetPath, attempts = 5, waitMs = 60) {
  if (!targetPath) return null;
  const lookup = () => Array.from(document.querySelectorAll('.file-item'))
    .find(it => it.dataset && it.dataset.path === targetPath);

  let element = lookup();
  let remaining = attempts;
  while (!element && remaining > 0) {
    await delay(waitMs);
    element = lookup();
    remaining--;
  }
  return element || null;
}

function joinPaths(a, b) {
  if (!a) return b;
  const sep = a.includes('\\') ? '\\' : '/';
  if (a.endsWith('\\') || a.endsWith('/')) return a + b;
  return a + sep + b;
}

function basename(p) {
  if (!p) return '';
  const parts = p.split(/[\\/]/);
  return parts[parts.length - 1] || '';
}

function dirname(p) {
  if (!p) return '';
  const normalized = p.replace(/[\\/]+$/, '');
  const idx = Math.max(normalized.lastIndexOf('/'), normalized.lastIndexOf('\\'));
  if (idx === -1) return '';
  return normalized.slice(0, idx);
}

function renderFileTree(items, container, level = 0, onFileClick, parentPath = '') {
  if (level === 0) {
    container.innerHTML = '';
  }

  const expandedDirs = getExpandedDirectories();
  const hasItems = Array.isArray(items) ? items : [];

  hasItems.forEach(item => {
    const itemDiv = document.createElement('div');
    const currentPath = item.path || joinPaths(parentPath, item.name || '');

    if (item.isDirectory) {
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
      const folderName = item.name || basename(currentPath) || '';
      itemDiv.className = 'folder-item';
      itemDiv.dataset.path = currentPath || '';
      itemDiv.style.paddingLeft = (level * 12) + 'px';
      itemDiv.style.cursor = 'pointer';

      if (hasChildren) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'folder-children';

        // Create icon and text separately
        const icon = document.createElement('span');
        const text = document.createElement('span');
        text.textContent = folderName;
        itemDiv.appendChild(icon);
        itemDiv.appendChild(text);

        const shouldStartExpanded = expandedDirs.has(currentPath);
        childrenDiv.style.display = shouldStartExpanded ? 'block' : 'none';
        icon.textContent = shouldStartExpanded ? '▼ ' : '▶ ';

        renderFileTree(item.children, childrenDiv, level + 1, onFileClick, currentPath);

        // Toggle folder on click
        itemDiv.addEventListener('click', (e) => {
          e.stopPropagation();
          const isCurrentlyHidden = childrenDiv.style.display === 'none';
          if (isCurrentlyHidden) {
            childrenDiv.style.display = 'block';
            icon.textContent = '▼ ';
            rememberDirectoryState(currentPath, true);
          } else {
            childrenDiv.style.display = 'none';
            icon.textContent = '▶ ';
            rememberDirectoryState(currentPath, false);
          }
        });

        // context menu for folder: new file
        itemDiv.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          e.stopPropagation();
          showContextMenu(currentPath, e.pageX, e.pageY);
        });

        container.appendChild(itemDiv);
        container.appendChild(childrenDiv);
      } else {
        itemDiv.textContent = '▶ ' + folderName;
        itemDiv.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          e.stopPropagation();
          showContextMenu(currentPath, e.pageX, e.pageY);
        });
        container.appendChild(itemDiv);
      }
    } else {
      const filePath = currentPath;
      const isMarkdown = filePath && filePath.endsWith('.md');
      const displayName = item.name || basename(filePath) || '';
      itemDiv.className = 'file-item';
      itemDiv.textContent = isMarkdown ? '📄 ' + displayName : '📃 ' + displayName;
      itemDiv.style.paddingLeft = (level * 12) + 'px';
      itemDiv.dataset.path = filePath;

      if (isMarkdown) {
        itemDiv.addEventListener('click', () => onFileClick(filePath));
      }

      // Add context menu for files
      itemDiv.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showFileContextMenu(filePath, e.pageX, e.pageY);
      });

      container.appendChild(itemDiv);
    }
  });

  // Context menu on empty space in container -> create file in root
  if (level === 0) {
    container.addEventListener('contextmenu', (e) => {
      // Only trigger if clicked directly on container (not on an item)
      if (e.target === container) {
        e.preventDefault();
        const dirPath = window._currentWorkspacePath || '';
        showContextMenu(dirPath, e.pageX, e.pageY);
      }
    });
  }
}

function showContextMenu(dirPath, x, y) {
  // remove existing
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

  const newFile = document.createElement('div');
  newFile.textContent = 'New File';
  newFile.style.padding = '6px 10px';
  newFile.style.cursor = 'pointer';
  newFile.style.color = '#e5e7eb';
  newFile.style.fontSize = '13px';
  newFile.addEventListener('mouseenter', () => newFile.style.background = '#111827');
  newFile.addEventListener('mouseleave', () => newFile.style.background = 'transparent');
  const removeMenu = () => {
    if (menu.isConnected) {
      menu.remove();
    }
    document.removeEventListener('click', cleanup);
  };

  newFile.addEventListener('click', async () => {
    removeMenu();
    await createNewUntitled(dirPath);
  });

  menu.appendChild(newFile);

  document.body.appendChild(menu);

  function cleanup(e) {
    if (!menu.contains(e.target)) {
      removeMenu();
    }
  }

  setTimeout(() => document.addEventListener('click', cleanup), 0);
}

function showFileContextMenu(filePath, x, y) {
  // remove existing
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

  const deleteFile = document.createElement('div');
  deleteFile.textContent = 'Delete';
  deleteFile.style.padding = '6px 10px';
  deleteFile.style.cursor = 'pointer';
  deleteFile.style.color = '#ef4444';
  deleteFile.style.fontSize = '13px';
  deleteFile.addEventListener('mouseenter', () => deleteFile.style.background = '#111827');
  deleteFile.addEventListener('mouseleave', () => deleteFile.style.background = 'transparent');
  
  const removeMenu = () => {
    if (menu.isConnected) {
      menu.remove();
    }
    document.removeEventListener('click', cleanup);
  };

  deleteFile.addEventListener('click', async () => {
    removeMenu();
    await deleteFileWithConfirm(filePath);
  });

  menu.appendChild(deleteFile);
  document.body.appendChild(menu);

  function cleanup(e) {
    if (!menu.contains(e.target)) {
      removeMenu();
    }
  }

  setTimeout(() => document.addEventListener('click', cleanup), 0);
}

async function deleteFileWithConfirm(filePath) {
  const fileName = basename(filePath);
  const confirmed = confirm(`Are you sure you want to delete "${fileName}"?`);
  
  if (!confirmed) return;

  try {
    const success = await window.api.deleteFile(filePath);
    if (success) {
      // If the deleted file is currently open, clear the editor
      if (window._currentFilePath === filePath) {
        window._currentFilePath = null;
        if (window._editor) {
          window._editor.commands.setContent('<p>Select a file to start editing.</p>');
        }
        const filenameInput = document.getElementById('editor-filename-input');
        if (filenameInput) {
          filenameInput.value = '';
          filenameInput.disabled = true;
        }
      }

      // Reload the file tree
      if (window.reloadWorkspace) {
        await window.reloadWorkspace();
      }
    } else {
      alert(`Failed to delete "${fileName}"`);
    }
  } catch (err) {
    console.error('Error deleting file:', err);
    alert(`Error deleting "${fileName}": ${err.message}`);
  }
}

async function createNewUntitled(dirPath) {
  // Find the directory node in window._fileTree to determine existing names
  function findNodeByPath(items, targetPath) {
    for (const it of items || []) {
      if (it.path === targetPath) return it;
      if (it.isDirectory) {
        const found = findNodeByPath(it.children || [], targetPath);
        if (found) return found;
      }
    }
    return null;
  }

  const root = window._fileTree || [];
  const dirNode = dirPath ? findNodeByPath(root, dirPath) : { children: root };
  const existingNames = new Set((dirNode && dirNode.children || []).map(c => c.name));

  let base = 'Untitled';
  let ext = '.md';
  let name = base + ext;
  let i = 1;
  while (existingNames.has(name)) {
    name = `${base} ${i}${ext}`;
    i++;
  }

  const workspace = dirPath || window._currentWorkspacePath || '';
  const newPath = joinPaths(workspace, name);
  const success = await window.api.writeFile(newPath, '');
  if (!success) {
    console.error('Failed to create', newPath);
    return;
  }
  const targetDir = dirPath || dirname(newPath);
  ensureDirectoryChainExpanded(targetDir);

  // Reload workspace and open file if possible
  if (window.reloadWorkspace) {
    await window.reloadWorkspace();
    if (typeof window._lastOnFileClick === 'function') {
      await window._lastOnFileClick(newPath);
    }

    if (typeof window.focusFilenameInput === 'function') {
      window.focusFilenameInput({ select: true });
    }

    const fileEl = await findFileElementByPath(newPath);
    if (fileEl) {
      if (typeof fileEl.scrollIntoView === 'function') {
        fileEl.scrollIntoView({ block: 'nearest' });
      }
    } else {
      console.warn('New file element not found for focus', newPath);
    }
  }
}

module.exports = { renderFileTree };
