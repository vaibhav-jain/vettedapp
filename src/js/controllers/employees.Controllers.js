/**
 * Employees Controllers
 */

'use strict';

/* Employees List Controller */
app.controller('EmployeesListController',
  function (
    $scope, $modal,
    EmployeesService, UserDetailsService) {
    $scope.employees = [];

    EmployeesService.one(UserDetailsService.getCompanyID())
      .get().then(
      function (success) {
        $scope.employees = success;
      }
    );
    /** Add employee modal function */
    $scope.addEmployee = function () {
      var addEmployeeModalInstance = $modal.open({
          templateUrl: 'add_employee',
          controller: 'EmployeeController',
          size: undefined,
          resolve: {
            employee: function () {
              return {}
            }
          }
        }
      );
      addEmployeeModalInstance.result.then(
        function (employee) {
          $scope.employees.push(employee);
        }
      );
    };
    /** Edit employee modal function */
    $scope.editEmployee = function (employee, index) {
      var editEmployeeModalInstance = $modal.open({
          templateUrl: 'edit_employee',
          controller: 'EmployeeController',
          size: undefined,
          resolve: {
            employee: function () {
              return employee
            }
          }
        }
      );
      editEmployeeModalInstance.result.then(
        function (updatedEmployee) {
          $scope.employees[index] = updatedEmployee;
        }
      );
    };
    /** Delete Employee modal function */
    $scope.deleteEmployee = function (employee, index) {
      var deleteEmployeeModalInstance = $modal.open({
          templateUrl: 'delete_employee',
          controller: 'EmployeeController',
          size: undefined,
          resolve: {
            employee: function () {
              return employee
            }
          }
        }
      );
      deleteEmployeeModalInstance.result.then(
        function (employee) {
          //splice method is used to remove elements from array
          $scope.employees.splice(index, 1);
        }
      );
    };
  }
);

/** Employee Controller */
app.controller('EmployeeController',
  function (
    $scope, $modalInstance, employee,
    EmployeesService, SignupService, UserDetailsService,
    ResponseHandlerService, ToasterService) {
    $scope.employee = {};
    angular.copy(employee, $scope.employee);

    /** Add employee modal function */
    $scope.addEmployee = function () {
      $scope.employee.company = UserDetailsService.getCompanyID();
      return SignupService.one().customPOST($scope.employee).then(
        function (success) {
          var employee = {
            profile:{
              'first_name': $scope.employee.first_name,
              'last_name': $scope.employee.last_name,
              'username': $scope.employee.username,
              'email': $scope.employee.email
            },
            is_admin: $scope.employee.is_admin
          };
          $modalInstance.close(employee);
          ToasterService.successHandler('Success', "Employee Added Successfully");
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      );
    };
    /** Edit Employee modal function */
    $scope.editEmployee = function () {
      return EmployeesService.one(UserDetailsService.getCompanyID())
        .one('', $scope.employee.id).patch($scope.employee).then(
          function (success) {
            $modalInstance.close(success);
            ToasterService.successHandler('Success', "Employee Updated Successfully");
          },
          function (error) {
            ResponseHandlerService.errorHandler(error);
          }
        );
    };
    /** delete Employee modal function */
    $scope.deleteEmployee = function () {
      return EmployeesService.one(UserDetailsService.getCompanyID())
        .one('', $scope.employee.id).remove().then(
          function (success) {
            $modalInstance.close(success);
            ToasterService.successHandler('Employee', 'Removed successfully');
          },
          function (error) {
            ResponseHandlerService.errorHandler(error);
          }
        );
    };
    /** Cancel modal function */
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
);
