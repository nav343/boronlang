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
const promises_1 = require("fs/promises");
const chalk_1 = require("chalk");
function generateCode() {
    return __awaiter(this, void 0, void 0, function* () {
        const astFileName = process.argv[2] + '.ast';
        const astCode = (yield (0, promises_1.readFile)(astFileName, { encoding: 'utf8', flag: 'r' })).toString();
        const statements = JSON.parse(astCode);
        const outFileName = astFileName.replace(".boron.ast", ".py");
        const pyCode = genPy(statements);
        console.log(pyCode);
        console.log((0, chalk_1.green)("Succefully Compiled !!!"));
    });
}
function genPy(node) {
    if (node.type === 'program') {
        console.log("nice");
    }
}
generateCode().catch(err => console.log((0, chalk_1.red)(err)));
