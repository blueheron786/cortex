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
        openOnClick: false, // We handle clicks ourselves for internal links
        HTMLAttributes: {
          class: 'editor-link'
        },
        // Allow internal: protocol for internal links
        validate: href => {
          if (!href) return false;
          // Allow internal links
          if (href.startsWith('internal:')) return true;
          // Allow standard URLs
          return /^https?:\/\//.test(href) || /^mailto:/.test(href);
        },
        // Preserve internal: links in HTML output
        renderHTML({ HTMLAttributes }) {
          return ['a', HTMLAttributes, 0];
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