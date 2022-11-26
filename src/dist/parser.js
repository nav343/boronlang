"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const nearley_1 = require("nearley");
const fs_1 = require("fs");
const chalk_1 = require("chalk");
function readfile(fileName) {
    if (!fileName) {
        console.log((0, chalk_1.red)("Please provide a file name."));
    }
    const content = (0, fs_1.readFileSync)(fileName, { encoding: 'utf8', flag: "r" }).toString();
    return content;
}
function run(grammar, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const parser = new nearley_1.Parser(nearley_1.Grammar.fromCompiled(grammar));
        if (!fileName) {
            console.log((0, chalk_1.red)("Please provide a .boron file."));
            return;
        }
        try {
            parser.feed(readfile(fileName));
        }
        catch (error) {
            const err = error.toString().split(/Unexpected[\s\S]*/)[0];
            console.log((0, chalk_1.red)(err));
            error.token.type === "NL" ? console.log((0, chalk_1.red)(`Unexpected End Of Line 
Expected one of these:
  * [  ]
  * (  )
  * ;`)) : console.log((0, chalk_1.red)("Type   :"), (0, chalk_1.green)(error.token.type));
            error.token.value === '\n' ? console.log((0, chalk_1.red)('Value  :'), (0, chalk_1.green)('""')) : console.log((0, chalk_1.red)("Value  :"), (0, chalk_1.green)(error.token.value));
            console.log((0, chalk_1.red)("Line   :"), (0, chalk_1.green)(error.token.line));
            console.log((0, chalk_1.red)("Col    :"), (0, chalk_1.green)(error.token.col));
            console.log((0, chalk_1.red)("Offset :"), (0, chalk_1.green)(error.offset));
            return;
        }
        const ast = JSON.stringify(parser.results[0], null, '  ');
        if (parser.results.length > 1) {
            console.log((0, chalk_1.red)("Error: Ambiguous AST found"));
            return;
        }
        else if (parser.results.length === 1) {
            writeAST(fileName, ast);
        }
        else {
            console.log((0, chalk_1.red)("Error: No parse detected !!!"));
        }
    });
}
exports.run = run;
function writeAST(outFile, ast) {
    const outFileName = outFile.replace(".boron", ".boron.ast");
    (0, fs_1.writeFileSync)(outFileName, ast);
}
