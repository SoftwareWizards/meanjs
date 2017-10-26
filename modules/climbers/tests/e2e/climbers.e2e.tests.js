'use strict';

describe('Climbers E2E Tests:', function () {
  describe('Test Climbers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/climbers');
      expect(element.all(by.repeater('climber in climbers')).count()).toEqual(0);
    });
  });
});
