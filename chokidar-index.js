import fs from "fs"
import chokidar from "chokidar"
const watcher = chokidar.watch("../Performance/logs", { persistent: true })   // watch folder

const log = console.log

// Add event listeners.
watcher
  .on('add', path => log(`File ${path} has been added`))
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`));
 
// More possible events.
watcher
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))



const fileWatcher = chokidar.watch("./install.js", { persistent: true})

fileWatcher.on("change", async filePath => {
  console.log(filePath)
  const content = fs.readFileSync(filePath)
  console.log(content.toString())
})




