const { markdownToTiptap } = require('../markdown/parser');
const { htmlToMarkdown } = require('../markdown/serializer');

let currentFilePath = null;
let saveTimeout = null;

function setCurrentFile(filePath) {
  currentFilePath = filePath;
}

function getCurrentFile() {
  return currentFilePath;
}

async function openFile(filePath, editor) {
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

async function saveFile(editor, turndownService) {
  if (!currentFilePath) return;
  
  const html = editor.getHTML();
  const markdown = htmlToMarkdown(html, turndownService);
  
  const success = await window.api.writeFile(currentFilePath, markdown);
  if (!success) {
    console.error('Failed to save file');
  }
}

function setupAutoSave(editor, turndownService) {
  return () => {
    if (currentFilePath) {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveFile(editor, turndownService);
      }, 500);
    }
  };
}

module.exports = { 
  openFile, 
  saveFile, 
  setupAutoSave,
  setCurrentFile,
  getCurrentFile
};
