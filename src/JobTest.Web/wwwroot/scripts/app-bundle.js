define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Jobs Task';
      config.map([{ route: ['', 'Home'], name: 'home', moduleId: 'components/home', nav: true, title: 'Home' }, { route: 'task1', name: 'task1', moduleId: 'components/task1', nav: true, title: 'Task 1' }, { route: 'task2', name: 'task2', moduleId: 'components/task2', nav: true, title: 'Task 2' }, { route: 'task3', name: 'task3', moduleId: 'components/task3', nav: true, title: 'Task 3' }, { route: 'task4', name: 'task4', moduleId: 'components/task4', nav: true, title: 'Task 4' }, { route: 'task5', name: 'task5', moduleId: 'components/task5', nav: true, title: 'Task 5' }]);

      this.router = router;
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'bootstrap'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-dialog');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('data/apiPath',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ApiPath = exports.ApiPath = function ApiPath() {
    _classCallCheck(this, ApiPath);

    this.baseUrl = 'api/';
    this.company = 'company';
    this.user = 'user';
    this.value = 'values';
  };
});
define('data/companyService',['exports', 'aurelia-fetch-client', './apiPath'], function (exports, _aureliaFetchClient, _apiPath) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CompanyService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CompanyService = exports.CompanyService = function () {
    CompanyService.inject = function inject() {
      return [_aureliaFetchClient.HttpClient, _apiPath.ApiPath];
    };

    function CompanyService(httpClient, apiPath) {
      var _this = this;

      _classCallCheck(this, CompanyService);

      this.http = httpClient;
      this.apiPath = apiPath;

      this.http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl(_this.apiPath.baseUrl);
      });
    }

    CompanyService.prototype.getCompanies = function getCompanies(fromCache) {
      var _this2 = this;

      if (!fromCache) {
        this.companies = null;
      }
      var promise = new Promise(function (resolve, reject) {
        if (!_this2.companies) {
          _this2.http.fetch(_this2.apiPath.company).then(function (response) {
            _this2.companies = response.json();
            resolve(_this2.companies);
          });
        } else {
          resolve(_this2.companies);
        }
      });
      return promise;
    };

    CompanyService.prototype.creatCompany = function creatCompany(company) {
      var _this3 = this;

      var promise = new Promise(function (resolve, reject) {
        _this3.http.fetch(_this3.apiPath.company, {
          method: 'POST',
          body: (0, _aureliaFetchClient.json)(company)
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          resolve(data);
        }).catch(function (err) {
          reject(err);
          console.log(err);
        });
      });
      return promise;
    };

    CompanyService.prototype.updateCompany = function updateCompany(company) {
      var _this4 = this;

      var promise = new Promise(function (resolve, reject) {
        _this4.http.fetch(_this4.apiPath.company + '/' + company.id, {
          method: 'PUT',
          body: (0, _aureliaFetchClient.json)(company)
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          resolve(data);
        }).catch(function (err) {
          reject(err);
          console.log(err);
        });
      });
      return promise;
    };

    CompanyService.prototype.deleteCompany = function deleteCompany(company) {
      var _this5 = this;

      var promise = new Promise(function (resolve, reject) {
        _this5.http.fetch(_this5.apiPath.company + '/' + company.id, {
          method: 'DELETE',
          body: (0, _aureliaFetchClient.json)(company)
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          resolve(data);
        }).catch(function (err) {
          reject(err);
          console.log(err);
        });
      });
      return promise;
    };

    return CompanyService;
  }();
});
define('data/userService',['exports', 'aurelia-fetch-client', './apiPath'], function (exports, _aureliaFetchClient, _apiPath) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var UserService = exports.UserService = function () {
    UserService.inject = function inject() {
      return [_aureliaFetchClient.HttpClient, _apiPath.ApiPath];
    };

    function UserService(httpClient, apiPath) {
      var _this = this;

      _classCallCheck(this, UserService);

      this.http = httpClient;
      this.apiPath = apiPath;

      this.http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl(_this.apiPath.baseUrl).withDefaults({
          credentials: 'same-origin',
          headers: {
            'X-Requested-With': 'Fetch'
          }
        });
      });
    }

    UserService.prototype.getUsers = function getUsers(fromCache) {
      var _this2 = this;

      if (!fromCache) {
        this.users = null;
      }
      var promise = new Promise(function (resolve, reject) {
        if (!_this2.users) {
          _this2.http.fetch(_this2.apiPath.user).then(function (response) {
            _this2.users = response.json();
            resolve(_this2.users);
          });
        } else {
          resolve(_this2.users);
        }
      });
      return promise;
    };

    UserService.prototype.createUser = function createUser(user) {
      var _this3 = this;

      var promise = new Promise(function (resolve, reject) {
        _this3.http.fetch(_this3.apiPath.user, {
          method: 'POST',
          body: (0, _aureliaFetchClient.json)(user)
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          resolve(data);
        }).catch(function (err) {
          reject(err);
          console.log(err);
        });
      });
      return promise;
    };

    UserService.prototype.updateUser = function updateUser(user) {
      var _this4 = this;

      var promise = new Promise(function (resolve, reject) {
        _this4.http.fetch(_this4.apiPath.user + '/' + user.id, {
          method: 'PUT',
          body: (0, _aureliaFetchClient.json)(user)
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          resolve(data);
        }).catch(function (err) {
          reject(err);
          console.log(err);
        });
      });
      return promise;
    };

    UserService.prototype.deleteUser = function deleteUser(user) {
      var _this5 = this;

      var promise = new Promise(function (resolve, reject) {
        _this5.http.fetch(_this5.apiPath.user + '/' + user.id, {
          method: 'DELETE',
          body: (0, _aureliaFetchClient.json)(user)
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          resolve(data);
        }).catch(function (err) {
          reject(err);
          console.log(err);
        });
      });
      return promise;
    };

    return UserService;
  }();
});
define('data/valuesService',['exports', 'aurelia-fetch-client', './apiPath'], function (exports, _aureliaFetchClient, _apiPath) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ValuesService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ValuesService = exports.ValuesService = function () {
    ValuesService.inject = function inject() {
      return [_aureliaFetchClient.HttpClient, _apiPath.ApiPath];
    };

    function ValuesService(httpClient, apiPath) {
      var _this = this;

      _classCallCheck(this, ValuesService);

      this.http = httpClient;
      this.apiPath = apiPath;

      this.http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl(_this.apiPath.baseUrl).withDefaults({
          credentials: 'same-origin',
          headers: {
            'X-Requested-With': 'Fetch'
          }
        });
      });
    }

    ValuesService.prototype.getVersion = function getVersion() {
      var _this2 = this;

      var promise = new Promise(function (resolve, reject) {
        _this2.http.fetch(_this2.apiPath.value + '/getVersion').then(function (response) {
          _this2.version = response.json();
          resolve(_this2.version);
        });
      });
      return promise;
    };

    ValuesService.prototype.getImage = function getImage(filePath) {
      var _this3 = this;

      if (!filePath) {
        filePath = '';
      }
      var promise = new Promise(function (resolve, reject) {
        _this3.http.fetch(_this3.apiPath.value + '/Download/' + filePath).then(function (response) {
          _this3.image = response.json();
          resolve(_this3.image);
        });
      });
      return promise;
    };

    return ValuesService;
  }();
});
define('components/home',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Home = exports.Home = function Home() {
    _classCallCheck(this, Home);

    this.message = 'Home';
  };
});
define('components/task1',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Task1 = exports.Task1 = function Task1() {
    _classCallCheck(this, Task1);

    this.message = 'Task1';
  };
});
define('components/task2',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Task2 = exports.Task2 = function () {
    function Task2() {
      _classCallCheck(this, Task2);
    }

    Task2.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'companies'], name: 'companies', moduleId: 'components/companies/companies', nav: true, title: 'Companies' }, { route: 'users', name: 'users', moduleId: 'components/users/users', nav: true, title: 'User' }]);

      this.router = router;
    };

    return Task2;
  }();
});
define('components/task3',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Task3 = exports.Task3 = function () {
    function Task3() {
      _classCallCheck(this, Task3);

      this.heading = 'Task3';

      this.leapYearValue = null;
      this.isLeapYear = false;
    }

    Task3.prototype.checkIfLeapYear = function checkIfLeapYear() {
      var year = parseInt(this.leapYearValue);
      this.isLeapYear = year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
      return this.isLeapYear;
    };

    Task3.prototype.showAlert = function showAlert() {
      alert('Prestopno leto: ' + this.isLeapYear);
    };

    _createClass(Task3, [{
      key: 'leapYearConfirmation',
      get: function get() {
        return this.checkIfLeapYear();
      }
    }]);

    return Task3;
  }();
});
define('components/task4',['exports', 'data/valuesService'], function (exports, _valuesService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Task4 = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Task4 = exports.Task4 = (_temp = _class = function () {
    function Task4(valuesService) {
      _classCallCheck(this, Task4);

      this.message = 'Task4';

      this.valuesService = valuesService;
    }

    Task4.prototype.activate = function activate() {
      var _this = this;

      var p1 = this.valuesService.getVersion().then(function (response) {
        _this.version = response;
      });
      var p2 = this.valuesService.getImage().then(function (response) {
        _this.image = response;
      });
      return Promise.all([p1, p2]);
    };

    return Task4;
  }(), _class.inject = [_valuesService.ValuesService], _temp);
});
define('components/task5',['exports', 'aurelia-http-client'], function (exports, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Task5 = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Task5 = exports.Task5 = (_temp = _class = function () {
    function Task5(httpClient) {
      _classCallCheck(this, Task5);

      this.message = 'Task5';

      this.httpClient = httpClient;
    }

    Task5.prototype.activate = function activate() {
      var _this = this;

      return this.httpClient.get('http://date.jsontest.com/').then(function (data) {
        _this.object = data.content;
      });
    };

    return Task5;
  }(), _class.inject = [_aureliaHttpClient.HttpClient], _temp);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('components/companies/companies',['exports', 'data/companyService', 'aurelia-dialog', 'components/companies/company-form'], function (exports, _companyService, _aureliaDialog, _companyForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Companies = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Companies = exports.Companies = (_temp = _class = function () {
    function Companies(companyService, dialogService) {
      _classCallCheck(this, Companies);

      this.companyService = companyService;
      this.dialogService = dialogService;
      this.company = { address: '', name: '' };
      this.companies = [];
    }

    Companies.prototype.activate = function activate() {
      return this.getCompanies();
    };

    Companies.prototype.getCompanies = function getCompanies() {
      var _this = this;

      return this.companyService.getCompanies().then(function (response) {
        _this.companies = response;
      });
    };

    Companies.prototype.openForm = function openForm(company) {
      var _this2 = this;

      this.dialogService.open({ viewModel: _companyForm.CompanyForm, model: company }).then(function (response) {
        if (!response.wasCancelled) {
          if (company.id > 0) {
            _this2.companyService.updateCompany(company).then(function (updateResponse) {
              console.log('updateResponse: ' + updateResponse);
            });
          } else {
            _this2.companyService.creatCompany(company).then(function (createResponse) {
              console.log('createResponse: ' + createResponse);
              _this2.getCompanies(false);
            });
          }
        } else {
          console.log('bad');
        }
      });
    };

    Companies.prototype.deleteCompany = function deleteCompany(company) {
      var _this3 = this;

      return this.companyService.deleteCompany(company).then(function (deleteResponse) {
        debugger;
        console.log('deleteResponse: ' + deleteResponse);
        _this3.getCompanies(false);
      });
    };

    return Companies;
  }(), _class.inject = [_companyService.CompanyService, _aureliaDialog.DialogService], _temp);
});
define('components/companies/company-form',['exports', 'aurelia-dialog'], function (exports, _aureliaDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CompanyForm = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var CompanyForm = exports.CompanyForm = (_temp = _class = function () {
    function CompanyForm(controller) {
      _classCallCheck(this, CompanyForm);

      this.controller = controller;
      this.company = {};
    }

    CompanyForm.prototype.activate = function activate(company) {
      this.company = company;
    };

    return CompanyForm;
  }(), _class.inject = [_aureliaDialog.DialogController], _temp);
});
define('components/users/user-form',['exports', 'aurelia-dialog', 'data/companyService'], function (exports, _aureliaDialog, _companyService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserForm = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var UserForm = exports.UserForm = (_temp = _class = function () {
    function UserForm(controller, companyService) {
      _classCallCheck(this, UserForm);

      this.user = {};
      this.companies = [];
      this.controller = controller;
      this.companyService = companyService;
    }

    UserForm.prototype.activate = function activate(user) {
      var _this = this;

      this.user = user;
      return this.companyService.getCompanies().then(function (response) {
        _this.companies = response;
      });
    };

    return UserForm;
  }(), _class.inject = [_aureliaDialog.DialogController, _companyService.CompanyService], _temp);
});
define('components/users/users',['exports', 'data/userService', 'aurelia-dialog', 'components/users/user-form'], function (exports, _userService, _aureliaDialog, _userForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Users = exports.Users = (_temp = _class = function () {
    function Users(userService, dialogService) {
      _classCallCheck(this, Users);

      this.userService = userService;
      this.dialogService = dialogService;
      this.user = { loginName: '', firstName: '', lastName: '' };
      this.users = [];
    }

    Users.prototype.activate = function activate() {
      return this.getUsers();
    };

    Users.prototype.getUsers = function getUsers() {
      var _this = this;

      return this.userService.getUsers().then(function (response) {
        _this.users = response;
      });
    };

    Users.prototype.openForm = function openForm(user) {
      var _this2 = this;

      this.dialogService.open({ viewModel: _userForm.UserForm, model: user }).then(function (response) {
        if (!response.wasCancelled) {
          if (user.id > 0) {
            _this2.userService.updateUser(user).then(function (updateResponse) {
              console.log('updateResponse: ' + updateResponse);
            });
          } else {
            _this2.userService.createUser(user).then(function (createResponse) {
              console.log('createResponse: ' + createResponse);
              return _this2.getUsers(false);
            });
          }
        } else {
          console.log('bad');
        }
      });
    };

    Users.prototype.deleteUser = function deleteUser(user) {
      var _this3 = this;

      this.userService.deleteUser(user).then(function (deleteResponse) {
        console.log('deleteResponse: ' + deleteResponse);
        return _this3.getUsers(false);
      });
    };

    return Users;
  }(), _class.inject = [_userService.UserService, _aureliaDialog.DialogService], _temp);
});
define('aurelia-dialog/ai-dialog',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialog = undefined;

  

  var _dec, _dec2, _class;

  var AiDialog = exports.AiDialog = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialog() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-header',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogHeader = undefined;

  

  var _dec, _dec2, _class, _class2, _temp;

  var AiDialogHeader = exports.AiDialogHeader = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-header'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <button type="button" class="dialog-close" aria-label="Close" if.bind="!controller.settings.lock" click.trigger="controller.cancel()">\n      <span aria-hidden="true">&times;</span>\n    </button>\n\n    <div class="dialog-header-content">\n      <slot></slot>\n    </div>\n  </template>\n'), _dec(_class = _dec2(_class = (_temp = _class2 = function AiDialogHeader(controller) {
    

    this.controller = controller;
  }, _class2.inject = [_dialogController.DialogController], _temp)) || _class) || _class);
});
define('aurelia-dialog/dialog-controller',['exports', './lifecycle', './dialog-result'], function (exports, _lifecycle, _dialogResult) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogController = undefined;

  

  var DialogController = exports.DialogController = function () {
    function DialogController(renderer, settings, resolve, reject) {
      

      this.renderer = renderer;
      this.settings = settings;
      this._resolve = resolve;
      this._reject = reject;
    }

    DialogController.prototype.ok = function ok(output) {
      return this.close(true, output);
    };

    DialogController.prototype.cancel = function cancel(output) {
      return this.close(false, output);
    };

    DialogController.prototype.error = function error(message) {
      var _this = this;

      return (0, _lifecycle.invokeLifecycle)(this.viewModel, 'deactivate').then(function () {
        return _this.renderer.hideDialog(_this);
      }).then(function () {
        _this.controller.unbind();
        _this._reject(message);
      });
    };

    DialogController.prototype.close = function close(ok, output) {
      var _this2 = this;

      if (this._closePromise) {
        return this._closePromise;
      }

      this._closePromise = (0, _lifecycle.invokeLifecycle)(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
        if (canDeactivate) {
          return (0, _lifecycle.invokeLifecycle)(_this2.viewModel, 'deactivate').then(function () {
            return _this2.renderer.hideDialog(_this2);
          }).then(function () {
            var result = new _dialogResult.DialogResult(!ok, output);
            _this2.controller.unbind();
            _this2._resolve(result);
            return result;
          });
        }

        _this2._closePromise = undefined;
      }, function (e) {
        _this2._closePromise = undefined;
        return Promise.reject(e);
      });

      return this._closePromise;
    };

    return DialogController;
  }();
});
define('aurelia-dialog/lifecycle',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.invokeLifecycle = invokeLifecycle;
  function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
      var result = instance[name](model);

      if (result instanceof Promise) {
        return result;
      }

      if (result !== null && result !== undefined) {
        return Promise.resolve(result);
      }

      return Promise.resolve(true);
    }

    return Promise.resolve(true);
  }
});
define('aurelia-dialog/dialog-result',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var DialogResult = exports.DialogResult = function DialogResult(cancelled, output) {
    

    this.wasCancelled = false;

    this.wasCancelled = cancelled;
    this.output = output;
  };
});
define('aurelia-dialog/ai-dialog-body',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogBody = undefined;

  

  var _dec, _dec2, _class;

  var AiDialogBody = exports.AiDialogBody = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-body'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialogBody() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-footer',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogFooter = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp;

  var AiDialogFooter = exports.AiDialogFooter = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-footer'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n\n    <template if.bind="buttons.length > 0">\n      <button type="button" class="btn btn-default" repeat.for="button of buttons" click.trigger="close(button)">${button}</button>\n    </template>\n  </template>\n'), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
    function AiDialogFooter(controller) {
      

      _initDefineProp(this, 'buttons', _descriptor, this);

      _initDefineProp(this, 'useDefaultButtons', _descriptor2, this);

      this.controller = controller;
    }

    AiDialogFooter.prototype.close = function close(buttonValue) {
      if (AiDialogFooter.isCancelButton(buttonValue)) {
        this.controller.cancel(buttonValue);
      } else {
        this.controller.ok(buttonValue);
      }
    };

    AiDialogFooter.prototype.useDefaultButtonsChanged = function useDefaultButtonsChanged(newValue) {
      if (newValue) {
        this.buttons = ['Cancel', 'Ok'];
      }
    };

    AiDialogFooter.isCancelButton = function isCancelButton(value) {
      return value === 'Cancel';
    };

    return AiDialogFooter;
  }(), _class3.inject = [_dialogController.DialogController], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'buttons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'useDefaultButtons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class) || _class);
});
define('aurelia-dialog/attach-focus',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AttachFocus = undefined;

  

  var _dec, _class, _class2, _temp;

  var AttachFocus = exports.AttachFocus = (_dec = (0, _aureliaTemplating.customAttribute)('attach-focus'), _dec(_class = (_temp = _class2 = function () {
    function AttachFocus(element) {
      

      this.value = true;

      this.element = element;
    }

    AttachFocus.prototype.attached = function attached() {
      if (this.value && this.value !== 'false') {
        this.element.focus();
      }
    };

    AttachFocus.prototype.valueChanged = function valueChanged(newValue) {
      this.value = newValue;
    };

    return AttachFocus;
  }(), _class2.inject = [Element], _temp)) || _class);
});
define('aurelia-dialog/dialog-configuration',['exports', './renderer', './dialog-renderer', './dialog-options', 'aurelia-pal'], function (exports, _renderer, _dialogRenderer, _dialogOptions, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogConfiguration = undefined;

  

  var defaultRenderer = _dialogRenderer.DialogRenderer;

  var resources = {
    'ai-dialog': './ai-dialog',
    'ai-dialog-header': './ai-dialog-header',
    'ai-dialog-body': './ai-dialog-body',
    'ai-dialog-footer': './ai-dialog-footer',
    'attach-focus': './attach-focus'
  };

  var defaultCSSText = 'ai-dialog-container,ai-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0}ai-dialog-overlay{opacity:0}ai-dialog-overlay.active{opacity:1}ai-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}ai-dialog-container.active{opacity:1}ai-dialog-container>div{padding:30px}ai-dialog-container>div>div{display:block;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto}ai-dialog-container,ai-dialog-container>div,ai-dialog-container>div>div{outline:0}ai-dialog{display:table;box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;background:#fff}ai-dialog>ai-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ai-dialog>ai-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:0 0;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ai-dialog>ai-dialog-body{display:block;padding:16px}ai-dialog>ai-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ai-dialog>ai-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ai-dialog>ai-dialog-footer button:disabled{cursor:default;opacity:.45}ai-dialog>ai-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ai-dialog-open{overflow:hidden}';

  var DialogConfiguration = exports.DialogConfiguration = function () {
    function DialogConfiguration(aurelia) {
      

      this.aurelia = aurelia;
      this.settings = _dialogOptions.dialogOptions;
      this.resources = [];
      this.cssText = defaultCSSText;
      this.renderer = defaultRenderer;
    }

    DialogConfiguration.prototype.useDefaults = function useDefaults() {
      return this.useRenderer(defaultRenderer).useCSS(defaultCSSText).useStandardResources();
    };

    DialogConfiguration.prototype.useStandardResources = function useStandardResources() {
      return this.useResource('ai-dialog').useResource('ai-dialog-header').useResource('ai-dialog-body').useResource('ai-dialog-footer').useResource('attach-focus');
    };

    DialogConfiguration.prototype.useResource = function useResource(resourceName) {
      this.resources.push(resourceName);
      return this;
    };

    DialogConfiguration.prototype.useRenderer = function useRenderer(renderer, settings) {
      this.renderer = renderer;
      this.settings = Object.assign(this.settings, settings || {});
      return this;
    };

    DialogConfiguration.prototype.useCSS = function useCSS(cssText) {
      this.cssText = cssText;
      return this;
    };

    DialogConfiguration.prototype._apply = function _apply() {
      var _this = this;

      this.aurelia.transient(_renderer.Renderer, this.renderer);
      this.resources.forEach(function (resourceName) {
        return _this.aurelia.globalResources(resources[resourceName]);
      });

      if (this.cssText) {
        _aureliaPal.DOM.injectStyles(this.cssText);
      }
    };

    return DialogConfiguration;
  }();
});
define('aurelia-dialog/renderer',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var Renderer = exports.Renderer = function () {
    function Renderer() {
      
    }

    Renderer.prototype.getDialogContainer = function getDialogContainer() {
      throw new Error('DialogRenderer must implement getDialogContainer().');
    };

    Renderer.prototype.showDialog = function showDialog(dialogController) {
      throw new Error('DialogRenderer must implement showDialog().');
    };

    Renderer.prototype.hideDialog = function hideDialog(dialogController) {
      throw new Error('DialogRenderer must implement hideDialog().');
    };

    return Renderer;
  }();
});
define('aurelia-dialog/dialog-renderer',['exports', 'aurelia-pal', 'aurelia-dependency-injection'], function (exports, _aureliaPal, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogRenderer = undefined;

  

  var _dec, _class;

  var containerTagName = 'ai-dialog-container';
  var overlayTagName = 'ai-dialog-overlay';
  var transitionEvent = function () {
    var transition = null;

    return function () {
      if (transition) return transition;

      var t = void 0;
      var el = _aureliaPal.DOM.createElement('fakeelement');
      var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
      for (t in transitions) {
        if (el.style[t] !== undefined) {
          transition = transitions[t];
          return transition;
        }
      }
    };
  }();

  var DialogRenderer = exports.DialogRenderer = (_dec = (0, _aureliaDependencyInjection.transient)(), _dec(_class = function () {
    function DialogRenderer() {
      var _this = this;

      

      this._escapeKeyEventHandler = function (e) {
        if (e.keyCode === 27) {
          var top = _this._dialogControllers[_this._dialogControllers.length - 1];
          if (top && top.settings.lock !== true) {
            top.cancel();
          }
        }
      };
    }

    DialogRenderer.prototype.getDialogContainer = function getDialogContainer() {
      return _aureliaPal.DOM.createElement('div');
    };

    DialogRenderer.prototype.showDialog = function showDialog(dialogController) {
      var _this2 = this;

      var settings = dialogController.settings;
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];
      var wrapper = document.createElement('div');

      this.modalOverlay = _aureliaPal.DOM.createElement(overlayTagName);
      this.modalContainer = _aureliaPal.DOM.createElement(containerTagName);
      this.anchor = dialogController.slot.anchor;
      wrapper.appendChild(this.anchor);
      this.modalContainer.appendChild(wrapper);

      this.stopPropagation = function (e) {
        e._aureliaDialogHostClicked = true;
      };
      this.closeModalClick = function (e) {
        if (!settings.lock && !e._aureliaDialogHostClicked) {
          dialogController.cancel();
        } else {
          return false;
        }
      };

      dialogController.centerDialog = function () {
        if (settings.centerHorizontalOnly) return;
        centerDialog(_this2.modalContainer);
      };

      this.modalOverlay.style.zIndex = settings.startingZIndex;
      this.modalContainer.style.zIndex = settings.startingZIndex;

      var lastContainer = Array.from(body.querySelectorAll(containerTagName)).pop();

      if (lastContainer) {
        lastContainer.parentNode.insertBefore(this.modalContainer, lastContainer.nextSibling);
        lastContainer.parentNode.insertBefore(this.modalOverlay, lastContainer.nextSibling);
      } else {
        body.insertBefore(this.modalContainer, body.firstChild);
        body.insertBefore(this.modalOverlay, body.firstChild);
      }

      if (!this._dialogControllers.length) {
        _aureliaPal.DOM.addEventListener('keyup', this._escapeKeyEventHandler);
      }

      this._dialogControllers.push(dialogController);

      dialogController.slot.attached();

      if (typeof settings.position === 'function') {
        settings.position(this.modalContainer, this.modalOverlay);
      } else {
        dialogController.centerDialog();
      }

      this.modalContainer.addEventListener('click', this.closeModalClick);
      this.anchor.addEventListener('click', this.stopPropagation);

      return new Promise(function (resolve) {
        var renderer = _this2;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this2.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this2.modalOverlay.classList.add('active');
        _this2.modalContainer.classList.add('active');
        body.classList.add('ai-dialog-open');

        function onTransitionEnd(e) {
          if (e.target !== renderer.modalContainer) {
            return;
          }
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      });
    };

    DialogRenderer.prototype.hideDialog = function hideDialog(dialogController) {
      var _this3 = this;

      var settings = dialogController.settings;
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];

      this.modalContainer.removeEventListener('click', this.closeModalClick);
      this.anchor.removeEventListener('click', this.stopPropagation);

      var i = this._dialogControllers.indexOf(dialogController);
      if (i !== -1) {
        this._dialogControllers.splice(i, 1);
      }

      if (!this._dialogControllers.length) {
        _aureliaPal.DOM.removeEventListener('keyup', this._escapeKeyEventHandler);
      }

      return new Promise(function (resolve) {
        var renderer = _this3;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this3.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this3.modalOverlay.classList.remove('active');
        _this3.modalContainer.classList.remove('active');

        function onTransitionEnd() {
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      }).then(function () {
        body.removeChild(_this3.modalOverlay);
        body.removeChild(_this3.modalContainer);
        dialogController.slot.detached();

        if (!_this3._dialogControllers.length) {
          body.classList.remove('ai-dialog-open');
        }

        return Promise.resolve();
      });
    };

    return DialogRenderer;
  }()) || _class);


  DialogRenderer.prototype._dialogControllers = [];

  function centerDialog(modalContainer) {
    var child = modalContainer.children[0];
    var vh = Math.max(_aureliaPal.DOM.querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);

    child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
    child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
  }
});
define('aurelia-dialog/dialog-options',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dialogOptions = exports.dialogOptions = {
    lock: true,
    centerHorizontalOnly: false,
    startingZIndex: 1000,
    ignoreTransitions: false
  };
});
define('aurelia-dialog/dialog-service',['exports', 'aurelia-metadata', 'aurelia-dependency-injection', 'aurelia-templating', './dialog-controller', './renderer', './lifecycle', './dialog-result', './dialog-options'], function (exports, _aureliaMetadata, _aureliaDependencyInjection, _aureliaTemplating, _dialogController, _renderer, _lifecycle, _dialogResult, _dialogOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogService = undefined;

  

  var _class, _temp;

  var DialogService = exports.DialogService = (_temp = _class = function () {
    function DialogService(container, compositionEngine) {
      

      this.container = container;
      this.compositionEngine = compositionEngine;
      this.controllers = [];
      this.hasActiveDialog = false;
    }

    DialogService.prototype.open = function open(settings) {
      return this.openAndYieldController(settings).then(function (controller) {
        return controller.result;
      });
    };

    DialogService.prototype.openAndYieldController = function openAndYieldController(settings) {
      var _this = this;

      var childContainer = this.container.createChild();
      var dialogController = void 0;
      var promise = new Promise(function (resolve, reject) {
        dialogController = new _dialogController.DialogController(childContainer.get(_renderer.Renderer), _createSettings(settings), resolve, reject);
      });
      childContainer.registerInstance(_dialogController.DialogController, dialogController);
      dialogController.result = promise;
      dialogController.result.then(function () {
        _removeController(_this, dialogController);
      }, function () {
        _removeController(_this, dialogController);
      });
      return _openDialog(this, childContainer, dialogController).then(function () {
        return dialogController;
      });
    };

    return DialogService;
  }(), _class.inject = [_aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine], _temp);


  function _createSettings(settings) {
    settings = Object.assign({}, _dialogOptions.dialogOptions, settings);
    settings.startingZIndex = _dialogOptions.dialogOptions.startingZIndex;
    return settings;
  }

  function _openDialog(service, childContainer, dialogController) {
    var host = dialogController.renderer.getDialogContainer();
    var instruction = {
      container: service.container,
      childContainer: childContainer,
      model: dialogController.settings.model,
      view: dialogController.settings.view,
      viewModel: dialogController.settings.viewModel,
      viewSlot: new _aureliaTemplating.ViewSlot(host, true),
      host: host
    };

    return _getViewModel(instruction, service.compositionEngine).then(function (returnedInstruction) {
      dialogController.viewModel = returnedInstruction.viewModel;
      dialogController.slot = returnedInstruction.viewSlot;

      return (0, _lifecycle.invokeLifecycle)(dialogController.viewModel, 'canActivate', dialogController.settings.model).then(function (canActivate) {
        if (canActivate) {
          return service.compositionEngine.compose(returnedInstruction).then(function (controller) {
            service.controllers.push(dialogController);
            service.hasActiveDialog = !!service.controllers.length;
            dialogController.controller = controller;
            dialogController.view = controller.view;

            return dialogController.renderer.showDialog(dialogController);
          });
        }
      });
    });
  }

  function _getViewModel(instruction, compositionEngine) {
    if (typeof instruction.viewModel === 'function') {
      instruction.viewModel = _aureliaMetadata.Origin.get(instruction.viewModel).moduleId;
    }

    if (typeof instruction.viewModel === 'string') {
      return compositionEngine.ensureViewModel(instruction);
    }

    return Promise.resolve(instruction);
  }

  function _removeController(service, controller) {
    var i = service.controllers.indexOf(controller);
    if (i !== -1) {
      service.controllers.splice(i, 1);
      service.hasActiveDialog = !!service.controllers.length;
    }
  }
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"nav-bar.html\"></require>  \n\n  <nav-bar router.bind=\"router\"></nav-bar>\n\n  <div class=\"page-host\">\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse\">\n        <span class=\"sr-only\">Toggle Navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-home\"></i>\n        <span>${router.title}</span>\n      </a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\" id=\"skeleton-navigation-navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n          <a data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse.in\" href.bind=\"row.href\">${row.title}</a>\n        </li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"loader\" if.bind=\"router.isNavigating\">\n          <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n        </li>\n      </ul>\n    </div>\n  </nav>\n</template>\n"; });
define('text!components/home.html', ['module'], function(module) { module.exports = "<template>\n<h2>${message}</h2>\nThis page contains 5 task\n<ul>\n  <li>Task1: simple web service call in console app</li>\n  <li>Task2: CRUD functionality for 2 tabels Company and User</li>\n  <li>Task3: Leap year checker</li>\n  <li>Task4: Simple REST service with 2 methods, GetVersion(), GetImage()</li>\n  <li>Task5: REST call to URL </li>\n</ul>\n</template>\n"; });
define('text!components/task1.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"au-animate\">\n    <h2>${message}</h2>\n   To run task1 switch start project in solution to JobTest.Console and run\n  </section>\n</template>\n"; });
define('text!components/task2.html', ['module'], function(module) { module.exports = "<template>  \n  <!--<ul class=\"nav nav-tabs\">\n    <li class=\"active\"><a href=\"#\">Contries</a></li>\n    <li><a href=\"#\">Users</a></li>\n  </ul>-->\n  <ul class=\"nav nav-tabs\">\n     <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n       <a data-target=\"#skeleton-navigation-navbar-collapse.in\" href.bind=\"row.href\">${row.title}</a>\n    </li>\n  </ul>\n  <div class=\"col-md-10\" style=\"padding: 0\">\n        <router-view></router-view>\n  </div> \n</template>\n"; });
define('text!components/task3.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"au-animate\">\n    <h2>${heading}</h2>\n    <h4>Check if entered number is leap year.</h3>\n    <form role=\"form\" style=\"width: 300px;\">\n      <div class=\"form-group\">\n         <label for=\"leapYear\">Year:</label>\n        <input type=\"text\" name=\"leapYear\" id=\"leapYear\" class=\"form-control\" value.bind=\"leapYearValue\" placeholder=\"Enter leap year...\">        \n      </div>     \n       <div class=\"form-group\">\n        <label>Is leap year: </label>\n        <p>${leapYearConfirmation}</p>\n      </div>      \n      <button type=\"button\" class=\"btn btn-default\" click.delegate=\"showAlert()\">Check</button>\n    </form>\n  </section>\n</template>\n"; });
define('text!components/task4.html', ['module'], function(module) { module.exports = "<template>\n  <h2>${message}</h2>\n  <div>\n    <p>Version: ${version}</p>\n    <p>Image: <p>   \n    <img src=\"data:image/png;base64,${image}\" alt=\"\"> \n  </div>\n</template>\n"; });
define('text!components/task5.html', ['module'], function(module) { module.exports = "<template>\n  <h2>${message}</h2>\n  <h4>Simple REST Call</h4>\n  <div>\n    <ul class=\"list-group\">\n      <li class=\"list-group-item\">time: ${object.time}</li>\n      <li class=\"list-group-item\">milliseconds_since_epoch: ${object.milliseconds_since_epoch}</li>\n      <li class=\"list-group-item\">date: ${object.date}</li>\n    </ul>\n  </div>\n</template>\n"; });
define('text!components/companies/companies.html', ['module'], function(module) { module.exports = "<template>\n  <button type=\"button\" class=\"btn btn-default\" click.delegate=\"openForm(company)\">New</button>\n  <table class=\"table table-striped\">\n    <thead>\n      <th>Id</th>\n      <th>Name</th>\n      <th>Address</th>\n      <tr colspan=\"2\"></tr>\n    </thead>\n    <tr repeat.for=\"company of companies\">\n      <td>${company.id}</td>\n      <td>${company.name}</td>\n      <td>${company.address}</td>\n      <td colspan=\"2\">\n        <button type=\"button\" class=\"btn btn-default\" click.delegate=\"openForm(company)\">Edit</button>\n        <button type=\"button\" class=\"btn btn-default\" click.delegate=\"deleteCompany(company)\">Delete</button>\n      </td>\n    </tr>\n  </table>\n</template>\n"; });
define('text!components/companies/company-form.html', ['module'], function(module) { module.exports = "<template>\n  <ai-dialog>\n    <ai-dialog-body>\n      <form role=\"form\">        \n        <div class=\"form-group\">\n          <label for=\"firstName\">Name:</label>\n          <input type=\"text\" value.bind=\"company.name\" class=\"form-control\"/>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"lastName\">Address: </label>\n          <input type=\"text\" value.bind=\"company.address\" class=\"form-control\" />\n        </div>        \n      </form>\n    </ai-dialog-body>\n    <ai-dialog-footer>\n      <button click.trigger=\"controller.cancel()\">Cancel</button>\n      <button click.trigger=\"controller.ok(company)\">Save</button>\n    </ai-dialog-footer>\n  </ai-dialog>\n</template>\n"; });
define('text!components/users/user-form.html', ['module'], function(module) { module.exports = "<template>\n  <ai-dialog>\n    <ai-dialog-body>\n      <form role=\"form\">\n        <div class=\"form-group\">\n          <label for=\"loginName\">Login Name:</label>\n          <input type=\"text\" value.bind=\"user.loginName\" class=\"form-control\"/>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"firstName\">First Name:</label>\n          <input type=\"text\" value.bind=\"user.firstName\" class=\"form-control\"/>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"lastName\">Last Name: </label>\n          <input type=\"text\" value.bind=\"user.lastName\" class=\"form-control\" />\n        </div>\n        <div class=\"form-group\">\n          <label for=\"company\">Company:</label>\n          <select value.bind=\"user.companyId\" class=\"form-control\">\n            <option repeat.for=\"company of companies\" value.bind=\"company.id\">${company.name}</option>\n          </select>\n        </div>\n      </form>\n    </ai-dialog-body>\n    <ai-dialog-footer>\n      <button click.trigger=\"controller.cancel()\">Cancel</button>\n      <button click.trigger=\"controller.ok(user)\">Save</button>\n    </ai-dialog-footer>\n  </ai-dialog>\n</template>\n"; });
define('text!components/users/users.html', ['module'], function(module) { module.exports = "<template>\n  <button type=\"button\" class=\"btn btn-default\" click.delegate=\"openForm(user)\">New</button>\n  <table class=\"table table-striped\">\n    <thead>\n      <th>Id</th>\n      <th>LoginName</th>\n      <th>FirstName</th>\n      <th>LastName</th>\n      <th>Company</th>\n      <th colspan=\"2\"></th>\n    </thead>\n    <tr repeat.for=\"user of users\">\n      <td>${user.id}</td>\n      <td>${user.loginName}</td>\n      <td>${user.firstName}</td>\n      <td>${user.lastName}</td>\n      <td>${user.company.name}</td>\n      <td colspan=\"2\">\n        <button type=\"button\" class=\"btn btn-default\" click.delegate=\"openForm(user)\">Edit</button>\n        <button type=\"button\" class=\"btn btn-default\" click.delegate=\"deleteUser(user)\">Delete</button>\n      </td>\n    </tr>\n  </table>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map