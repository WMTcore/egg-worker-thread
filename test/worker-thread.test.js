'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/worker-thread.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/worker-thread-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should faster then before', async () => {
    const easyWorkerThread = app.workerThread;

    let time = Date.now();
    function calculate() {
      // eslint-disable-next-line no-empty
      for (let i = 0; i < 1000000000; i++) {
        i * (i - 1);
      }
    }

    await Promise.all([
      calculate(),
      calculate(),
      calculate(), calculate() ]);

    const spendTime = Date.now() - time;

    time = Date.now();
    await Promise.all([
      easyWorkerThread.createWorkerThread(calculate),
      easyWorkerThread.createWorkerThread(calculate),
      easyWorkerThread.createWorkerThread(calculate),
      easyWorkerThread.createWorkerThread(calculate) ]);

    assert(spendTime / 2 > Date.now() - time);
  });
});
