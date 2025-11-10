const TurndownService = require('turndown');

function createMarkdownSerializer() {
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
      // Get text content from the div wrapper, skipping the label
      const textDiv = node.querySelector('div');
      const textContent = textDiv ? textDiv.textContent.trim() : content.trim();
      return `- [${checked}] ${textContent}\n`;
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
      content = content.trim();
      
      let prefix = options.bulletListMarker + ' ';
      
      // Check if this is part of an ordered list
      const parent = node.parentNode;
      if (parent.nodeName === 'OL') {
        const start = parent.getAttribute('start');
        const index = Array.prototype.indexOf.call(parent.children, node);
        prefix = (start ? Number(start) + index : index + 1) + '. ';
      }
      
      // Add newline only if there's a next sibling list item
      const suffix = node.nextSibling && node.nextSibling.nodeName === 'LI' ? '\n' : '';
      
      return prefix + content + suffix;
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
