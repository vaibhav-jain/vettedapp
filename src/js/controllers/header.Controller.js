/**
 * Header Controller
 */

'use strict';

/* Header Controller */
app.controller('HeaderController',
  function ($scope, UserDetailsService) {
    $scope.user = {};
    $scope.user.firstName = UserDetailsService.getFirstName();
    $scope.user.LastName = UserDetailsService.getFirstName();
  }
);
