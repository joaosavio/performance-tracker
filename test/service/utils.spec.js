const should = require('should');

const utils = require('../../service/utils');

describe('utils', () => {
  it('isNumber', () => {
    should(utils.isNumber(undefined)).equal(false);
    should(utils.isNumber(null)).equal(false);
    should(utils.isNumber('a')).equal(false);
    should(utils.isNumber([])).equal(false);
    should(utils.isNumber({})).equal(false);

    should(utils.isNumber(0)).equal(true);
    should(utils.isNumber(1.5)).equal(true);
    should(utils.isNumber(-0.75)).equal(true);
    should(utils.isNumber('0')).equal(true);
    should(utils.isNumber('1.5')).equal(true);
    should(utils.isNumber('-0.75')).equal(true);
  });
});
