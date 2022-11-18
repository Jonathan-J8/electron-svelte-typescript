import { ipcMain, app } from 'electron';
import isDev from 'electron-is-dev';

ipcMain.handle('APP_INFOS', () => ({
  isDev,
  appPath: app.getAppPath(),
  appData: app.getPath('appData'),
  userData: app.getPath('userData'),
  exe: app.getPath('exe'),
  temp: app.getPath('temp'),
  logs: app.getPath('logs'),
  crashDumps: app.getPath('crashDumps'),
}));
