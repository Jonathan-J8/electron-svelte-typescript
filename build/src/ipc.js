"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var electron_1 = require("electron");
var electron_is_dev_1 = tslib_1.__importDefault(require("electron-is-dev"));
electron_1.ipcMain.handle('APP_INFOS', function () { return ({
    isDev: electron_is_dev_1.default,
    appPath: electron_1.app.getAppPath(),
    appData: electron_1.app.getPath('appData'),
    userData: electron_1.app.getPath('userData'),
    exe: electron_1.app.getPath('exe'),
    temp: electron_1.app.getPath('temp'),
    logs: electron_1.app.getPath('logs'),
    crashDumps: electron_1.app.getPath('crashDumps'),
}); });
