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
        (0, promises_1.writeFile)(outFileName, pyCode);
        console.log((0, chalk_1.green)("Succefully Compiled !!!"));
    });
}
function genPy(node) {
    if (node.type === 'program') {
        return node.body.map(genPy).join("\n");
    }
    else if (node.type === "var_assign") {
        const varName = node.name.value;
        const varValue = node.value.value;
        return `${varName} = ${varValue}`;
    }
    else if (node.type === 'func_call') {
        const funcName = node.name.value;
        const args = node.args.map(genPy).join(",");
        return `${funcName}(${args})`;
    }
    else if (node.type === 'func_assign') {
        const functionName = node.funcName.value;
        const args = node.args.map(genPy).join(", ");
        const body = node.funcBody.map(genPy);
        return `def ${functionName}(${args}):
    ${body}`;
    }
    else if (node.type === 'identifier') {
        return node.value;
    }
    else if (node.type === 'number') {
        return String(node.type);
    }
    else if (node.type === 'string') {
        return node.value;
    }
    else {
        throw new Error(`Unknown: Node Found -> ${node.type}`);
    }
}
generateCode().catch(err => console.log((0, chalk_1.red)(err)));
