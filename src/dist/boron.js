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
    {"name": "statements", "symbols": ["statement"], "postprocess":  
        (data) => {
            return [data[0]]
        }
          },
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statement", "statements$ebnf$1", "statements"], "postprocess": 
        (data) => {
            return [data[0], ...data[2]]
        }
          },
    {"name": "statement", "symbols": ["varAssign"], "postprocess": id},
    {"name": "statement", "symbols": ["funcCall"], "postprocess": id},
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
    {"name": "funcCall$ebnf$1$subexpression$1", "symbols": ["callArgs"]},
    {"name": "funcCall$ebnf$1", "symbols": ["funcCall$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "funcCall$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "funcCall", "symbols": [{"literal":"call"}, "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "funcCall$ebnf$1", "_", {"literal":")"}, "_", {"literal":";"}], "postprocess": 
        (data) => {
            return {
                type: 'func_call',
                name: data[2],
                args: data[6] ? data[6][0] : []
            }
        }
          },
    {"name": "funcAssign", "symbols": [{"literal":"func"}, "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "paramList", "_", {"literal":")"}, "_", {"literal":"->"}, "_", "codeBody"], "postprocess": 
        (data) => {
            return {
                type: "func_assign",
                funcName: data[2],
                args: data[6] ? data[6][0] : [],
                funcBody: data[12]
            }
        }
          },
    {"name": "codeBody", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]]
        }
          },
    {"name": "codeBody$ebnf$1", "symbols": []},
    {"name": "codeBody$ebnf$1", "symbols": ["codeBody$ebnf$1", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "codeBody$ebnf$2", "symbols": []},
    {"name": "codeBody$ebnf$2", "symbols": ["codeBody$ebnf$2", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "codeBody", "symbols": [{"literal":"["}, "_", "codeBody$ebnf$1", "_", "statement", "_", "codeBody$ebnf$2", "_", {"literal":"]"}], "postprocess": 
        (data) => {
          return [data[4]]
        }
          },
    {"name": "expr", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expr", "symbols": ["funcCall"], "postprocess": id},
    {"name": "callArgs", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]]
        }
          },
    {"name": "callArgs", "symbols": ["callArgs", "_", {"literal":";"}, "_", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[4]] 
          }
          },
    {"name": "paramList$ebnf$1", "symbols": []},
    {"name": "paramList$ebnf$1$subexpression$1", "symbols": [{"literal":";"}, "_", (myLexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "paramList$ebnf$1", "symbols": ["paramList$ebnf$1", "paramList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "paramList", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "paramList$ebnf$1"], "postprocess": 
        (data) => {
            const repeatedArr = data[1]
            const restParams = repeatedArr.map(val => val[1])
            return [data[0], ...restParams] 
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
