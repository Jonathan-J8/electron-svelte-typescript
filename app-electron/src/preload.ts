import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('ipc', {
  on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on(channel, listener),
  off: (channel: string, listener: (...args: any[]) => void) => ipcRenderer.removeListener(channel, listener),
  getAppInfos: async () => await ipcRenderer.invoke('APP_INFOS'),
});

console.log('<preload script />');
