/**
 * @jest-environment jsdom
 */

const { TextEncoder, TextDecoder } = require('util');
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
const { setupInternalLinkNavigation } = require('../../file/link-navigation');
const { markdownToTiptap } = require('../parser');
const { JSDOM } = require('jsdom'); // Ensure JSDOM is explicitly imported

describe('Internal link parsing', () => {
  it('parses [[Starhowlers|Doggos]] as a TipTap link mark with correct href and display text', () => {
    const input = '[[Starhowlers|Doggos]]';
    const json = markdownToTiptap(input);
    console.log('PARSED OUTPUT:', JSON.stringify(json, null, 2));
    console.log('DEBUG: TipTap JSON structure:', JSON.stringify(json, null, 2));
    // Find the link mark in the output
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
    if (json.content) json.content.forEach(search);
    expect(found).toBe(true);
    expect(correctHref).toBe(true);
    expect(correctText).toBe(true);
  });
});

describe('Internal link navigation', () => {
  it('renders an internal link and triggers navigation on click', async () => {
    const input = '[[Starhowlers|Doggos]]';
    const json = markdownToTiptap(input);
    console.log('PARSED OUTPUT:', JSON.stringify(json, null, 2));
    console.log('DEBUG: TipTap JSON structure:', JSON.stringify(json, null, 2));

    // Create a DOM environment
    const dom = new JSDOM('<div id="editor"></div>');
    const editorElement = dom.window.document.getElementById('editor');

    // Render the TipTap content as HTML
    json.content.forEach(node => {
      if (node.type === 'paragraph') {
        const paragraph = dom.window.document.createElement('p');
        node.content.forEach(child => {
          if (child.type === 'text') {
            const textNode = dom.window.document.createTextNode(child.text);
            if (child.marks) {
              child.marks.forEach(mark => {
                if (mark.type === 'link') {
                  const link = dom.window.document.createElement('a');
                  link.href = mark.attrs.href;
                  link.className = mark.attrs.class;
                  link.appendChild(textNode);
                  paragraph.appendChild(link);
                }
              });
            } else {
              paragraph.appendChild(textNode);
            }
          }
        });
        editorElement.appendChild(paragraph);
      }
    });

    // Verify the rendered HTML
    const link = editorElement.querySelector('a');
    expect(link).not.toBeNull();
    expect(link.href).toContain('internal:Starhowlers');
    expect(link.textContent).toBe('Doggos');

    // Corrected fileTree structure to match the expected format
    const fileTree = [
      {
        name: 'Starhowlers.md',
        path: '/path/to/Starhowlers.md',
        isDirectory: false,
      },
    ];
    const navigateMock = jest.fn();

    // Mock the editor object with a view.dom property
    const mockEditor = {
      view: {
        dom: editorElement,
      },
    };

    // Setup navigation
    setupInternalLinkNavigation(mockEditor, fileTree, navigateMock);

    // Simulate a click event
    const clickEvent = new dom.window.MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(clickEvent);

    // Wait for async click handler to complete
    await new Promise(resolve => setTimeout(resolve, 10));

    // Verify navigation was triggered
    expect(navigateMock).toHaveBeenCalledWith('/path/to/Starhowlers.md');
  });

  it('renders an internal link with a non-empty href', () => {
    const input = '[[Starhowlers|Doggos]]';
    const json = markdownToTiptap(input);

    // Create a DOM environment
    const dom = new JSDOM('<div id="editor"></div>');
    const editorElement = dom.window.document.getElementById('editor');

    // Render the TipTap content as HTML
    json.content.forEach(node => {
      if (node.type === 'paragraph') {
        const paragraph = dom.window.document.createElement('p');
        node.content.forEach(child => {
          if (child.type === 'text') {
            const textNode = dom.window.document.createTextNode(child.text);
            if (child.marks) {
              child.marks.forEach(mark => {
                if (mark.type === 'link') {
                  const link = dom.window.document.createElement('a');
                  link.href = mark.attrs.href;
                  link.className = mark.attrs.class;
                  link.appendChild(textNode);
                  paragraph.appendChild(link);
                }
              });
            } else {
              paragraph.appendChild(textNode);
            }
          }
        });
        editorElement.appendChild(paragraph);
      }
    });

    // Verify the href attribute of the rendered link
    const link = editorElement.querySelector('a');
    expect(link).not.toBeNull();
    expect(link.href).not.toBe('');
  });
});
