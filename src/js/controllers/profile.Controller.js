/**
 * Profile Controller
 */

'use strict';

/* Profile Controller */
app.controller('ProfileController',
  function (
    $scope, UserDetailsService,
    EmployeesService, ResponseHandlerService) {
    $scope.user = {
      profile:{
        first_name: UserDetailsService.getFirstName(),
        last_name: UserDetailsService.getLastName()
      },
      company: UserDetailsService.getCompanyID()
    };

    $scope.save = function () {
      EmployeesService.one(UserDetailsService.getCompanyID())
        .one('', '10').patch($scope.user).then(
        function (success) {
          $scope.user = success;
          ToasterService.successHandler('Success', "Profile Updated Successfully");
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      );
    }
  }
);
