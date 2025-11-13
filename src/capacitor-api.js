/**
 * Capacitor API Bridge
 * Provides a compatible interface with the Electron API for mobile platforms
 */
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { App } from '@capacitor/app';

// Storage key for settings
const SETTINGS_KEY = 'cortex_settings';

/**
 * Recursively read directory structure
 */
async function readDirRecursive(dirPath, basePath = '') {
  try {
    const result = await Filesystem.readdir({
      path: dirPath,
      directory: Directory.Documents
    });

    const items = await Promise.all(
      result.files
        .filter(file => !file.name.startsWith('.'))
        .map(async (file) => {
          const fullPath = dirPath ? `${dirPath}/${file.name}` : file.name;
          const item = {
            name: file.name,
            path: fullPath,
            isDirectory: file.type === 'directory'
          };

          if (file.type === 'directory') {
            item.children = await readDirRecursive(fullPath, basePath);
          }

          return item;
        })
    );

    // Sort: directories first, then alphabetically
    return items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
  } catch (err) {
    console.error('Error reading directory:', err);
    return [];
  }
}

/**
 * Open folder picker (Android native using Storage Access Framework)
 */
async function openFolder() {
  try {
    // Check if we have a saved folder URI
    const savedUri = localStorage.getItem('cortex_folder_uri');
    if (savedUri) {
      return savedUri;
    }
    
    // Use our custom SAFStorage plugin
    const SAFStorage = window.Capacitor?.Plugins?.SAFStorage;
    
    if (SAFStorage) {
      const result = await SAFStorage.pickFolder();
      if (result && result.uri) {
        // Save the URI exactly as returned - don't modify it
        // The permissions are tied to the exact URI string
        localStorage.setItem('cortex_folder_uri', result.uri);
        return result.uri;
      }
    }
    
    return null;
  } catch (err) {
    console.error('Error opening folder:', err);
    
    // Fallback: try to create a default vault in Documents
    try {
      const vaultPath = 'cortex-vault';
      await Filesystem.mkdir({
        path: vaultPath,
        directory: Directory.Documents,
        recursive: true
      });
      return vaultPath;
    } catch (fallbackErr) {
      console.error('Fallback folder creation failed:', fallbackErr);
      return null;
    }
  }
}

/**
 * Read directory contents
 */
async function readDir(dirPath) {
  // Check if this is a SAF URI (content://)
  if (dirPath && dirPath.startsWith('content://')) {
    const SAFStorage = window.Capacitor?.Plugins?.SAFStorage;
    if (SAFStorage) {
      try {
        const result = await SAFStorage.readDir({ uri: dirPath });
        
        // Convert to our format and handle subdirectories recursively
        const items = [];
        for (const file of result.files) {
          const item = {
            name: file.name,
            path: file.uri,
            isDirectory: file.isDirectory
          };
          
          if (file.isDirectory) {
            // Recursively read subdirectories
            item.children = await readDir(file.uri);
          }
          
          items.push(item);
        }
        
        // Sort: directories first, then alphabetically
        return items.sort((a, b) => {
          if (a.isDirectory && !b.isDirectory) return -1;
          if (!a.isDirectory && b.isDirectory) return 1;
          return a.name.localeCompare(b.name);
        });
      } catch (err) {
        console.error('Error reading SAF directory:', err);
        return [];
      }
    }
  }
  
  // Fall back to regular filesystem API for non-SAF paths
  return await readDirRecursive(dirPath);
}

/**
 * Read file contents
 */
async function readFile(filePath) {
  // Check if this is a SAF URI (content://)
  if (filePath && filePath.startsWith('content://')) {
    const SAFStorage = window.Capacitor?.Plugins?.SAFStorage;
    if (SAFStorage) {
      try {
        const result = await SAFStorage.readFile({ uri: filePath });
        return result.content;
      } catch (err) {
        console.error('Error reading SAF file:', err);
        return null;
      }
    }
  }
  
  // Fall back to regular filesystem API
  try {
    const result = await Filesystem.readFile({
      path: filePath,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
    return result.data;
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
}

/**
 * Write file contents
 */
async function writeFile(filePath, content) {
  // Check if this is a SAF URI - need to extract folder and filename
  if (filePath && filePath.startsWith('content://')) {
    const SAFStorage = window.Capacitor?.Plugins?.SAFStorage;
    
    // Get the folder URI from localStorage
    const folderUri = localStorage.getItem('cortex_folder_uri');
    
    if (SAFStorage && folderUri) {
      try {
        // Extract filename from the path or URI
        const fileName = filePath.split('/').pop();
        
        await SAFStorage.writeFile({
          folderUri: folderUri,
          fileName: fileName,
          content: content
        });
        return true;
      } catch (err) {
        console.error('Error writing SAF file:', err);
        return false;
      }
    }
  }
  
  // Fall back to regular filesystem API
  try {
    await Filesystem.writeFile({
      path: filePath,
      data: content,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true
    });
    return true;
  } catch (err) {
    console.error('Error writing file:', err);
    return false;
  }
}

/**
 * Read settings from localStorage
 */
async function readSettings() {
  try {
    const settingsStr = localStorage.getItem(SETTINGS_KEY);
    if (settingsStr) {
      return JSON.parse(settingsStr);
    }
    return { lastWorkspacePath: null };
  } catch (err) {
    console.error('Error reading settings:', err);
    return { lastWorkspacePath: null };
  }
}

/**
 * Write settings to localStorage
 */
async function writeSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (err) {
    console.error('Error writing settings:', err);
    return false;
  }
}

/**
 * Check if running on Capacitor platform
 */
function isCapacitor() {
  return typeof Capacitor !== 'undefined';
}

// Export the API
export const capacitorAPI = {
  openFolder,
  readDir,
  readFile,
  writeFile,
  readSettings,
  writeSettings,
  isCapacitor
};
