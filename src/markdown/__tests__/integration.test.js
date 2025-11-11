/**
 * @jest-environment jsdom
 */

const { markdownToTiptap } = require('../parser');
const { createMarkdownSerializer, htmlToMarkdown } = require('../serializer');

describe('Markdown Round-Trip Integration Tests', () => {
  let turndownService;

  beforeEach(() => {
    turndownService = createMarkdownSerializer();
  });

  describe('Basic formatting', () => {
    it('should preserve bold text', () => {
      const markdown = '**bold text**';
      const json = markdownToTiptap(markdown);
      
      // Simulate what TipTap would produce
      const html = '<p><strong>bold text</strong></p>';
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toBe('**bold text**');
    });

    it('should preserve italic text', () => {
      const markdown = '*italic text*';
      const json = markdownToTiptap(markdown);
      
      const html = '<p><em>italic text</em></p>';
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toBe('*italic text*');
    });

    it('should preserve bold+italic with triple stars', () => {
      const markdown = '***bold italic***';
      const json = markdownToTiptap(markdown);
      
      // Verify parser creates both marks
      expect(json.content[0].content[0].marks).toHaveLength(2);
      expect(json.content[0].content[0].marks).toContainEqual({ type: 'bold' });
      expect(json.content[0].content[0].marks).toContainEqual({ type: 'italic' });
      
      // Verify serializer converts back correctly
      const html = '<p><strong><em>bold italic</em></strong></p>';
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toBe('***bold italic***');
    });

    it('should preserve highlight syntax', () => {
      const markdown = '==highlighted text==';
      const json = markdownToTiptap(markdown);
      
      // Verify parser creates highlight mark
      expect(json.content[0].content[0].marks).toContainEqual({ type: 'highlight' });
      
      // Verify serializer converts back correctly
      const html = '<p><mark>highlighted text</mark></p>';
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toBe('==highlighted text==');
    });

    it('should preserve inline code', () => {
      const markdown = 'Text with `code` inline';
      const json = markdownToTiptap(markdown);
      
      const html = '<p>Text with <code>code</code> inline</p>';
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toBe('Text with `code` inline');
    });
  });

  describe('Lists', () => {
    it('should preserve bullet lists', () => {
      const markdown = '- item one\n- item two\n- item three';
      const json = markdownToTiptap(markdown);
      
      expect(json.content[0].type).toBe('bulletList');
      expect(json.content[0].content).toHaveLength(3);
      
      const html = '<ul><li><p>item one</p></li><li><p>item two</p></li><li><p>item three</p></li></ul>';
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toBe('- item one\n- item two\n- item three');
    });

    // Note: Ordered lists (1. 2. 3.) not yet implemented in parser
    it('should serialize ordered lists from HTML', () => {
      const html = '<ol><li><p>first</p></li><li><p>second</p></li><li><p>third</p></li></ol>';
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toBe('1. first\n2. second\n3. third');
    });

    it('should preserve task lists', () => {
      const markdown = '- [ ] unchecked\n- [x] checked';
      const json = markdownToTiptap(markdown);
      
      expect(json.content[0].type).toBe('taskList');
      expect(json.content[0].content[0].attrs.checked).toBe(false);
      expect(json.content[0].content[1].attrs.checked).toBe(true);
      
      const html = `<ul data-type="taskList">
        <li data-type="taskItem"><label contenteditable="false"><input type="checkbox"><span contenteditable="false"></span></label><div><p>unchecked</p></div></li>
        <li data-type="taskItem"><label contenteditable="false"><input type="checkbox" checked><span contenteditable="false"></span></label><div><p>checked</p></div></li>
      </ul>`;
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toContain('- [ ] unchecked');
      expect(result).toContain('- [x] checked');
    });

    it('should preserve order when first item becomes checkbox (mixed list)', () => {
      const markdown = '- [x] First item is checkbox\n- Second regular item\n- Third regular item';
      const json = markdownToTiptap(markdown);
      
      // Parser creates two separate lists
      expect(json.content.length).toBe(2);
      expect(json.content[0].type).toBe('taskList');
      expect(json.content[1].type).toBe('bulletList');
      
      // Now simulate the HTML that TipTap would produce
      const html = `<ul data-type="taskList">
        <li data-type="taskItem"><label contenteditable="false"><input type="checkbox" checked><span contenteditable="false"></span></label><div><p>First item is checkbox</p></div></li>
      </ul>
      <ul>
        <li><p>Second regular item</p></li>
        <li><p>Third regular item</p></li>
      </ul>`;
      
      const result = htmlToMarkdown(html, turndownService);
      
      // The checkbox item should still be first
      const lines = result.trim().split('\n').filter(l => l.trim());
      expect(lines[0]).toBe('- [x] First item is checkbox');
      expect(lines[1]).toBe('- Second regular item');
      expect(lines[2]).toBe('- Third regular item');
    });

    it('should preserve order in reverse case (checkbox last)', () => {
      const markdown = '- First regular item\n- Second regular item\n- [x] Last is checkbox';
      const json = markdownToTiptap(markdown);
      
      // Parser creates bulletList first, then taskList
      expect(json.content.length).toBe(2);
      expect(json.content[0].type).toBe('bulletList');
      expect(json.content[1].type).toBe('taskList');
      
      // HTML in that order
      const html = `<ul>
        <li><p>First regular item</p></li>
        <li><p>Second regular item</p></li>
      </ul>
      <ul data-type="taskList">
        <li data-type="taskItem"><label contenteditable="false"><input type="checkbox" checked><span contenteditable="false"></span></label><div><p>Last is checkbox</p></div></li>
      </ul>`;
      
      const result = htmlToMarkdown(html, turndownService);
      
      // The order should be preserved
      const lines = result.trim().split('\n').filter(l => l.trim());
      expect(lines[0]).toBe('- First regular item');
      expect(lines[1]).toBe('- Second regular item');
      expect(lines[2]).toBe('- [x] Last is checkbox');
    });
  });

  describe('Tables', () => {
    it('should preserve simple table structure', () => {
      const markdown = `| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |`;
      
      const json = markdownToTiptap(markdown);
      
      // Verify parser creates correct structure
      expect(json.content[0].type).toBe('table');
      expect(json.content[0].content).toHaveLength(2); // header + 1 data row
      expect(json.content[0].content[0].content[0].type).toBe('tableHeader');
      expect(json.content[0].content[1].content[0].type).toBe('tableCell');
      
      // Verify serializer converts back correctly
      const html = `<table>
        <tr><th>Header 1</th><th>Header 2</th></tr>
        <tr><td>Cell 1</td><td>Cell 2</td></tr>
      </table>`;
      const result = htmlToMarkdown(html, turndownService);
      
      // Check structure (separator width may vary, content should match)
      expect(result).toContain('| Header 1 | Header 2 |');
      expect(result).toContain('| Cell 1 | Cell 2 |');
      expect(result).toMatch(/\|-----+\|-----+\|/); // Separator with at least 5 dashes each
    });

    it('should preserve table with multiple rows', () => {
      const markdown = `| A | B |
|---|---|
| 1 | 2 |
| 3 | 4 |`;
      
      const json = markdownToTiptap(markdown);
      expect(json.content[0].content).toHaveLength(3); // 1 header + 2 data rows
      
      const html = `<table>
        <tr><th>A</th><th>B</th></tr>
        <tr><td>1</td><td>2</td></tr>
        <tr><td>3</td><td>4</td></tr>
      </table>`;
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toContain('| A | B |');
      expect(result).toContain('| 1 | 2 |');
      expect(result).toContain('| 3 | 4 |');
    });

    it('should preserve formatting in table cells', () => {
      const markdown = `| **Bold** | *Italic* |
|----------|----------|
| Normal   | ==High== |`;
      
      const json = markdownToTiptap(markdown);
      
      // Verify parser preserves formatting
      const headerCell1 = json.content[0].content[0].content[0].content[0].content[0];
      expect(headerCell1.marks).toContainEqual({ type: 'bold' });
      
      // Verify serializer preserves formatting
      const html = `<table>
        <tr><th><strong>Bold</strong></th><th><em>Italic</em></th></tr>
        <tr><td>Normal</td><td><mark>High</mark></td></tr>
      </table>`;
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toContain('**Bold**');
      expect(result).toContain('*Italic*');
      expect(result).toContain('==High==');
    });

    it('should handle empty table cells', () => {
      const markdown = `| A |  |
|---|---|
|   | B |`;
      
      const json = markdownToTiptap(markdown);
      expect(json.content[0].type).toBe('table');
      
      const html = `<table>
        <tr><th>A</th><th></th></tr>
        <tr><td></td><td>B</td></tr>
      </table>`;
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toContain('| A |  |');
      expect(result).toContain('|  | B |');
    });

    it('should escape pipes in table cells', () => {
      const markdown = `| Header |
|--------|
| Contains \\| pipe |`;
      
      const html = `<table>
        <tr><th>Header</th></tr>
        <tr><td>Contains | pipe</td></tr>
      </table>`;
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toContain('Contains \\| pipe');
    });
  });

  describe('Headers', () => {
    it('should preserve all heading levels', () => {
      for (let level = 1; level <= 6; level++) {
        const markdown = `${'#'.repeat(level)} Heading ${level}`;
        const json = markdownToTiptap(markdown);
        
        expect(json.content[0].type).toBe('heading');
        expect(json.content[0].attrs.level).toBe(level);
        
        const html = `<h${level}>Heading ${level}</h${level}>`;
        const result = htmlToMarkdown(html, turndownService);
        
        expect(result).toBe(markdown);
      }
    });
  });

  describe('Mixed content', () => {
    it('should preserve complex document structure', () => {
      const markdown = `# Title
This is a paragraph with **bold** and *italic* and ==highlight==.
- List item 1
- List item 2
| Header |
|--------|
| Cell   |`;
      
      const json = markdownToTiptap(markdown);
      
      // Verify structure (consecutive content without blank lines)
      expect(json.content[0].type).toBe('heading');
      expect(json.content[1].type).toBe('paragraph');
      expect(json.content[2].type).toBe('bulletList');
      expect(json.content[3].type).toBe('table');
      
      // Verify we can serialize it
      const html = `<h1>Title</h1>
<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> and <mark>highlight</mark>.</p>
<ul><li><p>List item 1</p></li><li><p>List item 2</p></li></ul>
<table><tr><th>Header</th></tr><tr><td>Cell</td></tr></table>`;
      
      const result = htmlToMarkdown(html, turndownService);
      
      expect(result).toContain('# Title');
      expect(result).toContain('**bold**');
      expect(result).toContain('*italic*');
      expect(result).toContain('==highlight==');
      expect(result).toContain('- List item 1');
      expect(result).toContain('| Header |');
    });
  });
});
