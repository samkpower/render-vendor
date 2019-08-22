'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChromeRenderer = undefined;

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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _renderer = require('../../renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isString = _lodash2.default.isString;


var DEFAULT_BOOT_OPTIONS = {}; // use puppeteer defaults, https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions

var ChromeRenderer = exports.ChromeRenderer = function (_Renderer) {
  (0, _inherits3.default)(ChromeRenderer, _Renderer);
  (0, _createClass3.default)(ChromeRenderer, null, [{
    key: 'DEFAULT_BOOT_OPTIONS',
    get: function get() {
      return this._DEFAULT_BOOT_OPTIONS || DEFAULT_BOOT_OPTIONS;
    },
    set: function set(value) {
      this._DEFAULT_BOOT_OPTIONS = value;
    }
  }, {
    key: 'pagePathParamKey',
    get: function get() {
      return 'path';
    }
  }]);

  function ChromeRenderer() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, ChromeRenderer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChromeRenderer.__proto__ || (0, _getPrototypeOf2.default)(ChromeRenderer)).call(this, attrs));

    _this.bootOptions = _this.bootOptions || _this.constructor.DEFAULT_BOOT_OPTIONS;
    return _this;
  }

  (0, _createClass3.default)(ChromeRenderer, [{
    key: 'boot',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var bootOptions;
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
                _context.prev = 2;

                if (this.isBooting) {
                  _context.next = 17;
                  break;
                }

                bootOptions = this.bootOptions;


                this.isBooting = true;

                if (!bootOptions.hasOwnProperty('browserWSEndpoint')) {
                  _context.next = 12;
                  break;
                }

                _context.next = 9;
                return _puppeteer2.default.connect(bootOptions);

              case 9:
                _context.t0 = _context.sent;
                _context.next = 15;
                break;

              case 12:
                _context.next = 14;
                return _puppeteer2.default.launch(bootOptions);

              case 14:
                _context.t0 = _context.sent;

              case 15:
                this.browser = _context.t0;


                this.isBooted = true;

              case 17:
                _context.next = 23;
                break;

              case 19:
                _context.prev = 19;
                _context.t1 = _context['catch'](2);

                this.isBooted = false;
                throw _context.t1;

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 19]]);
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
        var browser;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                browser = this.browser;


                if (browser !== null && browser !== undefined) {
                  browser.close();
                  this.browser = undefined;
                }

                this.isBooted = false;

              case 3:
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
                return _context3.abrupt('return', this.browser.pages());

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
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(page, options) {
        var chromePage, url, html;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                chromePage = page._chromePage;

                if (!(chromePage === null || chromePage === undefined)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 4;
                return this.browser.newPage();

              case 4:
                chromePage = _context4.sent;

                page._chromePage = chromePage;

              case 6:

                page.isLoading = true;

                _context4.prev = 7;
                url = options.url, html = options.html;

                if (!(html !== undefined && html !== null)) {
                  _context4.next = 14;
                  break;
                }

                _context4.next = 12;
                return chromePage.setContent(html);

              case 12:
                _context4.next = 17;
                break;

              case 14:
                if (url !== undefined && url !== null) {
                  delete options.url;
                } else {
                  url = page.id;
                }

                _context4.next = 17;
                return chromePage.goto(url, options);

              case 17:

                page.isLoaded = true;
                _context4.next = 24;
                break;

              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4['catch'](7);

                page.isLoaded = false;
                throw _context4.t0;

              case 24:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[7, 20]]);
      }));

      function loadPage(_x2, _x3) {
        return _ref4.apply(this, arguments);
      }

      return loadPage;
    }()
  }, {
    key: 'renderPage',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(page) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var filepath, type, waitForNavigation, buffer, emulateMedia;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                filepath = options.path, type = options.type, waitForNavigation = options.waitForNavigation;
                buffer = void 0;


                if (!isString(type)) {
                  type = isString(filepath) ? _path2.default.extname(filepath).slice(1) : 'html';
                  type = type.length > 0 ? type : 'html';
                }

                if (!(waitForNavigation !== null && waitForNavigation !== undefined)) {
                  _context5.next = 16;
                  break;
                }

                if (!(waitForNavigation === false)) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt('return');

              case 8:
                if (!(waitForNavigation === Object(waitForNavigation))) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 11;
                return page._chromePage.waitForNavigation(waitForNavigation);

              case 11:
                _context5.next = 15;
                break;

              case 13:
                _context5.next = 15;
                return page._chromePage.waitForNavigation({
                  waitUntil: 'networkidle',
                  networkIdleInflight: 0,
                  timeout: 0
                });

              case 15:
                delete options.waitForNavigation;

              case 16:
                _context5.t0 = type;
                _context5.next = _context5.t0 === 'html' ? 19 : _context5.t0 === 'pdf' ? 23 : 32;
                break;

              case 19:
                _context5.next = 21;
                return page._chromePage.content();

              case 21:
                buffer = _context5.sent;
                return _context5.abrupt('break', 36);

              case 23:
                emulateMedia = options.emulateMedia;

                if (!(emulateMedia !== null && emulateMedia !== undefined)) {
                  _context5.next = 28;
                  break;
                }

                _context5.next = 27;
                return page._chromePage.emulateMedia(emulateMedia);

              case 27:
                delete options.emulateMedia;

              case 28:
                _context5.next = 30;
                return page._chromePage.pdf(options);

              case 30:
                buffer = _context5.sent;
                return _context5.abrupt('break', 36);

              case 32:
                _context5.next = 34;
                return page._chromePage.screenshot(options);

              case 34:
                buffer = _context5.sent;
                return _context5.abrupt('break', 36);

              case 36:
                return _context5.abrupt('return', isString(filepath) ? filepath : buffer);

              case 37:
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
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return page._chromePage.close();

              case 2:
                return _context6.abrupt('return', true);

              case 3:
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
    key: 'browser',
    get: function get() {
      return this._browser;
    },
    set: function set(value) {
      this._browser = value;
    }
  }, {
    key: 'bootOptions',
    get: function get() {
      return this._bootOptions;
    },
    set: function set(value) {
      this._bootOptions = value;
    }
  }]);
  return ChromeRenderer;
}(_renderer2.default);

exports.default = ChromeRenderer;