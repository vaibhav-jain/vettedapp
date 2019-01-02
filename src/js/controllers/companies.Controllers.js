/**
 * Companies Controllers
 */

'use strict';

/* Companies List Controller */
app.controller('CompaniesListController',
  function ($scope, $modal, ToasterService, CompaniesService) {
    $scope.companies = [];

    CompaniesService.one().get().then(
      function (success) {
        $scope.companies = success;
      }
    );
    /** Add company modal function */
    $scope.addCompany = function () {
      var addCompanyModalInstance = $modal.open({
          templateUrl: 'add_company',
          controller: 'CompanyController',
          size: undefined,
          resolve: {
            company: function () {
              return {}
            }
          }
        }
      );
      addCompanyModalInstance.result.then(
        function (company) {
          $scope.companies.push(company);
        }
      );
    };
    /** Edit company modal function */
    $scope.editCompany = function (company, index) {
      var editCompanyModalInstance = $modal.open({
          templateUrl: 'edit_company',
          controller: 'CompanyController',
          size: undefined,
          resolve: {
            company: function () {
              return company
            }
          }
        }
      );
      editCompanyModalInstance.result.then(
        function (updatedCompany) {
          $scope.companies[index].name = updatedCompany.name;
          $scope.companies[index].website = updatedCompany.website;
          $scope.companies[index].address = updatedCompany.address;
        }
      );
    };
    /** Delete Company modal function */
    $scope.deleteCompany = function (company, index) {
      var deleteCompanyModalInstance = $modal.open({
          templateUrl: 'delete_company',
          controller: 'CompanyController',
          size: undefined,
          resolve: {
            company: function () {
              return company
            }
          }
        }
      );
      deleteCompanyModalInstance.result.then(
        function (company) {
          //splice method is used to remove elements from array
          $scope.companies.splice($scope.companies.indexOf(index), 1);
        }
      );
    };
  }
);

/** Company Controller */
app.controller('CompanyController',
  function (
    $scope, $modalInstance, company,
    CompaniesService, ResponseHandlerService, ToasterService) {
    $scope.company = {};
    angular.copy(company, $scope.company);

    /** Add company modal function */
    $scope.addCompany = function () {
      return CompaniesService.one().customPOST($scope.company).then(
        function (success) {
          $modalInstance.close(success);
          ToasterService.successHandler('Success', "Company Added Successfully");
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      );
    };
    /** Edit company modal function */
    $scope.editCompany = function () {
      return CompaniesService.one($scope.company.hash).patch($scope.company).then(
        function (success) {
          $modalInstance.close(success);
          ToasterService.successHandler('Success', "Company Updated Successfully");
        },
        function (error) {
          ResponseHandlerService.errorHandler(error);
        }
      );
    };
    /** delete company modal function */
    $scope.deleteCompany = function () {
      return CompaniesService.one($scope.company.hash).remove().then(
        function (success) {
          $modalInstance.close(success);
          ToasterService.successHandler('Company', 'Removed successfully');
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
