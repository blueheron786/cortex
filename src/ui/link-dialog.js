/**
 * Link insertion dialog for internal links
 */

const { showNotification } = require('./notifications');

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

function insertInternalLink(editor, pageName, displayText) {
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
              href: `/__internal__/${pageName}`,
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

function showLinkInsertDialog(editor, linkIndex) {
  if (!linkIndex || linkIndex.size === 0) {
    showNotification('No workspace open', 'error');
    return;
  }
  
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
  
  input.focus();
  
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    suggestions.innerHTML = '';
    
    if (query.length === 0) {
      return;
    }
    
    const matches = [];
    linkIndex.forEach((filePath, pageName) => {
      if (pageName.toLowerCase().includes(query) && !pageName.endsWith('.md')) {
        matches.push({ pageName, filePath });
      }
    });
    
    matches.slice(0, 10).forEach(match => {
      const item = document.createElement('div');
      item.className = 'link-suggestion-item';
      item.textContent = match.pageName;
      item.title = match.filePath;
      
      item.addEventListener('click', () => {
        insertInternalLink(editor, match.pageName);
        document.body.removeChild(dialog);
      });
      
      suggestions.appendChild(item);
    });
  });
  
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const firstSuggestion = suggestions.querySelector('.link-suggestion-item');
      if (firstSuggestion) {
        firstSuggestion.click();
      } else if (input.value.trim()) {
        insertInternalLink(editor, input.value.trim());
        document.body.removeChild(dialog);
      }
    } else if (e.key === 'Escape') {
      document.body.removeChild(dialog);
    }
  });
  
  dialog.querySelector('#link-cancel').addEventListener('click', () => {
    document.body.removeChild(dialog);
  });
  
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      document.body.removeChild(dialog);
    }
  });
}

module.exports = { showLinkInsertDialog };
