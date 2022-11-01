"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nearley_1 = require("nearley");
//@ts-ignore
const boron_js_1 = __importDefault(require("./boron.js"));
const fs_1 = require("fs");
function readfile(fileName) {
    if (!fileName) {
        console.log("Please provide a file name.");
    }
    const content = (0, fs_1.readFileSync)(fileName, { encoding: 'utf8', flag: "r" }).toString();
    return content;
}
function run() {
    const fileName = process.argv[2];
    const parser = new nearley_1.Parser(nearley_1.Grammar.fromCompiled(boron_js_1.default));
    if (!fileName) {
        console.log("Please provide a .boron file.");
        return;
    }
    parser.feed(readfile(fileName));
    const ast = JSON.stringify(parser.results[0], null, '  ');
    if (parser.results.length > 1) {
        console.log(ast);
        return;
    }
    else if (parser.results.length === 1) {
        writeAST(fileName, ast);
    }
    else {
        console.log("Error: No parse detected !!!");
    }
}
function writeAST(outFile, ast) {
    const outFileName = outFile.replace(".boron", ".boron.ast");
    (0, fs_1.writeFileSync)(outFileName, ast);
    console.log("Wrote AST to: " + outFileName);
}
run();
