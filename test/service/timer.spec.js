const should = require('should');

const sleepTime = 100;
const threshold = 50;
const minValue = sleepTime - threshold;
const maxValue = sleepTime + threshold;

describe('timer', () => {
  let timer;

  beforeEach(() => {
    const Timer = require('../../service/timer')();
    timer = new Timer();
  });

  it('happy path', (done) => {
    timer.start();
    setTimeout(() => {
      timer.stop();
      let result = timer.getTime();
      should(result).greaterThanOrEqual(minValue);
      should(result).lessThanOrEqual(maxValue);

      result = timer.getTime();
      should(result).greaterThanOrEqual(minValue);
      should(result).lessThanOrEqual(maxValue);

      done();
    }, sleepTime);
  });

  it('bad path', (done) => {
    let result = timer.getTime();
    should(result).equal(-1);

    timer.stop();
    setTimeout(() => {
      result = timer.getTime();
      should(result).equal(-1);

      timer.start();
      result = timer.getTime();
      should(result).equal(-1);

      done();
    }, sleepTime);
  });
});
