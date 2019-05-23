const should = require('should');

describe('index', () => {
  // eslint-disable-next-line no-unused-vars
  let performanceTracker;
  beforeEach(() => {
    performanceTracker = require('../index');
  });

  it('api', () => {
    should(performanceTracker.operationService).not.be.undefined();
  });
});
