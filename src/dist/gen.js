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
exports.generateCode = void 0;
const promises_1 = require("fs/promises");
function generateCode(astFileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const astCode = (yield (0, promises_1.readFile)(astFileName, { encoding: 'utf8', flag: 'r' })).toString();
        const statements = JSON.parse(astCode);
        const outFileName = astFileName.replace(".boron.ast", ".py");
        const pyCode = genPy(statements);
        (0, promises_1.writeFile)(outFileName, pyCode);
    });
}
exports.generateCode = generateCode;
const runtime = `def add(num1, *args):
    total = num1
    for num in args:
        total += num
    return total

def sub(num1, *args):
    total = num1
    for num in args:
        total -= num
    return total
    
def mul(num1, *args):
    total = num1
    for num in args:
        total *= num
    return total
    
def div(num1, *args):
    total = num1
    for num in args:
        total /= num
    return total

def mod(a, b):
  return a % b
`;
function genPy(node) {
    if (node.type === 'program') {
        return runtime + node.body.map(genPy).join("\n");
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
    else if (node.type === 'if_statement') {
        const par1 = node.condition.par_a.value;
        const op = node.condition.op.value;
        const par2 = node.condition.par_b.value;
        const body = node.body.map(genPy);
        return `if (${par1} ${op} ${par2}):
    ${body.join('\n    ')}`;
    }
    else if (node.type === 'else_if') {
        const par1 = node.body.condition.par_a.value;
        const op = node.body.condition.op.value;
        const par2 = node.body.condition.par_b.value;
        const body = node.body.body.map(genPy);
        return `elif (${par1} ${op} ${par2}):
    ${body.join('\n    ')}`;
    }
    else if (node.type === 'else_statement') {
        const body = node.body.map(genPy);
        return `else:
    ${body.join('\n    ')}`;
    }
    else if (node.type === 'for_loop') {
        const varname = node.condition.var.value;
        const op = node.condition.op.value;
        const body = node.body.map(genPy);
        const expr2 = node.condition.expr2.value;
        if (node.condition.expr2.type === "func_call") {
            const fname = node.condition.expr2.name.value;
            const args = node.condition.expr2.args.map(genPy).join(', ');
            return `for ${varname} ${op} ${fname}(${args}):
      ${body.join('\n    ')}`;
        }
        else {
            return `for ${varname} ${op} ${expr2}:
      ${body.join('\n    ')}`;
        }
    }
    else if (node.type === 'while_loop') {
        const term1 = node.condition.par_a.value;
        const op = node.condition.op.value;
        const term2 = node.condition.par_b.value;
        const body = node.body.map(genPy);
        return `while ${term1} ${op} ${term2}:
    ${body.join('\n    ')}`;
    }
    else if (node.type === 'spec_var_assign') {
        const varName = node.varName.value;
        const funcName = node.value.funcName.value;
        const args = node.value.args.map(genPy).join(", ");
        return `${varName} = ${funcName}(${args})`;
    }
    else if (node.type === 'identifier') {
        return node.value;
    }
    else if (node.type === 'number') {
        return String(node.value);
    }
    else if (node.type === 'string') {
        return node.value;
    }
    else if (node.type === 'comment') {
        return "";
    }
    else {
        throw new Error(`Unknown: Node Found -> ${node.type}`);
    }
}
