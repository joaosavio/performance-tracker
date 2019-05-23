const should = require('should');

const utils = require('../../service/utils');

const sleepTime = 100;
const threshold = 50;
const minValue = sleepTime - threshold;
const maxValue = sleepTime + threshold;

describe('timerService', () => {
  let service;
  let startTime;
  let stopTime;
  let fixedStartTime;
  let fixedStopTime;
  let fixedTotalTime;

  beforeEach((done) => {
    service = require('../../service/timer_service')();

    fixedStartTime = 527585000.243;
    fixedStopTime = 527590000.261;
    fixedTotalTime = fixedStopTime - fixedStartTime;

    startTime = utils.hrtimeToNumber(process.hrtime());
    setTimeout(() => {
      stopTime = utils.hrtimeToNumber(process.hrtime());

      done();
    }, sleepTime);
  });

  it('getCurrentTime', () => {
    const result = service.getCurrentTime();
    should(utils.isNumber(result)).be.true();
  });

  it('getDuration - invalid', () => {
    should(service.getDuration(undefined, undefined)).equal(-1);
    should(service.getDuration(undefined, stopTime)).equal(-1);
    should(service.getDuration(startTime, undefined)).equal(-1);
  });

  it('getDuration - fixed', () => {
    should(service.getDuration(fixedStartTime, fixedStopTime)).equal(fixedTotalTime);
  });

  it('getDuration - dynamic', () => {
    const result = service.getDuration(startTime, stopTime);
    should(result).greaterThanOrEqual(minValue);
    should(result).lessThanOrEqual(maxValue);
  });
});

describe('timerService - forceUseDate', () => {
  let service;
  let startTime;
  let stopTime;
  let fixedStartTime;
  let fixedStopTime;
  let fixedTotalTime;

  beforeEach((done) => {
    service = require('../../service/timer_service')({ forceUseDate: true });

    fixedStartTime = 1558587270286.0;
    fixedStopTime = 1558587275295.0;
    fixedTotalTime = fixedStopTime - fixedStartTime;

    startTime = Date.now();
    setTimeout(() => {
      stopTime = Date.now();

      done();
    }, sleepTime);
  });

  it('getCurrentTime', () => {
    const result = service.getCurrentTime();
    should(utils.isNumber(result)).be.true();
  });

  it('getDuration - invalid', () => {
    should(service.getDuration(undefined, undefined)).equal(-1);
    should(service.getDuration(undefined, stopTime)).equal(-1);
    should(service.getDuration(startTime, undefined)).equal(-1);
  });

  it('getDuration - fixed', () => {
    should(service.getDuration(fixedStartTime, fixedStopTime)).equal(fixedTotalTime);
  });

  it('getDuration - dynamic', () => {
    const result = service.getDuration(startTime, stopTime);
    should(result).greaterThanOrEqual(minValue);
    should(result).lessThanOrEqual(maxValue);
  });
});
