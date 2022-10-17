// const { spawn } = require("child_process")
const { spawn } = require('cross-spawn')
const iconv = require('iconv-lite') // 解决乱码问题

// const dir = spawn('node', ['test.js']) // 这个ok
const dir = spawn('dir', ['.']) // window 执行报错...;换成cross-spawn库就可以执行


// data buffer
dir.stdout.on('data', data => {
  const str = iconv.decode(data, 'gbk') // window标准输入输出默认编码是gbk
  console.log(`stdout: ${str}`)
})

dir.stderr.on('data', data => {
  console.log(`stderr: ${data}`)
})

dir.on('close', code => {
  console.log(`child process exited with code ${code}`)
})

dir.on('error', err => {
  console.log(`err: ${err}`)
})

