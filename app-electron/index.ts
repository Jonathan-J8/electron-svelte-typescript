import { join } from 'path';
import { app } from 'electron';
import serve from 'electron-serve';
import { createMainWindow } from './src/window';
import reload from 'electron-reload';
import './src/ipc';

const directory = join(__dirname, 'public');
const loadURL = serve({ directory, isCorsEnabled: true });

// we just want hot reload if files from public directory changes
reload(directory, {});

const init = async () => {
  try {
    const window = createMainWindow();
    await loadURL(window);
  } catch (e) {
    console.log(e);
  }
};

process.on('uncaughtException', console.log);

app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer');
app.on('ready', init);
app.on('activate', init);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
