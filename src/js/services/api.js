/**
 * Contains API Services
 */

'use strict';

/* Login Service */
app.service('LoginService',
  function (LoginAPI) {
    return LoginAPI
  }
);

/* Logout Service */
app.service('LogoutService',
  function (LogoutAPI) {
    return LogoutAPI
  }
);

/* Signup Service */
app.service('SignupService',
  function (SignupAPI) {
    return SignupAPI
  }
);

/* VerifyEmail Service */
app.service('VerifyEmailService',
  function (VerifyEmailAPI) {
    return VerifyEmailAPI
  }
);

/* ResetPassword Service */
app.service('ResetPasswordService',
  function (ResetPasswordAPI) {
    return ResetPasswordAPI
  }
);

/* ResetPasswordConfirm Service */
app.service('ResetPasswordConfirmService',
  function (ResetPasswordConfirmAPI) {
    return ResetPasswordConfirmAPI
  }
);

/* Users Service */
app.service('UsersService',
  function (UsersAPI) {
    return UsersAPI
  }
);

/* Companies Service */
app.service('CompaniesService',
  function (CompaniesAPI) {
    return CompaniesAPI
  }
);

/* Employees Service */
app.service('EmployeesService',
  function (EmployeesAPI) {
    return EmployeesAPI
  }
);

/* CountWidget Service */
app.service('CountWidgetService',
  function (CountWidgetAPI) {
    return CountWidgetAPI
  }
);
