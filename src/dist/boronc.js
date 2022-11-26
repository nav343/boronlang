"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gen_1 = require("./gen");
const parser_1 = require("./parser");
//@ts-ignore
const boron_js_1 = __importDefault(require("./boron.js"));
const node_child_process_1 = require("node:child_process");
const chalk_1 = require("chalk");
const promises_1 = require("fs/promises");
const fileName = process.argv[2];
console.time("Ended in");
(0, parser_1.run)(boron_js_1.default, fileName).catch(() => { return; });
(0, gen_1.generateCode)(fileName + ".ast").catch(() => { return; });
const execFileName = fileName.replace('.boron', '.py');
(0, node_child_process_1.exec)(`python3 ${execFileName}`, (error, stdout) => {
    if (error) {
        if (error.code === 1) {
            console.log((0, chalk_1.red)("An unexpected error occurred while trying to compile your program\n"));
            console.log((0, chalk_1.red)(error.message));
            console.timeEnd("Ended in");
        }
        else if (error.code === 127) {
            console.log((0, chalk_1.red)("An occurred while running your program: "));
            console.log((0, chalk_1.red)(`${error.name}: 
    Command: ${error.cmd}
    Message: ${error.message}
    Code: ${error.code}`));
            console.log((0, chalk_1.green)(`Solution: 
    * Check if python is installed on your system !!
    * If python is installed, make sure that 'python3' | 'python' | 'python...' 
      is added to your PATH variable.`));
            console.timeEnd("Ended in");
            return;
        }
    }
    else {
        console.log(stdout);
        console.timeEnd("Ended in");
        (0, promises_1.rm)(fileName + '.ast');
        (0, promises_1.rm)(fileName.replace('.boron', '.py'));
    }
});
