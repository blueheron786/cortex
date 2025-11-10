const { parseInlineFormatting, markdownToTiptap } = require('../parser');

describe('parseInlineFormatting', () => {
  describe('Bold formatting', () => {
    it('should parse bold text with **', () => {
      const result = parseInlineFormatting('This is **bold** text');
      expect(result).toEqual([
        { type: 'text', text: 'This is ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
        { type: 'text', text: ' text' }
      ]);
    });

    it('should handle multiple bold segments', () => {
      const result = parseInlineFormatting('**first** and **second**');
      expect(result).toEqual([
        { type: 'text', text: 'first', marks: [{ type: 'bold' }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'second', marks: [{ type: 'bold' }] }
      ]);
    });

    it('should handle bold at start', () => {
      const result = parseInlineFormatting('**bold** text');
      expect(result).toEqual([
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
        { type: 'text', text: ' text' }
      ]);
    });

    it('should handle bold at end', () => {
      const result = parseInlineFormatting('text **bold**');
      expect(result).toEqual([
        { type: 'text', text: 'text ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] }
      ]);
    });
  });

  describe('Italic formatting', () => {
    it('should parse italic text with *', () => {
      const result = parseInlineFormatting('This is *italic* text');
      expect(result).toEqual([
        { type: 'text', text: 'This is ' },
        { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
        { type: 'text', text: ' text' }
      ]);
    });

    it('should handle multiple italic segments', () => {
      const result = parseInlineFormatting('*first* and *second*');
      expect(result).toEqual([
        { type: 'text', text: 'first', marks: [{ type: 'italic' }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'second', marks: [{ type: 'italic' }] }
      ]);
    });
  });

  describe('Bold + Italic formatting', () => {
    it('should parse bold+italic text with ***', () => {
      const result = parseInlineFormatting('This is ***bold italic*** text');
      expect(result).toEqual([
        { type: 'text', text: 'This is ' },
        { type: 'text', text: 'bold italic', marks: [{ type: 'bold' }, { type: 'italic' }] },
        { type: 'text', text: ' text' }
      ]);
    });

    it('should prioritize *** over ** and *', () => {
      const result = parseInlineFormatting('***triple*** **double** *single*');
      expect(result).toEqual([
        { type: 'text', text: 'triple', marks: [{ type: 'bold' }, { type: 'italic' }] },
        { type: 'text', text: ' ' },
        { type: 'text', text: 'double', marks: [{ type: 'bold' }] },
        { type: 'text', text: ' ' },
        { type: 'text', text: 'single', marks: [{ type: 'italic' }] }
      ]);
    });
  });

  describe('Highlight formatting', () => {
    it('should parse highlighted text with ==', () => {
      const result = parseInlineFormatting('This is ==highlighted== text');
      expect(result).toEqual([
        { type: 'text', text: 'This is ' },
        { type: 'text', text: 'highlighted', marks: [{ type: 'highlight' }] },
        { type: 'text', text: ' text' }
      ]);
    });

    it('should handle multiple highlights', () => {
      const result = parseInlineFormatting('==first== and ==second==');
      expect(result).toEqual([
        { type: 'text', text: 'first', marks: [{ type: 'highlight' }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'second', marks: [{ type: 'highlight' }] }
      ]);
    });
  });

  describe('Strikethrough formatting', () => {
    it('should parse strikethrough text with ~~', () => {
      const result = parseInlineFormatting('This is ~~crossed out~~ text');
      expect(result).toEqual([
        { type: 'text', text: 'This is ' },
        { type: 'text', text: 'crossed out', marks: [{ type: 'strike' }] },
        { type: 'text', text: ' text' }
      ]);
    });

    it('should handle multiple strikethroughs', () => {
      const result = parseInlineFormatting('~~first~~ and ~~second~~');
      expect(result).toEqual([
        { type: 'text', text: 'first', marks: [{ type: 'strike' }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'second', marks: [{ type: 'strike' }] }
      ]);
    });

    it('should handle strikethrough at start', () => {
      const result = parseInlineFormatting('~~strikethrough~~ text');
      expect(result).toEqual([
        { type: 'text', text: 'strikethrough', marks: [{ type: 'strike' }] },
        { type: 'text', text: ' text' }
      ]);
    });

    it('should handle strikethrough at end', () => {
      const result = parseInlineFormatting('text ~~strikethrough~~');
      expect(result).toEqual([
        { type: 'text', text: 'text ' },
        { type: 'text', text: 'strikethrough', marks: [{ type: 'strike' }] }
      ]);
    });

    it('should handle unclosed strikethrough markers', () => {
      const result = parseInlineFormatting('This is ~~unclosed');
      // When ~~ is not closed, it's treated as plain text
      expect(result).toEqual([
        { type: 'text', text: 'This is ~~unclosed' }
      ]);
    });
  });

  describe('Link formatting', () => {
    it('should parse markdown links', () => {
      const result = parseInlineFormatting('Check out [Google](https://google.com) here');
      expect(result).toEqual([
        { type: 'text', text: 'Check out ' },
        { type: 'text', text: 'Google', marks: [{ type: 'link', attrs: { href: 'https://google.com' } }] },
        { type: 'text', text: ' here' }
      ]);
    });

    it('should parse multiple links', () => {
      const result = parseInlineFormatting('[First](url1) and [Second](url2)');
      expect(result).toEqual([
        { type: 'text', text: 'First', marks: [{ type: 'link', attrs: { href: 'url1' } }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'Second', marks: [{ type: 'link', attrs: { href: 'url2' } }] }
      ]);
    });

    it('should parse link at start', () => {
      const result = parseInlineFormatting('[Link](url) text');
      expect(result).toEqual([
        { type: 'text', text: 'Link', marks: [{ type: 'link', attrs: { href: 'url' } }] },
        { type: 'text', text: ' text' }
      ]);
    });

    it('should parse link at end', () => {
      const result = parseInlineFormatting('text [Link](url)');
      expect(result).toEqual([
        { type: 'text', text: 'text ' },
        { type: 'text', text: 'Link', marks: [{ type: 'link', attrs: { href: 'url' } }] }
      ]);
    });
  });

  describe('Code formatting', () => {
    it('should parse inline code with backticks', () => {
      const result = parseInlineFormatting('This is `code` text');
      expect(result).toEqual([
        { type: 'text', text: 'This is ' },
        { type: 'text', text: 'code', marks: [{ type: 'code' }] },
        { type: 'text', text: ' text' }
      ]);
    });

    it('should not process formatting inside code blocks', () => {
      const result = parseInlineFormatting('This is `**not bold**` text');
      expect(result).toEqual([
        { type: 'text', text: 'This is ' },
        { type: 'text', text: '**not bold**', marks: [{ type: 'code' }] },
        { type: 'text', text: ' text' }
      ]);
    });

    it('should not process multiple marks inside code blocks', () => {
      const result = parseInlineFormatting('`*italic* **bold** ==highlight==`');
      expect(result).toEqual([
        { type: 'text', text: '*italic* **bold** ==highlight==', marks: [{ type: 'code' }] }
      ]);
    });
  });

  describe('Plain text', () => {
    it('should return plain text without formatting', () => {
      const result = parseInlineFormatting('Just plain text');
      expect(result).toEqual([
        { type: 'text', text: 'Just plain text' }
      ]);
    });

    it('should handle empty string', () => {
      const result = parseInlineFormatting('');
      expect(result).toEqual([]);
    });

    it('should handle null', () => {
      const result = parseInlineFormatting(null);
      expect(result).toEqual([]);
    });

    it('should handle undefined', () => {
      const result = parseInlineFormatting(undefined);
      expect(result).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('should handle unclosed bold markers', () => {
      const result = parseInlineFormatting('This is **unclosed');
      // When ** is not closed, the ** characters are consumed during parsing but no formatting is applied
      // This results in the text being split at the ** location
      expect(result).toEqual([
        { type: 'text', text: 'This is ' },
        { type: 'text', text: 'unclosed' }
      ]);
    });

    it('should handle unclosed italic markers', () => {
      const result = parseInlineFormatting('This is *unclosed');
      expect(result).toEqual([
        { type: 'text', text: 'This is *unclosed' }
      ]);
    });

    it('should handle nested formatting', () => {
      const result = parseInlineFormatting('**bold with *italic* inside**');
      // First processes **, treating everything inside as bold
      expect(result).toEqual([
        { type: 'text', text: 'bold with *italic* inside', marks: [{ type: 'bold' }] }
      ]);
    });
  });
});

describe('markdownToTiptap', () => {
  describe('Horizontal Rules', () => {
    it('should parse --- as horizontal rule', () => {
      const result = markdownToTiptap('---');
      expect(result).toEqual({
        type: 'doc',
        content: [
          { type: 'horizontalRule' }
        ]
      });
    });

    it('should parse *** as horizontal rule', () => {
      const result = markdownToTiptap('***');
      expect(result.content[0].type).toBe('horizontalRule');
    });

    it('should parse ___ as horizontal rule', () => {
      const result = markdownToTiptap('___');
      expect(result.content[0].type).toBe('horizontalRule');
    });

    it('should parse horizontal rule with extra dashes', () => {
      const result = markdownToTiptap('-----');
      expect(result.content[0].type).toBe('horizontalRule');
    });

    it('should parse horizontal rule in context', () => {
      const result = markdownToTiptap('Text above\n\n---\n\nText below');
      expect(result.content).toHaveLength(5); // para, empty para, hr, empty para, para
      expect(result.content[2].type).toBe('horizontalRule');
    });
  });

  describe('Headers', () => {
    it('should parse h1', () => {
      const result = markdownToTiptap('# Heading 1');
      expect(result).toEqual({
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Heading 1' }] }
        ]
      });
    });

    it('should parse h2', () => {
      const result = markdownToTiptap('## Heading 2');
      expect(result).toEqual({
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Heading 2' }] }
        ]
      });
    });

    it('should parse h3', () => {
      const result = markdownToTiptap('### Heading 3');
      expect(result).toEqual({
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'Heading 3' }] }
        ]
      });
    });

    it('should parse all 6 heading levels', () => {
      const markdown = `# H1
## H2
### H3
#### H4
##### H5
###### H6`;
      const result = markdownToTiptap(markdown);
      expect(result.content).toHaveLength(6);
      expect(result.content[0]).toEqual({ type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'H1' }] });
      expect(result.content[5]).toEqual({ type: 'heading', attrs: { level: 6 }, content: [{ type: 'text', text: 'H6' }] });
    });

    it('should parse headers with formatting', () => {
      const result = markdownToTiptap('# **Bold** Heading');
      expect(result).toEqual({
        type: 'doc',
        content: [
          { 
            type: 'heading', 
            attrs: { level: 1 }, 
            content: [
              { type: 'text', text: 'Bold', marks: [{ type: 'bold' }] },
              { type: 'text', text: ' Heading' }
            ]
          }
        ]
      });
    });
  });

  describe('Paragraphs', () => {
    it('should parse plain paragraph', () => {
      const result = markdownToTiptap('Just a paragraph');
      expect(result).toEqual({
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Just a paragraph' }] }
        ]
      });
    });

    it('should parse multiple paragraphs', () => {
      const result = markdownToTiptap('First paragraph\n\nSecond paragraph');
      expect(result.content).toHaveLength(3); // para, empty para, para
      expect(result.content[0].type).toBe('paragraph');
      expect(result.content[2].type).toBe('paragraph');
    });

    it('should parse paragraph with inline formatting', () => {
      const result = markdownToTiptap('Text with **bold** and *italic*');
      expect(result.content[0].content).toEqual([
        { type: 'text', text: 'Text with ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'italic', marks: [{ type: 'italic' }] }
      ]);
    });
  });

  describe('Lists', () => {
    it('should parse bullet list with -', () => {
      const result = markdownToTiptap('- Item 1\n- Item 2\n- Item 3');
      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'bulletList',
            content: [
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Item 1' }] }] },
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Item 2' }] }] },
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Item 3' }] }] }
            ]
          }
        ]
      });
    });

    it('should parse bullet list with *', () => {
      const result = markdownToTiptap('* Item 1\n* Item 2');
      expect(result.content[0].type).toBe('bulletList');
      expect(result.content[0].content).toHaveLength(2);
    });

    it('should parse list items with formatting', () => {
      const result = markdownToTiptap('- **Bold** item\n- *Italic* item');
      expect(result.content[0].content[0].content[0].content[0]).toEqual({
        type: 'text',
        text: 'Bold',
        marks: [{ type: 'bold' }]
      });
    });

    it('should separate lists with paragraph between', () => {
      const result = markdownToTiptap('- Item 1\n\nParagraph\n\n- Item 2');
      expect(result.content).toHaveLength(5); // list, empty para, para, empty para, list
      expect(result.content[0].type).toBe('bulletList');
      expect(result.content[2].type).toBe('paragraph');
      expect(result.content[4].type).toBe('bulletList');
    });

    it('should parse nested bullet lists', () => {
      const markdown = '- Parent\n  - Child 1\n  - Child 2\n- Another parent';
      const result = markdownToTiptap(markdown);
      
      expect(result.content[0].type).toBe('bulletList');
      expect(result.content[0].content).toHaveLength(2);
      
      const parent = result.content[0].content[0];
      expect(parent.type).toBe('listItem');
      
      // Parent should have nested bulletList
      const nestedList = parent.content.find(c => c.type === 'bulletList');
      expect(nestedList).toBeDefined();
      expect(nestedList.content).toHaveLength(2);
    });
  });

  describe('Task Lists', () => {
    it('should parse unchecked task items', () => {
      const result = markdownToTiptap('- [ ] Unchecked task');
      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'taskList',
            content: [
              {
                type: 'taskItem',
                attrs: { checked: false },
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Unchecked task' }] }]
              }
            ]
          }
        ]
      });
    });

    it('should parse checked task items', () => {
      const result = markdownToTiptap('- [x] Checked task');
      expect(result.content[0].content[0].attrs.checked).toBe(true);
    });

    it('should parse multiple task items', () => {
      const result = markdownToTiptap('- [ ] Task 1\n- [x] Task 2\n- [ ] Task 3');
      expect(result.content[0].type).toBe('taskList');
      expect(result.content[0].content).toHaveLength(3);
      expect(result.content[0].content[0].attrs.checked).toBe(false);
      expect(result.content[0].content[1].attrs.checked).toBe(true);
      expect(result.content[0].content[2].attrs.checked).toBe(false);
    });

    it('should parse nested task items', () => {
      const markdown = '- [ ] Parent\n  - [ ] Child 1\n  - [x] Child 2\n- [x] Another parent';
      const result = markdownToTiptap(markdown);

      // Top level should have 2 task items
      expect(result.content[0].type).toBe('taskList');
      expect(result.content[0].content).toHaveLength(2);

      const parent = result.content[0].content[0];
      expect(parent.type).toBe('taskItem');
      // Parent should contain a nested taskList as one of its children
      const nested = parent.content.find(c => c.type === 'taskList' || (c.content && c.content.some(cc => cc.type === 'taskList')));
      // Verify nested exists and has two children with correct checked values
      const nestedList = nested && (nested.type === 'taskList' ? nested : nested.content.find(cc => cc.type === 'taskList'));
      expect(nestedList).toBeDefined();
      expect(nestedList.content).toHaveLength(2);
      expect(nestedList.content[0].attrs.checked).toBe(false);
      expect(nestedList.content[1].attrs.checked).toBe(true);
    });

    it('should parse nested task items with proper structure', () => {
      const markdown = '- [ ] parent node\n  - [ ] child one\n  - [ ] child two';
      const result = markdownToTiptap(markdown);

      // Should have a taskList at top level
      expect(result.content[0].type).toBe('taskList');
      expect(result.content[0].content).toHaveLength(1);

      // Get the parent task item
      const parentTask = result.content[0].content[0];
      expect(parentTask.type).toBe('taskItem');
      expect(parentTask.attrs.checked).toBe(false);
      
      // Parent should have both a paragraph and a nested taskList
      expect(parentTask.content.length).toBeGreaterThanOrEqual(2);
      
      const paragraph = parentTask.content.find(c => c.type === 'paragraph');
      expect(paragraph).toBeDefined();
      expect(paragraph.content[0].text).toBe('parent node');
      
      // Find the nested taskList
      const nestedTaskList = parentTask.content.find(c => c.type === 'taskList');
      expect(nestedTaskList).toBeDefined();
      expect(nestedTaskList.content).toHaveLength(2);
      
      // Verify child items
      expect(nestedTaskList.content[0].type).toBe('taskItem');
      expect(nestedTaskList.content[0].attrs.checked).toBe(false);
      expect(nestedTaskList.content[0].content[0].content[0].text).toBe('child one');
      
      expect(nestedTaskList.content[1].type).toBe('taskItem');
      expect(nestedTaskList.content[1].attrs.checked).toBe(false);
      expect(nestedTaskList.content[1].content[0].content[0].text).toBe('child two');
    });

    it('should parse mixed nested task items and regular list items', () => {
      const markdown = '- [ ] Parent task\n  - [ ] Nested checkbox\n  - Regular nested item 1\n  - Regular nested item 2';
      const result = markdownToTiptap(markdown);

      expect(result.content[0].type).toBe('taskList');
      const parentTask = result.content[0].content[0];
      expect(parentTask.type).toBe('taskItem');
      
      // Should have nested taskList and nested bulletList as siblings
      const nestedTaskList = parentTask.content.find(c => c.type === 'taskList');
      const nestedBulletList = parentTask.content.find(c => c.type === 'bulletList');
      
      expect(nestedTaskList).toBeDefined();
      expect(nestedTaskList.content).toHaveLength(1);
      expect(nestedTaskList.content[0].attrs.checked).toBe(false);
      
      expect(nestedBulletList).toBeDefined();
      expect(nestedBulletList.content).toHaveLength(2);
    });

    it('should parse task items nested under bullet list items', () => {
      const markdown = '- one\n- two\n- three\n- four\n  - [x] checked box\n  - a\n  - b\n  - c';
      const result = markdownToTiptap(markdown);

      expect(result.content[0].type).toBe('bulletList');
      expect(result.content[0].content).toHaveLength(4);
      
      const fourthItem = result.content[0].content[3];
      expect(fourthItem.type).toBe('listItem');
      
      // Should have nested taskList and nested bulletList as siblings
      const nestedTaskList = fourthItem.content.find(c => c.type === 'taskList');
      const nestedBulletList = fourthItem.content.find(c => c.type === 'bulletList');
      
      expect(nestedTaskList).toBeDefined();
      expect(nestedTaskList.content).toHaveLength(1);
      expect(nestedTaskList.content[0].attrs.checked).toBe(true);
      
      expect(nestedBulletList).toBeDefined();
      expect(nestedBulletList.content).toHaveLength(3);
    });

    it('should parse task items with formatting', () => {
      const result = markdownToTiptap('- [x] **Done** task');
      expect(result.content[0].content[0].content[0].content[0]).toEqual({
        type: 'text',
        text: 'Done',
        marks: [{ type: 'bold' }]
      });
    });
  });

  describe('Tables', () => {
    it('should parse simple table', () => {
      const markdown = `| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |`;
      const result = markdownToTiptap(markdown);
      
      expect(result.content[0].type).toBe('table');
      expect(result.content[0].content).toHaveLength(2); // header row + data row
      expect(result.content[0].content[0].type).toBe('tableRow');
      expect(result.content[0].content[0].content[0].type).toBe('tableHeader');
      expect(result.content[0].content[1].content[0].type).toBe('tableCell');
    });

    it('should parse table with multiple rows', () => {
      const markdown = `| A | B |
|---|---|
| 1 | 2 |
| 3 | 4 |
| 5 | 6 |`;
      const result = markdownToTiptap(markdown);
      
      expect(result.content[0].content).toHaveLength(4); // 1 header + 3 data rows
    });

    it('should parse table with formatting in cells', () => {
      const markdown = `| **Bold** | *Italic* |
|----------|----------|
| Normal   | ==High== |`;
      const result = markdownToTiptap(markdown);
      
      const headerCell1 = result.content[0].content[0].content[0].content[0].content[0];
      expect(headerCell1).toEqual({ type: 'text', text: 'Bold', marks: [{ type: 'bold' }] });
    });

    it('should handle empty cells', () => {
      const markdown = `| A |  |
|---|---|
|   | B |`;
      const result = markdownToTiptap(markdown);
      
      expect(result.content[0].type).toBe('table');
      expect(result.content[0].content).toHaveLength(2);
    });

    it('should not parse incomplete table (no separator)', () => {
      const markdown = `| Header |
| Data |`;
      const result = markdownToTiptap(markdown);
      
      // Should parse as paragraphs, not table
      expect(result.content[0].type).toBe('paragraph');
    });
  });

  describe('Empty content', () => {
    it('should handle empty string', () => {
      const result = markdownToTiptap('');
      expect(result).toEqual({
        type: 'doc',
        content: [{ type: 'paragraph' }]
      });
    });

    it('should handle only whitespace', () => {
      const result = markdownToTiptap('   \n   \n   ');
      expect(result.content.every(item => item.type === 'paragraph')).toBe(true);
    });
  });

  describe('Mixed content', () => {
    it('should parse document with mixed content types', () => {
      const markdown = `# Title

Paragraph with **bold** text

- List item 1
- List item 2

- [ ] Task item

| Header |
|--------|
| Cell   |`;

      const result = markdownToTiptap(markdown);
      
      expect(result.content[0].type).toBe('heading');
      expect(result.content[2].type).toBe('paragraph');
      expect(result.content[4].type).toBe('bulletList');
      expect(result.content[6].type).toBe('taskList');
      expect(result.content[8].type).toBe('table');
    });
  });
});
