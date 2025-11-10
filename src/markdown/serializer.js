const TurndownService = require('turndown');

function createMarkdownSerializer() {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
    strongDelimiter: '**'
  });

  // Store service reference for nested content processing
  const serviceRef = turndownService;
  
  // Custom rules for turndown
  turndownService.addRule('taskList', {
    filter: (node) => {
      return node.nodeName === 'LI' && node.hasAttribute('data-type') && node.getAttribute('data-type') === 'taskItem';
    },
    replacement: (content, node) => {
      const checkbox = node.querySelector('input[type="checkbox"]');
      const checked = checkbox && checkbox.checked ? 'x' : ' ';
      
      // Get the div wrapper that contains the task content
      const textDiv = node.querySelector('div');
      if (!textDiv) {
        return `- [${checked}] ${content.trim()}\n`;
      }
      
      // Process each child of the div
      let textContent = '';
      let nestedLists = '';
      
      Array.from(textDiv.childNodes).forEach(child => {
        if (child.nodeName === 'P') {
          // Just get the paragraph text
          textContent += child.textContent;
        } else if (child.nodeName === 'UL' && child.hasAttribute('data-type')) {
          // This is a nested task list or bullet list - process it through turndown
          const nestedMarkdown = serviceRef.turndown(child.outerHTML);
          // Indent each line of the nested content by 2 spaces
          nestedLists += nestedMarkdown.split('\n').map(line => line ? '  ' + line : '').join('\n');
        } else if (child.nodeName === 'UL' || child.nodeName === 'OL') {
          // Regular nested list
          const nestedMarkdown = serviceRef.turndown(child.outerHTML);
          nestedLists += nestedMarkdown.split('\n').map(line => line ? '  ' + line : '').join('\n');
        }
      });
      
      let result = `- [${checked}] ${textContent.trim()}`;
      if (nestedLists.trim()) {
        result += '\n' + nestedLists;
      }
      return result + '\n';
    }
  });

  turndownService.addRule('highlight', {
    filter: ['mark'],
    replacement: (content) => `==${content}==`
  });

  turndownService.addRule('strikethrough', {
    filter: ['s', 'del', 'strike'],
    replacement: (content) => `~~${content}~~`
  });

  turndownService.addRule('horizontalRule', {
    filter: 'hr',
    replacement: () => '\n---\n\n'
  });

  // Custom list rules to prevent extra newlines
  turndownService.addRule('bulletList', {
    filter: 'ul',
    replacement: (content, node) => {
      return content;
    }
  });

  turndownService.addRule('orderedList', {
    filter: 'ol',
    replacement: (content, node) => {
      return content;
    }
  });

  turndownService.addRule('listItem', {
    filter: (node) => {
      // Don't process task items (they're handled by taskList rule)
      if (node.nodeName === 'LI' && node.hasAttribute('data-type') && node.getAttribute('data-type') === 'taskItem') {
        return false;
      }
      return node.nodeName === 'LI';
    },
    replacement: (content, node, options) => {
      // Split content into text and nested lists
      let text = '';
      let nested = '';
      
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Check if this line is a list item (starts with - or number.)
        if (line.match(/^\s*[-*\d]+[\.\)]\s/) || line.match(/^\s*-\s*\[/)) {
          // This and remaining lines are nested content
          nested = lines.slice(i).join('\n');
          break;
        } else if (line.trim()) {
          text += (text ? ' ' : '') + line.trim();
        }
      }
      
      let prefix = options.bulletListMarker + ' ';
      
      // Check if this is part of an ordered list
      const parent = node.parentNode;
      if (parent.nodeName === 'OL') {
        const start = parent.getAttribute('start');
        const index = Array.prototype.indexOf.call(parent.children, node);
        prefix = (start ? Number(start) + index : index + 1) + '. ';
      }
      
      let result = prefix + text;
      
      // Add nested content with proper indentation
      if (nested.trim()) {
        result += '\n' + nested.split('\n').map(line => line ? '  ' + line : '').join('\n');
      }
      
      // Add newline only if there's a next sibling list item
      const suffix = node.nextSibling && node.nextSibling.nodeName === 'LI' ? '\n' : '';
      
      return result + suffix;
    }
  });

  // Custom table rule - store service reference in closure
  const tableServiceRef = turndownService;
  turndownService.addRule('table', {
    filter: 'table',
    replacement: function(content, node) {
      const rows = [];
      const tableRows = Array.from(node.querySelectorAll('tr'));
      
      tableRows.forEach((tr, rowIndex) => {
        const cells = [];
        const cellElements = tr.querySelectorAll('th, td');
        
        cellElements.forEach(cell => {
          // Process cell HTML content through turndown to preserve formatting
          const cellMarkdown = tableServiceRef.turndown(cell.innerHTML).trim().replace(/\|/g, '\\|');
          cells.push(cellMarkdown);
        });
        
        if (cells.length > 0) {
          rows.push('| ' + cells.join(' | ') + ' |');
          
          // Add separator after first row (header)
          if (rowIndex === 0) {
            const separator = '|' + cells.map(() => '--------').join('|') + '|';
            rows.push(separator);
          }
        }
      });
      
      return '\n' + rows.join('\n') + '\n\n';
    }
  });

  // Don't escape asterisks in list items
  turndownService.escape = (text) => {
    return text; // Don't escape anything - we handle it ourselves
  };

  return turndownService;
}

function htmlToMarkdown(html, turndownService) {
  let markdown = turndownService.turndown(html);
  
  // Unescape brackets, asterisks and underscores that turndown escapes
  markdown = markdown
    .replace(/\\\[/g, '[')
    .replace(/\\\]/g, ']')
    .replace(/\\\*/g, '*')
    .replace(/\\_/g, '_');
  
  return markdown;
}

module.exports = { createMarkdownSerializer, htmlToMarkdown };
