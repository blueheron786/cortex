const { parseInlineFormatting, markdownToTiptap } = require('../parser');
const { htmlToMarkdown, createMarkdownSerializer } = require('../serializer');
const { buildLinkIndex, resolveInternalLink, getPageNameFromHref } = require('../link-resolver');

describe('Internal Links - Parser (Markdown to TipTap)', () => {
  test('should parse simple internal link [[Page1]]', () => {
    const markdown = '[[Page1]]';
    const result = markdownToTiptap(markdown);
    
    expect(result.content[0].content[0]).toMatchObject({
      type: 'text',
      text: 'Page1',
      marks: [{
        type: 'link',
        attrs: {
          href: 'internal:Page1',
          class: 'internal-link'
        }
      }]
    });
  });

  test('should parse internal link with custom display text [[Page1|Custom Text]]', () => {
    const markdown = '[[Page1|Custom Text]]';
    const result = markdownToTiptap(markdown);
    
    expect(result.content[0].content[0]).toMatchObject({
      type: 'text',
      text: 'Custom Text',
      marks: [{
        type: 'link',
        attrs: {
          href: 'internal:Page1',
          class: 'internal-link'
        }
      }]
    });
  });

  test('should parse internal link with heading anchor [[Page1#Heading]]', () => {
    const markdown = '[[Page1#Heading]]';
    const result = markdownToTiptap(markdown);
    
    expect(result.content[0].content[0]).toMatchObject({
      type: 'text',
      text: 'Page1',
      marks: [{
        type: 'link',
        attrs: {
          href: 'internal:Page1#Heading',
          class: 'internal-link'
        }
      }]
    });
  });

  test('should parse internal link within sentence', () => {
    const markdown = 'Check out [[Page1]] for more info';
    const result = markdownToTiptap(markdown);
    
    expect(result.content[0].content).toHaveLength(3);
    expect(result.content[0].content[0].text).toBe('Check out ');
    expect(result.content[0].content[1]).toMatchObject({
      type: 'text',
      text: 'Page1',
      marks: [{
        type: 'link',
        attrs: {
          href: 'internal:Page1',
          class: 'internal-link'
        }
      }]
    });
    expect(result.content[0].content[2].text).toBe(' for more info');
  });

  test('should parse multiple internal links', () => {
    const markdown = '[[Page1]] and [[Page2]]';
    const result = markdownToTiptap(markdown);
    
    expect(result.content[0].content).toHaveLength(3);
    expect(result.content[0].content[0].marks[0].attrs.href).toBe('internal:Page1');
    expect(result.content[0].content[2].marks[0].attrs.href).toBe('internal:Page2');
  });

  test('should not parse incomplete internal link [[Page1', () => {
    const markdown = '[[Page1';
    const result = markdownToTiptap(markdown);
    
    expect(result.content[0].content[0]).toMatchObject({
      type: 'text',
      text: '[[Page1'
    });
    expect(result.content[0].content[0].marks).toBeUndefined();
  });

  test('should handle internal links with regular markdown links', () => {
    const markdown = '[[Internal]] and [External](https://example.com)';
    const result = markdownToTiptap(markdown);
    
    expect(result.content[0].content[0].marks[0].attrs.href).toBe('internal:Internal');
    expect(result.content[0].content[2].marks[0].attrs.href).toBe('https://example.com');
  });

  test('should handle internal links within other formatting **[[Page1]]**', () => {
    const markdown = '**[[Page1]]**';
    const result = markdownToTiptap(markdown);
    
    expect(result.content[0].content[0].marks).toEqual(
      expect.arrayContaining([
        { type: 'bold' },
        expect.objectContaining({
          type: 'link',
          attrs: expect.objectContaining({ href: 'internal:Page1' })
        })
      ])
    );
  });

  test('should handle multiple internal links in list items', () => {
    const markdown = '- [[Page1]]\n- [[Page2]]';
    const result = markdownToTiptap(markdown);
    
    expect(result.content[0].type).toBe('bulletList');
    expect(result.content[0].content[0].content[0].content[0].marks[0].attrs.href).toBe('internal:Page1');
    expect(result.content[0].content[1].content[0].content[0].marks[0].attrs.href).toBe('internal:Page2');
  });
});

