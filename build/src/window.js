"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMainWindow = exports.getMainWindow = void 0;
var tslib_1 = require("tslib");
var electron_1 = require("electron");
var path_1 = require("path");
var electron_is_dev_1 = tslib_1.__importDefault(require("electron-is-dev"));
var menu_1 = tslib_1.__importDefault(require("./menu"));
var getMainWindow = function () {
    return process.env.ELECTRON_MAIN_WINDOW ? electron_1.BrowserWindow.fromId(parseInt(process.env.ELECTRON_MAIN_WINDOW)) : null;
};
exports.getMainWindow = getMainWindow;
var createMainWindow = function () {
    if ((0, exports.getMainWindow)())
        (0, exports.getMainWindow)();
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(menu_1.default));
    var mainWindow = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        maximizable: true,
        title: electron_1.app.getVersion(),
        closable: true,
        minimizable: electron_is_dev_1.default ? true : false,
        fullscreen: electron_is_dev_1.default ? false : true,
        autoHideMenuBar: true,
        icon: (0, path_1.join)(electron_1.app.getAppPath(), 'public', 'icon.ico'),
        backgroundColor: '#222222',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            allowRunningInsecureContent: false,
            preload: (0, path_1.join)(electron_1.app.getAppPath(), 'build', 'src', 'preload.js'),
        },
    });
    process.env.ELECTRON_MAIN_WINDOW = "".concat(mainWindow.id);
    var ounce = false;
    mainWindow.on('ready-to-show', function () {
        if (electron_is_dev_1.default && mainWindow && !ounce) {
            ounce = true;
            mainWindow.maximize();
            mainWindow.webContents.openDevTools();
        }
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.webContents.session.webRequest.onBeforeSendHeaders(function (details, callback) {
        var requestHeaders = tslib_1.__assign(tslib_1.__assign({}, details.requestHeaders), { 'Cross-Origin-Opener-Policy': 'same-origin', 'Cross-Origin-Embedder-Policy': 'require-corp', 'Cross-Origin-Resource-Policy': 'same-site' });
        callback({ cancel: false, requestHeaders: requestHeaders });
    });
    electron_1.globalShortcut.register('f5', function () {
        if (mainWindow)
            mainWindow.webContents.reloadIgnoringCache();
    });
    return mainWindow;
};
exports.createMainWindow = createMainWindow;
