"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('ipc', {
    on: function (channel, listener) {
        return electron_1.ipcRenderer.on(channel, listener);
    },
    off: function (channel, listener) { return electron_1.ipcRenderer.removeListener(channel, listener); },
    getAppInfos: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, electron_1.ipcRenderer.invoke('APP_INFOS')];
            case 1: return [2, _a.sent()];
        }
    }); }); },
});
console.log('<preload script />');
