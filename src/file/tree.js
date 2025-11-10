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
        
        container.appendChild(itemDiv);
        container.appendChild(childrenDiv);
      } else {
        itemDiv.textContent = '▶ ' + folderName;
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
}

module.exports = { renderFileTree };
