/**
 * nodejs event loop 运行在主线程里，i/o tasks 交给幕后的thread来处理，执行完成回调到主线程中，这个幕后的线程是由libuv来管理的
 * 对于CPU密集型任务来说,
 */

// cpu 密集型任务
import { Worker, isMainThread } from "worker_threads"
import crypto from "crypto"
import path from "path"
const largeAry = ["1","2","3","4","5"]
for (const elt of largeAry) {
  const hash = crypto.createHash("sha256", "dfsa8ho89hn").update(elt).digest("hex")
  console.log(hash)
}

const url = import.meta.url
path.resolve(url.slice())

if (isMainThread) {
  console.log("inside man thread")
  new Worker(__filename)
} else {
  console.log("inside worker thread")
  console.log("isMainThread:", isMainThread)
}
