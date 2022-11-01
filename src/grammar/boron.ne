@{%
  const myLexer = require('./lexer.js')
%}
@lexer myLexer

program
  -> statements
  {%
    (data) => {
        return {
            type: 'program',
            body: data[0]
        }
    }
  %}

statements
  -> null {% () => [] %}
  | _ statement _
  {% 
    (data) => {
        return [data[2]]
    }
  %}
  
  | %NL:* statement %NL:* _ statements _ %NL:*  
  {%
    (data) => {
        return [data[0], ...data[3]]
    }
  %}

statement
  -> varAssign {% id %}
  | funcAssign {% id %}

varAssign
  -> "let" __ %identifier _ ":=" _ expr _ ";"
  {%
    (data) => {
      return {
        type: "var_assign",
        name: data[2],
        value: data[6]
      }
    }
  %}

# func hello(a; b) -> [...]
funcAssign
  -> "func" __ %identifier _ "(" _ (args _ ";"):* _ ")" _ "->" _ "[" _ml statements _ml "]"
  {%
    (data) => {
        return {
            type: "func_assign",
            funcName: data[2],
            args: data[6] ? data[6][0] : [],
            body: data[13]
        }
    }
  %}

expr
  -> %string {% id %}
  | %number {% id %}
  | %identifier {% id %}

args
  -> null {% () => [] %}
  | args _ %identifier
  {%
    (data) => {
        return [...data[0], data[4]] 
      }
  %}

#Optional Whitespace
_ -> %WS:*

#Mandatory Whitespace
__ -> %WS:+

_ml -> (%WS | %NL):*
