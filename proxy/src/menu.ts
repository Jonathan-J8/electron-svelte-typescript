import { app, BrowserWindow, Menu } from 'electron';

const defaultMenu: any = Menu.getApplicationMenu() || {};

const template: Electron.MenuItemConstructorOptions[] = [
  {
    ...defaultMenu?.items,

    // label: 'Force Reload',
    // accelerator: 'F5',
    // click(_: any, focusedWindow: BrowserWindow) {
    //   if (focusedWindow) focusedWindow.force  ;
    // },

    // // role: 'window',
    // submenu: [
    //   {
    //     label: `Wrapper version ${app.getVersion()}`,
    //   },
    //   { type: 'separator' },

    //   {
    //     label: 'Load/Reload Media',
    //     accelerator: 'CmdOrCtrl+L',
    //     // async click(item, focusedWindow) {}
    //   },
    //   { type: 'separator' },

    //   {
    //     label: 'Force Reload',
    //     accelerator: 'CmdOrCtrl+R',
    //     click(_: any, focusedWindow: any) {
    //       if (focusedWindow) focusedWindow.reload();
    //     },
    //   },
    //   {
    //     label: 'Toggle fullscreen',
    //     role: 'togglefullscreen',
    //   },
    //   {
    //     label: 'Toggle Developer Tools',
    //     accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
    //     click(_: any, focusedWindow: any) {
    //       if (focusedWindow) focusedWindow.webContents.toggleDevTools();
    //     },
    //   },
    //   { type: 'separator' },

    //   {
    //     label: 'Exit',
    //     role: 'close',
    //   },
    // ],
  },
];

// Menu.buildFromTemplate(menu)

export default Menu.buildFromTemplate(template);
