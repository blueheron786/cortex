const { Editor } = require('@tiptap/core');
const { Extension } = require('@tiptap/core');
const { TextSelection } = require('@tiptap/pm/state');
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

// Custom extension for *** (bold + italic)
const BoldItalic = Extension.create({
  name: 'boldItalic',
  
  addInputRules() {
    const inputRegex = /(?:^|\s)(\*\*\*(?!\s+\*\*\*)((?:[^*]+))\*\*\*)$/;
    
    return [
      {
        find: inputRegex,
        handler: ({ state, range, match }) => {
          const { tr } = state;
          const start = range.from;
          const end = range.to;
          const capturedText = match[2];
          
          if (capturedText) {
            tr.delete(start, end);
            const textStart = start;
            const textEnd = textStart + capturedText.length;
            tr.insertText(capturedText, textStart);
            tr.addMark(textStart, textEnd, state.schema.marks.bold.create());
            tr.addMark(textStart, textEnd, state.schema.marks.italic.create());
            tr.setSelection(TextSelection.create(tr.doc, textEnd));
            tr.removeStoredMark(state.schema.marks.bold);
            tr.removeStoredMark(state.schema.marks.italic);
          }
        },
      },
    ];
  },
  
  addKeyboardShortcuts() {
    return {
      'Mod-Alt-b': () => {
        const { bold, italic } = this.editor.schema.marks;
        const { state } = this.editor;
        const { from, to } = state.selection;
        const hasBold = state.doc.rangeHasMark(from, to, bold);
        const hasItalic = state.doc.rangeHasMark(from, to, italic);
        
        if (hasBold && hasItalic) {
          return this.editor.chain().unsetBold().unsetItalic().run();
        }
        return this.editor.chain().setBold().setItalic().run();
      },
    };
  },
});

let editor = null;
let currentFilePath = null;
let workspacePath = null;
let saveTimeout = null;

// Markdown converter
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**'
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

// Don't escape asterisks in list items
turndownService.escape = (text) => {
  return text; // Don't escape anything - we handle it ourselves
};

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
      BoldItalic,
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
        nested: true,
        HTMLAttributes: {
          class: 'task-item'
        }
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

// Parse inline formatting (bold, italic, highlight, code)
function parseInlineFormatting(text) {
  if (!text) return [];
  
  let result = text;
  const tokens = [];
  
  // First, extract code blocks (they shouldn't be processed)
  const codeRegex = /`([^`]+)`/g;
  let match;
  let offset = 0;
  const codeBlocks = [];
  
  while ((match = codeRegex.exec(text)) !== null) {
    codeBlocks.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
  }
  
  // Process formatting in order: *** (bold+italic), ** (bold), * (italic), == (highlight)
  function applyFormatting(str, start = 0) {
    const segments = [];
    let pos = 0;
    
    // Check if position is inside a code block
    const isInCode = (idx) => codeBlocks.some(cb => idx >= cb.start && idx < cb.end);
    
    while (pos < str.length) {
      // Try *** first (bold + italic)
      if (str.substr(pos, 3) === '***' && !isInCode(start + pos)) {
        const end = str.indexOf('***', pos + 3);
        if (end !== -1 && !isInCode(start + end)) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          segments.push({
            type: 'text',
            text: str.slice(pos + 3, end),
            marks: [{ type: 'bold' }, { type: 'italic' }]
          });
          const remaining = str.slice(end + 3);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + end + 3));
          }
          return segments;
        }
      }
      
      // Try ** (bold)
      if (str.substr(pos, 2) === '**' && !isInCode(start + pos)) {
        const end = str.indexOf('**', pos + 2);
        if (end !== -1 && !isInCode(start + end)) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          segments.push({
            type: 'text',
            text: str.slice(pos + 2, end),
            marks: [{ type: 'bold' }]
          });
          const remaining = str.slice(end + 2);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + end + 2));
          }
          return segments;
        }
      }
      
      // Try * (italic)
      if (str[pos] === '*' && !isInCode(start + pos)) {
        const end = str.indexOf('*', pos + 1);
        if (end !== -1 && !isInCode(start + end)) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          segments.push({
            type: 'text',
            text: str.slice(pos + 1, end),
            marks: [{ type: 'italic' }]
          });
          const remaining = str.slice(end + 1);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + end + 1));
          }
          return segments;
        }
      }
      
      // Try == (highlight)
      if (str.substr(pos, 2) === '==' && !isInCode(start + pos)) {
        const end = str.indexOf('==', pos + 2);
        if (end !== -1 && !isInCode(start + end)) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          segments.push({
            type: 'text',
            text: str.slice(pos + 2, end),
            marks: [{ type: 'highlight' }]
          });
          const remaining = str.slice(end + 2);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + end + 2));
          }
          return segments;
        }
      }
      
      // Try ` (code)
      if (str[pos] === '`' && !isInCode(start + pos)) {
        const end = str.indexOf('`', pos + 1);
        if (end !== -1) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          segments.push({
            type: 'text',
            text: str.slice(pos + 1, end),
            marks: [{ type: 'code' }]
          });
          const remaining = str.slice(end + 1);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + end + 1));
          }
          return segments;
        }
      }
      
      pos++;
    }
    
    // No formatting found
    if (str) {
      segments.push({ type: 'text', text: str });
    }
    return segments;
  }
  
  const segments = applyFormatting(text);
  return segments.filter(s => s.text);
}

