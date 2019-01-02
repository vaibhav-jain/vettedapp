/**
 * Contains utility services.
 */

/* UserDetails Service */
app.service('UserDetailsService',
  ['$localStorage',
    function ($localStorage) {
      this.setUID = function (id) {
        $localStorage._uid = id
      };
      this.getUID = function () {
        return $localStorage._uid
      };
      this.setSuperAdmin = function (is_super_admin) {
        $localStorage._usuperadmin = is_super_admin
      };
      this.getSuperAdmin = function () {
        return $localStorage._usuperadmin
      };
      this.setCompanyAdmin = function (is_company_admin) {
        $localStorage._ucompanyadmin = is_company_admin
      };
      this.getCompanyAdmin = function () {
        return $localStorage._ucompanyadmin
      };
      this.setFirstName = function (firstName) {
        $localStorage._ufirstname = firstName
      };
      this.getFirstName = function () {
        return $localStorage._ufirstname
      };
      this.setLastName = function (lastName) {
        $localStorage._ulastname = lastName
      };
      this.getLastName = function () {
        return $localStorage._ulastname
      };
      this.setEmail = function (email) {
        $localStorage._uemail = email
      };
      this.getEmail = function () {
        return $localStorage._uemail
      };
      this.setCompanyID = function (company) {
        $localStorage._ucompanyid = company
      };
      this.getCompanyID = function () {
        return $localStorage._ucompanyid
      };
      this.clear = function () {
        delete $localStorage._uid;
        delete $localStorage._ufirstname;
        delete $localStorage._ulastname;
        delete $localStorage._usuperadmin;
        delete $localStorage._ucompanyadmin;
        delete $localStorage._ucompanyid;
        delete $localStorage._uemail;
      }
    }
  ]
);

/* Toaster Service */
app.service('ToasterService',
  function (toaster) {
    this.successHandler = function (title, message) {
      return toaster.pop('success', title, message);
    };
    this.errorHandler = function (title, message) {
      return toaster.pop('error', title, message);
    }
  }
);

/* Response Handler Service */
app.service('ResponseHandlerService',
  function (ToasterService) {
    this.successHandler = function (response) {
      if (response.success instanceof Array){
        ToasterService.successHandler('Success', response.success[0]);
      }else{
        ToasterService.successHandler('Success', response.success);
      }
    };
    this.errorHandler = function (response) {
      for (var data in response.data){
        if (response.data.hasOwnProperty(data)){
          if (data == 'non_field_errors'){
            ToasterService.errorHandler('Error', response.data[data][0])
          }else {
            ToasterService.errorHandler(data, message=response.data[data][0])
          }
        }
      }
    }
  }
);