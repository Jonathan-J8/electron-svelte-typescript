/// <reference types="svelte" />

export {};
declare global {
  interface Window {
    ipcRenderer: Electron.IpcRenderer;
  }
}

window.ipcRenderer = {};
