import { app, BrowserWindow, globalShortcut, Menu } from 'electron';
import { join } from 'path';
import isDev from 'electron-is-dev';
import menu from './menu';

export const getMainWindow = (): BrowserWindow | null =>
  process.env.ELECTRON_MAIN_WINDOW ? BrowserWindow.fromId(parseInt(process.env.ELECTRON_MAIN_WINDOW)) : null;

export const createMainWindow = (): BrowserWindow => {
  if (getMainWindow()) getMainWindow();
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
  let mainWindow: BrowserWindow | null = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    maximizable: true,
    title: app.getVersion(),
    closable: true,
    minimizable: isDev ? true : false,
    fullscreen: isDev ? false : true,
    autoHideMenuBar: true,
    icon: join(app.getAppPath(), 'public', 'icon.ico'),
    backgroundColor: '#222222',
    // externalDependencies: 'none',

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      allowRunningInsecureContent: false,
      preload: join(app.getAppPath(), 'build', 'src', 'preload.js'),
    },
  });

  process.env.ELECTRON_MAIN_WINDOW = `${mainWindow.id}`;

  let ounce = false;
  mainWindow.on('ready-to-show', () => {
    if (isDev && mainWindow && !ounce) {
      ounce = true;
      mainWindow.maximize();
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    // needed for SharedArrayBuffer
    const requestHeaders = {
      ...details.requestHeaders,
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'same-site',
    };

    callback({ cancel: false, requestHeaders });
  });

  globalShortcut.register('f5', () => {
    if (mainWindow) mainWindow.webContents.reloadIgnoringCache();
  });

  return mainWindow;
};
