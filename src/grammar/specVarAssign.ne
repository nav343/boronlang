@{%
  const specVarAssignLexer = require('./lexer.js')
%}
@lexer specVarAssignLexer

specVarAssign
  -> "let" __ %identifier _ ":=" _ "call" __ %identifier _ "(" _ (specArgs):? _ ")" _ ";"
  {%
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
  %}

specArgs
  -> expr
  {%
    (data) => {
        return [data[0]]
    }
  %}
  | specArgs _ ";" _ expr
  {%
    (data) => {
        return [...data[0], data[4]] 
      }
  %}
