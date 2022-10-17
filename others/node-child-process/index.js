const { spawn, exec } = require('child_process')
const iconv = require('iconv-lite')

// const dir = spawn('dir')  // 不生成shell，所以无法执行dir

const dir = spawn('dir', [], {
  shell: true                //加个shell参数，生成shell
})

// const dir = exec('dir')  //这个会乱码


dir.stdout.on("data", data => {
  const str = iconv.decode(data, 'gbk')
  console.log(str)
})

dir.stderr.on('data', data => {
  const str = iconv.decode(data, 'gbk')
  console.log(str)
})

dir.on('close', code => {
  console.log(`process existed code is ${code}`)
})

dir.on('error', err => {
  console.log(err)
})