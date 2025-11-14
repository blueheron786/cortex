// Parse inline formatting (bold, italic, highlight, strikethrough, code)
function parseInlineFormatting(text) {
  if (!text) return [];
  
  // Process formatting in order: [text](url) (links), ` (code), *** (bold+italic), ** (bold), * (italic), == (highlight), ~~ (strikethrough)
  // Links and code are checked first so formatting inside them is preserved
  function applyFormatting(str, start = 0) {
    const segments = [];
    let pos = 0;
    
    while (pos < str.length) {
      // Check for internal links [[Page Name]] or [[Page|Display]]
      if (str.substr(pos, 2) === '[[') {
        const closeIndex = str.indexOf(']]', pos + 2);
        if (closeIndex !== -1) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          
          const linkContent = str.slice(pos + 2, closeIndex);
          
          // Check for custom display text (Page|Display)
          let pageName, displayText;
          const pipeIndex = linkContent.indexOf('|');
          
          if (pipeIndex !== -1) {
            pageName = linkContent.slice(0, pipeIndex);
            displayText = linkContent.slice(pipeIndex + 1);
          } else {
            pageName = linkContent;
            // For anchors, show just the page name without the anchor
            const anchorIndex = pageName.indexOf('#');
            displayText = anchorIndex !== -1 ? pageName.slice(0, anchorIndex) : pageName;
          }
          
          segments.push({
            type: 'text',
            text: displayText,
            marks: [{
              type: 'link',
              attrs: {
                href: 'internal:' + pageName,
                class: 'internal-link'
              }
            }]
          });
          
          const remaining = str.slice(closeIndex + 2);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + closeIndex + 2));
          }
          return segments;
        }
      }
      
      // Check for markdown links [text](url) - EXISTING CODE
      if (str[pos] === '[') {
        const closeBracket = str.indexOf(']', pos + 1);
        if (closeBracket !== -1 && str[closeBracket + 1] === '(') {
          const closeParen = str.indexOf(')', closeBracket + 2);
          if (closeParen !== -1) {
            if (pos > 0) {
              segments.push({ type: 'text', text: str.slice(0, pos) });
            }
            const linkText = str.slice(pos + 1, closeBracket);
            const linkUrl = str.slice(closeBracket + 2, closeParen);
            segments.push({
              type: 'text',
              text: linkText,
              marks: [{ type: 'link', attrs: { href: linkUrl } }]
            });
            const remaining = str.slice(closeParen + 1);
            if (remaining) {
              segments.push(...applyFormatting(remaining, start + closeParen + 1));
            }
            return segments;
          }
        }
      }
      
      // Check for code (backticks)
      if (str[pos] === '`') {
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
      
      // Try *** first (bold + italic)
      if (str.substr(pos, 3) === '***') {
        const end = str.indexOf('***', pos + 3);
        if (end !== -1) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          // Recursively parse inner text and add bold+italic marks
          const innerSegments = applyFormatting(str.slice(pos + 3, end), start + pos + 3);
          innerSegments.forEach(seg => {
            seg.marks = (seg.marks || []).concat([{ type: 'bold' }, { type: 'italic' }]);
            segments.push(seg);
          });
          const remaining = str.slice(end + 3);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + end + 3));
          }
          return segments;
        }
      }
      
      // Try ** (bold)
      if (str.substr(pos, 2) === '**') {
        const end = str.indexOf('**', pos + 2);
        if (end !== -1) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          // Recursively parse inner text and add bold mark
          const innerSegments = applyFormatting(str.slice(pos + 2, end), start + pos + 2);
          innerSegments.forEach(seg => {
            seg.marks = (seg.marks || []).concat([{ type: 'bold' }]);
            segments.push(seg);
          });
          const remaining = str.slice(end + 2);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + end + 2));
          }
          return segments;
        }
      }
      
      // Try * (italic)
      if (str[pos] === '*') {
        const end = str.indexOf('*', pos + 1);
        if (end !== -1) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          // Recursively parse inner text and add italic mark
          const innerSegments = applyFormatting(str.slice(pos + 1, end), start + pos + 1);
          innerSegments.forEach(seg => {
            seg.marks = (seg.marks || []).concat([{ type: 'italic' }]);
            segments.push(seg);
          });
          const remaining = str.slice(end + 1);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + end + 1));
          }
          return segments;
        }
      }
      
      // Try == (highlight)
      if (str.substr(pos, 2) === '==') {
        const end = str.indexOf('==', pos + 2);
        if (end !== -1) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          // Recursively parse inner text and add highlight mark
          const innerSegments = applyFormatting(str.slice(pos + 2, end), start + pos + 2);
          innerSegments.forEach(seg => {
            seg.marks = (seg.marks || []).concat([{ type: 'highlight' }]);
            segments.push(seg);
          });
          const remaining = str.slice(end + 2);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + end + 2));
          }
          return segments;
        }
      }
      
      // Try ~~ (strikethrough)
      if (str.substr(pos, 2) === '~~') {
        const end = str.indexOf('~~', pos + 2);
        if (end !== -1) {
          if (pos > 0) {
            segments.push({ type: 'text', text: str.slice(0, pos) });
          }
          // Recursively parse inner text and add strike mark
          const innerSegments = applyFormatting(str.slice(pos + 2, end), start + pos + 2);
          innerSegments.forEach(seg => {
            seg.marks = (seg.marks || []).concat([{ type: 'strike' }]);
            segments.push(seg);
          });
          const remaining = str.slice(end + 2);
          if (remaining) {
            segments.push(...applyFormatting(remaining, start + end + 2));
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
  // local stacks for nested lists (per markdownToTiptap call)
  let _taskStack = [];
  let _bulletStack = [];
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Horizontal rule (---, ***, or ___)
    if (line.trim().match(/^(-{3,}|\*{3,}|_{3,})$/)) {
      content.push({ type: 'horizontalRule' });
    }
    // Headers
    else if (line.startsWith('# ')) {
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
    // Task items (support nested via leading spaces)
    else if (line.match(/^\s*- \[([ x])\] /)) {
      // Count leading spaces to determine nesting level (every 2 spaces = one level)
      const leading = line.match(/^(\s*)/)[1] || '';
      const indentLevel = Math.floor(leading.replace(/\t/g, '  ').length / 2);
      const checked = line.trim()[3] === 'x';
      const text = line.replace(/^\s*- \[[ x]\] /, '');

      // We'll maintain a simple stack of task lists per indent level
      // Find or create list at this level
      // Helper: get last item in array
      const last = (arr) => (arr && arr.length ? arr[arr.length - 1] : null);

  // Use local stack for nested task lists
  if (!_taskStack) _taskStack = [];

      // If indentLevel is 0, attach to top-level content
      if (indentLevel === 0) {
  // Reset stack when we return to top-level
  _taskStack = [];
        const lastItem = last(content);
        if (lastItem && lastItem.type === 'taskList') {
          lastItem.content.push({
            type: 'taskItem',
            attrs: { checked },
            content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
          });
        } else {
          content.push({
            type: 'taskList',
            content: [{
              type: 'taskItem',
              attrs: { checked },
              content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
            }]
          });
        }
        // Push top-level list reference to stack
        const newTop = last(content);
        if (newTop && newTop.type === 'taskList') {
          _taskStack[0] = newTop;
        }
      } else {
        // Nested level > 0
        // Ensure stack has parent at level-1
        // Check both task and bullet stack for parent (for mixed nesting)
  const parentList = _taskStack[indentLevel - 1] || _bulletStack[indentLevel - 1] || null;

        if (parentList) {
          // Parent exists: append a nested taskList under the last taskItem of parentList
          const parentLastItem = last(parentList.content);
          if (parentLastItem) {
            // Ensure parentLastItem.content exists and is an array
            if (!parentLastItem.content) {
              parentLastItem.content = [];
            }
            
            // Check if there's already a nested taskList in the content
            const existingNested = parentLastItem.content.find(c => c.type === 'taskList');
            
            if (existingNested) {
              // Add to existing nested taskList
              existingNested.content.push({
                type: 'taskItem',
                attrs: { checked },
                content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
              });
              // Update stack
              _taskStack[indentLevel] = existingNested;
            } else {
              // Create a new nested taskList and attach to parentLastItem.content
              const nested = {
                type: 'taskList',
                content: [{
                  type: 'taskItem',
                  attrs: { checked },
                  content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
                }]
              };
              parentLastItem.content.push(nested);
              // Update stack
              _taskStack[indentLevel] = nested;
            }
          } else {
            // No parent last item — fall back to creating top-level list
            const lastItem = last(content);
            if (lastItem && lastItem.type === 'taskList') {
              lastItem.content.push({
                type: 'taskItem',
                attrs: { checked },
                content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
              });
              _taskStack[indentLevel] = lastItem;
            } else {
              content.push({
                type: 'taskList',
                content: [{
                  type: 'taskItem',
                  attrs: { checked },
                  content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
                }]
              });
              this._taskStack[indentLevel] = last(content);
            }
          }
        } else {
          // No parent found (unexpected indentation) — add as top-level
          const lastItem = last(content);
          if (lastItem && lastItem.type === 'taskList') {
            lastItem.content.push({
              type: 'taskItem',
              attrs: { checked },
              content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
            });
              _taskStack[0] = lastItem;
          } else {
            content.push({
              type: 'taskList',
              content: [{
                type: 'taskItem',
                attrs: { checked },
                content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
              }]
            });
            _taskStack[0] = last(content);
          }
        }
      }
    }
    // Regular list items (support nested via leading spaces)
    else if (line.match(/^\s*[-*] /)) {
      // Count leading spaces to determine nesting level
      const leading = line.match(/^(\s*)/)[1] || '';
      const indentLevel = Math.floor(leading.replace(/\t/g, '  ').length / 2);
      const text = line.replace(/^\s*[-*] /, '');
      
      const last = (arr) => (arr && arr.length ? arr[arr.length - 1] : null);
      
      // Use a separate stack for bullet lists
      if (!_bulletStack) _bulletStack = [];
      
      if (indentLevel === 0) {
        // Top-level list item
        _bulletStack = [];
        const lastItem = last(content);
        
        if (lastItem && lastItem.type === 'bulletList') {
          lastItem.content.push({
            type: 'listItem',
            content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
          });
        } else {
          content.push({
            type: 'bulletList',
            content: [{
              type: 'listItem',
              content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
            }]
          });
        }
        
        const newTop = last(content);
        if (newTop && newTop.type === 'bulletList') {
          _bulletStack[0] = newTop;
        }
      } else {
        // Nested list item
        // Check both bullet and task stack for parent (for mixed nesting)
        let parentList = _bulletStack[indentLevel - 1] || _taskStack[indentLevel - 1] || null;
        
        if (parentList) {
          const parentLastItem = last(parentList.content);
          if (parentLastItem) {
            // Ensure parentLastItem.content exists and is an array
            if (!parentLastItem.content) {
              parentLastItem.content = [];
            }
            
            // Check if there's already a nested bulletList in the content
            const existingNested = parentLastItem.content.find(c => c.type === 'bulletList');
            
            if (existingNested) {
              // Add to existing nested bulletList
              existingNested.content.push({
                type: 'listItem',
                content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
              });
              _bulletStack[indentLevel] = existingNested;
            } else {
              // Create new nested bulletList
              const nested = {
                type: 'bulletList',
                content: [{
                  type: 'listItem',
                  content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
                }]
              };
              parentLastItem.content.push(nested);
              _bulletStack[indentLevel] = nested;
            }
          } else {
            // Fallback to top-level
            const lastItem = last(content);
            if (lastItem && lastItem.type === 'bulletList') {
              lastItem.content.push({
                type: 'listItem',
                content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
              });
              _bulletStack[indentLevel] = lastItem;
            } else {
              content.push({
                type: 'bulletList',
                content: [{
                  type: 'listItem',
                  content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
                }]
              });
              _bulletStack[indentLevel] = last(content);
            }
          }
        } else {
          // No parent - add as top-level
          const lastItem = last(content);
          if (lastItem && lastItem.type === 'bulletList') {
            lastItem.content.push({
              type: 'listItem',
              content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
            });
            _bulletStack[0] = lastItem;
          } else {
            content.push({
              type: 'bulletList',
              content: [{
                type: 'listItem',
                content: [{ type: 'paragraph', content: parseInlineFormatting(text) }]
              }]
            });
            _bulletStack[0] = last(content);
          }
        }
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
      const lastItem = content.length > 0 ? content[content.length - 1] : null;
      // Don't add multiple consecutive empty paragraphs
      if (lastItem && lastItem.type === 'paragraph' && (!lastItem.content || lastItem.content.length === 0)) {
        // Last item is already an empty paragraph, skip
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
