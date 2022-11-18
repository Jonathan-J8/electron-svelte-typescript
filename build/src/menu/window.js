"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = {
    label: 'Window',
    role: 'window',
    submenu: [
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize',
        },
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close',
        },
    ],
};
exports.default = template;
