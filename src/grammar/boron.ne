@{%
  const myLexer = require('./lexer.js')
%}
@lexer myLexer
@include "./varAssign.ne"
@include "./funcCall.ne"
@include "./funcAssign.ne"

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


expr
  -> %string {% id %}
  | %number {% id %}
  | %identifier {% id %}
  | funcCall {% id %}

#Optional Whitespace
_ -> %WS:*

#Mandatory Whitespace
__ -> %WS:+

# Optional multiline whitespace or newline
_ml -> (%WS | %NL):*
