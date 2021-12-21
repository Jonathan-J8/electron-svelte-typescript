import { app, BrowserWindow, globalShortcut } from 'electron';
import { join } from 'path';
import isDev from 'electron-is-dev';

export const getMainWindow = (): BrowserWindow | null =>
  process.env.ELECTRON_MAIN_WINDOW
    ? BrowserWindow.fromId(parseInt(process.env.ELECTRON_MAIN_WINDOW))
    : null;

export const createMainWindow = async (
  loadURL: (window: BrowserWindow) => Promise<void>,
): Promise<BrowserWindow> => {
  if (getMainWindow()) getMainWindow();

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
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      allowRunningInsecureContent: false,
      preload: join(app.getAppPath(), 'build', 'preload.js'),
    },
  });
  process.env.ELECTRON_MAIN_WINDOW = `${mainWindow.id}`;

  await loadURL(mainWindow);

  if (isDev) {
    mainWindow.maximize();
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  globalShortcut.register('f5', () => {
    if (mainWindow) mainWindow.webContents.reloadIgnoringCache();
  });

  return mainWindow;
};
