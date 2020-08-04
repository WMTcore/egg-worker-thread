# egg-worker-thread

[![NPM version][npm-image]][npm-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-worker-thread.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-worker-thread
[snyk-image]: https://snyk.io/test/npm/egg-worker-thread/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-worker-thread
[download-image]: https://img.shields.io/npm/dm/egg-worker-thread.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-worker-thread

More convenient to use worker thread for egg, using the [tarn.js](https://github.com/vincit/tarn.js) maintain thread pool

## Install

```bash
$ npm i egg-worker-thread --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.workerThread = {
  enable: true,
  package: 'egg-worker-thread',
};
```

## Configuration

reference tarn.js config

```js
// {app_root}/config/config.default.js
exports.workerThread = {
  min: 0,
  max: 5,
  // acquire promises are rejected after this many milliseconds
  // if a resource cannot be acquired
  acquireTimeoutMillis: 30000,

  // create operations are cancelled after this many milliseconds
  // if a resource cannot be acquired
  createTimeoutMillis: 30000,

  // destroy operations are awaited for at most this many milliseconds
  // new resources will be created after this timeout
  destroyTimeoutMillis: 5000,

  // free resouces are destroyed after this many milliseconds
  idleTimeoutMillis: 30000,

  // how often to check for idle resources to destroy
  reapIntervalMillis: 1000,

  // how long to idle after failed create before trying again
  createRetryIntervalMillis: 200,

  // If true, when a create fails, the first pending acquire is
  // rejected with the error. If this is false (the default) then
  // create is retried until acquireTimeoutMillis milliseconds has
  // passed.
  propagateCreateError: false,
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example
`Attention`: The scope of the method is isolated for package and variable

```js
const _ = require('lodash')
const data = 1;

// The parameter need to be object for more arguments
async function test({ param1, param2 }) {
  const _ = require('lodash') // require again
  console.error(data); // undefined

  return data;
}

await app.workerThread.createWorkerThread(test,{ param1, param2 })
```


## License

[MIT](LICENSE)
