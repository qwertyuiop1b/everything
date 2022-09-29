console.log("this is a worker thread")
console.log('typeof', typeof Worker)

// self,this --> current worker
console.log(self)
onmessage = e => {
  const message = e.data
  console.log('worker: ', e.data)
  const subWorker = 'inner func'
  importScripts('../subworker.js')  //sync can import subworker variable to global; 
  // from subworker.js
  console.log(subWorker)


  // const subWorker = new Worker('../subworker.js')
  // subWorker.onmessage = e => {
  //   console.log(e.data)
  //   console.log(`from subworker sendto worker: `, e.data)
  // }
  // subWorker.postMessage('hello subworker')

}

postMessage("hello main-js")