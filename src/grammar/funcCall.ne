@{%
  const fcLexer = require('./lexer.js')
%}
@lexer fcLexer

# call funcName(params);
funcCall
  -> "call" __ %identifier _ "(" _ (callArgs):? _ ")" _ ";"
  {%
    (data) => {
        return {
            type: 'func_call',
            name: data[2],
            args: data[6] ? data[6][0] : []
        }
    }
  %}

callArgs
  -> expr
  {%
    (data) => {
        return [data[0]]
    }
  %}
  | callArgs _ ";" _ expr
  {%
    (data) => {
        return [...data[0], data[4]] 
      }
  %}
