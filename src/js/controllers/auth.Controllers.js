/*
 Auth Controllers
 */

'use strict';

/* Login Controller */
app.controller('LoginController',
  function(
    $scope, $state, LoginService,
    UserDetailsService, ResponseHandlerService) {
    $scope.user = {};

    $scope.login = function () {
      // Logging-in User
      return LoginService.login($scope.user).then(
        function (response) {
          UserDetailsService.setUID(response.data.user.id);
          UserDetailsService.setFirstName(response.data.user.first_name);
          UserDetailsService.setLastName(response.data.user.last_name);
          UserDetailsService.setSuperAdmin(response.data.user.is_staff);
          UserDetailsService.setCompanyAdmin(response.data.user.is_admin);
          UserDetailsService.setCompanyID(response.data.user.company);
          $state.go('app.dashboard');
        },
        function(error) {
          ResponseHandlerService.errorHandler(error);
        }
      )
    }
  }
);

/* VerifyEmail Controller */
app.controller('VerifyEmailController',
  function (
    $scope, $state, $timeout, $stateParams, $filter,
    ResponseHandlerService, VerifyEmailService) {

    VerifyEmailService.post({'key': $stateParams.key}).then(
      function (success) {
        ResponseHandlerService.successHandler(success);
        console.log(success);
        $timeout(function(){$state.go('access.login')}, 2500);
      },
      function (error) {
        console.log(error);
        ResponseHandlerService.errorHandler(error);
      }
    )
  }
);

/* Logout Controller */
app.controller('LogoutController',
  function(
    $state, $localStorage, LogoutService,
    UserDetailsService) {
    // Check If User is Already Authenticated,
    // If yes clear the local storage
    // before redirecting the user to login page
    if (LogoutService.isAuthenticated()) {
      LogoutService.logout().then(
        function() {
          UserDetailsService.clear();
          $state.go('access.signin');
        }
      );
    }
    // If not then redirect the user
    // directly to Login Page
    else {
      $state.go('access.signin');
    }
  }
);
