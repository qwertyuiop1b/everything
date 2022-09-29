

// a new client connects
const messages = []
onconnect =  evt => {
  console.log('this is a shared worker')
  const port = evt.ports[0]
  port.onmessage = e => {
    const data = e.data
    console.log(data)
    messages.push(data)

    
    port.postMessage(messages)
  }
  port.postMessage('gogo')
  // port.start() 不需要
}
