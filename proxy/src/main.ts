import { join } from 'path';
import { app } from 'electron';
import serve from 'electron-serve';
import { createMainWindow } from './window';
import reload from 'electron-reload';
import './ipc';

const directory = join(__dirname, 'public');

// we just want hot reload if files from public directory changes
reload(directory, {});

const loadURL = serve({ directory });

const init = async () => {
  createMainWindow(loadURL);
};

process.on('uncaughtException', console.log);

app.on('ready', init);
app.on('activate', init);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
