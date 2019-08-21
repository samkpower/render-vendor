'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomRenderer = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _rsvp = require('rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _phantomjsPrebuilt = require('phantomjs-prebuilt');

var _phantomjsPrebuilt2 = _interopRequireDefault(_phantomjsPrebuilt);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _url = require('url');

var _renderer = require('../../renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _sentinels = require('./utils/sentinels');

var _waitForTrue = require('../../utils/wait-for-true');

var _waitForTrue2 = _interopRequireDefault(_waitForTrue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = _lodash2.default.defaults;
var Promise = _rsvp2.default.Promise,
    denodeify = _rsvp2.default.denodeify;


var DEFAULT_HOST = 'localhost';
var DEFAULT_PORT = 8180;
var PHANTOM_SCRIPT = _path2.default.join(__dirname, '-main.js');

var PhantomRenderer = exports.PhantomRenderer = function (_Renderer) {
  (0, _inherits3.default)(PhantomRenderer, _Renderer);
  (0, _createClass3.default)(PhantomRenderer, null, [{
    key: 'DEFAULT_HOST',
    get: function get() {
      return this._DEFAULT_HOST || DEFAULT_HOST;
    },
    set: function set(value) {
      return this._DEFAULT_HOST = value;
    }
  }, {
    key: 'DEFAULT_PORT',
    get: function get() {
      return this._DEFAULT_PORT || DEFAULT_PORT;
    },
    set: function set(value) {
      return this._DEFAULT_PORT = value;
    }
  }, {
    key: 'request',
    get: function get() {
      return denodeify(_request2.default);
    }
  }, {
    key: 'pagePathParamKey',
    get: function get() {
      return 'filename';
    }
  }]);

  function PhantomRenderer() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, PhantomRenderer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PhantomRenderer.__proto__ || (0, _getPrototypeOf2.default)(PhantomRenderer)).call(this, attrs));

    _this.host = _this.host || _this.constructor.DEFAULT_HOST;
    _this.port = _this.port || _this.constructor.DEFAULT_PORT;
    return _this;
  }

  (0, _createClass3.default)(PhantomRenderer, [{
    key: 'boot',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isBooted) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:

                if (!this.isBooting) {
                  this.isBooting = true;
                  this.phantom.stdin.write(this.port + '\n', 'utf8');
                }

                _context.next = 5;
                return (0, _waitForTrue2.default)(function () {
                  return _this2.isBooted;
                }, 30000);

              case 5:

                this.phantom.stdin.end();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function boot() {
        return _ref.apply(this, arguments);
      }

      return boot;
    }()
  }, {
    key: 'shutdown',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var phantom;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                phantom = this.phantom;


                if (phantom === null || phantom === undefined) {
                  this.isBooted = false;
                } else {
                  phantom.kill();
                  this._phantom = undefined;
                }

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function shutdown() {
        return _ref2.apply(this, arguments);
      }

      return shutdown;
    }()
  }, {
    key: 'ping',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', this._makeRequest('ping'));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function ping() {
        return _ref3.apply(this, arguments);
      }

      return ping;
    }()
  }, {
    key: 'loadPage',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(page) {
        var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var didTimeout, url, html, isLoaded;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                didTimeout = false;
                url = json.url, html = json.html;
                isLoaded = void 0;


                json.id = page.id;

                if (html === undefined || html === null) {
                  json.url = new _url.URL(url || page.id).href;
                }

                page.isLoading = true;

                this._makeRequest('loadPage', {
                  method: 'POST',
                  body: json
                });

                isLoaded = page.isLoaded;
                setTimeout(function () {
                  return didTimeout = true;
                }, 30000);

              case 9:
                if (!(!isLoaded && !didTimeout)) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 12;
                return new Promise(function (resolve) {
                  setTimeout(function () {
                    return resolve(page.isLoaded);
                  }, 50);
                });

              case 12:
                isLoaded = _context4.sent;
                _context4.next = 9;
                break;

              case 15:
                if (!(!isLoaded && didTimeout)) {
                  _context4.next = 17;
                  break;
                }

                throw new Error('load timed out');

              case 17:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadPage(_x2) {
        return _ref4.apply(this, arguments);
      }

      return loadPage;
    }()
  }, {
    key: 'renderPage',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(page) {
        var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                json.id = page.id;

                return _context5.abrupt('return', this._makeRequest('renderPage', {
                  method: 'POST',
                  body: json
                }));

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function renderPage(_x4) {
        return _ref5.apply(this, arguments);
      }

      return renderPage;
    }()
  }, {
    key: 'unloadPage',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(page) {
        var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var response;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                response = void 0;


                json.id = page.id;

                _context6.next = 4;
                return this._makeRequest('unloadPage', {
                  method: 'POST',
                  body: json
                });

              case 4:
                response = _context6.sent;

                if (!(response === null || response === undefined || response === '')) {
                  _context6.next = 7;
                  break;
                }

                return _context6.abrupt('return', true);

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function unloadPage(_x6) {
        return _ref6.apply(this, arguments);
      }

      return unloadPage;
    }()
  }, {
    key: '_makeRequest',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var url, response, _ref8, headers, statusCode, body;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                url = this.url + '/' + path;
                response = this.constructor.request(url, defaults(options, {
                  json: true
                }));
                _context7.next = 5;
                return response;

              case 5:
                _ref8 = _context7.sent;
                headers = _ref8.headers;
                statusCode = _ref8.statusCode;
                body = _ref8.body;


                this.isBooted = headers['server'] === 'render-vendor';
                statusCode = Number(statusCode);

                _context7.t0 = true;
                _context7.next = _context7.t0 === (statusCode >= 200 && statusCode < 300) ? 14 : _context7.t0 === (statusCode >= 300 && statusCode < 400) ? 15 : 16;
                break;

              case 14:
                return _context7.abrupt('return', body);

              case 15:
                return _context7.abrupt('return', headers['location']);

              case 16:
                throw new this.constructor.Error.UnexpectedResponse(response);

              case 17:
                _context7.next = 22;
                break;

              case 19:
                _context7.prev = 19;
                _context7.t1 = _context7['catch'](0);

                console.error(_context7.t1);

              case 22:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 19]]);
      }));

      function _makeRequest(_x8) {
        return _ref7.apply(this, arguments);
      }

      return _makeRequest;
    }()
  }, {
    key: '_spawnPhantom',
    value: function _spawnPhantom() {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this,
          _ref9$bin = _ref9.bin,
          bin = _ref9$bin === undefined ? _phantomjsPrebuilt2.default.path : _ref9$bin,
          _ref9$binArgs = _ref9.binArgs,
          binArgs = _ref9$binArgs === undefined ? [] : _ref9$binArgs;

      var phantom = _child_process2.default.spawn(bin, [].concat((0, _toConsumableArray3.default)(binArgs), [PHANTOM_SCRIPT]));

      phantom.stdout.on('data', this._handleStdOut.bind(this));
      phantom.stderr.on('data', this._handleStdErr.bind(this));
      phantom.on('exit', this.destroy.bind(this));

      return phantom;
    }
  }, {
    key: '_handleStdOut',
    value: function _handleStdOut(buffer) {
      var message = buffer.toString() || 'could not read buffer';
      var isSentinel = (0, _values2.default)(_sentinels.SENTINELS).some(function (sentinel) {
        return message.startsWith(sentinel + '\n');
      });

      if (isSentinel) {
        var sentinelIndex = message.indexOf('\n');
        var sentinel = message.slice(0, sentinelIndex);
        var data = message.slice(sentinelIndex).trim();

        switch (sentinel) {
          case _sentinels.SENTINELS.didBoot:
          case _sentinels.SENTINELS.willBoot:
            var isDid = sentinel === _sentinels.SENTINELS.didBoot;

            this['' + (isDid ? 'isBooted' : 'isBooting')] = data === 'true';
            break;

          case _sentinels.SENTINELS.didLoadPage:
          case _sentinels.SENTINELS.willLoadPage:
            var page = this.pages.find(function (_ref10) {
              var id = _ref10.id;
              return id === data;
            });

            if (page !== undefined) {
              var _isDid = sentinel === _sentinels.SENTINELS.didLoadPage;

              page['' + (_isDid ? 'isLoaded' : 'isLoading')] = true;
            }
            break;
        }
      } else {
        this.emit('message', message);
      }
    }
  }, {
    key: '_handleStdErr',
    value: function _handleStdErr(buffer) {
      this.emit('error', buffer.toString() || 'could not read buffer');
    }
  }, {
    key: 'url',
    get: function get() {
      return 'http://' + this.host + ':' + this.port;
    }
  }, {
    key: 'port',
    get: function get() {
      return this._port;
    },
    set: function set(value) {
      var port = this._port;

      _assert2.default.ok(port === undefined || port === value, 'cannot reset to new port');

      this._port = value;
    }
  }, {
    key: 'host',
    get: function get() {
      return this._host;
    },
    set: function set(value) {
      var host = this._host;

      _assert2.default.ok(host === undefined || host === value, 'cannot reset to new host');

      this._host = value;
    }
  }, {
    key: 'phantom',
    get: function get() {
      var phantom = this._phantom;

      if (phantom === null || phantom === undefined) {
        this._phantom = this._spawnPhantom();
        phantom = this._phantom;
      }

      return phantom;
    }
  }]);
  return PhantomRenderer;
}(_renderer2.default);

