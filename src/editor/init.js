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
const { BoldItalic, TaskListInputRule, ShowCurrentLineMarkup } = require('./extensions');
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
      ShowCurrentLineMarkup,
      MarkdownPaste,
      Link.configure({
        openOnClick: false, // We handle clicks ourselves for internal links
        HTMLAttributes: {
          class: 'editor-link'
        },
        addAttributes() {
          return {
            href: {
              default: null,
              parseHTML: element => element.getAttribute('href'),
              renderHTML: attributes => ({ href: attributes.href })
            },
            // Support a data-href attribute so we can preserve internal targets
            dataHref: {
              default: null,
              parseHTML: element => element.getAttribute('data-href'),
              renderHTML: attributes => ({ 'data-href': attributes.dataHref })
            },
            class: {
              default: 'editor-link',
              parseHTML: element => element.getAttribute('class'),
              renderHTML: attributes => ({ class: attributes.class })
            },
            // Store original page name for internal links
            'data-page-name': {
              default: null,
              parseHTML: element => element.getAttribute('data-page-name'),
              renderHTML: attributes => {
                if (attributes['data-page-name']) {
                  return { 'data-page-name': attributes['data-page-name'] };
                }
                return {};
              }
            }
          };
        },
        validate: href => {
          if (!href) return false;
          // Allow internal links
          if (href.startsWith('internal:')) return true;
          // Allow standard URLs
          return /^https?:\/\//.test(href) || /^mailto:/.test(href);
        },
        renderHTML({ HTMLAttributes }) {
          // Always include href, data-href, class, and data-page-name (if present)
          const out = { ...HTMLAttributes };
          if (HTMLAttributes.href !== undefined) out.href = HTMLAttributes.href;
          if (HTMLAttributes['data-href'] !== undefined) out['data-href'] = HTMLAttributes['data-href'];
          if (HTMLAttributes.class !== undefined) out.class = HTMLAttributes.class;
          if (HTMLAttributes['data-page-name'] !== undefined) out['data-page-name'] = HTMLAttributes['data-page-name'];
          return ['a', out, 0];
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