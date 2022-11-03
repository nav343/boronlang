import { readFile, writeFile } from "fs/promises"
import { red, green } from 'chalk'

async function generateCode() {
  const astFileName = process.argv[2] + '.ast'
  const astCode = (await readFile(astFileName, { encoding: 'utf8', flag: 'r' })).toString()

  const statements = JSON.parse(astCode)
  const outFileName = astFileName.replace(".boron.ast", ".py")
  const pyCode = genPy(statements)

  console.log(pyCode);
  console.log(green("Succefully Compiled !!!"))
}

function genPy(node: any) {
  if (node.type === 'program') {
    console.log("nice")
  }
}

generateCode().catch(err => console.log(red(err)))
