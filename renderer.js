const { Editor } = require('@tiptap/core');
const StarterKit = require('@tiptap/starter-kit').default;
const Table = require('@tiptap/extension-table').default;
const TableRow = require('@tiptap/extension-table-row').default;
const TableCell = require('@tiptap/extension-table-cell').default;
const TableHeader = require('@tiptap/extension-table-header').default;
const TaskList = require('@tiptap/extension-task-list').default;
const TaskItem = require('@tiptap/extension-task-item').default;
const Highlight = require('@tiptap/extension-highlight').default;
const { marked } = require('marked');
const TurndownService = require('turndown');

let editor = null;
let currentFilePath = null;
let workspacePath = null;
let saveTimeout = null;

// Markdown converter
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
});

// Custom rules for turndown
turndownService.addRule('taskList', {
  filter: (node) => {
    return node.nodeName === 'LI' && node.hasAttribute('data-type') && node.getAttribute('data-type') === 'taskItem';
  },
  replacement: (content, node) => {
    const checkbox = node.querySelector('input[type="checkbox"]');
    const checked = checkbox && checkbox.checked ? 'x' : ' ';
    return `- [${checked}] ${content}\n`;
  }
});

turndownService.addRule('highlight', {
  filter: ['mark'],
  replacement: (content) => `==${content}==`
});

// Initialize editor
function initEditor() {
  editor = new Editor({
    element: document.querySelector('#editor'),
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6]
        }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'tiptap-table'
        }
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true
      }),
      Highlight.configure({
        multicolor: false
      })
    ],
    content: '<p>Open a folder and select a markdown file to start editing.</p>',
    onUpdate: ({ editor }) => {
      if (currentFilePath) {
        // Auto-save with 500ms debounce
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          saveFile();
        }, 500);
      }
    }
  });
}

// File operations
async function openFile(filePath) {
  if (!filePath.endsWith('.md')) return;
  
  const markdown = await window.api.readFile(filePath);
  if (markdown !== null) {
    currentFilePath = filePath;
    
    // Parse markdown with custom handling for highlights and checkboxes
    let processedMarkdown = markdown
      .replace(/==([^=]+)==/g, '<mark>$1</mark>') // Convert ==highlight== to <mark>
      .replace(/- \[([ x])\] /g, (match, check) => {
        return check === 'x' 
          ? '<li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked><span></span></label><div>'
          : '<li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div>';
      });
    
    const html = marked.parse(processedMarkdown);
    editor.commands.setContent(html);
    document.querySelector('#editor-header').textContent = filePath.split(/[\\/]/).pop();
    
    // Update active file in tree
    document.querySelectorAll('.file-item').forEach(item => {
      item.classList.toggle('active', item.dataset.path === filePath);
    });
  }
}

async function saveFile() {
  if (!currentFilePath) return;
  
  const html = editor.getHTML();
  const markdown = turndownService.turndown(html);
  const success = await window.api.writeFile(currentFilePath, markdown);
  if (!success) {
    console.error('Failed to save file');
  }
}

// File tree rendering
function renderFileTree(items, container, level = 0) {
  container.innerHTML = '';
  
  items.forEach(item => {
    const itemDiv = document.createElement('div');
    
    if (item.isDirectory) {
      itemDiv.className = 'folder-item';
      itemDiv.textContent = '📁 ' + item.name;
      itemDiv.style.paddingLeft = (level * 12) + 'px';
      
      if (item.children && item.children.length > 0) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'folder-children';
        renderFileTree(item.children, childrenDiv, level + 1);
        container.appendChild(itemDiv);
        container.appendChild(childrenDiv);
      } else {
        container.appendChild(itemDiv);
      }
    } else {
      itemDiv.className = 'file-item';
      itemDiv.textContent = item.name.endsWith('.md') ? '📄 ' + item.name : '📃 ' + item.name;
      itemDiv.style.paddingLeft = (level * 12) + 'px';
      itemDiv.dataset.path = item.path;
      
      if (item.name.endsWith('.md')) {
        itemDiv.addEventListener('click', () => openFile(item.path));
      }
      
      container.appendChild(itemDiv);
    }
  });
}

async function loadWorkspace(folderPath) {
  workspacePath = folderPath;
  const items = await window.api.readDir(folderPath);
  const fileTree = document.querySelector('#file-tree');
  renderFileTree(items, fileTree);
  
  // Save workspace path
  await window.api.writeSettings({ lastWorkspacePath: folderPath });
}

// Event listeners
document.querySelector('#open-folder-btn').addEventListener('click', async () => {
  const folderPath = await window.api.openFolder();
  if (folderPath) {
    loadWorkspace(folderPath);
  }
});

// Initialize
async function init() {
  initEditor();
  
  // Load last workspace
  const settings = await window.api.readSettings();
  if (settings.lastWorkspacePath) {
    loadWorkspace(settings.lastWorkspacePath);
  }
}

init();
