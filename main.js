const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.maximize();
  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC Handlers
ipcMain.handle('open-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('read-dir', async (_, dirPath) => {
  try {
    async function readDirRecursive(dirPath) {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      const items = await Promise.all(
        entries
          .filter(e => !e.name.startsWith('.'))
          .map(async entry => {
            const fullPath = path.join(dirPath, entry.name);
            const item = {
              name: entry.name,
              path: fullPath,
              isDirectory: entry.isDirectory()
            };
            if (entry.isDirectory()) {
              item.children = await readDirRecursive(fullPath);
            }
            return item;
          })
      );
      return items.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });
    }
    
    return await readDirRecursive(dirPath);
  } catch (err) {
    return [];
  }
});

ipcMain.handle('read-file', async (_, filePath) => {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    return null;
  }
});

ipcMain.handle('write-file', async (_, filePath, content) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch (err) {
    return false;
  }
});

ipcMain.handle('read-settings', async () => {
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');
  try {
    const data = await fs.readFile(settingsPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return { lastWorkspacePath: null };
  }
});

ipcMain.handle('write-settings', async (_, settings) => {
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');
  try {
    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
    return true;
  } catch (err) {
    return false;
  }
});
