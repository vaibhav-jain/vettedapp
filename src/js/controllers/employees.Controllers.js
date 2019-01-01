/**
 * Employees Controllers
 */

'use strict';

/* Employees List Controller */
app.controller('EmployeesListController',
  function ($scope, EmployeesService) {
    $scope.employees = [];
    EmployeesService.one().get().then(
      function (success) {
        $scope.employees = success;
      }
    );
  }
);
