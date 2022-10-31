// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const lexer = require('./lexer.js')
  const brLexer = lexer
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statements", "symbols": [], "postprocess": () => []},
    {"name": "statements", "symbols": ["statement"], "postprocess": (data) => { return [data[0]] }},
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statements", "statements$ebnf$1", "statement"], "postprocess": (data) => { return [...data[0], data[2]] }},
    {"name": "statement", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": (data) => { return [data[0]] }}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
