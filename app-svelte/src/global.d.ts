/// <reference types="svelte" />

export {};
declare global {
  interface Window {
    electron: {
      getAppInfos: () => Promise<any>;
      reload: () => Promise<void>;
    };
  }
}
