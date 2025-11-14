function renderFileTree(items, container, level = 0, onFileClick) {
  if (level === 0) {
    container.innerHTML = '';
  }
  
  items.forEach(item => {
    const itemDiv = document.createElement('div');
    
    if (item.isDirectory) {
      itemDiv.className = 'folder-item';
      const folderName = item.name;
      itemDiv.style.paddingLeft = (level * 12) + 'px';
      itemDiv.style.cursor = 'pointer';
      
      if (item.children && item.children.length > 0) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'folder-children';
        childrenDiv.style.display = 'none'; // Start collapsed
        
        // Create icon and text separately
        const icon = document.createElement('span');
        icon.textContent = '▶ ';
        const text = document.createElement('span');
        text.textContent = folderName;
        itemDiv.appendChild(icon);
        itemDiv.appendChild(text);
        
        renderFileTree(item.children, childrenDiv, level + 1, onFileClick);
        
        // Toggle folder on click
        itemDiv.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent parent folder clicks from interfering
          const isCurrentlyHidden = childrenDiv.style.display === 'none';
          if (isCurrentlyHidden) {
            childrenDiv.style.display = 'block';
            icon.textContent = '▼ ';
          } else {
            childrenDiv.style.display = 'none';
            icon.textContent = '▶ ';
          }
        });
        
        // context menu for folder: new file
        itemDiv.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const dirPath = item.path;
          showContextMenu(dirPath, e.pageX, e.pageY, () => {
            // after creating, reload workspace
            if (window.reloadWorkspace) window.reloadWorkspace();
            // open the new file by reloading tree in caller
          });
        });

        container.appendChild(itemDiv);
        container.appendChild(childrenDiv);
      } else {
        itemDiv.textContent = '▶ ' + folderName;
        // allow creating files in empty folder
        itemDiv.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const dirPath = item.path;
          showContextMenu(dirPath, e.pageX, e.pageY, () => {
            if (window.reloadWorkspace) window.reloadWorkspace();
          });
        });
        container.appendChild(itemDiv);
      }
    } else {
      itemDiv.className = 'file-item';
      itemDiv.textContent = item.name.endsWith('.md') ? '📄 ' + item.name : '📃 ' + item.name;
      itemDiv.style.paddingLeft = (level * 12) + 'px';
      itemDiv.dataset.path = item.path;
      
      if (item.name.endsWith('.md')) {
        itemDiv.addEventListener('click', () => onFileClick(item.path));
      }
      
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
        showContextMenu(dirPath, e.pageX, e.pageY, () => {
          if (window.reloadWorkspace) window.reloadWorkspace();
        });
      }
    });
  }
}

function showContextMenu(dirPath, x, y, onClose) {
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
  newFile.addEventListener('click', async () => {
    await createNewUntitled(dirPath);
    menu.remove();
    if (onClose) onClose();
  });

  menu.appendChild(newFile);

  document.body.appendChild(menu);

  function cleanup(e) {
    if (!menu.contains(e.target)) {
      menu.remove();
      document.removeEventListener('click', cleanup);
    }
  }

  setTimeout(() => document.addEventListener('click', cleanup), 0);
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
  // lightweight path join for browser bundle (respect existing separator)
  function joinPaths(a, b) {
    if (!a) return b;
    const sep = a.includes('\\') ? '\\' : '/';
    if (a.endsWith('\\') || a.endsWith('/')) return a + b;
    return a + sep + b;
  }

  const newPath = joinPaths(workspace, name);
  const success = await window.api.writeFile(newPath, '');
  if (!success) {
    console.error('Failed to create', newPath);
    return;
  }
  // Reload workspace and open file if possible
  if (window.reloadWorkspace) {
    await window.reloadWorkspace();
    // After reload, open the new file and start inline rename in tree
    if (typeof window._lastOnFileClick === 'function') {
      window._lastOnFileClick(newPath);
    }

    // Try to find the new file element in the refreshed tree
    const items = Array.from(document.querySelectorAll('.file-item'));
    const fileEl = items.find(it => it.dataset && it.dataset.path === newPath);
    if (fileEl) {
      startInlineRenameOnElement(fileEl, newPath);
    }
  }
}

function startInlineRenameOnElement(itemEl, fullPath) {
  // Get file name without directories
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

  const originalText = itemEl.textContent || '';
  const oldName = basename(fullPath);
  const dir = dirname(fullPath);

  // Clear contents but keep padding/icon if present
  itemEl.innerHTML = '';
  const iconSpan = document.createElement('span');
  // choose icon based on file extension
  iconSpan.textContent = oldName.endsWith('.md') ? '📄 ' : '📃 ';
  const input = document.createElement('input');
  input.type = 'text';
  input.value = oldName.replace(/\.md$/, '');
  input.style.fontSize = '13px';
  input.style.padding = '2px 6px';
  input.style.minWidth = '120px';
  input.style.background = 'transparent';
  input.style.border = '1px solid rgba(255,255,255,0.06)';
  input.style.color = '#e5e7eb';
  input.style.borderRadius = '4px';

  // add to element
  itemEl.appendChild(iconSpan);
  itemEl.appendChild(input);

  // focus and select
  setTimeout(() => {
    input.focus();
    input.select();
  }, 10);

  let done = false;
  const finish = async (save) => {
    if (done) return;
    done = true;
    const newNameRaw = input.value.trim();
    if (!save || !newNameRaw) {
      itemEl.textContent = originalText;
      return;
    }

    let newName = newNameRaw;
    if (!newName.toLowerCase().endsWith('.md')) newName += '.md';
    const newPath = joinPaths(dir, newName);

    const success = await window.api.renameFile(fullPath, newPath);
    if (success) {
      if (window.reloadWorkspace) {
        await window.reloadWorkspace();
        if (typeof window._lastOnFileClick === 'function') {
          window._lastOnFileClick(newPath);
        }
      }
      // show notification if available
      if (typeof window.showNotification === 'function') {
        window.showNotification('Renamed', 'success');
      }
    } else {
      itemEl.textContent = originalText;
      if (typeof window.showNotification === 'function') {
        window.showNotification('Rename failed', 'error');
      }
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finish(true);
    else if (e.key === 'Escape') finish(false);
  });
  input.addEventListener('blur', () => finish(true));
}

module.exports = { renderFileTree };
