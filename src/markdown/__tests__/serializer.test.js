const { createMarkdownSerializer, htmlToMarkdown } = require('../serializer');

describe('createMarkdownSerializer', () => {
  let turndownService;

  beforeEach(() => {
    turndownService = createMarkdownSerializer();
  });

  describe('Basic HTML to Markdown', () => {
    it('should convert paragraph to markdown', () => {
      const html = '<p>Simple paragraph</p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('Simple paragraph');
    });

    it('should convert bold text', () => {
      const html = '<p>Text with <strong>bold</strong></p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('Text with **bold**');
    });

    it('should convert italic text', () => {
      const html = '<p>Text with <em>italic</em></p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('Text with *italic*');
    });

    it('should convert bold and italic', () => {
      const html = '<p><strong><em>Bold and italic</em></strong></p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('***Bold and italic***');
    });
  });

  describe('Headers', () => {
    it('should convert h1', () => {
      const html = '<h1>Heading 1</h1>';
      const result = turndownService.turndown(html);
      expect(result).toBe('# Heading 1');
    });

    it('should convert h2', () => {
      const html = '<h2>Heading 2</h2>';
      const result = turndownService.turndown(html);
      expect(result).toBe('## Heading 2');
    });

    it('should convert h3', () => {
      const html = '<h3>Heading 3</h3>';
      const result = turndownService.turndown(html);
      expect(result).toBe('### Heading 3');
    });

    it('should convert all heading levels', () => {
      const levels = [
        { html: '<h1>H1</h1>', expected: '# H1' },
        { html: '<h2>H2</h2>', expected: '## H2' },
        { html: '<h3>H3</h3>', expected: '### H3' },
        { html: '<h4>H4</h4>', expected: '#### H4' },
        { html: '<h5>H5</h5>', expected: '##### H5' },
        { html: '<h6>H6</h6>', expected: '###### H6' }
      ];

      levels.forEach(({ html, expected }) => {
        expect(turndownService.turndown(html)).toBe(expected);
      });
    });

    it('should convert headers with formatting', () => {
      const html = '<h1><strong>Bold</strong> Header</h1>';
      const result = turndownService.turndown(html);
      expect(result).toBe('# **Bold** Header');
    });
  });

  describe('Lists', () => {
    it('should convert bullet list', () => {
      const html = '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
      const result = turndownService.turndown(html);
      expect(result).toBe('- Item 1\n- Item 2\n- Item 3');
    });

    it('should convert ordered list', () => {
      const html = '<ol><li>First</li><li>Second</li><li>Third</li></ol>';
      const result = turndownService.turndown(html);
      expect(result).toBe('1. First\n2. Second\n3. Third');
    });

    it('should not add extra newlines between list items', () => {
      const html = '<ul><li>One</li><li>Two</li></ul>';
      const result = turndownService.turndown(html);
      expect(result).not.toContain('\n\n');
      expect(result).toBe('- One\n- Two');
    });

    it('should handle list items with formatting', () => {
      const html = '<ul><li><strong>Bold</strong> item</li><li><em>Italic</em> item</li></ul>';
      const result = turndownService.turndown(html);
      expect(result).toContain('- **Bold** item');
      expect(result).toContain('- *Italic* item');
    });

    it('should handle nested lists', () => {
      const html = '<ul><li>Parent<ul><li>Child</li></ul></li></ul>';
      const result = turndownService.turndown(html);
      expect(result).toContain('Parent');
      expect(result).toContain('Child');
    });
  });

  describe('Task Lists', () => {
    it('should convert unchecked task item', () => {
      const html = '<li data-type="taskItem"><label contenteditable="false"><input type="checkbox"><span contenteditable="false"></span></label><div><p>Task</p></div></li>';
      const result = turndownService.turndown(html);
      expect(result).toContain('- [ ] Task');
    });

    it('should convert checked task item', () => {
      const html = '<li data-type="taskItem"><label contenteditable="false"><input type="checkbox" checked><span contenteditable="false"></span></label><div><p>Done</p></div></li>';
      const result = turndownService.turndown(html);
      expect(result).toContain('- [x] Done');
    });

    it('should handle multiple task items', () => {
      const html = `<ul data-type="taskList">
        <li data-type="taskItem"><label contenteditable="false"><input type="checkbox"><span contenteditable="false"></span></label><div><p>Todo</p></div></li>
        <li data-type="taskItem"><label contenteditable="false"><input type="checkbox" checked><span contenteditable="false"></span></label><div><p>Done</p></div></li>
      </ul>`;
      const result = turndownService.turndown(html);
      expect(result).toContain('- [ ] Todo');
      expect(result).toContain('- [x] Done');
    });

    it('should handle nested task items with proper indentation', () => {
      const html = `<ul data-type="taskList">
        <li data-type="taskItem">
          <label contenteditable="false"><input type="checkbox"><span contenteditable="false"></span></label>
          <div>
            <p>parent node</p>
            <ul data-type="taskList">
              <li data-type="taskItem"><label contenteditable="false"><input type="checkbox"><span contenteditable="false"></span></label><div><p>child one</p></div></li>
              <li data-type="taskItem"><label contenteditable="false"><input type="checkbox"><span contenteditable="false"></span></label><div><p>child two</p></div></li>
            </ul>
          </div>
        </li>
      </ul>`;
      const result = turndownService.turndown(html);
      
      expect(result).toContain('- [ ] parent node');
      expect(result).toContain('  - [ ] child one');
      expect(result).toContain('  - [ ] child two');
      
      // Verify the structure with proper line breaks
      const lines = result.trim().split('\n');
      expect(lines[0]).toBe('- [ ] parent node');
      expect(lines[1]).toBe('  - [ ] child one');
      expect(lines[2]).toBe('  - [ ] child two');
    });
  });

  describe('Highlights', () => {
    it('should convert mark tag to highlight syntax', () => {
      const html = '<p>Text with <mark>highlight</mark></p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('Text with ==highlight==');
    });

    it('should handle multiple highlights', () => {
      const html = '<p><mark>First</mark> and <mark>second</mark></p>';
      const result = turndownService.turndown(html);
      expect(result).toContain('==First==');
      expect(result).toContain('==second==');
    });
  });

  describe('Strikethrough', () => {
    it('should convert s tag to strikethrough syntax', () => {
      const html = '<p>Text with <s>strikethrough</s></p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('Text with ~~strikethrough~~');
    });

    it('should convert del tag to strikethrough syntax', () => {
      const html = '<p>Text with <del>strikethrough</del></p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('Text with ~~strikethrough~~');
    });

    it('should convert strike tag to strikethrough syntax', () => {
      const html = '<p>Text with <strike>strikethrough</strike></p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('Text with ~~strikethrough~~');
    });

    it('should handle multiple strikethroughs', () => {
      const html = '<p><s>First</s> and <s>second</s></p>';
      const result = turndownService.turndown(html);
      expect(result).toContain('~~First~~');
      expect(result).toContain('~~second~~');
    });

    it('should handle strikethrough at start', () => {
      const html = '<p><s>Strikethrough</s> text</p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('~~Strikethrough~~ text');
    });

    it('should handle strikethrough at end', () => {
      const html = '<p>text <s>strikethrough</s></p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('text ~~strikethrough~~');
    });

    it('should handle strikethrough with other formatting', () => {
      const html = '<p><strong><s>Bold and crossed</s></strong></p>';
      const result = turndownService.turndown(html);
      expect(result).toContain('**~~Bold and crossed~~**');
    });
  });

  describe('Tables', () => {
    it('should convert simple table', () => {
      const html = `<table>
        <tr><th>Header 1</th><th>Header 2</th></tr>
        <tr><td>Cell 1</td><td>Cell 2</td></tr>
      </table>`;
      const result = turndownService.turndown(html);
      
      expect(result).toContain('| Header 1 | Header 2 |');
      expect(result).toContain('|--------|--------|');
      expect(result).toContain('| Cell 1 | Cell 2 |');
    });

    it('should handle multiple data rows', () => {
      const html = `<table>
        <tr><th>A</th><th>B</th></tr>
        <tr><td>1</td><td>2</td></tr>
        <tr><td>3</td><td>4</td></tr>
      </table>`;
      const result = turndownService.turndown(html);
      
      expect(result).toContain('| A | B |');
      expect(result).toContain('| 1 | 2 |');
      expect(result).toContain('| 3 | 4 |');
    });

    it('should escape pipes in cell content', () => {
      const html = `<table>
        <tr><th>Header</th></tr>
        <tr><td>Contains | pipe</td></tr>
      </table>`;
      const result = turndownService.turndown(html);
      
      expect(result).toContain('Contains \\| pipe');
    });

    it('should handle empty cells', () => {
      const html = `<table>
        <tr><th>A</th><th></th></tr>
        <tr><td></td><td>B</td></tr>
      </table>`;
      const result = turndownService.turndown(html);
      
      expect(result).toContain('| A |  |');
      expect(result).toContain('|  | B |');
    });

    it('should add separator after header row', () => {
      const html = `<table>
        <tr><th>Col1</th><th>Col2</th><th>Col3</th></tr>
        <tr><td>A</td><td>B</td><td>C</td></tr>
      </table>`;
      const result = turndownService.turndown(html);
      
      const lines = result.trim().split('\n');
      expect(lines[1]).toMatch(/\|--------\|--------\|--------\|/);
    });

    it('should handle table with formatting in cells', () => {
      const html = `<table>
        <tr><th><strong>Bold</strong></th></tr>
        <tr><td><em>Italic</em></td></tr>
      </table>`;
      const result = turndownService.turndown(html);
      
      expect(result).toContain('**Bold**');
      expect(result).toContain('*Italic*');
    });
  });

  describe('Code', () => {
    it('should convert inline code', () => {
      const html = '<p>Text with <code>code</code></p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('Text with `code`');
    });

    it('should convert code block', () => {
      const html = '<pre><code>const x = 1;</code></pre>';
      const result = turndownService.turndown(html);
      expect(result).toContain('```');
      expect(result).toContain('const x = 1;');
    });
  });

  describe('Links', () => {
    it('should convert links', () => {
      const html = '<p><a href="https://example.com">Link text</a></p>';
      const result = turndownService.turndown(html);
      expect(result).toBe('[Link text](https://example.com)');
    });

    it('should handle links with formatting', () => {
      const html = '<p><a href="https://example.com"><strong>Bold</strong> link</a></p>';
      const result = turndownService.turndown(html);
      expect(result).toContain('[**Bold** link](https://example.com)');
    });
  });

  describe('Mixed content', () => {
    it('should convert complex document', () => {
      const html = `<h1>Title</h1>
        <p>Paragraph with <strong>bold</strong> and <em>italic</em></p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        <table>
          <tr><th>Header</th></tr>
          <tr><td>Data</td></tr>
        </table>`;
      
      const result = turndownService.turndown(html);
      
      expect(result).toContain('# Title');
      expect(result).toContain('**bold**');
      expect(result).toContain('*italic*');
      expect(result).toContain('- Item 1');
      expect(result).toContain('| Header |');
    });
  });
});

