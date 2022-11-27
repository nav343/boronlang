// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const myLexer = require('./lexer.js')


  const varLexer = require('./lexer.js')


  const fcLexer = require('./lexer.js')


  const faLexer = require('./lexer.js')


  const ifLexer = require('./lexer.js')


  const forLexer = require('./lexer.js')


  const whileLoop = require('./lexer.js')


  const specVarAssignLexer = require('./lexer.js')
var grammar = {
    Lexer: specVarAssignLexer,
    ParserRules: [
    {"name": "varAssign", "symbols": [{"literal":"let"}, "__", (varLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":":="}, "_", "expr", "_", {"literal":";"}], "postprocess": 
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
    {"name": "funcCall", "symbols": [{"literal":"call"}, "__", (fcLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "funcCall$ebnf$1", "_", {"literal":")"}, "_", {"literal":";"}], "postprocess": 
        (data) => {
            return {
                type: 'func_call',
                name: data[2],
                args: data[6] ? data[6][0] : []
            }
        }
          },
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
    {"name": "funcAssign$ebnf$1$subexpression$1", "symbols": ["paramList"]},
    {"name": "funcAssign$ebnf$1", "symbols": ["funcAssign$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "funcAssign$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "funcAssign", "symbols": [{"literal":"func"}, "__", (faLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "funcAssign$ebnf$1", "_", {"literal":")"}, "_", {"literal":"->"}, "_", "codeBody"], "postprocess": 
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
    {"name": "codeBody$ebnf$1$subexpression$1", "symbols": ["statement", "_ml"]},
    {"name": "codeBody$ebnf$1", "symbols": ["codeBody$ebnf$1", "codeBody$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "codeBody", "symbols": [{"literal":"["}, "_ml", "codeBody$ebnf$1", {"literal":"]"}], "postprocess": 
        (data) => {
          const arr = data[2]
          const stat = arr.map(val => val[0])
          return stat.map(val => val)
        }
          },
    {"name": "paramList$ebnf$1", "symbols": []},
    {"name": "paramList$ebnf$1$subexpression$1", "symbols": [{"literal":";"}, "_", (faLexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "paramList$ebnf$1", "symbols": ["paramList$ebnf$1", "paramList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "paramList", "symbols": [(faLexer.has("identifier") ? {type: "identifier"} : identifier), "paramList$ebnf$1"], "postprocess": 
        (data) => {
            const repeatedArr = data[1]
            const restParams = repeatedArr.map(val => val[2])
            return [data[0], ...restParams] 
          }
          },
    {"name": "ifStatement$ebnf$1$subexpression$1", "symbols": ["ifBody"]},
    {"name": "ifStatement$ebnf$1", "symbols": ["ifStatement$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ifStatement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ifStatement", "symbols": [{"literal":"if"}, "_", {"literal":"<"}, "_", "condition", "_", {"literal":">"}, "_", (ifLexer.has("thinArrow") ? {type: "thinArrow"} : thinArrow), "_", {"literal":"["}, "ifStatement$ebnf$1", {"literal":"]"}, "_ml"], "postprocess": 
        (data) => {
            return {
              type: "if_statement",
              condition: data[4],
              body: data[11] ? data[11][0] : []
            }
        }
          },
    {"name": "elseStatement", "symbols": [{"literal":"else"}, "__", "ifStatement"], "postprocess": 
        (data) => {
            return {
                type: 'else_if',
                body: data[2]
            }
          }
          },
    {"name": "elseStatement$ebnf$1$subexpression$1", "symbols": ["ifBody"]},
    {"name": "elseStatement$ebnf$1", "symbols": ["elseStatement$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "elseStatement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "elseStatement", "symbols": [{"literal":"else"}, "__", {"literal":"->"}, "_", {"literal":"["}, "elseStatement$ebnf$1", {"literal":"]"}], "postprocess": 
        (data) => {
          return {
            type: 'else_statement',
            body: data[5] ? data[5][0] : []
          }
        }
          },
    {"name": "condition", "symbols": ["expr", "_", {"literal":"=="}, "_", "expr"], "postprocess": (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } }},
    {"name": "condition", "symbols": ["expr", "_", {"literal":">"}, "_", "expr"], "postprocess": (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } }},
    {"name": "condition", "symbols": ["expr", "_", {"literal":"<"}, "_", "expr"], "postprocess": (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } }},
    {"name": "condition", "symbols": ["expr", "_", {"literal":"!="}, "_", "expr"], "postprocess": (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } }},
    {"name": "condition", "symbols": ["expr", "_", {"literal":">="}, "_", "expr"], "postprocess": (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } }},
    {"name": "condition", "symbols": ["expr", "_", {"literal":"<="}, "_", "expr"], "postprocess": (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } }},
    {"name": "condition", "symbols": ["expr", "_", {"literal":"%"}, "_", "expr"], "postprocess": (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } }},
    {"name": "ifBody$ebnf$1", "symbols": []},
    {"name": "ifBody$ebnf$1$subexpression$1", "symbols": ["statement", "_ml"]},
    {"name": "ifBody$ebnf$1", "symbols": ["ifBody$ebnf$1", "ifBody$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ifBody", "symbols": ["_ml", "ifBody$ebnf$1"], "postprocess": 
        (data) => {
          const arr = data[1]
          const stat = arr.map(val => val[0])
          return stat.map(val => val)
        }
          },
    {"name": "forLoop$ebnf$1$subexpression$1", "symbols": ["forBody"]},
    {"name": "forLoop$ebnf$1", "symbols": ["forLoop$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "forLoop$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "forLoop", "symbols": [{"literal":"for"}, "_", {"literal":"<"}, "_", "condition", "_", {"literal":">"}, "_", (forLexer.has("thinArrow") ? {type: "thinArrow"} : thinArrow), "_", {"literal":"["}, "forLoop$ebnf$1", {"literal":"]"}], "postprocess": 
        (data) => {
            return {
              type: "for_loop",
              condition: data[4],
              body: data[11] ? data[11][0] : []
            }
        }
          },
    {"name": "condition", "symbols": [(forLexer.has("identifier") ? {type: "identifier"} : identifier), "__", {"literal":"in"}, "__", "expr"], "postprocess": 
        (data) => {
            return {
                var: data[0],
                op: data[2],
                expr2: data[4]
            }
        }
          },
    {"name": "forBody", "symbols": ["_", "statements", "_"], "postprocess": 
        (data) => {
          return [data[0]]
        }
          },
    {"name": "whileLoop$ebnf$1$subexpression$1", "symbols": ["whileBody"]},
    {"name": "whileLoop$ebnf$1", "symbols": ["whileLoop$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "whileLoop$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "whileLoop", "symbols": [{"literal":"while"}, "_", {"literal":"<"}, "_", "condition", "_", {"literal":">"}, "_", (whileLoop.has("thinArrow") ? {type: "thinArrow"} : thinArrow), "_", {"literal":"["}, "whileLoop$ebnf$1", {"literal":"]"}], "postprocess": 
        (data) => {
            return {
              type: "while_loop",
              condition: data[4],
              body: data[11] ? data[11][0] : []
            }
        }
          },
    {"name": "condition", "symbols": ["expr", "_", {"literal":"=="}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                expr1: data[0],
                op: data[2],
                expr2: data[4]
            }
        }
          },
    {"name": "whileBody", "symbols": ["statements"], "postprocess": 
        (data) => {
          return [data[0][0]]
        }
          },
    {"name": "specVarAssign$ebnf$1$subexpression$1", "symbols": ["specArgs"]},
    {"name": "specVarAssign$ebnf$1", "symbols": ["specVarAssign$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "specVarAssign$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "specVarAssign", "symbols": [{"literal":"let"}, "__", (specVarAssignLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":":="}, "_", {"literal":"call"}, "__", (specVarAssignLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "specVarAssign$ebnf$1", "_", {"literal":")"}, "_", {"literal":";"}], "postprocess": 
        (data) => {
            return {
             type: "spec_var_assign",
             varName: data[2],
             value: {
               funcName: data[8],
               args: data[12] ? data[12][0] : []
             }
            }
        }
          },
    {"name": "specArgs", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]]
        }
          },
    {"name": "specArgs", "symbols": ["specArgs", "_", {"literal":";"}, "_", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[4]] 
          }
          },
    {"name": "program", "symbols": ["statements"], "postprocess": 
        (data) => {
            return {
                type: 'program',
                body: data[0]
            }
        }
          },
    {"name": "statements", "symbols": [], "postprocess": () => []},
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["__lb_", "statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_ml", "statement", "statements$ebnf$1", "_ml"], "postprocess": 
        (data) => {
            const repeated = data[2]
            const restStatements = repeated.map(chunk => chunk[1])
            return [data[1], ...restStatements]
          }
         },
    {"name": "statements", "symbols": ["statement"], "postprocess":  
        (data) => {
            return [data[0]]
        }
          },
    {"name": "statement", "symbols": ["varAssign"], "postprocess": id},
    {"name": "statement", "symbols": ["funcCall"], "postprocess": id},
    {"name": "statement", "symbols": ["funcAssign"], "postprocess": id},
    {"name": "statement", "symbols": ["ifStatement"], "postprocess": id},
    {"name": "statement", "symbols": ["elseStatement"], "postprocess": id},
    {"name": "statement", "symbols": ["forLoop"], "postprocess": id},
    {"name": "statement", "symbols": ["whileLoop"], "postprocess": id},
    {"name": "statement", "symbols": ["specVarAssign"], "postprocess": id},
    {"name": "statement", "symbols": [(specVarAssignLexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "expr", "symbols": [(specVarAssignLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(specVarAssignLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(specVarAssignLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (specVarAssignLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(specVarAssignLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (specVarAssignLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(specVarAssignLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(specVarAssignLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "__lb_$ebnf$1", "symbols": []},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", (specVarAssignLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1"]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
