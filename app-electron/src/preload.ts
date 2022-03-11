import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  reload: async () => await ipcRenderer.invoke('APP_RELOAD'),
  getAppInfos: async () => await ipcRenderer.invoke('APP_INFOS'),
});

console.log('<preload script />');