describe('htmlToMarkdown', () => {
  let turndownService;

  beforeEach(() => {
    turndownService = createMarkdownSerializer();
  });

  describe('Unescaping', () => {
    it('should unescape brackets', () => {
      const html = '<p>\\[ bracket \\]</p>';
      const result = htmlToMarkdown(html, turndownService);
      expect(result).toBe('[ bracket ]');
    });

    it('should unescape asterisks', () => {
      const html = '<p>\\*asterisk\\*</p>';
      const result = htmlToMarkdown(html, turndownService);
      expect(result).toBe('*asterisk*');
    });

    it('should unescape underscores', () => {
      const html = '<p>\\_underscore\\_</p>';
      const result = htmlToMarkdown(html, turndownService);
      expect(result).toBe('_underscore_');
    });

    it('should unescape all special characters', () => {
      const html = '<p>\\[\\]\\*\\_</p>';
      const result = htmlToMarkdown(html, turndownService);
      expect(result).toBe('[]*_');
    });

    it('should handle text with multiple escaped characters', () => {
      const html = '<p>\\[task\\] with \\*stars\\* and \\_underscores\\_</p>';
      const result = htmlToMarkdown(html, turndownService);
      expect(result).toBe('[task] with *stars* and _underscores_');
    });
  });

  describe('Integration with turndown', () => {
    it('should properly convert and unescape task items', () => {
      const html = '<li data-type="taskItem"><label contenteditable="false"><input type="checkbox"><span contenteditable="false"></span></label><div><p>\\[task\\]</p></div></li>';
      const result = htmlToMarkdown(html, turndownService);
      expect(result).toContain('[ ] [task]');
    });

    it('should handle complex HTML with escapes', () => {
      const html = `<p>Text with \\*emphasis\\* and \\[brackets\\]</p>`;
      const result = htmlToMarkdown(html, turndownService);
      expect(result).not.toContain('\\*');
      expect(result).not.toContain('\\[');
      expect(result).not.toContain('\\]');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty HTML', () => {
      const result = htmlToMarkdown('', turndownService);
      expect(result).toBe('');
    });

    it('should handle HTML without escapes', () => {
      const html = '<p>Normal text</p>';
      const result = htmlToMarkdown(html, turndownService);
      expect(result).toBe('Normal text');
    });

    it('should not break non-escaped special characters', () => {
      const html = '<p>Text * with _ special [] chars</p>';
      const result = htmlToMarkdown(html, turndownService);
      expect(result).toContain('*');
      expect(result).toContain('_');
      expect(result).toContain('[');
      expect(result).toContain(']');
    });
  });
});

describe('Escape configuration', () => {
  it('should not escape text by default', () => {
    const turndownService = createMarkdownSerializer();
    const text = 'Text with * and _ and [ ]';
    const escaped = turndownService.escape(text);
    expect(escaped).toBe(text);
  });

  it('should preserve all special characters', () => {
    const turndownService = createMarkdownSerializer();
    const specialChars = '* _ [ ] ( ) # + - . ! `';
    const escaped = turndownService.escape(specialChars);
    expect(escaped).toBe(specialChars);
  });
});