// Helper to convert markdown to TipTap JSON
function markdownToTiptap(markdown) {
  const lines = markdown.split('\n');
  const content = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Headers
    if (line.startsWith('# ')) {
      content.push({ type: 'heading', attrs: { level: 1 }, content: parseInlineFormatting(line.slice(2)) });
    } else if (line.startsWith('## ')) {
      content.push({ type: 'heading', attrs: { level: 2 }, content: parseInlineFormatting(line.slice(3)) });
    } else if (line.startsWith('### ')) {
      content.push({ type: 'heading', attrs: { level: 3 }, content: parseInlineFormatting(line.slice(4)) });
    } else if (line.startsWith('#### ')) {
      content.push({ type: 'heading', attrs: { level: 4 }, content: parseInlineFormatting(line.slice(5)) });
    } else if (line.startsWith('##### ')) {
      content.push({ type: 'heading', attrs: { level: 5 }, content: parseInlineFormatting(line.slice(6)) });
    } else if (line.startsWith('###### ')) {
      content.push({ type: 'heading', attrs: { level: 6 }, content: parseInlineFormatting(line.slice(7)) });
    }
    // Task items
    else if (line.match(/^- \[([ x])\] /)) {
      const checked = line[3] === 'x';
      const text = line.slice(6);
      const lastItem = content.length > 0 ? content[content.length - 1] : null;
      
      // Check if we should add to existing task list or create new one
      if (lastItem && lastItem.type === 'taskList') {
        // Add to existing task list
        lastItem.content.push({
          type: 'taskItem',
          attrs: { checked },
          content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
        });
      } else {
        // Create new task list
        content.push({ 
          type: 'taskList', 
          content: [{
            type: 'taskItem',
            attrs: { checked },
            content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
          }]
        });
      }
    }
    // Regular list items
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const text = line.slice(2);
      const lastItem = content.length > 0 ? content[content.length - 1] : null;
      
      // Check if we should add to existing list or create new one
      if (lastItem && lastItem.type === 'bulletList') {
        // Add to existing list
        lastItem.content.push({
          type: 'listItem',
          content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
        });
      } else {
        // Create new list
        content.push({ 
          type: 'bulletList', 
          content: [{
            type: 'listItem',
            content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
          }]
        });
      }
    }
    // Tables
    else if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      // Check if this is a table
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      
      // Look ahead for separator line
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (nextLine.includes('|') && nextLine.includes('-')) {
          // This is a table header
          const tableRows = [];
          
          // Header row
          const headerCells = cells.map(cell => {
            const cellContent = parseInlineFormatting(cell);
            return {
              type: 'tableHeader',
              attrs: {},
              content: [{ 
                type: 'paragraph', 
                content: cellContent.length > 0 ? cellContent : [{ type: 'text', text: '' }]
              }]
            };
          });
          tableRows.push({ type: 'tableRow', content: headerCells });
          
          i++; // Skip separator line
          i++; // Move to first data row
          
          // Data rows
          while (i < lines.length) {
            const dataLine = lines[i];
            if (dataLine.trim().startsWith('|') && dataLine.trim().endsWith('|')) {
              const rowCells = dataLine.split('|').slice(1, -1).map(c => c.trim());
              const dataCells = rowCells.map(cell => {
                const cellContent = parseInlineFormatting(cell);
                return {
                  type: 'tableCell',
                  attrs: {},
                  content: [{ 
                    type: 'paragraph', 
                    content: cellContent.length > 0 ? cellContent : [{ type: 'text', text: '' }]
                  }]
                };
              });
              tableRows.push({ type: 'tableRow', content: dataCells });
              i++;
            } else {
              break;
            }
          }
          
          content.push({ type: 'table', content: tableRows });
          i--; // Back up one since the while loop will increment
        } else {
          // Not a table, treat as paragraph
          const parsed = parseInlineFormatting(line);
          content.push({
            type: 'paragraph',
            content: parsed.length > 0 ? parsed : [{ type: 'text', text: '' }]
          });
        }
      } else {
        // Last line, not a table
        const parsed = parseInlineFormatting(line);
        content.push({
          type: 'paragraph',
          content: parsed.length > 0 ? parsed : [{ type: 'text', text: '' }]
        });
      }
    }
    // Empty lines
    else if (line.trim() === '') {
      if (content.length > 0 && content[content.length - 1].type === 'paragraph') {
        // Don't add multiple empty paragraphs
      } else {
        content.push({ type: 'paragraph' });
      }
    }
    // Regular paragraphs
    else {
      const parsed = parseInlineFormatting(line);
      content.push({
        type: 'paragraph',
        content: parsed.length > 0 ? parsed : []
      });
    }
    
    i++;
  }
  
  return { type: 'doc', content: content.length ? content : [{ type: 'paragraph' }] };
}

// File operations
async function openFile(filePath) {
  if (!filePath.endsWith('.md')) return;
  
  const markdown = await window.api.readFile(filePath);
  if (markdown !== null) {
    currentFilePath = filePath;
    
    // Convert markdown to TipTap JSON structure
    const json = markdownToTiptap(markdown);
    editor.commands.setContent(json);
    
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
  let markdown = turndownService.turndown(html);
  
  // Unescape brackets, asterisks and underscores that turndown escapes
  markdown = markdown
    .replace(/\\\[/g, '[')
    .replace(/\\\]/g, ']')
    .replace(/\\\*/g, '*')
    .replace(/\\_/g, '_');
  
  const success = await window.api.writeFile(currentFilePath, markdown);
  if (!success) {
    console.error('Failed to save file');
  }
}

// File tree rendering
function renderFileTree(items, container, level = 0) {
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
        
        renderFileTree(item.children, childrenDiv, level + 1);
        
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
