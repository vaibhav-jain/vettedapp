/**
 * Contains API Services
 * Created by Vaibhav Jain on 22/10/16.
 * Website: https://www.kaizentechlabs.in
 * kaizentech cloud solutions private limited. All Rights Reserved.
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
