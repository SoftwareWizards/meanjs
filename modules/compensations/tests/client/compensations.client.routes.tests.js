(function () {
  'use strict';

  describe('Compensations Route Tests', function () {
    // Initialize global variables
    var $scope,
      CompensationsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CompensationsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CompensationsService = _CompensationsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('compensations');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/compensations');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          CompensationsController,
          mockCompensation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('compensations.view');
          $templateCache.put('modules/compensations/client/views/view-compensation.client.view.html', '');

          // create mock Compensation
          mockCompensation = new CompensationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Compensation Name'
          });

          // Initialize Controller
          CompensationsController = $controller('CompensationsController as vm', {
            $scope: $scope,
            compensationResolve: mockCompensation
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:compensationId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.compensationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            compensationId: 1
          })).toEqual('/compensations/1');
        }));

        it('should attach an Compensation to the controller scope', function () {
          expect($scope.vm.compensation._id).toBe(mockCompensation._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/compensations/client/views/view-compensation.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CompensationsController,
          mockCompensation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('compensations.create');
          $templateCache.put('modules/compensations/client/views/form-compensation.client.view.html', '');

          // create mock Compensation
          mockCompensation = new CompensationsService();

          // Initialize Controller
          CompensationsController = $controller('CompensationsController as vm', {
            $scope: $scope,
            compensationResolve: mockCompensation
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.compensationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/compensations/create');
        }));

        it('should attach an Compensation to the controller scope', function () {
          expect($scope.vm.compensation._id).toBe(mockCompensation._id);
          expect($scope.vm.compensation._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/compensations/client/views/form-compensation.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CompensationsController,
          mockCompensation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('compensations.edit');
          $templateCache.put('modules/compensations/client/views/form-compensation.client.view.html', '');

          // create mock Compensation
          mockCompensation = new CompensationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Compensation Name'
          });

          // Initialize Controller
          CompensationsController = $controller('CompensationsController as vm', {
            $scope: $scope,
            compensationResolve: mockCompensation
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:compensationId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.compensationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            compensationId: 1
          })).toEqual('/compensations/1/edit');
        }));

        it('should attach an Compensation to the controller scope', function () {
          expect($scope.vm.compensation._id).toBe(mockCompensation._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/compensations/client/views/form-compensation.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
