const should = require('should');

const utils = require('../../service/utils');

describe('operationService', () => {
  let service;
  let name1;
  let name2;
  let key1;
  let key2;
  let mapKey1;
  let mapKey2;

  beforeEach(() => {
    service = require('../../service/operation_service')();

    name1 = 'test1';
    name2 = 'test2';
    key1 = 'key1';
    key2 = undefined;

    mapKey1 = service.getMapKey(name1, key1);
    mapKey2 = service.getMapKey(name2, key2);
  });

  it('happy path', (done) => {
    should(service.getTimerMap()[mapKey1]).be.undefined();
    should(service.getTimerMap()[mapKey2]).be.undefined();

    service.start(name1, key1);
    should(service.getTimerMap()[mapKey1]).not.be.undefined();
    should(service.getTimerMap()[mapKey2]).be.undefined();

    service.start(name2, key2);
    should(service.getTimerMap()[mapKey1]).not.be.undefined();
    should(service.getTimerMap()[mapKey2]).not.be.undefined();

    setTimeout(() => {
      service.stop(name1, key1);
      should(service.getTimerMap()[mapKey1]).not.be.undefined();
      should(service.getTimerMap()[mapKey2]).not.be.undefined();

      service.stop(name2, key2);
      should(service.getTimerMap()[mapKey1]).not.be.undefined();
      should(service.getTimerMap()[mapKey2]).not.be.undefined();

      const result1 = service.getTime(name1, key1);
      should(utils.isNumber(result1)).be.true();
      should(service.getTimerMap()[mapKey1]).be.undefined();
      should(service.getTimerMap()[mapKey2]).not.be.undefined();

      const result2 = service.getTime(name2, key2);
      should(utils.isNumber(result2)).be.true();
      should(service.getTimerMap()[mapKey1]).be.undefined();
      should(service.getTimerMap()[mapKey2]).be.undefined();

      done();
    }, 100);
  });
});
