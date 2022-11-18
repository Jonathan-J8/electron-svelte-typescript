"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = require("path");
var electron_1 = require("electron");
var electron_serve_1 = tslib_1.__importDefault(require("electron-serve"));
var window_1 = require("./src/window");
var electron_reload_1 = tslib_1.__importDefault(require("electron-reload"));
require("./src/ipc");
var directory = (0, path_1.join)(__dirname, 'public');
var loadURL = (0, electron_serve_1.default)({ directory: directory, isCorsEnabled: true });
(0, electron_reload_1.default)(directory, {});
var init = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var window_2, e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                window_2 = (0, window_1.createMainWindow)();
                return [4, loadURL(window_2)];
            case 1:
                _a.sent();
                return [3, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
process.on('uncaughtException', console.log);
electron_1.app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer');
electron_1.app.on('ready', init);
electron_1.app.on('activate', init);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
