import shell from "shelljs"
import extract from "extract-zip"
import fs from "fs"


shell.echo('hello world')
const string = shell.cat("./my-cli.js")
console.log(string)

var version = shell.exec('node --version', {silent:true}).stdout;
console.log(version)

shell.exec("rmdir test-demo")

const srcDir = `./srcDir`
const targetDir = `./targetDir`

if (!fs.existsSync(srcDir)) throw new Error(`${srcDir} is not existed`)
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir)


shell.cp("-R", srcDir + "/*", targetDir)

