/**
 * @jest-environment jsdom
 */

jest.mock('../../markdown/parser', () => ({
  markdownToTiptap: jest.fn(() => ({ type: 'doc' }))
}));

jest.mock('../../markdown/serializer', () => ({
  htmlToMarkdown: jest.fn()
}));

const { openFile } = require('../operations');

describe('openFile', () => {
  let editor;

  beforeEach(() => {
    document.body.innerHTML = '<div class="file-item" data-path="/notes/Test.md"></div>';
    window.api = {
      readFile: jest.fn().mockResolvedValue('# Test')
    };
    window.syncFilenameInput = jest.fn();
    window._internalLinkNavCleanup = null;
    editor = {
      commands: {
        setContent: jest.fn()
      }
    };
  });

  afterEach(() => {
    delete window.api;
    delete window.syncFilenameInput;
  });

  it('updates filename input helper after opening markdown file', async () => {
    await openFile('/notes/Test.md', editor, null, null);

    expect(window.api.readFile).toHaveBeenCalledWith('/notes/Test.md');
    expect(window.syncFilenameInput).toHaveBeenCalledWith('/notes/Test.md');
    expect(editor.commands.setContent).toHaveBeenCalled();
  });
});
