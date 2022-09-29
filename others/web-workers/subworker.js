console.log("this is subworker.js")
console.log('subworker', self)
const subWorker = 'hello subworker'
onmessage = e => {
  console.log("subworker:",e.data)
}

postMessage("subworker")