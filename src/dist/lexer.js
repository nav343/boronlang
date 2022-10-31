"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moo_1 = require("moo");
const lexer = (0, moo_1.compile)({
    WS: /[ \t]+/,
    comment: /\/\/.*?$/,
    number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lparen: '(',
    rparen: ')',
    keyword: ['while', 'if', 'else', 'moo', 'cows'],
    NL: { match: /\n/, lineBreaks: true },
});
module.exports = lexer;
