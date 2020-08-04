# egg-worker-thread

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-worker-thread.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-worker-thread
[travis-image]: https://img.shields.io/travis/eggjs/egg-worker-thread.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-worker-thread
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-worker-thread.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-worker-thread?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-worker-thread.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-worker-thread
[snyk-image]: https://snyk.io/test/npm/egg-worker-thread/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-worker-thread
[download-image]: https://img.shields.io/npm/dm/egg-worker-thread.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-worker-thread

More convenient to use worker thread for egg, using the [tarn.js](https://github.com/vincit/tarn.js) maintain thread pool

更方便的使用nodejs worker thread, 使用 [tarn.js](https://github.com/vincit/tarn.js)管理线程池



## Install

```bash
$ npm i egg-worker-thread --save
```

## 依赖说明

node 12+

## 开启插件

```js
// config/plugin.js
exports.workerThread = {
  enable: true,
  package: 'egg-worker-thread',
};
```

## 使用场景

`注意`:  对应包和外部变量，方法所在的作用域是隔离的

```js
const _ = require('lodash')
const data = 1;

// 如果有多个参数传入对象
async function test({ param1, param2 }) {
  const _ = require('lodash') // require again
  console.error(data); // undefined

  return data;
}

await app.workerThread.createWorkerThread(test,{ param1, param2 })
```


## 详细配置

参考 tarn.js 配置线程池

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

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## License

[MIT](LICENSE)
