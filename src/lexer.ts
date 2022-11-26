import { compile } from 'moo'

const lexer = compile({
  WS: /[ \t]+/,
  comment: /\/\/.*?$/,
  number: /[+-]?[0-9][0-9]*/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  lparen: '(',
  rparen: ')',
  lcurley: '{',
  rcurley: '}',
  lsquare: '[',
  rsquare: ']',
  assign: ':=',
  thinArrow: '->',
  doubleEQ: '==',
  eq: '=',
  notEQ: '!=',
  greaterEQ: '>=',
  lessEQ: '<=',
  semicol: ';',
  lessThan: '<',
  greaterThan: '>',
  //operators: ['+', '-', '*', '/', '%'],
  keyword: ['let', 'func', 'while', 'true', 'false', 'call', 'if', 'else', 'for'],
  identifier: /[a-zA-Z][a-zA-Z0-9_]*/,
  NL: { match: /\n/, lineBreaks: true },
})

module.exports = lexer
