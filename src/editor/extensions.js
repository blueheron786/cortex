const { Extension } = require('@tiptap/core');
const { TextSelection } = require('@tiptap/pm/state');
const { Plugin, PluginKey } = require('@tiptap/pm/state');
const { Decoration, DecorationSet } = require('@tiptap/pm/view');

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
              
              // Get the bullet list position (we'll need it for cursor positioning later)
              const bulletListPos = $from.start(-2) - 1;
              
              // Strategy: Split the bullet list into parts and insert a task list for this item
              // If this is the only item, just replace the whole bullet list with a task list
              if (bulletList.childCount === 1) {
                // Simple case: replace the entire bullet list with a task list
                const bulletListEnd = bulletListPos + bulletList.nodeSize;
                const taskList = state.schema.nodes.taskList.create(null, [taskItem]);
                tr.replaceWith(bulletListPos, bulletListEnd, taskList);
              } else {
                // Complex case: Extract this item as a separate task list
                // We'll need to split the bullet list if this item is in the middle
                
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
              
              // Set cursor inside the paragraph of the task item
              // The structure is: taskList -> taskItem -> paragraph -> text
              // We want to position at the end of the text content
              const taskListPos = tr.mapping.map(bulletListPos);
              // Position calculation: +1 (into taskList), +1 (into taskItem), +1 (into paragraph)
              const paragraphPos = taskListPos + 3;
              const cursorPos = paragraphPos + textAfterCheckbox.length;
              tr.setSelection(TextSelection.create(tr.doc, cursorPos));
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

// Extension to show raw markdown markup on the current line
const ShowCurrentLineMarkup = Extension.create({
  name: 'showCurrentLineMarkup',
  
  addProseMirrorPlugins() {
    const pluginKey = new PluginKey('showCurrentLineMarkup');
    
    return [
      new Plugin({
        key: pluginKey,
        
        state: {
          init() {
            return DecorationSet.empty;
          },
          
          apply(tr, oldState) {
            // If selection changed or document changed, recalculate
            if (tr.selectionSet || tr.docChanged) {
              const { $from } = tr.selection;
              const decorations = [];
              
              // Find the current line (paragraph, heading, etc.)
              let currentNodePos = null;
              let currentNode = null;
              
              // Walk up the tree to find the text block
              for (let depth = $from.depth; depth > 0; depth--) {
                const node = $from.node(depth);
                if (node.isTextblock) {
                  currentNode = node;
                  currentNodePos = $from.start(depth) - 1; // Position before the node
                  break;
                }
              }
              
              if (currentNode && currentNodePos !== null) {
                // Add a class decoration to the current line to show raw markup
                decorations.push(
                  Decoration.node(currentNodePos, currentNodePos + currentNode.nodeSize, {
                    class: 'show-markup'
                  })
                );
                
                // Add widget decorations for internal links to show full [[PageName|Display]] syntax
                currentNode.descendants((node, pos) => {
                  if (node.isText && node.marks) {
                    node.marks.forEach(mark => {
                      if (mark.type.name === 'link' && mark.attrs.href) {
                        let pageName = null;
                        
                        // Extract page name from various internal link formats
                        if (mark.attrs.href.startsWith('internal:')) {
                          pageName = mark.attrs.href.slice(9);
                        } else if (mark.attrs.href.startsWith('/__internal__/')) {
                          pageName = mark.attrs.href.slice('/__internal__/'.length);
                        } else if (mark.attrs['data-href'] && mark.attrs['data-href'].startsWith('internal:')) {
                          pageName = mark.attrs['data-href'].slice(9);
                        }
                        
                        // Also try data-page-name if available
                        if (!pageName && mark.attrs['data-page-name']) {
                          pageName = mark.attrs['data-page-name'];
                        }
                        
                        if (pageName) {
                          const displayText = node.text;
                          
                          // Check if display text differs from page name (excluding anchors)
                          const pageNameWithoutAnchor = pageName.split('#')[0];
                          const displayTextMatches = displayText === pageNameWithoutAnchor || displayText === pageName;
                          
                          const absolutePos = currentNodePos + 1 + pos;
                          
                          if (!displayTextMatches && displayText) {
                            // Custom display text - add widgets for [[PageName|Display]]
                            decorations.push(
                              Decoration.widget(absolutePos, () => {
                                const span = document.createElement('span');
                                span.style.color = '#808080';
                                span.textContent = '[[' + pageName + '|';
                                return span;
                              }, { side: -1 })
                            );
                            decorations.push(
                              Decoration.widget(absolutePos + node.nodeSize, () => {
                                const span = document.createElement('span');
                                span.style.color = '#808080';
                                span.textContent = ']]';
                                return span;
                              }, { side: 1 })
                            );
                          } else {
                            // No custom display - add widgets for [[PageName]]
                            decorations.push(
                              Decoration.widget(absolutePos, () => {
                                const span = document.createElement('span');
                                span.style.color = '#808080';
                                span.textContent = '[[';
                                return span;
                              }, { side: -1 })
                            );
                            decorations.push(
                              Decoration.widget(absolutePos + node.nodeSize, () => {
                                const span = document.createElement('span');
                                span.style.color = '#808080';
                                span.textContent = ']]';
                                return span;
                              }, { side: 1 })
                            );
                          }
                        }
                      }
                    });
                  }
                });
              }
              
              return DecorationSet.create(tr.doc, decorations);
            }
            
            return oldState.map(tr.mapping, tr.doc);
          }
        },
        
        props: {
          decorations(state) {
            return pluginKey.getState(state);
          }
        }
      })
    ];
  }
});

module.exports = { BoldItalic, TaskListInputRule, ShowCurrentLineMarkup };
