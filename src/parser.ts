import { Parser, Grammar } from 'nearley'
import { readFileSync, writeFileSync } from 'fs'
import { red, green } from 'chalk'

function readfile(fileName: string) {
  if (!fileName) { console.log(red("Please provide a file name.")) }
  const content = readFileSync(fileName, { encoding: 'utf8', flag: "r" }).toString()
  return content
}

export async function run(grammar: any, fileName: string) {
  const parser = new Parser(Grammar.fromCompiled(grammar))

  if (!fileName) { console.log(red("Please provide a .boron file.")); return }

  try {
    parser.feed(readfile(fileName))
  } catch (error: any) {
    const err = error.toString().split(/Unexpected[\s\S]*/)[0]
    console.log(red(err))
    error.token.type === "NL" ? console.log(red(`Unexpected End Of Line 
Expected one of these:
  * [  ]
  * (  )
  * ;`)) : console.log(red("Type   :"), green(error.token.type))
    error.token.value === '\n' ? console.log(red('Value  :'), green('""')) : console.log(red("Value  :"), green(error.token.value))
    console.log(red("Line   :"), green(error.token.line))
    console.log(red("Col    :"), green(error.token.col))
    console.log(red("Offset :"), green(error.offset))
    return
  }
  const ast = JSON.stringify(parser.results[0], null, '  ')
  if (parser.results.length > 1) {
    console.log(red("Error: Ambiguous AST found"))
    return
  } else if (parser.results.length === 1) {
    writeAST(fileName, ast)
  } else {
    console.log(red("Error: No parse detected !!!"))
  }
}

function writeAST(outFile: string, ast: any) {
  const outFileName = outFile.replace(".boron", ".boron.ast")

  writeFileSync(outFileName, ast)
}
