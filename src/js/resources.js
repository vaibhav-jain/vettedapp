/**
 * REST API Resources
 */

'use strict';

/* Login API */
app.factory('LoginAPI',
  ['$auth',
    function ($auth) {
      return $auth;
    }
  ]
);

/* Logout API */
app.factory('LogoutAPI',
  ['$auth',
    function ($auth) {
      return $auth;
    }
  ]
);

/* Signup API */
app.factory('SignupAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('signup');
    }
  ]
);

/* VerifyEmail API */
app.factory('VerifyEmailAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('/signup/verify-email');
    }
  ]
);

/* ResetPassword API */
app.factory('ResetPasswordAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('/password/reset');
    }
  ]
);

/* ResetPasswordConfirm API */
app.factory('ResetPasswordConfirmAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('/password/reset/confirm');
    }
  ]
);

/* Companies API */
app.factory('CompaniesAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('companies');
    }
  ]
);

/* Employees API */
app.factory('EmployeesAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('employees');
    }
  ]
);

/* CountWidget API */
app.factory('CountWidgetAPI',
  ['Restangular',
    function (Restangular) {
      return Restangular.service('count-widget');
    }
  ]
);
