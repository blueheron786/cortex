/**
 * Keyboard shortcuts handler
 */

const { saveFile } = require('../file/operations');
const { showNotification } = require('./notifications');

function setupKeyboardShortcuts(options) {
  const {
    editor,
    turndownService,
    openFolderBtn,
    searchDialog,
    onShowLinkDialog
  } = options;
  
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + O: Open folder
    if ((e.metaKey || e.ctrlKey) && e.key === 'o') {
      e.preventDefault();
      if (openFolderBtn) {
        openFolderBtn.click();
      }
    }
    
    // Cmd/Ctrl + S: Manual save
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      if (editor && turndownService) {
        saveFile(editor, turndownService).then(() => {
          showNotification('Saved', 'success');
        });
      }
    }
    
    // Cmd/Ctrl + K: Quick link insert
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (onShowLinkDialog) {
        onShowLinkDialog();
      }
    }

    // Cmd/Ctrl + P: Quick search
    if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
      e.preventDefault();
      if (searchDialog) {
        try {
          searchDialog.open();
        } catch (err) {
          // ignore if dialog isn't available
        }
      }
    }
  });
}

module.exports = { setupKeyboardShortcuts };
