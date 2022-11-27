@{%
  const ifLexer = require('./lexer.js')
%}
@lexer ifLexer

ifStatement
  -> "if" _ "<" _ condition _ ">" _ %thinArrow _ "[" (ifBody):? "]" _ml
  {%
    (data) => {
        return {
          type: "if_statement",
          condition: data[4],
          body: data[11] ? data[11][0] : []
        }
    }
  %}

elseStatement
  -> "else" __ ifStatement
  {%
    (data) => {
        return {
            type: 'else_if',
            body: data[2]
        }
      }
  %}
  | "else" __ "->" _ "[" (ifBody):? "]"
  {%
    (data) => {
      return {
        type: 'else_statement',
        body: data[5] ? data[5][0] : []
      }
    }
  %}

condition
  -> expr _ "==" _ expr
  {% (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } } %}
  | expr _ ">" _ expr
  {% (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } } %}
  | expr _ "<" _ expr
  {% (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } } %}
  | expr _ "!=" _ expr
  {% (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } } %}
  | expr _ ">=" _ expr
  {% (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } } %}
  | expr _ "<=" _ expr
  {% (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } } %}
  | expr _ "%" _ expr
  {% (data) => { return { par_a: data[0], op: data[2], par_b: data[4] } } %}

ifBody
  -> _ml (statement _ml):*
  {%
    (data) => {
      const arr = data[1]
      const stat = arr.map(val => val[0])
      return stat.map(val => val)
    }
  %}
