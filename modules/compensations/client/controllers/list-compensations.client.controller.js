/*(function () {
  'use strict';

  angular
    .module('compensations')
    .controller('CompensationsListController', CompensationsListController);

  CompensationsListController.$inject = ['CompensationsService'];

  function CompensationsListController(CompensationsService) {
    var vm = this;

    vm.compensations = CompensationsService.query();
  }
}());
*/
(function () {
  'use strict';

  angular
    .module('compensations')
    .controller('CompensationsListController', CompensationsListController);

<<<<<<< HEAD
  CompensationsListController.$inject = [ '$filter', 'CompensationsService'];

  function CompensationsListController( $filter, CompensationsService) {
=======
  CompensationsListController.$inject = ['$scope', '$filter', 'CompensationsService'];

  function CompensationsListController($scope, $filter, CompensationsService) {
>>>>>>> 6fc5168f4b2e53ac45a66fc0061cc876baf79d0a
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

<<<<<<< HEAD

=======
>>>>>>> 6fc5168f4b2e53ac45a66fc0061cc876baf79d0a
    CompensationsService.query(function (data) {
      vm.compensations = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.compensations, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());
<<<<<<< HEAD

=======
>>>>>>> 6fc5168f4b2e53ac45a66fc0061cc876baf79d0a
