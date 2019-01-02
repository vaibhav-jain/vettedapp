/**
 * Dashboard Controllers
 */

'use strict';

/* Dashboard Controller */
app.controller('DashboardController',
  function ($scope, CountWidgetService) {
    $scope.company_count = null;
    $scope.employee_count = null;

    CountWidgetService.one('').get().then(
      function (success) {
        $scope.companies = success.companies;
        $scope.employees = success.employees;
      }
    );
  }
);
