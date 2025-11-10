const { Editor } = require('@tiptap/core');
const { TextSelection } = require('@tiptap/pm/state');
const StarterKit = require('@tiptap/starter-kit').default;
const Link = require('@tiptap/extension-link').default;
const Table = require('@tiptap/extension-table').default;
const TableRow = require('@tiptap/extension-table-row').default;
const TableCell = require('@tiptap/extension-table-cell').default;
const TableHeader = require('@tiptap/extension-table-header').default;
const TaskList = require('@tiptap/extension-task-list').default;
const TaskItem = require('@tiptap/extension-task-item').default;
const Highlight = require('@tiptap/extension-highlight').default;
const { BoldItalic, TaskListInputRule } = require('./extensions');
const { MarkdownPaste } = require('./markdown-paste');
const BulletList = require('@tiptap/extension-bullet-list').default;

function initEditor(onUpdate) {
  const editor = new Editor({
    element: document.querySelector('#editor'),
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6]
        }
      }),
      BoldItalic,
      TaskListInputRule,
      MarkdownPaste,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'editor-link'
        }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'tiptap-table'
        }
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'task-item'
        }
      }),
      Highlight.configure({
        multicolor: false
      })
    ],
    content: '<p>Open a folder and select a markdown file to start editing.</p>',
    onUpdate
  });

  return editor;
}

module.exports = { initEditor };
