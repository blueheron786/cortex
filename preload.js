// Detect if running in Electron or Capacitor
const isElectron = typeof require !== 'undefined' && typeof window !== 'undefined' && typeof window.process === 'object';

if (isElectron) {
  // Electron environment
  const { contextBridge, ipcRenderer } = require('electron');

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
} else {
  // Capacitor/Web environment - API will be injected from capacitor-api.js
  console.log('Running in Capacitor/Web environment');
}
