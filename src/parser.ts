import { Parser, Grammar } from 'nearley'
//@ts-ignore
import grammar from './boron.js'
import { readFileSync, writeFileSync } from 'fs'

function readfile(fileName: string) {
  if (!fileName) { console.log("Please provide a file name.") }
  const content = readFileSync(fileName, { encoding: 'utf8', flag: "r" }).toString()
  return content
}

function run() {
  const fileName = process.argv[2]
  const parser = new Parser(Grammar.fromCompiled(grammar))

  if (!fileName) { console.log("Please provide a .boron file."); return }
  parser.feed(readfile(fileName))
  const ast = JSON.stringify(parser.results[0], null, '  ')

  if (parser.results.length > 1) {
    console.log(ast)
    return
  } else if (parser.results.length === 1) {
    writeAST(fileName, ast)
  } else {
    console.log("Error: No parse detected !!!")
  }
}

function writeAST(outFile: string, ast: any) {
  const outFileName = outFile.replace(".boron", ".boron.ast")

  writeFileSync(outFileName, ast)
  console.log("Wrote AST to: " + outFileName)
}

run()
