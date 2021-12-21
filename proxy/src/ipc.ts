import { ipcMain } from 'electron';

ipcMain.on('test-ipc', (e, ...args) => {
  e.reply('test-ipc', 'worked!!');
});
