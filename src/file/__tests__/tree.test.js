/**
 * @jest-environment jsdom
 */

const { renderFileTree } = require('../tree');

describe('renderFileTree', () => {
  let container;
  let onFileClickMock;

  beforeEach(() => {
    // Setup DOM container
    container = document.createElement('div');
    document.body.appendChild(container);
    onFileClickMock = jest.fn();
    window._expandedDirectories = new Set();
  });

  afterEach(() => {
    // Cleanup
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render empty container for empty items', () => {
      renderFileTree([], container, 0, onFileClickMock);
      expect(container.children.length).toBe(0);
    });

    it('should render single file', () => {
      const items = [
        { name: 'test.md', isDirectory: false, path: '/test.md' }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.children.length).toBe(1);
      expect(container.children[0].className).toBe('file-item');
      expect(container.children[0].textContent).toContain('test.md');
    });

    it('should render single folder', () => {
      const items = [
        { name: 'folder', isDirectory: true, children: [] }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.children.length).toBe(1);
      expect(container.children[0].className).toBe('folder-item');
      expect(container.children[0].textContent).toContain('folder');
    });

    it('should render multiple files', () => {
      const items = [
        { name: 'file1.md', isDirectory: false, path: '/file1.md' },
        { name: 'file2.md', isDirectory: false, path: '/file2.md' },
        { name: 'file3.md', isDirectory: false, path: '/file3.md' }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.children.length).toBe(3);
      expect(container.querySelectorAll('.file-item').length).toBe(3);
    });

    it('should render mixed files and folders', () => {
      const items = [
        { name: 'folder', isDirectory: true, children: [] },
        { name: 'file.md', isDirectory: false, path: '/file.md' }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.querySelectorAll('.folder-item').length).toBe(1);
      expect(container.querySelectorAll('.file-item').length).toBe(1);
    });
  });

  describe('File icons', () => {
    it('should show 📄 icon for .md files', () => {
      const items = [
        { name: 'test.md', isDirectory: false, path: '/test.md' }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.children[0].textContent).toContain('📄');
    });

    it('should show 📃 icon for non-.md files', () => {
      const items = [
        { name: 'test.txt', isDirectory: false, path: '/test.txt' }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.children[0].textContent).toContain('📃');
    });

    it('should show ▶ icon for collapsed folders', () => {
      const items = [
        { name: 'folder', isDirectory: true, children: [] }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.children[0].textContent).toContain('▶');
    });
  });

  describe('Nested folders', () => {
    it('should render folder with children', () => {
      const items = [
        {
          name: 'parent',
          isDirectory: true,
          children: [
            { name: 'child.md', isDirectory: false, path: '/parent/child.md' }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.children.length).toBe(2); // parent folder + children container
      expect(container.querySelectorAll('.folder-item').length).toBe(1);
      expect(container.querySelectorAll('.file-item').length).toBe(1);
    });

    it('should start folders collapsed', () => {
      const items = [
        {
          name: 'parent',
          isDirectory: true,
          children: [
            { name: 'child.md', isDirectory: false, path: '/parent/child.md' }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      const childrenContainer = container.querySelector('.folder-children');
      expect(childrenContainer.style.display).toBe('none');
    });

    it('should expand folder on click', () => {
      const items = [
        {
          name: 'parent',
          isDirectory: true,
          children: [
            { name: 'child.md', isDirectory: false, path: '/parent/child.md' }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      const folderItem = container.querySelector('.folder-item');
      const childrenContainer = container.querySelector('.folder-children');
      
      folderItem.click();
      expect(childrenContainer.style.display).toBe('block');
      expect(folderItem.textContent).toContain('▼');
    });

    it('should collapse folder on second click', () => {
      const items = [
        {
          name: 'parent',
          isDirectory: true,
          children: [
            { name: 'child.md', isDirectory: false, path: '/parent/child.md' }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      const folderItem = container.querySelector('.folder-item');
      const childrenContainer = container.querySelector('.folder-children');
      
      folderItem.click(); // Expand
      folderItem.click(); // Collapse
      
      expect(childrenContainer.style.display).toBe('none');
      expect(folderItem.textContent).toContain('▶');
    });

    it('should render deeply nested folders', () => {
      const items = [
        {
          name: 'level1',
          isDirectory: true,
          children: [
            {
              name: 'level2',
              isDirectory: true,
              children: [
                {
                  name: 'level3',
                  isDirectory: true,
                  children: [
                    { name: 'deep.md', isDirectory: false, path: '/level1/level2/level3/deep.md' }
                  ]
                }
              ]
            }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.querySelectorAll('.folder-item').length).toBe(3);
      expect(container.querySelectorAll('.file-item').length).toBe(1);
    });
  });

  describe('Expanded folder state', () => {
    it('should render folders expanded when tracked in window._expandedDirectories', () => {
      window._expandedDirectories = new Set(['/parent']);
      const items = [
        {
          name: 'parent',
          path: '/parent',
          isDirectory: true,
          children: [
            { name: 'child.md', isDirectory: false, path: '/parent/child.md' }
          ]
        }
      ];

      renderFileTree(items, container, 0, onFileClickMock);

      const childrenContainer = container.querySelector('.folder-children');
      expect(childrenContainer.style.display).toBe('block');
    });

    it('should update expanded directory tracking when toggling folders', () => {
      window._expandedDirectories = new Set();
      const items = [
        {
          name: 'parent',
          path: '/parent',
          isDirectory: true,
          children: [
            { name: 'child.md', isDirectory: false, path: '/parent/child.md' }
          ]
        }
      ];

      renderFileTree(items, container, 0, onFileClickMock);

      const folderItem = container.querySelector('.folder-item');
      const childrenContainer = container.querySelector('.folder-children');

      folderItem.click();
      expect(childrenContainer.style.display).toBe('block');
      expect(window._expandedDirectories.has('/parent')).toBe(true);

      folderItem.click();
      expect(childrenContainer.style.display).toBe('none');
      expect(window._expandedDirectories.has('/parent')).toBe(false);
    });
  });

  describe('Indentation', () => {
    it('should have no indent at level 0', () => {
      const items = [
        { name: 'file.md', isDirectory: false, path: '/file.md' }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.children[0].style.paddingLeft).toBe('0px');
    });

    it('should indent level 1 by 12px', () => {
      const items = [
        {
          name: 'parent',
          isDirectory: true,
          children: [
            { name: 'child.md', isDirectory: false, path: '/parent/child.md' }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      const childFile = container.querySelector('.file-item');
      expect(childFile.style.paddingLeft).toBe('12px');
    });

    it('should indent level 2 by 24px', () => {
      const items = [
        {
          name: 'level1',
          isDirectory: true,
          children: [
            {
              name: 'level2',
              isDirectory: true,
              children: [
                { name: 'deep.md', isDirectory: false, path: '/level1/level2/deep.md' }
              ]
            }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      const deepFile = container.querySelector('.file-item');
      expect(deepFile.style.paddingLeft).toBe('24px');
    });
  });

  describe('File click handling', () => {
    it('should call onFileClick for .md files', () => {
      const items = [
        { name: 'test.md', isDirectory: false, path: '/test.md' }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      const fileItem = container.querySelector('.file-item');
      fileItem.click();
      
      expect(onFileClickMock).toHaveBeenCalledTimes(1);
      expect(onFileClickMock).toHaveBeenCalledWith('/test.md');
    });

    it('should not call onFileClick for non-.md files', () => {
      const items = [
        { name: 'test.txt', isDirectory: false, path: '/test.txt' }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      const fileItem = container.querySelector('.file-item');
      fileItem.click();
      
      expect(onFileClickMock).not.toHaveBeenCalled();
    });

    it('should call onFileClick with correct path for nested files', () => {
      const items = [
        {
          name: 'folder',
          isDirectory: true,
          children: [
            { name: 'nested.md', isDirectory: false, path: '/folder/nested.md' }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      const folderItem = container.querySelector('.folder-item');
      folderItem.click(); // Expand folder
      
      const fileItem = container.querySelector('.file-item');
      fileItem.click();
      
      expect(onFileClickMock).toHaveBeenCalledWith('/folder/nested.md');
    });

    it('should store path in dataset', () => {
      const items = [
        { name: 'test.md', isDirectory: false, path: '/path/to/test.md' }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      const fileItem = container.querySelector('.file-item');
      expect(fileItem.dataset.path).toBe('/path/to/test.md');
    });
  });

  describe('Folder click isolation', () => {
    it('should not trigger parent folder toggle when clicking child', () => {
      const items = [
        {
          name: 'parent',
          isDirectory: true,
          children: [
            {
              name: 'child',
              isDirectory: true,
              children: []
            }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      const parentFolder = container.querySelectorAll('.folder-item')[0];
      const childFolder = container.querySelectorAll('.folder-item')[1];
      const parentChildren = container.querySelectorAll('.folder-children')[0];
      
      // Expand parent first
      parentFolder.click();
      expect(parentChildren.style.display).toBe('block');
      
      // Click child should not collapse parent
      childFolder.click();
      expect(parentChildren.style.display).toBe('block');
    });
  });

  describe('Empty folders', () => {
    it('should render folder without children', () => {
      const items = [
        { name: 'empty', isDirectory: true, children: [] }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.children.length).toBe(1);
      expect(container.children[0].className).toBe('folder-item');
    });

    it('should not create children container for empty folder', () => {
      const items = [
        { name: 'empty', isDirectory: true, children: [] }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.querySelectorAll('.folder-children').length).toBe(0);
    });
  });

  describe('Container clearing', () => {
    it('should clear container when level is 0', () => {
      container.innerHTML = '<div>Previous content</div>';
      
      const items = [
        { name: 'file.md', isDirectory: false, path: '/file.md' }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.textContent).not.toContain('Previous content');
      expect(container.children.length).toBe(1);
    });

    it('should not clear container when level > 0', () => {
      container.innerHTML = '<div>Existing content</div>';
      
      const items = [
        { name: 'file.md', isDirectory: false, path: '/file.md' }
      ];
      renderFileTree(items, container, 1, onFileClickMock);
      
      expect(container.children.length).toBe(2); // existing + new
    });
  });

  describe('Complex tree structures', () => {
    it('should render complex mixed tree', () => {
      const items = [
        { name: 'file1.md', isDirectory: false, path: '/file1.md' },
        {
          name: 'folder1',
          isDirectory: true,
          children: [
            { name: 'file2.md', isDirectory: false, path: '/folder1/file2.md' },
            { name: 'file3.txt', isDirectory: false, path: '/folder1/file3.txt' },
            {
              name: 'subfolder',
              isDirectory: true,
              children: [
                { name: 'file4.md', isDirectory: false, path: '/folder1/subfolder/file4.md' }
              ]
            }
          ]
        },
        { name: 'file5.md', isDirectory: false, path: '/file5.md' },
        {
          name: 'folder2',
          isDirectory: true,
          children: [
            { name: 'file6.md', isDirectory: false, path: '/folder2/file6.md' }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      expect(container.querySelectorAll('.file-item').length).toBe(6);
      expect(container.querySelectorAll('.folder-item').length).toBe(3);
    });

    it('should handle all files in complex tree being clickable', () => {
      const items = [
        { name: 'root.md', isDirectory: false, path: '/root.md' },
        {
          name: 'folder',
          isDirectory: true,
          children: [
            { name: 'nested.md', isDirectory: false, path: '/folder/nested.md' }
          ]
        }
      ];
      renderFileTree(items, container, 0, onFileClickMock);
      
      // Expand folder
      container.querySelector('.folder-item').click();
      
      // Click all .md files
      const mdFiles = Array.from(container.querySelectorAll('.file-item'))
        .filter(el => el.textContent.includes('.md'));
      
      mdFiles.forEach(file => file.click());
      
      expect(onFileClickMock).toHaveBeenCalledTimes(2);
    });
  });
});
