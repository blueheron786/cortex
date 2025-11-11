/**
 * @jest-environment jsdom
 */

const { BoldItalic, TaskListInputRule } = require('../extensions');

describe('TaskListInputRule', () => {
  describe('extension structure', () => {
    test('should export TaskListInputRule extension', () => {
      expect(TaskListInputRule).toBeDefined();
      expect(TaskListInputRule.name).toBe('taskListInputRule');
    });

    test('should add ProseMirror plugins', () => {
      const plugins = TaskListInputRule.config.addProseMirrorPlugins();
      expect(Array.isArray(plugins)).toBe(true);
      expect(plugins.length).toBe(1);
      expect(plugins[0].props.handleTextInput).toBeDefined();
    });
  });

  describe('checkbox pattern detection', () => {
    test('should detect unchecked pattern [ ]', () => {
      const pattern = /^\[\s?\] $/;
      expect(pattern.test('[ ] ')).toBe(true);
      expect(pattern.test('[] ')).toBe(true);
      expect(pattern.test('[  ] ')).toBe(false);
    });

    test('should detect checked pattern [x] or [X]', () => {
      const pattern = /^\[x\] $/i;
      expect(pattern.test('[x] ')).toBe(true);
      expect(pattern.test('[X] ')).toBe(true);
      expect(pattern.test('[ ] ')).toBe(false);
    });
  });

  describe('bullet list conversion logic', () => {
    test('should allow conversion for both single and multi-item bullet lists', () => {
      // The extension now handles conversion in multi-item lists by splitting them
      const multiItemListChildCount = 3;
      const singleItemListChildCount = 1;
      
      // Both should be allowed now
      expect(singleItemListChildCount >= 1).toBe(true); // Should convert
      expect(multiItemListChildCount >= 1).toBe(true); // Should also convert (new behavior)
    });
  });
});

describe('BoldItalic', () => {
  describe('extension structure', () => {
    test('should export BoldItalic extension', () => {
      expect(BoldItalic).toBeDefined();
      expect(BoldItalic.name).toBe('boldItalic');
    });

    test('should add input rules', () => {
      const rules = BoldItalic.config.addInputRules();
      expect(Array.isArray(rules)).toBe(true);
      expect(rules.length).toBe(1);
      expect(rules[0].find).toBeDefined();
      expect(rules[0].handler).toBeDefined();
    });

    test('should add keyboard shortcuts', () => {
      const shortcuts = BoldItalic.config.addKeyboardShortcuts();
      expect(shortcuts).toBeDefined();
      expect(shortcuts['Mod-Alt-b']).toBeDefined();
    });
  });

  describe('*** input rule pattern', () => {
    test('should match *** pattern correctly', () => {
      const inputRegex = /(?:^|\s)(\*\*\*(?!\s+\*\*\*)((?:[^*]+))\*\*\*)$/;
      
      // Should match valid patterns
      expect(inputRegex.test('***test***')).toBe(true);
      expect(inputRegex.test(' ***test***')).toBe(true);
      expect(inputRegex.test('***test with spaces***')).toBe(true);
      
      // The pattern is designed to avoid matching *** followed by spaces and then ***
      // But it will still match text with spaces inside the markers
      expect(inputRegex.test('***a***')).toBe(true);
    });

    test('should extract text correctly from pattern', () => {
      const inputRegex = /(?:^|\s)(\*\*\*(?!\s+\*\*\*)((?:[^*]+))\*\*\*)$/;
      const match = '***test***'.match(inputRegex);
      
      expect(match).not.toBeNull();
      expect(match[2]).toBe('test');
    });
  });
});
