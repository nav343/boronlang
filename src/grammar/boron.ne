@{%
  const myLexer = require('./lexer.js')
%}
@lexer myLexer
@include "./varAssign.ne"
@include "./funcCall.ne"
@include "./funcAssign.ne"
@include "./ifStatement.ne"
@include "./forLoop.ne"
@include "./whileLoop.ne"
@include "./specVarAssign.ne"

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
 
 | _ml statement (__lb_ statement):* _ml
 {%
    (data) => {
        const repeated = data[2]
        const restStatements = repeated.map(chunk => chunk[1])
        return [data[1], ...restStatements]
      }
 %}

statement
  -> varAssign {% id %}
  | funcCall {% id %}
  | funcAssign {% id %}
  | ifStatement {% id %}
  | elseStatement {% id %}
  | forLoop {% id %}
  | whileLoop {% id %}
  | specVarAssign {% id %}
  | %comment {% id %}

expr
  -> %string {% id %}
  | %number {% id %}
  | %identifier {% id %}

#Optional Whitespace
_ -> %WS:*

#Mandatory Whitespace
__ -> %WS:+

# Optional multiline whitespace or newline
_ml -> (%WS | %NL):*
__lb_ -> %NL:*
