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
  | statement
  {% 
    (data) => {
        return [data[0]]
    }
  %}
 
  | statement %NL:* statements
  {%
    (data) => {
        return [data[0], ...data[2]]
    }
  %}

statement
  -> varAssign {% id %}
  | funcCall {% id %}
  | funcAssign {% id %}

# let name := "Name";
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

# func hello(a; b) -> [...]
funcAssign
  -> "func" __ %identifier _ "(" _ paramList _ ")" _ "->" _ codeBody 
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
  | "[" _ %NL:* _ statement _ %NL:* _ "]"
  {%
    (data) => {
      return [data[4]]
    }
  %}

expr
  -> %string {% id %}
  | %number {% id %}
  | %identifier {% id %}
  | funcCall {% id %}

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

paramList
  -> %identifier (";" _ %identifier):*
  {%
    (data) => {
        const repeatedArr = data[1]
        const restParams = repeatedArr.map(val => val[1])
        return [data[0], ...restParams] 
      }
  %}

#Optional Whitespace
_ -> %WS:*

#Mandatory Whitespace
__ -> %WS:+

# Optional multiline whitespace or newline
_ml -> (%WS | %NL):*
