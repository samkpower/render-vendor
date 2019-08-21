'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _webserver = require('webserver');

var _webserver2 = _interopRequireDefault(_webserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require(phantom.libraryPath + '/page'),
    Page = _require.Page;

var _require2 = require(phantom.libraryPath + '/utils/sentinels'),
    SENTINELS = _require2.SENTINELS;

var _require3 = require(phantom.libraryPath + '/utils/logger'),
    Logger = _require3.Logger;

var arrayFindPolyfill = require(phantom.libraryPath + '/utils/-array-find-polyfill').default;

var logger = new Logger('Server');

var server = void 0;
var pages = [];

arrayFindPolyfill();

var Server = exports.Server = function () {
  function Server() {
    (0, _classCallCheck3.default)(this, Server);
  }

  (0, _createClass3.default)(Server, [{
    key: 'boot',
    value: function boot(port) {
      var didBoot = SENTINELS.didBoot,
          willBoot = SENTINELS.willBoot;


      if (this.isBooted) {
        logger.emit(didBoot, true);
        return;
      }

      logger.emit(willBoot, true);

      if (this.isBooting) {
        return;
      }

      this.isBooting = true;
      this.isBooted = this.server.listen(port, this.handleRequest.bind(this));

      logger.emit(didBoot, this.isBooted);
    }
  }, {
    key: 'handleRequest',
    value: function handleRequest(request, response) {
      var _request$url$split = request.url.split('/'),
          _request$url$split2 = (0, _slicedToArray3.default)(_request$url$split, 2),
          methodName = _request$url$split2[1];

      var method = this[methodName].bind(this);

      try {
        var _method = method(request),
            _method$statusCode = _method.statusCode,
            statusCode = _method$statusCode === undefined ? 200 : _method$statusCode,
            _method$headers = _method.headers,
            headers = _method$headers === undefined ? {} : _method$headers,
            _method$body = _method.body,
            body = _method$body === undefined ? '' : _method$body;

        response.statusCode = statusCode;
        response.headers = (0, _assign2.default)(headers, this.defaultResponseHeaders);
        response.write(body);
      } catch (error) {
        switch (error.constructor) {
          case this.constructor.Error.PageNotFound:
            response.statusCode = 404;
            break;
          default:
            response.statusCode = 500;
        }

        response.headers = this.defaultResponseHeaders;
        response.write(error.toString() + ':\n' + error.stack);

        logger.error(error);
      }

      response.closeGracefully();
    }
  }, {
    key: 'loadPage',
    value: function loadPage(request) {
      var json = JSON.parse(request.post || '{}');
      var id = json.id;

      var page = void 0;
      var statusCode = void 0;

      if (id !== undefined) {
        page = this._findPage(id);
      }

      if (page !== undefined) {
        statusCode = 202;
      } else {
        page = new Page(id);
        this.pages.push(page);

        statusCode = 201;
      }

      page.load(json);

      return {
        statusCode: statusCode,
        body: (0, _stringify2.default)({ id: page.id }),
        headers: {
          'content-type': 'application/json'
        }
      };
    }
  }, {
    key: 'renderPage',
    value: function renderPage(request) {
      var json = JSON.parse(request.post || '{}');
      var id = json.id,
          _json$format = json.format,
          format = _json$format === undefined ? 'html' : _json$format;

      var page = id !== undefined ? this._findPage(id) : undefined;

      if (page === undefined) {
        throw new this.constructor.Error.PageNotFound();
      }

      if (format === 'html') {
        return {
          body: page.html,
          headers: {
            'content-type': 'text/html'
          }
        };
      } else {
        var filename = page.render(json);

        return {
          statusCode: 303,
          headers: {
            'location': filename
          }
        };
      }
    }
  }, {
    key: 'ping',
    value: function ping(request) {
      var body = (0, _stringify2.default)({
        ids: Array.prototype.map.call(this.pages, function (page) {
          return page.id;
        })
      });

      return {
        body: body,
        headers: {
          'content-type': 'application/json'
        }
      };
    }
  }, {
    key: 'unloadPage',
    value: function unloadPage(request) {
      var _JSON$parse = JSON.parse(request.post || '{}'),
          id = _JSON$parse.id;

      var page = id !== undefined ? this._findPage(id) : undefined;

      if (page === undefined) {
        throw new this.constructor.Error.PageNotFound();
      }

      page.destroy();
      this.pages.splice(this.pages.indexOf(page), 1);

      return { statusCode: 204 };
    }
  }, {
    key: '_findPage',
    value: function _findPage(id) {
      return Array.prototype.find.call(this.pages, function (page) {
        return page.id === id;
      });
    }
  }, {
    key: '_kill',
    value: function _kill() {
      this.server.close();
      phantom.exit(0);
    }
  }, {
    key: 'server',
    get: function get() {
      if (server === undefined) {
        server = _webserver2.default.create();
      }

      return server;
    }
  }, {
    key: 'defaultResponseHeaders',
    get: function get() {
      return {
        'server': 'render-vendor'
      };
    }
  }, {
    key: 'pages',
    get: function get() {
      return pages;
    }
  }, {
    key: 'isBooting',
    get: function get() {
      return this._isBooting || false;
    },
    set: function set(value) {
      this._isBooted = false;
      this._isBooting = value;
    }
  }, {
    key: 'isBooted',
    get: function get() {
      return this._isBooted || false;
    },
    set: function set(value) {
      this._isBooting = false;
      this._isBooted = value;
    }
  }]);
  return Server;
}();

Server.Error = function (_Error) {
  (0, _inherits3.default)(ServerError, _Error);

  function ServerError() {
    (0, _classCallCheck3.default)(this, ServerError);
    return (0, _possibleConstructorReturn3.default)(this, (ServerError.__proto__ || (0, _getPrototypeOf2.default)(ServerError)).apply(this, arguments));
  }

  (0, _createClass3.default)(ServerError, [{
    key: 'name',
    get: function get() {
      return 'ServerError';
    }
  }]);
  return ServerError;
}(Error);

Server.Error.UnknownMethod = function (_Server$Error) {
  (0, _inherits3.default)(UnknownMethodError, _Server$Error);

  function UnknownMethodError() {
    (0, _classCallCheck3.default)(this, UnknownMethodError);
    return (0, _possibleConstructorReturn3.default)(this, (UnknownMethodError.__proto__ || (0, _getPrototypeOf2.default)(UnknownMethodError)).apply(this, arguments));
  }

  (0, _createClass3.default)(UnknownMethodError, [{
    key: 'name',
    get: function get() {
      return 'ServerError.UnknownMethod';
    }
  }]);
  return UnknownMethodError;
}(Server.Error);

Server.Error.PageNotFound = function (_Server$Error2) {
  (0, _inherits3.default)(PageNotFoundError, _Server$Error2);

  function PageNotFoundError() {
    (0, _classCallCheck3.default)(this, PageNotFoundError);
    return (0, _possibleConstructorReturn3.default)(this, (PageNotFoundError.__proto__ || (0, _getPrototypeOf2.default)(PageNotFoundError)).apply(this, arguments));
  }

  (0, _createClass3.default)(PageNotFoundError, [{
    key: 'name',
    get: function get() {
      return 'ServerError.PageNotFound';
    }
  }]);
  return PageNotFoundError;
}(Server.Error);

exports.default = Server;