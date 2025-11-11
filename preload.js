// This file only runs in Electron's preload context
// If it's loaded, we're definitely in Electron
try {
  const { contextBridge, ipcRenderer } = require('electron');

  // Electron environment - expose API to renderer
  contextBridge.exposeInMainWorld('api', {
    openFolder: () => ipcRenderer.invoke('open-folder'),
    readDir: (dirPath) => ipcRenderer.invoke('read-dir', dirPath),
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
    readSettings: () => ipcRenderer.invoke('read-settings'),
    writeSettings: (settings) => ipcRenderer.invoke('write-settings', settings),
    isElectron: true,
    isCapacitor: false
  });
  
  console.log('Electron API exposed via preload');
} catch (error) {
  console.error('Failed to load Electron preload:', error);
}
