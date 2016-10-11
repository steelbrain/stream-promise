/* @flow */

function createStreamPromise(stream: Object, bytesLimit: ?number): Promise<string> {
  return new Promise(function(resolve, reject) {
    let data = []
    let dataLength = 0

    stream.on('data', function(chunk) {
      if (!Array.isArray(data)) {
        // Stream harvesting closed
        return
      }
      dataLength += chunk.length
      if (dataLength > bytesLimit) {
        data = null
        reject(new Error('Stream body too big'))
      } else {
        data.push(chunk)
      }
    })

    stream.on('error', function(error) {
      data = null
      reject(error)
    })
    stream.on('end', function() {
      if (data) {
        resolve(data.join(''))
      }
    })
  })
}

module.exports = createStreamPromise
