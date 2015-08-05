'use strict'

class StreamPromise {
  static create(stream, bytesLimit) {
    return new Promise(function(resolve, reject) {
      const Data = []
      let dataLength = 0
      let status = true
      stream.on('data', function(data) {
        if (!status) return
        data = data.toString()
        dataLength += data.length
        if (dataLength >= bytesLimit) {
          status = false
          reject(new Error('Too long'))
        }
        Data.push(data)
      })
      stream.on('error', function(e) {
        reject(e)
      })
      stream.on('end', function() {
        resolve(Data.join(''))
      })
    })
  }
}

module.exports = StreamPromise
