import { readFile, writeFile } from "fs/promises"
import { red, green } from 'chalk'

async function generateCode() {
  const astFileName = process.argv[2] + '.ast'
  const astCode = (await readFile(astFileName, { encoding: 'utf8', flag: 'r' })).toString()

  const statements = JSON.parse(astCode)
  const outFileName = astFileName.replace(".boron.ast", ".py")
  const pyCode = genPy(statements)

  writeFile(outFileName, pyCode)
  console.log(green("Succefully Compiled !!!"))
}

function genPy(node: any) {
  if (node.type === 'program') {
    return node.body.map(genPy).join("\n")
  } else if (node.type === "var_assign") {
    const varName = node.name.value
    const varValue = node.value.value
    return `${varName} = ${varValue}`
  } else if (node.type === 'func_call') {
    const funcName = node.name.value
    const args = node.args.map(genPy).join(",")
    return `${funcName}(${args})`
  } else if (node.type === 'func_assign') {
    const functionName = node.funcName.value
    const args = node.args.map(genPy).join(", ")
    const body = node.funcBody.map(genPy)
    return `def ${functionName}(${args}):
    ${body}`
  } else if (node.type === 'identifier') {
    return node.value
  } else if (node.type === 'number') {
    return String(node.type)
  } else if (node.type === 'string') {
    return node.value
  } else {
    throw new Error(`Unknown: Node Found -> ${node.type}`)
  }
}

generateCode().catch(err => console.log(red(err)))
