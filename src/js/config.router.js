'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams', '$auth',
      function ($rootScope,   $state,   $stateParams, $auth) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeStart',
          function (event, toState) {
            var loginRequired = false;
            var skipRequired = false;
            // check if this state need login
            if (toState.data && toState.data.loginRequired) {
              loginRequired = true;
            }
            // if yes and if this user is not logged in, redirect him to login page
            if (loginRequired && !$auth.isAuthenticated()) {
              event.preventDefault();
              $state.go('access.signin');
            }
            // check if this state need skipping
            if (toState.data && toState.data.skipRequired) {
              skipRequired = true;
            }
          }
        )
      }
    ]
  )
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('HTTP403Interceptor');
  })
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'tpl/app.html',
            data: {loginRequired: true},
            resolve:{
              deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                  return $ocLazyLoad.load([
                    'js/controllers/header.Controller.js'
                  ]);
                }
              ]
            }
          })
          .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'tpl/dashboard.html',
            data: {loginRequired: true},
            resolve: {
              deps: ['$ocLazyLoad',
                function( $ocLazyLoad ){
                  return $ocLazyLoad.load(['js/controllers/dashboard.Controllers.js']);
                }]
            }
          })
          .state('app.companies', {
            url: '/companies',
            templateUrl: 'tpl/companies.html',
            data: {loginRequired: true},
            resolve: {
              deps: ['$ocLazyLoad',
                function( $ocLazyLoad ){
                  return $ocLazyLoad.load('smart-table').then(
                    function(){
                      return $ocLazyLoad.load('js/controllers/companies.Controllers.js');
                    }
                  );
                }]
            }
          })
          .state('app.employees', {
            url: '/employees',
            templateUrl: 'tpl/employees.html',
            data: {loginRequired: true},
            resolve: {
              deps: ['$ocLazyLoad',
                function( $ocLazyLoad ){
                  return $ocLazyLoad.load('smart-table').then(
                    function(){
                      return $ocLazyLoad.load('js/controllers/employees.Controllers.js');
                    }
                  );
                }]
            }
          })
          // pages
          .state('app.page', {
            url: '/page',
            template: '<div ui-view class="fade-in-down"></div>'
          })
          .state('app.page.profile', {
            url: '/profile',
            templateUrl: 'tpl/page_profile.html',
            data: {loginRequired: true},
            resolve: {
              deps: ['uiLoad',
                function( uiLoad ){
                  return uiLoad.load( ['js/controllers/profile.Controller.js'] );
                }]
            }
          })
          .state('access', {
            url: '/access',
            template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
          .state('access.signin', {
            url: '/signin',
            templateUrl: 'tpl/page_signin.html',
            data: {skipRequired: true},
            resolve: {
              deps: ['uiLoad',
                function( uiLoad ){
                  return uiLoad.load( ['js/controllers/auth.Controllers.js'] );
                }]
            }
          })
          .state(
            'access.logout', {
              url: '/logout/',
              template: null,
              data: {loginRequired: true},
              controller: 'LogoutController',
              resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad){
                    return $ocLazyLoad.load('js/controllers/auth.Controllers.js');
                  }
                ]
              }
            }
          )
          .state(
            'access.verify-email', {
              url: '/verify-email/:key',
              template: null,
              data: {skipRequired: true},
              controller: 'VerifyEmailController',
              resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad){
                    return $ocLazyLoad.load('js/controllers/auth.Controllers.js');
                  }
                ]
              }
            }
          );
        $urlRouterProvider.otherwise('/access/signin');
      }
    ]
  );
