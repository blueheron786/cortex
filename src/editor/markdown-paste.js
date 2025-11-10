const { Extension } = require('@tiptap/core');
const { Plugin, PluginKey } = require('@tiptap/pm/state');
const { markdownToTiptap } = require('../markdown/parser');

// Custom extension to handle pasting markdown text
const MarkdownPaste = Extension.create({
  name: 'markdownPaste',
  
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('markdownPaste'),
        props: {
          handlePaste: (view, event, slice) => {
            // Get plain text from clipboard
            const text = event.clipboardData?.getData('text/plain');
            
            if (!text) {
              return false; // Let default handler deal with it
            }
            
            // Check if it looks like markdown (has special characters we care about)
            const hasMarkdownSyntax = /[*_`#\-\[\]|]/.test(text);
            
            if (!hasMarkdownSyntax) {
              return false; // Plain text, let default handler insert it
            }
            
            try {
              // Parse markdown to TipTap JSON
              const json = markdownToTiptap(text);
              
              // Insert the parsed content
              const { state, dispatch } = view;
              const { selection } = state;
              const { from } = selection;
              
              // Convert JSON to ProseMirror nodes
              const content = json.content.map(item => 
                state.schema.nodeFromJSON(item)
              );
              
              // Create transaction to insert content
              const tr = state.tr.replaceWith(
                from,
                selection.to,
                content
              );
              
              dispatch(tr);
              
              return true; // We handled it
            } catch (error) {
              console.error('Failed to parse pasted markdown:', error);
              return false; // Fall back to default handler
            }
          }
        }
      })
    ];
  }
});

module.exports = { MarkdownPaste };
