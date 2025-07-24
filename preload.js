// preload.js
const { contextBridge, shell } = require('electron');

// Espone API sicure al renderer (pagina di Colab)
contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url) => shell.openExternal(url)
});
