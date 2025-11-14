/**
 * @jest-environment jsdom
 */
const { htmlToMarkdown, createMarkdownSerializer } = require('../serializer');
const { markdownToTiptap } = require('../parser');

describe('Internal link HTML deserialization', () => {
  it('should convert internal link HTML to markdown and back to TipTap with correct href', () => {
    const html = '<a target="_blank" rel="noopener noreferrer nofollow" class="editor-link internal-link" href="internal:Starhowlers">Doggos</a>';
    const turndownService = createMarkdownSerializer();
    const markdown = htmlToMarkdown(html, turndownService);
    expect(markdown).toBe('[[Starhowlers|Doggos]]');
    const tiptap = markdownToTiptap(markdown);
    let found = false;
    let correctHref = false;
    let correctText = false;
    function search(node) {
      if (node.marks) {
        node.marks.forEach(mark => {
          if (mark.type === 'link' && mark.attrs && mark.attrs.href === 'internal:Starhowlers') {
            found = true;
            correctHref = true;
            if (node.text === 'Doggos') correctText = true;
          }
        });
      }
      if (node.content) node.content.forEach(search);
    }
    if (tiptap.content) tiptap.content.forEach(search);
    expect(found).toBe(true);
    expect(correctHref).toBe(true);
    expect(correctText).toBe(true);
  });
});
