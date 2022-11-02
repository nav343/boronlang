@{%
  const varLexer = require('./lexer.js')
%}
@lexer varLexer

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
