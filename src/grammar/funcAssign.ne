@{%
  const faLexer = require('./lexer.js')
%}
@lexer faLexer

# func hello(a; b) -> [...]
funcAssign
  -> "func" __ %identifier _ "(" _ (paramList):? _ ")" _ "->" _ codeBody 
  {%
    (data) => {
        return {
            type: "func_assign",
            funcName: data[2],
            args: data[6] ? data[6][0] : [],
            funcBody: data[12]
        }
    }
  %}

codeBody
  -> expr
  {%
    (data) => {
        return [data[0]]
    }
  %}
  | "[" _ml statement _ml "]"
  {%
    (data) => {
      return [data[2]]
    }
  %}

paramList
  -> %identifier (";" _ %identifier):*
  {%
    (data) => {
        const repeatedArr = data[1]
        const restParams = repeatedArr.map(val => val[2])
        return [data[0], ...restParams] 
      }
  %}
