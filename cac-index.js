import cac from "cac";
import fs from "fs"

const cli = cac()


function disPlayDefultMsgVersion() {
  cli.option("--type <type>", "Choose a project type", { default: "node" })
  cli.option("--name <name>", "Provide your name")
  cli.command("lint [...files]", "lint files").action((files, options) => console.log(files, options))
  cli.help()
  cli.version("0.0.0")
  
  const result = cli.parse()
  console.log(JSON.stringify(result, null, 2))
}

function cmdOpt() {
  cli
    .command("rm <dir>", "Remove a dir")
    .option("-r, --recursive", "Remove recursively")
    .action((dir, options) => {
      console.log("remove " + dir + (options.recursive ? "recursively" : ""))
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, {
          recursive: true,
        })
      }
    })
  cli.help()
  cli.parse()
}


function brackets() {
  cli
    .command("deploy <folder>", "Deploy a folder to AWS")
    .option("-r,--scale [level]", "Scaling level")
    .action((folder, options) => {
      console.log(folder, options)
    })
  cli.parse()
}

cmdOpt()