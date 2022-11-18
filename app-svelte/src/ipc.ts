import { onDestroy } from 'svelte';

export const isIpc = () => !!window?.ipc;

export const ipcOn = (action: string, cb: IpcOnRes) => {
  if (!isIpc()) return console.warn('no window.ipc found');

  window.ipc.on(action, cb);

  onDestroy(() => {
    window.ipc.off(action, cb);
  });
};

export const getElectronInfos = async () => {
  if (!isIpc()) throw new Error('no window.ipc found');
  return await window?.ipc?.getAppInfos();
};
