const Fuse = require('fuse.js');

/**
 * Creates and manages the quick search dialog
 */
class SearchDialog {
  constructor() {
    this.overlay = document.getElementById('search-overlay');
    this.input = document.getElementById('search-input');
    this.results = document.getElementById('search-results');
    this.files = [];
    this.fuse = null;
    this.selectedIndex = 0;
    this.searchResults = [];
    this.onSelectCallback = null;
    
    this.setupEventListeners();
  }
  
  /**
   * Setup event listeners for the search dialog
   */
  setupEventListeners() {
    // Input events
    this.input.addEventListener('input', () => this.handleSearch());
    
    // Keyboard navigation
    this.input.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Click outside to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
    
    // Result item clicks
    this.results.addEventListener('click', (e) => {
      const item = e.target.closest('.search-result-item');
      if (item) {
        const index = parseInt(item.dataset.index);
        this.selectResult(index);
      }
    });
  }
  
  /**
   * Handle keyboard navigation
   */
  handleKeyboard(e) {
    switch (e.key) {
      case 'Escape':
        this.close();
        e.preventDefault();
        break;
      case 'ArrowDown':
        this.moveSelection(1);
        e.preventDefault();
        break;
      case 'ArrowUp':
        this.moveSelection(-1);
        e.preventDefault();
        break;
      case 'Enter':
        this.selectResult(this.selectedIndex);
        e.preventDefault();
        break;
    }
  }
  
  /**
   * Move selection up or down
   */
  moveSelection(direction) {
    if (this.searchResults.length === 0) return;
    
    this.selectedIndex += direction;
    
    if (this.selectedIndex < 0) {
      this.selectedIndex = this.searchResults.length - 1;
    } else if (this.selectedIndex >= this.searchResults.length) {
      this.selectedIndex = 0;
    }
    
    this.renderResults(this.searchResults);
    this.scrollToSelected();
  }
  
  /**
   * Scroll to the selected item
   */
  scrollToSelected() {
    const selectedItem = this.results.querySelector('.search-result-item.selected');
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
  
  /**
   * Handle search input
   */
  handleSearch() {
    const query = this.input.value.trim();
    
    if (!query) {
      this.results.innerHTML = '<div class="search-empty">Start typing to search...</div>';
      this.searchResults = [];
      return;
    }
    
    if (!this.fuse) {
      this.results.innerHTML = '<div class="search-empty">No workspace loaded</div>';
      return;
    }
    
    const results = this.fuse.search(query);
    this.searchResults = results;
    this.selectedIndex = 0;
    
    if (results.length === 0) {
      this.results.innerHTML = '<div class="search-empty">No files found</div>';
    } else {
      this.renderResults(results);
    }
  }
  
  /**
   * Render search results
   */
  renderResults(results) {
    this.results.innerHTML = results.map((result, index) => {
      const file = result.item;
      const isSelected = index === this.selectedIndex;
      
      // Highlight matching characters
      const title = this.highlightMatches(file.name, result.matches);
      
      return `
        <div class="search-result-item ${isSelected ? 'selected' : ''}" data-index="${index}">
          <div class="search-result-title">${title}</div>
          <div class="search-result-path">${file.relativePath}</div>
        </div>
      `;
    }).join('');
  }
  
  /**
   * Highlight matching characters in the filename
   */
  highlightMatches(text, matches) {
    if (!matches || matches.length === 0) {
      return this.escapeHtml(text);
    }
    
    const nameMatch = matches.find(m => m.key === 'name');
    if (!nameMatch || !nameMatch.indices) {
      return this.escapeHtml(text);
    }
    
    let result = '';
    let lastIndex = 0;
    
    nameMatch.indices.forEach(([start, end]) => {
      result += this.escapeHtml(text.substring(lastIndex, start));
      result += '<span class="search-result-match">' + 
                this.escapeHtml(text.substring(start, end + 1)) + 
                '</span>';
      lastIndex = end + 1;
    });
    
    result += this.escapeHtml(text.substring(lastIndex));
    return result;
  }
  
  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  /**
   * Select a result and open the file
   */
  selectResult(index) {
    if (index < 0 || index >= this.searchResults.length) return;
    
    const result = this.searchResults[index];
    const file = result.item;
    
    if (this.onSelectCallback) {
      this.onSelectCallback(file.path);
    }
    
    this.close();
  }
  
  /**
   * Update the file list for searching
   */
  updateFiles(fileTree, workspacePath) {
    this.files = this.flattenFileTree(fileTree, workspacePath);
    
    // Configure Fuse.js for fuzzy search
    this.fuse = new Fuse(this.files, {
      keys: ['name', 'relativePath'],
      includeScore: true,
      includeMatches: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      ignoreLocation: false,
      findAllMatches: true
    });
  }
  
  /**
   * Flatten the file tree into a searchable array
   */
  flattenFileTree(items, workspacePath, basePath = '') {
    const files = [];
    
    items.forEach(item => {
      const relativePath = basePath ? `${basePath}/${item.name}` : item.name;
      
      if (item.isDirectory && item.children) {
        // Recursively process directories
        files.push(...this.flattenFileTree(item.children, workspacePath, relativePath));
      } else if (!item.isDirectory) {
        // Add files to the list
        files.push({
          name: item.name,
          path: item.path,
          relativePath: relativePath
        });
      }
    });
    
    return files;
  }
  
  /**
   * Open the search dialog
   */
  open() {
    this.overlay.classList.remove('hidden');
    this.input.value = '';
    this.input.focus();
    this.selectedIndex = 0;
    this.searchResults = [];
    this.results.innerHTML = '<div class="search-empty">Start typing to search...</div>';
  }
  
  /**
   * Close the search dialog
   */
  close() {
    this.overlay.classList.add('hidden');
    this.input.value = '';
    this.searchResults = [];
  }
  
  /**
   * Set callback for when a file is selected
   */
  onSelect(callback) {
    this.onSelectCallback = callback;
  }
}

module.exports = { SearchDialog };
