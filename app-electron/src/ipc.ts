import { ipcMain, app } from 'electron';
import { getMainWindow } from './window';
import isDev from 'electron-is-dev';

ipcMain.handle('APP_INFOS', () => ({
  isDev,
  appPath: app.getAppPath(),
  appData: app.getPath('appData'),
  userData: app.getPath('userData'),
  exe: app.getPath('exe'),
  // cache: app.getPath('cache'),
  temp: app.getPath('temp'),
  logs: app.getPath('logs'),
  crashDumps: app.getPath('crashDumps'),
}));

ipcMain.handle('APP_RELOAD', () => {
  const win = getMainWindow();
  if (win) win.webContents.reloadIgnoringCache();
});
