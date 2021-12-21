import { join } from 'path';
import { app } from 'electron';
import serve from 'electron-serve';
import { createMainWindow } from './window';
import reload from 'electron-reload';
import './ipc';

const directory = join(__dirname, 'public');

reload(directory, {
  // electron: join(__dirname, '../..', 'node_modules', '.bin', 'electron'),
});

const loadURL = serve({ directory });

const init = async () => {
  createMainWindow(loadURL);
};

process.on('uncaughtException', console.log);

// if (require('electron-squirrel-startup')) app.quit();
app.on('ready', init);
app.on('activate', init);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
