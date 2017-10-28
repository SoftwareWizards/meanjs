'use strict';

describe('Builders E2E Tests:', function () {
  describe('Test Builders page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/builders');
      expect(element.all(by.repeater('builder in builders')).count()).toEqual(0);
    });
  });
});
