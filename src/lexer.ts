import { compile } from 'moo'

const lexer = compile({
  WS: /[ \t]+/,
  comment: /\/\/.*?$/,
  number: /0|[1-9][0-9]*/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  lparen: '(',
  rparen: ')',
  lcurley: '{',
  rcurley: '}',
  lsquare: '[',
  rsquare: ']',
  assign: ':=',
  thinArrow: '->',
  eq: '=',
  semicol: ';',
  keyword: ['let', 'func', 'while', 'true', 'false', 'call'],
  identifier: /[a-zA-Z][a-zA-Z0-9_]*/,
  NL: { match: /\n/, lineBreaks: true },
})

module.exports = lexer
