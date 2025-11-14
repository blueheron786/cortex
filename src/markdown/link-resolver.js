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
  
  console.log('resolveInternalLink called with:', pageName);
  
  // Try to find the page by simple name
  const direct = index.get(normalizedName);
  if (direct) return direct;

  // If the pageName contains path separators, try to resolve by matching the
  // relative path inside the provided fileTree. This handles links like
  // "_fit/path/to/file" which include directories.
  if (fileTree && (pageName.includes('/') || pageName.includes('\\'))) {
    const target = normalizedName.replace(/\\\\/g, '/');

    let found = null;
    function search(items) {
      for (const item of items) {
        if (item.isDirectory && item.children) {
          search(item.children);
          if (found) return;
        } else if (item.name && item.path) {
          // Normalize path separators to forward slashes for matching
          const rel = item.path.replace(/\\\\/g, '/');
          // Check if the end of the path matches the requested target (with or without .md)
          if (rel.endsWith(`/${target}.md`) || rel.endsWith(`/${target}`) || rel.toLowerCase().endsWith(`/${target}.md`)) {
            found = item.path;
            return;
          }
        }
      }
    }

    search(fileTree);
    if (found) return found;
  }

  // Not found
  return null;
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