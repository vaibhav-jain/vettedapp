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
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG) {
        $urlRouterProvider
          .otherwise('/app/dashboard-v1');
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'tpl/app.html'
          })
          .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'tpl/app_dashboard_v1.html',
            data: {loginRequired: true},
            resolve: {
              deps: ['$ocLazyLoad',
                function( $ocLazyLoad ){
                  return $ocLazyLoad.load(['js/controllers/chart.js']);
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
            templateUrl: 'tpl/page_profile.html'
          })
          .state('app.page.post', {
            url: '/post',
            templateUrl: 'tpl/page_post.html'
          })
          // others
          .state('lockme', {
            url: '/lockme',
            templateUrl: 'tpl/page_lockme.html'
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
                  return uiLoad.load( ['js/controllers/signin.js'] );
                }]
            }
          })
          .state('access.signup', {
            url: '/signup',
            templateUrl: 'tpl/page_signup.html',
            resolve: {
              deps: ['uiLoad',
                function( uiLoad ){
                  return uiLoad.load( ['js/controllers/signup.js'] );
                }]
            }
          })
          .state('access.forgotpwd', {
            url: '/forgotpwd',
            templateUrl: 'tpl/page_forgotpwd.html'
          })
          .state('access.404', {
            url: '/404',
            templateUrl: 'tpl/page_404.html'
          })
          .state('layout', {
            abstract: true,
            url: '/layout',
            templateUrl: 'tpl/layout.html'
          })
          .state('layout.fullwidth', {
            url: '/fullwidth',
            views: {
              '': {
                templateUrl: 'tpl/layout_fullwidth.html'
              },
              'footer': {
                templateUrl: 'tpl/layout_footer_fullwidth.html'
              }
            },
            resolve: {
              deps: ['uiLoad',
                function( uiLoad ){
                  return uiLoad.load( ['js/controllers/vectormap.js'] );
                }]
            }
          })
      }
    ]
  );
