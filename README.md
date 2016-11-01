Stream-Promise
==========

Stream-Promise is a Node.js stream to Promise conversion module.

#### Installation

```
npm install --save sb-stream-promise
```

#### API

```js
export default function createStreamPromise(stream: Stream, bytesLimit: ?number)
```

#### Example
```js
const FS = require('fs')
const createStreamPromise = require('sb-stream-promise')

createStreamPromise(FS.createReadStream(`/etc/passwd`))
  .then(function(contents) {
    console.log(contents)
  })
  .catch(function(error) {
    console.error('unable to read file', error)
  })
```

#### License
This project is licensed under the terms of MIT License. See the LICENSE file for more info.
