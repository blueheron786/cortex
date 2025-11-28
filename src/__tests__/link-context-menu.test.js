/**
 * @jest-environment jsdom
 */

const { attachLinkContextMenu } = require('../ui/link-context-menu');

describe('link context menu', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('shows copy URL and copies to clipboard for external links', () => {
    const container = document.createElement('div');
    container.id = 'editor';
    document.body.appendChild(container);

    const link = document.createElement('a');
    link.href = 'https://example.com/foo';
    link.textContent = 'example';
    container.appendChild(link);

    // Mock clipboard
    const writeText = jest.fn();
    global.navigator.clipboard = { writeText };

    const showNotification = jest.fn();

    attachLinkContextMenu(container, { showNotification });

    // Dispatch contextmenu event on the link
    const ev = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      view: window,
      pageX: 12,
      pageY: 34
    });
    link.dispatchEvent(ev);

    const menu = document.querySelector('.custom-context-menu');
    expect(menu).not.toBeNull();

    const copyItem = Array.from(menu.querySelectorAll('div')).find(d => d.textContent === 'Copy URL');
    expect(copyItem).toBeDefined();

    // Click the copy item
    copyItem.click();

    expect(writeText).toHaveBeenCalledWith('https://example.com/foo');
    expect(showNotification).toHaveBeenCalledWith('URL copied!', 'success');
    // Menu should be removed after click
    expect(document.querySelector('.custom-context-menu')).toBeNull();
  });
});
