/**
 * @jest-environment jsdom
 */

const { parseInlineFormatting, markdownToTiptap } = require('../parser');
const { htmlToMarkdown, createMarkdownSerializer } = require('../serializer');

// Fix import path for link-resolver
const linkResolver = require('../../markdown/link-resolver');

describe('Internal Links', () => {
  describe('Parser - Markdown to TipTap', () => {
    test('should parse simple internal link', () => {
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

    test('should parse internal link with custom display text', () => {
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

    test('should parse internal link with heading anchor', () => {
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
            href: 'internal:Page1'
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

    test('should not parse incomplete internal link', () => {
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

    test('should handle internal links with other formatting', () => {
      const markdown = '**[[Page1]]** is important';
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
  });

  describe('Serializer - TipTap to Markdown', () => {
    test('should serialize internal link back to [[]] format', () => {
      const turndownService = createMarkdownSerializer();
      const html = '<a href="internal:Page1" class="internal-link">Page1</a>';
      const markdown = htmlToMarkdown(html, turndownService);
      
      expect(markdown.trim()).toBe('[[Page1]]');
    });

    test('should serialize internal link with custom text', () => {
      const turndownService = createMarkdownSerializer();
      const html = '<a href="internal:Page1" class="internal-link">Custom Text</a>';
      const markdown = htmlToMarkdown(html, turndownService);
      
      expect(markdown.trim()).toBe('[[Page1|Custom Text]]');
    });

    test('should serialize internal link with anchor', () => {
      const turndownService = createMarkdownSerializer();
      const html = '<a href="internal:Page1#Heading" class="internal-link">Page1</a>';
      const markdown = htmlToMarkdown(html, turndownService);
      
      expect(markdown.trim()).toBe('[[Page1#Heading]]');
    });

    test('should serialize regular links normally', () => {
      const turndownService = createMarkdownSerializer();
      const html = '<a href="https://example.com">Example</a>';
      const markdown = htmlToMarkdown(html, turndownService);
      
      expect(markdown.trim()).toBe('[Example](https://example.com)');
    });
  });

  describe('Link Resolution', () => {
    const mockFileTree = [
      { name: 'Page1.md', path: '/root/Page1.md', isDirectory: false },
      { name: 'nested', path: '/root/nested', isDirectory: true, children: [
        { name: 'Page2.md', path: '/root/nested/Page2.md', isDirectory: false },
        { name: 'deep', path: '/root/nested/deep', isDirectory: true, children: [
          { name: 'Page3.md', path: '/root/nested/deep/Page3.md', isDirectory: false }
        ]}
      ]},
      { name: 'Duplicate.md', path: '/root/Duplicate.md', isDirectory: false },
      { name: 'other', path: '/root/other', isDirectory: true, children: [
        { name: 'Duplicate.md', path: '/root/other/Duplicate.md', isDirectory: false }
      ]}
    ];

    test('should resolve simple page name to path', () => {
      const result = linkResolver.resolveInternalLink('Page1', mockFileTree);
      
      expect(result).toBe('/root/Page1.md');
    });

    test('should resolve nested page name to path', () => {
      const result = linkResolver.resolveInternalLink('Page3', mockFileTree);
      
      expect(result).toBe('/root/nested/deep/Page3.md');
    });

    test('should handle page name without extension', () => {
      const result = linkResolver.resolveInternalLink('Page2', mockFileTree);
      
      expect(result).toBe('/root/nested/Page2.md');
    });

    test('should handle page name with extension', () => {
      const result = linkResolver.resolveInternalLink('Page2.md', mockFileTree);
      
      expect(result).toBe('/root/nested/Page2.md');
    });

      test('should return first match for duplicate names', () => {
        const result = linkResolver.resolveInternalLink('Duplicate', mockFileTree);
        
        // Should return first occurrence (matches traversal order)
        expect(result).toBe('/root/other/Duplicate.md');
    });

    test('should return null for non-existent page', () => {
      const result = linkResolver.resolveInternalLink('NonExistent', mockFileTree);
      
      expect(result).toBeNull();
    });

    test('should build reverse index for faster lookups', () => {
      const index = linkResolver.buildLinkIndex(mockFileTree);
      
      expect(index.get('Page1')).toBe('/root/Page1.md');
      expect(index.get('Page2')).toBe('/root/nested/Page2.md');
      expect(index.get('Page3')).toBe('/root/nested/deep/Page3.md');
    });
  });
});