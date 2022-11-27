import { generateCode } from './gen'
import { run } from './parser'

//@ts-ignore
import grammar from './boron.js'

import { exec } from 'node:child_process';
import { red, green } from 'chalk'
import { rm } from 'fs/promises';

const fileName = process.argv[2]

console.time("Ended in")
run(grammar, fileName).catch(() => { return });
generateCode(fileName + ".ast").catch(() => { return });

const execFileName = fileName.replace('.boron', '.py')
exec(`python3 ${execFileName}`, (error, stdout) => {
  if (error) {
    if (error.code === 1) {
      console.log(red("An unexpected error occurred while trying to compile your program\n"))
      console.log(red(error.message))
      console.timeEnd("Ended in")
    } else if (error.code === 127) {
      console.log(red("An occurred while running your program: "))
      console.log(red(`${error.name}: 
    Command: ${error.cmd}
    Message: ${error.message}
    Code: ${error.code}`))
      console.log(green(`Solution: 
    * Check if python is installed on your system !!
    * If python is installed, make sure that 'python3' | 'python' | 'python...' 
      is added to your PATH variable.`))
      console.timeEnd("Ended in")
      return
    }
  } else {
    console.log(stdout)
    console.timeEnd("Ended in")
    //rm(fileName + '.ast')
    //rm(fileName.replace('.boron', '.py'))
  }
})
