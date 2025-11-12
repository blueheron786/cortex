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
    
    // Use the native folder picker plugin
    const FolderPicker = window.Capacitor?.Plugins?.FolderPicker;
    
    if (FolderPicker) {
      const result = await FolderPicker.pickFolder();
      if (result && result.uri) {
        // Save the URI for future use
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
  return await readDirRecursive(dirPath);
}

/**
 * Read file contents
 */
async function readFile(filePath) {
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
