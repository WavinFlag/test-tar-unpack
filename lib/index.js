const fs = require('fs')
const childProcess = require('child_process')

const unpack = require('tar-pack').unpack


const once = fn => {
  let invoked = false
  return function (...args) {
    if (invoked) {
      return
    }
    invoked = true
    fn.call(this, ...args)
  }
}


function extract(packFile, destPath) {
  console.log(`Node version: ${process.version}`)
  console.log()
  console.log(`unpack ${packFile}`)
  console.log(`into ${destPath}`)
  console.log()

  let count = 0
  let onUnpacked = () => {
    count++
    const cmd = `ls -alF ${destPath}`
    console.log()
    console.log(`after unpack list dest directory: ${count}`)
    console.log(`+ ${cmd}`)
    console.log(childProcess.execSync(cmd, { encoding: 'utf-8' }))
  }
  // onUnpacked = once(onUnpacked)

  const reader = fs.createReadStream(packFile)

  const unpackOptions = {
    // keepFiles: true,
  }
  const writer = unpack(destPath, unpackOptions, err => {
    if (err) {
      console.log('unpack error', err)
    } else {
      console.log('unpack success')
      // onUnpacked()
    }
  })

  reader.pipe(writer)

  reader.on('end', () => { console.log('reader on end') })
  reader.on('close', () => { console.log('reader on close') })
  reader.on('error', () => {
    console.log('reader on error, close writer')
    writer.end()
  })

  writer.on('end', () => { console.log('writer on end') })
  writer.on('close', () => {
    console.log('writer on close')
    onUnpacked()
  })
}


module.exports = extract
