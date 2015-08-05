Stream-Promise
==========

Stream-Promise is a tiny nodejs stream to Promise converter module, and that's pretty much it.

#### API
```js
class StreamPromise {
  static create(Stream):Promise<string>
}
```

#### Example
```js
const StreamPromise = require('sb-stream-promise')
const FS = require('fs')
StreamPromise.create(FS.createReadStream(`/etc/passwd`))
  .then(function(contents) {
    console.log(contents)
  })
```

#### License
This project is licensed under the terms of MIT License. See the LICENSE file for more info.
