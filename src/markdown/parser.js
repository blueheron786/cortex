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

module.exports = { parseInlineFormatting, markdownToTiptap };