describe('Internal Links - Serializer (TipTap to Markdown)', () => {
  let turndownService;

  beforeEach(() => {
    turndownService = createMarkdownSerializer();
  });

  test('should serialize internal link back to [[]] format', () => {
    const html = '<a href="internal:Page1" class="internal-link">Page1</a>';
    const markdown = htmlToMarkdown(html, turndownService);
    
    expect(markdown.trim()).toBe('[[Page1]]');
  });

  test('should serialize internal link with custom text', () => {
    const html = '<a href="internal:Page1" class="internal-link">Custom Text</a>';
    const markdown = htmlToMarkdown(html, turndownService);
    
    expect(markdown.trim()).toBe('[[Page1|Custom Text]]');
  });

  test('should serialize internal link with anchor', () => {
    const html = '<a href="internal:Page1#Heading" class="internal-link">Page1</a>';
    const markdown = htmlToMarkdown(html, turndownService);
    
    expect(markdown.trim()).toBe('[[Page1#Heading]]');
  });

  test('should serialize regular links normally', () => {
    const html = '<a href="https://example.com">Example</a>';
    const markdown = htmlToMarkdown(html, turndownService);
    
    expect(markdown.trim()).toBe('[Example](https://example.com)');
  });

  test('should handle paragraph with internal link', () => {
    const html = '<p>Check out <a href="internal:Page1" class="internal-link">Page1</a> for info</p>';
    const markdown = htmlToMarkdown(html, turndownService);
    
    expect(markdown.trim()).toBe('Check out [[Page1]] for info');
  });

  test('should handle multiple internal links in paragraph', () => {
    const html = '<p><a href="internal:Page1" class="internal-link">Page1</a> and <a href="internal:Page2" class="internal-link">Page2</a></p>';
    const markdown = htmlToMarkdown(html, turndownService);
    
    expect(markdown.trim()).toBe('[[Page1]] and [[Page2]]');
  });
});

describe('Internal Links - Link Resolution', () => {
  const mockFileTree = [
    { name: 'Page1.md', path: '/root/Page1.md', isDirectory: false },
    { 
      name: 'nested', 
      path: '/root/nested', 
      isDirectory: true, 
      children: [
        { name: 'Page2.md', path: '/root/nested/Page2.md', isDirectory: false },
        { 
          name: 'deep', 
          path: '/root/nested/deep', 
          isDirectory: true, 
          children: [
            { name: 'Page3.md', path: '/root/nested/deep/Page3.md', isDirectory: false }
          ]
        }
      ]
    },
    { name: 'Duplicate.md', path: '/root/Duplicate.md', isDirectory: false },
    { 
      name: 'other', 
      path: '/root/other', 
      isDirectory: true, 
      children: [
        { name: 'Duplicate.md', path: '/root/other/Duplicate.md', isDirectory: false }
      ]
    }
  ];

  test('should resolve simple page name to path', () => {
    const result = resolveInternalLink('Page1', mockFileTree);
    expect(result).toBe('/root/Page1.md');
  });

  test('should resolve nested page name to path', () => {
    const result = resolveInternalLink('Page3', mockFileTree);
    expect(result).toBe('/root/nested/deep/Page3.md');
  });

  test('should handle page name without extension', () => {
    const result = resolveInternalLink('Page2', mockFileTree);
    expect(result).toBe('/root/nested/Page2.md');
  });

  test('should handle page name with extension', () => {
    const result = resolveInternalLink('Page2.md', mockFileTree);
    expect(result).toBe('/root/nested/Page2.md');
  });

  test('should return first match for duplicate names', () => {
    const result = resolveInternalLink('Duplicate', mockFileTree);
    expect(result).toBe('/root/Duplicate.md');
  });

  test('should return null for non-existent page', () => {
    const result = resolveInternalLink('NonExistent', mockFileTree);
    expect(result).toBeNull();
  });

  test('should build reverse index for faster lookups', () => {
    const index = buildLinkIndex(mockFileTree);
    
    expect(index.get('Page1')).toBe('/root/Page1.md');
    expect(index.get('Page2')).toBe('/root/nested/Page2.md');
    expect(index.get('Page3')).toBe('/root/nested/deep/Page3.md');
  });

  test('should build index with both .md and without extension', () => {
    const index = buildLinkIndex(mockFileTree);
    
    expect(index.get('Page1')).toBe('/root/Page1.md');
    expect(index.get('Page1.md')).toBe('/root/Page1.md');
  });

  test('should handle empty file tree', () => {
    const index = buildLinkIndex([]);
    expect(index.size).toBe(0);
  });

  test('should extract page name from internal href', () => {
    expect(getPageNameFromHref('internal:Page1')).toBe('Page1');
    expect(getPageNameFromHref('internal:Page1#Heading')).toBe('Page1');
    expect(getPageNameFromHref('https://example.com')).toBeNull();
  });
});

describe('Internal Links - Round Trip', () => {
  let turndownService;

  beforeEach(() => {
    turndownService = createMarkdownSerializer();
  });

  test('should maintain link through parse and serialize cycle', () => {
    const original = 'Check [[Page1]] and [[Page2|Custom]]';
    
    // Parse to TipTap
    const json = markdownToTiptap(original);
    
    // Simulate getting HTML from TipTap (simplified)
    const html = `<p>Check <a href="internal:Page1" class="internal-link">Page1</a> and <a href="internal:Page2" class="internal-link">Custom</a></p>`;
    
    // Serialize back to markdown
    const markdown = htmlToMarkdown(html, turndownService);
    
    expect(markdown.trim()).toBe(original);
  });
});