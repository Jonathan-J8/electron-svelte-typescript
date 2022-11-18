"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = {
    label: 'View',
    submenu: [
        {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: function (item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.reload();
            },
        },
        {
            label: 'Toggle Full Screen',
            accelerator: (function () {
                if (process.platform === 'darwin')
                    return 'Ctrl+Command+F';
                else
                    return 'F11';
            })(),
            click: function (item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            },
        },
        {
            label: 'Toggle Developer Tools',
            accelerator: (function () {
                if (process.platform === 'darwin')
                    return 'Alt+Command+I';
                else
                    return 'Ctrl+Shift+I';
            })(),
            click: function (item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.toggleDevTools();
            },
        },
    ],
};
exports.default = template;
