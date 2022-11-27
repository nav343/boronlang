@{%
  const forLexer = require('./lexer.js')
%}
@lexer forLexer

forLoop
  -> "for" _ "<" _ condition _ ">" _ %thinArrow _ "[" (forBody):? "]"
  {%
    (data) => {
        return {
          type: "for_loop",
          condition: data[4],
          body: data[11] ? data[11][0] : []
        }
    }
  %}

condition
  -> %identifier __ "in" __ expr
  {%
    (data) => {
        return {
            var: data[0],
            op: data[2],
            expr2: data[4]
        }
    }
  %}

forBody
  -> _ statements _
  {%
    (data) => {
      return [data[0]]
    }
  %}
