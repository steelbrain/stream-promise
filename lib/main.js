'use strict'

class StreamPromise {
  static create(stream, bytesLimit) {
    const Deferred = Promise.defer()
    const Data = []
    let dataLength = 0
    let status = true
    stream.on('data', function(data) {
      if (!status) return
      data = data.toString()
      dataLength += data.length
      if (dataLength >= bytesLimit) {
        status = false
        Deferred.reject(new Error('Too long'))
      }
      Data.push(data)
    })
    stream.on('end', function() {
      Deferred.resolve(Data.join(''))
    })
    return Deferred.promise
  }
}

module.exports = StreamPromise
