"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const alert_1 = __importDefault(require("aurora-ui/lib/alert"));
require("aurora-ui/lib/alert/style");
exports.default = () => react_1.default.createElement(alert_1.default, { kind: "warning" }, "This is a warning info");