PhantomRenderer.Error = function (_Error) {
  (0, _inherits3.default)(PhantomRendererError, _Error);

  function PhantomRendererError() {
    (0, _classCallCheck3.default)(this, PhantomRendererError);
    return (0, _possibleConstructorReturn3.default)(this, (PhantomRendererError.__proto__ || (0, _getPrototypeOf2.default)(PhantomRendererError)).apply(this, arguments));
  }

  return PhantomRendererError;
}(Error);
PhantomRenderer.Error.UnexpectedResponse = function (_PhantomRenderer$Erro) {
  (0, _inherits3.default)(UnexpectedResponseError, _PhantomRenderer$Erro);

  function UnexpectedResponseError() {
    (0, _classCallCheck3.default)(this, UnexpectedResponseError);
    return (0, _possibleConstructorReturn3.default)(this, (UnexpectedResponseError.__proto__ || (0, _getPrototypeOf2.default)(UnexpectedResponseError)).apply(this, arguments));
  }

  (0, _createClass3.default)(UnexpectedResponseError, [{
    key: 'toString',
    value: function toString() {
      var _message = this.message,
          statusCode = _message.statusCode,
          body = _message.body,
          url = _message.request.url;


      return this.name + ': HTTP' + statusCode + ' - ' + url + ':\n' + body;
    }
  }]);
  return UnexpectedResponseError;
}(PhantomRenderer.Error);

exports.default = PhantomRenderer;