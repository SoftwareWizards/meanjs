(function () {
  'use strict';

  describe('Builders Route Tests', function () {
    // Initialize global variables
    var $scope,
      BuildersService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _BuildersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      BuildersService = _BuildersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('builders');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/builders');
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
          BuildersController,
          mockBuilder;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('builders.view');
          $templateCache.put('modules/builders/client/views/view-builder.client.view.html', '');

          // create mock Builder
          mockBuilder = new BuildersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Builder Name'
          });

          // Initialize Controller
          BuildersController = $controller('BuildersController as vm', {
            $scope: $scope,
            builderResolve: mockBuilder
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:builderId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.builderResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            builderId: 1
          })).toEqual('/builders/1');
        }));

        it('should attach an Builder to the controller scope', function () {
          expect($scope.vm.builder._id).toBe(mockBuilder._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/builders/client/views/view-builder.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          BuildersController,
          mockBuilder;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('builders.create');
          $templateCache.put('modules/builders/client/views/form-builder.client.view.html', '');

          // create mock Builder
          mockBuilder = new BuildersService();

          // Initialize Controller
          BuildersController = $controller('BuildersController as vm', {
            $scope: $scope,
            builderResolve: mockBuilder
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.builderResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/builders/create');
        }));

        it('should attach an Builder to the controller scope', function () {
          expect($scope.vm.builder._id).toBe(mockBuilder._id);
          expect($scope.vm.builder._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/builders/client/views/form-builder.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          BuildersController,
          mockBuilder;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('builders.edit');
          $templateCache.put('modules/builders/client/views/form-builder.client.view.html', '');

          // create mock Builder
          mockBuilder = new BuildersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Builder Name'
          });

          // Initialize Controller
          BuildersController = $controller('BuildersController as vm', {
            $scope: $scope,
            builderResolve: mockBuilder
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:builderId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.builderResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            builderId: 1
          })).toEqual('/builders/1/edit');
        }));

        it('should attach an Builder to the controller scope', function () {
          expect($scope.vm.builder._id).toBe(mockBuilder._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/builders/client/views/form-builder.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
