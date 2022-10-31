"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nearley_1 = require("nearley");
const boron_js_1 = __importDefault(require("./boron.js"));
const parser = new nearley_1.Parser(nearley_1.Grammar.fromCompiled(boron_js_1.default));
parser.feed('Hello');
console.log(parser.results);
