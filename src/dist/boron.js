// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const myLexer = require('./lexer.js')
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "program", "symbols": ["statements"], "postprocess": 
        (data) => {
            return {
                type: 'program',
                body: data[0]
            }
        }
          },
    {"name": "statements", "symbols": [], "postprocess": () => []},
    {"name": "statements", "symbols": ["_", "statement", "_"], "postprocess":  
        (data) => {
            return [data[2]]
        }
          },
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements$ebnf$2", "symbols": []},
    {"name": "statements$ebnf$2", "symbols": ["statements$ebnf$2", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements$ebnf$3", "symbols": []},
    {"name": "statements$ebnf$3", "symbols": ["statements$ebnf$3", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statements$ebnf$1", "statement", "statements$ebnf$2", "_", "statements", "_", "statements$ebnf$3"], "postprocess": 
        (data) => {
            return [data[0], ...data[3]]
        }
          },
    {"name": "statement", "symbols": ["varAssign"], "postprocess": id},
    {"name": "statement", "symbols": ["funcAssign"], "postprocess": id},
    {"name": "varAssign", "symbols": [{"literal":"let"}, "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":":="}, "_", "expr", "_", {"literal":";"}], "postprocess": 
        (data) => {
          return {
            type: "var_assign",
            name: data[2],
            value: data[6]
          }
        }
          },
    {"name": "funcAssign$ebnf$1", "symbols": []},
    {"name": "funcAssign$ebnf$1$subexpression$1", "symbols": ["args", "_", {"literal":";"}]},
    {"name": "funcAssign$ebnf$1", "symbols": ["funcAssign$ebnf$1", "funcAssign$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "funcAssign", "symbols": [{"literal":"func"}, "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "funcAssign$ebnf$1", "_", {"literal":")"}, "_", {"literal":"->"}, "_", {"literal":"["}, "_ml", "statements", "_ml", {"literal":"]"}], "postprocess": 
        (data) => {
            return {
                type: "func_assign",
                funcName: data[2],
                args: data[6] ? data[6][0] : [],
                body: data[13]
            }
        }
          },
    {"name": "expr", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "args", "symbols": [], "postprocess": () => []},
    {"name": "args", "symbols": ["args", "_", (myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => {
            return [...data[0], data[4]] 
          }
          },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
