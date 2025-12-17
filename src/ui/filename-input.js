/**
 * Filename input field management for renaming files
 */

const { getCurrentFile, setCurrentFile } = require('../file/operations');
const { showNotification } = require('./notifications');
const { basename, dirname, joinPaths } = require('./path-utils');

class FilenameInput {
  constructor(inputElement) {
    this.input = inputElement;
    this.originalValue = '';
    this.commitInFlight = false;
    
    if (this.input) {
      this.setupEventListeners();
      this.reset();
    }
  }
  
  setupEventListeners() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.commit(true);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.input.value = this.originalValue;
        this.input.blur();
      }
    });

    this.input.addEventListener('blur', () => {
      this.commit(true);
    });
  }
  
  reset() {
    if (!this.input) return;
    this.input.value = '';
    this.input.placeholder = 'No file opened';
    this.input.disabled = true;
    this.originalValue = '';
  }
  
  setFromPath(filePath) {
    if (!this.input) return;
    if (!filePath) {
      this.reset();
      return;
    }
    const base = basename(filePath);
    const display = base.endsWith('.md') ? base.slice(0, -3) : base;
    this.input.disabled = false;
    this.input.value = display;
    this.originalValue = display;
    this.input.dataset.path = filePath;
  }
  
  focus(options = {}) {
    if (!this.input || this.input.disabled) return;
    this.input.focus();
    if (options.select !== false) {
      this.input.select();
    }
  }
  
  async commit(save) {
    if (!this.input || this.input.disabled || this.commitInFlight) return;
    const current = getCurrentFile();
    if (!current) {
      this.reset();
      return;
    }
    if (!save) {
      this.input.value = this.originalValue;
      return;
    }

    const newNameRaw = this.input.value.trim();
    if (!newNameRaw) {
      this.input.value = this.originalValue;
      return;
    }
    if (newNameRaw === this.originalValue) {
      return;
    }

    let newName = newNameRaw;
    if (!newName.toLowerCase().endsWith('.md')) newName += '.md';
    const newPath = joinPaths(dirname(current), newName);
    if (newPath === current) return;

    this.commitInFlight = true;
    const success = await window.api.renameFile(current, newPath);
    this.commitInFlight = false;
    if (success) {
      setCurrentFile(newPath);
      if (window.reloadWorkspace) {
        await window.reloadWorkspace();
      }
      if (typeof window._lastOnFileClick === 'function') {
        await window._lastOnFileClick(newPath);
      }
      showNotification('Renamed', 'success');
    } else {
      this.input.value = this.originalValue;
      showNotification('Rename failed', 'error');
    }
  }
}

module.exports = { FilenameInput };
