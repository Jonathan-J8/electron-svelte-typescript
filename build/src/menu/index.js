"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var edit_1 = tslib_1.__importDefault(require("./edit"));
var view_1 = tslib_1.__importDefault(require("./view"));
var window_1 = tslib_1.__importDefault(require("./window"));
var help_1 = tslib_1.__importDefault(require("./help"));
var template = [{ label: '' }, edit_1.default, view_1.default, window_1.default, help_1.default];
exports.default = template;
