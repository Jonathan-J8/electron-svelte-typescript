import { ipcRenderer } from 'electron';

if (!window?.ipcRenderer) window.ipcRenderer = ipcRenderer;

console.log('<preload script />');
