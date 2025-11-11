const { Extension } = require('@tiptap/core');
const { TextSelection } = require('@tiptap/pm/state');
const { Plugin } = require('@tiptap/pm/state');

// Custom extension for creating task lists with - [ ] or - [x]
const TaskListInputRule = Extension.create({
  name: 'taskListInputRule',
  
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleTextInput: (view, from, to, text) => {
            const { state, dispatch } = view;
            const { doc, tr, selection } = state;
            const { $from } = selection;
            
            // Check if we're in a list item
            const listItem = $from.node(-1);
            if (!listItem || listItem.type.name !== 'listItem') {
              return false;
            }
            
            // Get the bullet list parent
            const bulletList = $from.node(-2);
            if (!bulletList || bulletList.type.name !== 'bulletList') {
              return false;
            }
            
            // Get text content of current list item including the new character
            const listItemStart = $from.start(-1);
            const currentText = doc.textBetween(listItemStart, $from.pos, '\n', '\0') + text;
            
            // Check if it matches task item patterns
            const uncheckedMatch = currentText.match(/^\[\s?\] $/);
            const checkedMatch = currentText.match(/^\[x\] $/i);
            
            if (uncheckedMatch || checkedMatch) {
              const checked = !!checkedMatch;
              
              // Get all text content from the entire list item (after the match)
              const listItemEndPos = $from.end(-1);
              const fullText = doc.textBetween(listItemStart, listItemEndPos, '\n', '\0');
              
              // currentText is what we typed so far (ending with the space we just typed)
              // We need to remove that pattern from fullText and keep the rest
              // The pattern length is the matched text minus the trailing space we just added
              const patternLength = currentText.length - 1; // Don't count the space we just typed
              const textAfterCheckbox = fullText.slice(patternLength);
              
              // Create a task item with the remaining content
              const taskItemContent = textAfterCheckbox.trim() 
                ? [state.schema.nodes.paragraph.create(null, state.schema.text(textAfterCheckbox))]
                : [state.schema.nodes.paragraph.create()];
              
              const taskItem = state.schema.nodes.taskItem.create({ checked }, taskItemContent);
              
              // Get the position of the current list item
              const listItemPos = $from.start(-1) - 1;
              const listItemEnd = listItemPos + listItem.nodeSize;
              
              // Find the index of this list item within the bullet list
              const listItemIndex = $from.index(-1);
              
              // Strategy: Split the bullet list into parts and insert a task list for this item
              // If this is the only item, just replace the whole bullet list with a task list
              if (bulletList.childCount === 1) {
                // Simple case: replace the entire bullet list with a task list
                const bulletListPos = $from.start(-2) - 1;
                const bulletListEnd = bulletListPos + bulletList.nodeSize;
                const taskList = state.schema.nodes.taskList.create(null, [taskItem]);
                tr.replaceWith(bulletListPos, bulletListEnd, taskList);
              } else {
                // Complex case: Extract this item as a separate task list
                // We'll need to split the bullet list if this item is in the middle
                const bulletListPos = $from.start(-2) - 1;
                
                // Collect all list items before and after this one
                const itemsBefore = [];
                const itemsAfter = [];
                
                bulletList.forEach((child, offset, index) => {
                  if (index < listItemIndex) {
                    itemsBefore.push(child);
                  } else if (index > listItemIndex) {
                    itemsAfter.push(child);
                  }
                });
                
                // Build the replacement nodes
                const nodes = [];
                
                // Add bullet list with items before (if any)
                if (itemsBefore.length > 0) {
                  nodes.push(state.schema.nodes.bulletList.create(null, itemsBefore));
                }
                
                // Add task list with the converted item
                nodes.push(state.schema.nodes.taskList.create(null, [taskItem]));
                
                // Add bullet list with items after (if any)
                if (itemsAfter.length > 0) {
                  nodes.push(state.schema.nodes.bulletList.create(null, itemsAfter));
                }
                
                // Replace the entire bullet list with the split sections
                const bulletListEnd = bulletListPos + bulletList.nodeSize;
                tr.replaceWith(bulletListPos, bulletListEnd, nodes);
              }
              
              // Set cursor after the content we preserved
              const finalPos = tr.mapping.map(listItemPos + 1);
              const cursorOffset = textAfterCheckbox.length > 0 ? textAfterCheckbox.length : 0;
              const newPos = finalPos + cursorOffset;
              tr.setSelection(TextSelection.create(tr.doc, newPos));
              dispatch(tr);
              
              return true;
            }
            
            return false;
          },
        },
      }),
    ];
  },
});

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

module.exports = { BoldItalic, TaskListInputRule };
