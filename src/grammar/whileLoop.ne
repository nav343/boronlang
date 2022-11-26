@{%
  const whileLoop = require('./lexer.js')
%}
@lexer whileLoop

whileLoop
  -> "while" _ "<" _ condition _ ">" _ %thinArrow _ "[" (whileBody):? "]"
  {%
    (data) => {
        return {
          type: "while_loop",
          condition: data[4],
          body: data[11] ? data[11][0] : []
        }
    }
  %}

condition
  -> expr _ "==" _ expr
  {%
    (data) => {
        return {
            expr1: data[0],
            op: data[2],
            expr2: data[4]
        }
    }
  %}

whileBody
  -> _ml (statement _ml):*
  {%
    (data) => {
      const arr = data[1]
      const stat = arr.map(val => val[0])
      return stat.map(val => val)
    }
  %}
