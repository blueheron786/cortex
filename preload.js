const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  openFolder: () => ipcRenderer.invoke('open-folder'),
  readDir: (dirPath) => ipcRenderer.invoke('read-dir', dirPath),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
  readSettings: () => ipcRenderer.invoke('read-settings'),
  writeSettings: (settings) => ipcRenderer.invoke('write-settings', settings)
});
