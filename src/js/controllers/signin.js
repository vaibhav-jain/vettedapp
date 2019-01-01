'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = 'Email or Password not right';
        }else{
          $state.go('app.dashboard-v1');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
;


/* Login Controller */
app.controller('LoginController',
  function(
    $scope, $state, LoginService,
    ResponseHandlerService) {
    $scope.user = {};

    $scope.login = function () {
      // Logging-in User
      return LoginService.login($scope.user).then(
        function (response) {
          $state.go('app.dashboard');
        },
        function(error) {
          ResponseHandlerService.errorHandler(error);
        }
      )
    }
  }
);