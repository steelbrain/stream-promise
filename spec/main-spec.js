'use strict'
describe('StreamPromise', function() {
  const StreamPromise = require('../')
  const FS = require('fs')
  it('works', function() {
    waitsForPromise(function() {
      return StreamPromise.create(FS.createReadStream(`${__dirname}/fixtures/something.txt`))
        .then(function(contents) {
          expect(contents).toBe(`Something\n`)
        })
    })
  })
  it('limits by bytes', function() {
    waitsForPromise(function() {
      let Threw = false
      return StreamPromise.create(FS.createReadStream(`${__dirname}/fixtures/something.txt`), 1)
        .catch(function() {
          Threw = true
        })
        .then(function() {
          expect(Threw).toBe(true)
        })
    })
  })
})
