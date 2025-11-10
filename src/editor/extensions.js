const { Extension } = require('@tiptap/core');
const { TextSelection } = require('@tiptap/pm/state');

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

module.exports = { BoldItalic };
