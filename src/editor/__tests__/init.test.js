/**
 * @jest-environment jsdom
 */

const { initEditor } = require('../init');

describe('initEditor', () => {
  let container;

  beforeEach(() => {
    // Create a container for the editor
    container = document.createElement('div');
    container.id = 'editor';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Initialization', () => {
    it('should create an editor instance', () => {
      const editor = initEditor();
      
      expect(editor).toBeDefined();
      expect(editor.isEditable).toBe(true);
      
      editor.destroy();
    });

    it('should accept onUpdate callback', (done) => {
      const onUpdate = jest.fn(() => {
        expect(onUpdate).toHaveBeenCalled();
        editor.destroy();
        done();
      });
      
      const editor = initEditor(onUpdate);
      
      // Wait for editor to be ready then trigger an update
      setTimeout(() => {
        editor.commands.insertContent('Test');
      }, 50);
    });

    it('should call onUpdate with editor context', (done) => {
      const onUpdate = ({ editor: editorContext }) => {
        expect(editorContext).toBe(editor);
        editor.destroy();
        done();
      };
      
      const editor = initEditor(onUpdate);
      
      setTimeout(() => {
        editor.commands.insertContent('Test');
      }, 50);
    });
  });

  describe('List continuation', () => {
    it('should support bullet lists', () => {
      const editor = initEditor();
      
      // Create a list structure directly
      editor.commands.setContent({
        type: 'doc',
        content: [{
          type: 'bulletList',
          content: [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{ type: 'text', text: 'Item 1' }]
            }]
          }]
        }]
      });
      
      const json = editor.getJSON();
      expect(json.content[0].type).toBe('bulletList');
      expect(json.content[0].content[0].type).toBe('listItem');
      
      editor.destroy();
    });

    it('should split list item when command is called', (done) => {
      const editor = initEditor(() => {});
      
      // Create a list with one item
      editor.commands.setContent({
        type: 'doc',
        content: [{
          type: 'bulletList',
          content: [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{ type: 'text', text: 'Item 1' }]
            }]
          }]
        }]
      });
      
      // Wait for content to be set, then split
      setTimeout(() => {
        editor.chain().focus('end').splitListItem('listItem').run();
        
        // Check that we now have 2 list items
        const json = editor.getJSON();
        expect(json.content[0].type).toBe('bulletList');
        expect(json.content[0].content).toHaveLength(2);
        expect(json.content[0].content[0].content[0].content[0].text).toBe('Item 1');
        
        editor.destroy();
        done();
      }, 50);
    });

    it('should support ordered lists', () => {
      const editor = initEditor();
      
      editor.commands.setContent({
        type: 'doc',
        content: [{
          type: 'orderedList',
          content: [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{ type: 'text', text: 'First' }]
            }]
          }]
        }]
      });
      
      const json = editor.getJSON();
      expect(json.content[0].type).toBe('orderedList');
      expect(json.content[0].content[0].type).toBe('listItem');
      
      editor.destroy();
    });
  });

  describe('Extensions', () => {
    it('should support heading levels 1-6', () => {
      const editor = initEditor();
      
      for (let level = 1; level <= 6; level++) {
        editor.commands.setContent(`<h${level}>Heading</h${level}>`);
        const json = editor.getJSON();
        expect(json.content[0].type).toBe('heading');
        expect(json.content[0].attrs.level).toBe(level);
      }
      
      editor.destroy();
    });

    it('should support bold and italic', () => {
      const editor = initEditor();
      
      editor.commands.setContent('<p><strong>Bold</strong> and <em>italic</em></p>');
      
      const json = editor.getJSON();
      expect(json.content[0].content[0].marks[0].type).toBe('bold');
      expect(json.content[0].content[2].marks[0].type).toBe('italic');
      
      editor.destroy();
    });

    it('should support task lists', () => {
      const editor = initEditor();
      
      editor.commands.setContent({
        type: 'doc',
        content: [{
          type: 'taskList',
          content: [{
            type: 'taskItem',
            attrs: { checked: false },
            content: [{
              type: 'paragraph',
              content: [{ type: 'text', text: 'Todo' }]
            }]
          }]
        }]
      });
      
      const json = editor.getJSON();
      expect(json.content[0].type).toBe('taskList');
      expect(json.content[0].content[0].type).toBe('taskItem');
      expect(json.content[0].content[0].attrs.checked).toBe(false);
      
      editor.destroy();
    });

    it('should support tables', () => {
      const editor = initEditor();
      
      editor.commands.setContent({
        type: 'doc',
        content: [{
          type: 'table',
          content: [{
            type: 'tableRow',
            content: [{
              type: 'tableHeader',
              content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Header' }] }]
            }]
          }]
        }]
      });
      
      const json = editor.getJSON();
      expect(json.content[0].type).toBe('table');
      expect(json.content[0].content[0].type).toBe('tableRow');
      
      editor.destroy();
    });

    it('should support highlights', () => {
      const editor = initEditor();
      
      editor.commands.setContent('<p><mark>Highlighted text</mark></p>');
      
      const json = editor.getJSON();
      expect(json.content[0].content[0].marks[0].type).toBe('highlight');
      
      editor.destroy();
    });
  });
});
