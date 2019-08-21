'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderer = undefined;

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

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _page2 = require('./page');

var _page3 = _interopRequireDefault(_page2);

var _makeErrorType = require('./utils/make-error-type');

var _makeErrorType2 = _interopRequireDefault(_makeErrorType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = _lodash2.default.defaults,
    isBoolean = _lodash2.default.isBoolean,
    isString = _lodash2.default.isString;


var defaultRenderer = void 0;

var Renderer = exports.Renderer = function (_EventEmitter) {
  (0, _inherits3.default)(Renderer, _EventEmitter);
  (0, _createClass3.default)(Renderer, null, [{
    key: 'rendererConstructor',
    get: function get() {
      return this._rendererConstructor || require('./renderers/chrome').default;
    },
    set: function set(value) {
      this._rendererConstructor = value;
    }
  }, {
    key: 'renderer',
    get: function get() {
      if (defaultRenderer === undefined) {
        defaultRenderer = new this.rendererConstructor();
      }

      return defaultRenderer;
    },
    set: function set(value) {
      defaultRenderer = value;
    }
  }]);

  function Renderer() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Renderer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Renderer.__proto__ || (0, _getPrototypeOf2.default)(Renderer)).call(this));

    _this.pages = [];
    defaults(_this, attrs);
    return _this;
  }

  (0, _createClass3.default)(Renderer, [{
    key: 'find',
    value: function find(id) {
      return this.pages.find(function (page) {
        return page.id === id;
      });
    }
  }, {
    key: 'load',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var page;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _assert2.default.ok(id !== undefined);

                page = this.find(id);


                if (page === undefined) {
                  page = new _page3.default({ id: id, renderer: this });
                  this.pages.push(page);
                }

                return _context.abrupt('return', page.load(options));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load(_x2) {
        return _ref.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: 'refresh',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this2 = this;

        var pages;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _page3.default.all({ renderer: this });

              case 3:
                pages = _context2.sent;


                pages.forEach(function (_page) {
                  var page = _this2.find(_page.id);

                  if (page === undefined) {
                    page = _page;
                    _this2.pages.push(page);
                  }

                  page.isLoaded = true;
                });
                _context2.next = 9;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function refresh() {
        return _ref2.apply(this, arguments);
      }

      return refresh;
    }()
  }, {
    key: 'destroy',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.isBooted) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return');

              case 2:

                this.isShuttingDown = true;
                this.removeAllListeners();

                _context3.next = 6;
                return this.shutdown();

              case 6:

                this.pages.splice(0, this.pages.length);
                this.isBooted = false;

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function destroy() {
        return _ref3.apply(this, arguments);
      }

      return destroy;
    }()
  }, {
    key: '_exec',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(command, page) {
        var _ref5;

        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _assert2.default.ok(isString(command));
                _assert2.default.ok(page instanceof _page3.default);
                _assert2.default.ok(!page.isDestroyed);
                _assert2.default.ok(!page.isDestroying || command === 'unload');

                if (this.isBooted) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 7;
                return this.boot();

              case 7:
                return _context4.abrupt('return', (_ref5 = this[command + 'Page']).call.apply(_ref5, [this, page].concat(args)));

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _exec(_x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return _exec;
    }()

    // MARK - abstract api

  }, {
    key: 'boot',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                throw new Renderer.Error.NotImplemented();

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function boot() {
        return _ref6.apply(this, arguments);
      }

      return boot;
    }()
  }, {
    key: 'shutdown',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                throw new Renderer.Error.NotImplemented();

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function shutdown() {
        return _ref7.apply(this, arguments);
      }

      return shutdown;
    }()
  }, {
    key: 'ping',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                throw new Renderer.Error.NotImplemented();

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function ping() {
        return _ref8.apply(this, arguments);
      }

      return ping;
    }()
  }, {
    key: 'loadPage',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(page) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                throw new Renderer.Error.NotImplemented();

              case 1:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function loadPage(_x6) {
        return _ref9.apply(this, arguments);
      }

      return loadPage;
    }()
  }, {
    key: 'renderPage',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(page) {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                throw new Renderer.Error.NotImplemented();

              case 1:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function renderPage(_x7) {
        return _ref10.apply(this, arguments);
      }

      return renderPage;
    }()
  }, {
    key: 'unloadPage',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(page) {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                throw new Renderer.Error.NotImplemented();

              case 1:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function unloadPage(_x8) {
        return _ref11.apply(this, arguments);
      }

      return unloadPage;
    }()

    // MARK - static API

  }, {
    key: 'isBooting',
    get: function get() {
      return this._isBooting || false;
    },
    set: function set(value) {
      _assert2.default.ok(isBoolean(value));
      _assert2.default.ok(!this.isShuttingDown);

      this._isBooted = false;
      this._isBooting = value;
    }
  }, {
    key: 'isBooted',
    get: function get() {
      return this._isBooted || false;
    },
    set: function set(value) {
      _assert2.default.ok(isBoolean(value));

      this._isBooting = false;
      this._isBooted = value;
      this._isShuttingDown = false;
    }
  }, {
    key: 'isShuttingDown',
    get: function get() {
      return this._isShuttingDown || false;
    },
    set: function set(value) {
      _assert2.default.ok(isBoolean(value));
      _assert2.default.ok(this.isBooted === value);

      this._isShuttingDown = value;
    }
  }, {
    key: 'pages',
    get: function get() {
      return this._pages;
    },
    set: function set(value) {
      _assert2.default.ok(this._pages === undefined);
      this._pages = value;
    }
  }], [{
    key: 'find',
    value: function find() {
      var _renderer;

      return (_renderer = this.renderer).find.apply(_renderer, arguments);
    }
  }, {
    key: 'load',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
        var _renderer2;

        var _args11 = arguments;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt('return', (_renderer2 = this.renderer).load.apply(_renderer2, _args11));

              case 1:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function load() {
        return _ref12.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: 'refresh',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
        var _renderer3;

        var _args12 = arguments;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt('return', (_renderer3 = this.renderer).refresh.apply(_renderer3, _args12));

              case 1:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function refresh() {
        return _ref13.apply(this, arguments);
      }

      return refresh;
    }()
  }, {
    key: 'destroy',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
        var _renderer4;

        var _args13 = arguments;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt('return', (_renderer4 = this.renderer).destroy.apply(_renderer4, _args13));

              case 1:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function destroy() {
        return _ref14.apply(this, arguments);
      }

      return destroy;
    }()
  }, {
    key: 'isBooting',
    get: function get() {
      return this.renderer.isBooting;
    }
  }, {
    key: 'isBooted',
    get: function get() {
      return this.renderer.isBooted;
    }
  }, {
    key: 'pages',
    get: function get() {
      return this.renderer.pages;
    }
  }]);
  return Renderer;
}(_events2.default);

exports.default = Renderer;


Renderer.Error = (0, _makeErrorType2.default)('RendererError');
Renderer.Error.NotImplemented = (0, _makeErrorType2.default)('NotImplementedError', Renderer.Error);