/**
 * Path utility functions for renderer
 * (Avoiding Node's `path` module for browser compatibility with esbuild)
 */

function basename(p) {
  if (!p) return '';
  return p.split(/[\\\/]/).pop();
}

function dirname(p) {
  if (!p) return '';
  const parts = p.split(/[\\\/]/);
  if (parts.length <= 1) return p;
  parts.pop();
  const sep = p.includes('\\') ? '\\' : '/';
  return parts.join(sep);
}

function joinPaths(a, b) {
  if (!a) return b;
  const sep = a.includes('\\') ? '\\' : '/';
  if (a.endsWith('\\') || a.endsWith('/')) return a + b;
  return a + sep + b;
}

module.exports = { basename, dirname, joinPaths };
