import { Parser, Grammar } from 'nearley'
//@ts-ignore
import grammar from './boron.js'
import { readFileSync, writeFileSync } from 'fs'
import { red, green } from 'chalk'

function readfile(fileName: string) {
  if (!fileName) { console.log("Please provide a file name.") }
  const content = readFileSync(fileName, { encoding: 'utf8', flag: "r" }).toString()
  return content
}

function run() {
  const fileName = process.argv[2]
  const parser = new Parser(Grammar.fromCompiled(grammar))

  if (!fileName) { console.log("Please provide a .boron file."); return }

  try {
    parser.feed(readfile(fileName))
  } catch (error: any) {
    console.log(red(`Error: Syntax Error Found !!`))
    console.log()
    console.log(red(`Type: ${error.token.type}`))
    console.log(red(`Value: "${error.token.value}"`))
    console.log(red(`Line: ${error.token.line}`))
    console.log(red(`Col: ${error.token.col}`))
    console.log(red(`Offset: ${error.offset}`))
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
  console.log(green("Wrote AST to: " + outFileName))
}

run()
