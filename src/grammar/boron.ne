@{%
  const lexer = require('./lexer.js')
  const brLexer = lexer
%}
@lexer lexer

statements
  -> null {% () => [] %}
  | statement
  {% (data) => { return [data[0]] } %}

  | statements %NL:* statement
  {% (data) => { return [...data[0], data[2]] } %}

statement
  -> %string
  {% (data) => { return [data[0]] } %}
