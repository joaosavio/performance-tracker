const should = require('should');

describe('environmentService', () => {
  let service;

  beforeEach(() => {
    service = require('../../service/environment_service')();
  });

  it('getConfig', () => {
    const expected = {
      useProcessTime: true,
    };

    should(service.getConfig()).deepEqual(expected);
  });

  it('getConfig - forceUseDate', () => {
    const expected = {
      useProcessTime: false,
    };

    service = require('../../service/environment_service')({ forceUseDate: true });
    should(service.getConfig()).deepEqual(expected);
  });
});
