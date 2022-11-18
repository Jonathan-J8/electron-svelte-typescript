/// <reference types="svelte" />
/// <reference types="vite/client" />
import type { IpcRenderer, IpcRendererEvent } from 'electron';

export {};

declare global {
  type IpcOnRes = (event: IpcRendererEvent, ...args: any[]) => void;
  type IpcOffRes = (...args: any[]) => void;
}

declare global {
  interface Window {
    ipc: {
      getAppInfos: () => Promise<any>;
      on: (channel: string, listener: IpcOnRes) => IpcRenderer;
      off: (channel: string, listener: IpcOffRes) => IpcRenderer;
    };
  }
}
