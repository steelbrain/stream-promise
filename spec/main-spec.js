/* @flow */

import FS from 'fs'
import Path from 'path'
import { it } from 'jasmine-fix'
import createStreamPromise from '../src'

describe('StreamPromise', function() {
  function getFixturePath(path: string) {
    return Path.join(__dirname, 'fixtures', path)
  }

  it('works', async function() {
    const stream = FS.createReadStream(getFixturePath('something.txt'))
    const contents = await createStreamPromise(stream)
    expect(contents).toBe('Something\n')
  })
  it('throws when contents are above limit', async function() {
    const stream = FS.createReadStream(getFixturePath('something.txt'))
    try {
      await createStreamPromise(stream, 1)
      expect(false).toBe(true)
    } catch (error) {
      expect(error.message).toBe('Stream body too big')
    }
  })
  it('does not throw when contents are at limit', async function() {
    const stream = FS.createReadStream(getFixturePath('something.txt'))
    const contents = await createStreamPromise(stream, 10)
    expect(contents).toBe('Something\n')
  })
  it('does not throw when contents are below limit', async function() {
    const stream = FS.createReadStream(getFixturePath('something.txt'))
    const contents = await createStreamPromise(stream, 10)
    expect(contents).toBe('Something\n')
  })
  it('throws when stream throws', async function() {
    const stream = FS.createReadStream(getFixturePath('some-non-existing-file.txt'))
    try {
      await createStreamPromise(stream, 1)
      expect(false).toBe(true)
    } catch (error) {
      expect(error.code).toBe('ENOENT')
    }
  })
})
