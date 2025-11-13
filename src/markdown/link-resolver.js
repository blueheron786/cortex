// Build a map of page names to file paths for quick lookups
function buildLinkIndex(fileTree) {
  const index = new Map();
  
  function traverse(items) {
    items.forEach(item => {
      if (item.isDirectory && item.children) {
        traverse(item.children);
      } else if (item.name.endsWith('.md')) {
        // Store both with and without .md extension
        const nameWithoutExt = item.name.replace(/\.md$/, '');
        index.set(nameWithoutExt, item.path);
        index.set(item.name, item.path);
      }
    });
  }
  
  traverse(fileTree);
  return index;
}

// Resolve an internal link to a file path
function resolveInternalLink(pageName, fileTree, linkIndex = null) {
  // Use provided index or build one
  const index = linkIndex || buildLinkIndex(fileTree);
  
  // Remove .md extension if present for consistency
  const normalizedName = pageName.replace(/\.md$/, '');
  
  // Try to find the page
  return index.get(normalizedName) || null;
}

// Extract page name from internal: href
function getPageNameFromHref(href) {
  if (!href || !href.startsWith('internal:')) {
    return null;
  }
  
  // Remove 'internal:' prefix
  const pageName = href.slice(9);
  
  // Handle anchors (e.g., "Page1#Heading")
  const anchorIndex = pageName.indexOf('#');
  if (anchorIndex !== -1) {
    return pageName.slice(0, anchorIndex);
  }
  
  return pageName;
}

module.exports = {
  buildLinkIndex,
  resolveInternalLink,
  getPageNameFromHref
};