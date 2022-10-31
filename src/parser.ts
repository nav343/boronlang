import { Parser, Grammar } from 'nearley'
import grammar from './boron.js'

const parser = new Parser(Grammar.fromCompiled(grammar))
parser.feed('Hello')
console.log(parser.results)
