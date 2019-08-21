'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = _lodash2.default.defaults,
    isBoolean = _lodash2.default.isBoolean,
    isPresent = _lodash2.default.isObject,
    isString = _lodash2.default.isString;

var Page = exports.Page = function () {
  (0, _createClass3.default)(Page, null, [{
    key: 'all',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _this = this;

        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            renderer = _ref2.renderer;

        var _ref3, _ref3$ids, ids;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _assert2.default.ok(renderer instanceof _renderer2.default);

                _context.next = 3;
                return renderer.ping();

              case 3:
                _ref3 = _context.sent;
                _ref3$ids = _ref3.ids;
                ids = _ref3$ids === undefined ? [] : _ref3$ids;
                return _context.abrupt('return', ids.map(function (id) {
                  return new _this({ id: id, renderer: renderer });
                }));

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function all() {
        return _ref.apply(this, arguments);
      }

      return all;
    }()
  }]);

  function Page() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Page);

    _assert2.default.ok(isString(attrs.id));
    _assert2.default.ok(isPresent(attrs.renderer));

    defaults(this, attrs);
  }

  (0, _createClass3.default)(Page, [{
    key: 'load',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _assert2.default.ok(!this.isDestroyed && !this.isDestroying);

                _context2.prev = 1;
                _context2.next = 4;
                return this.renderer._exec('load', this, options);

              case 4:
                _context2.next = 10;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](1);

                this.isLoading = false;

                throw _context2.t0;

              case 10:
                return _context2.abrupt('return', this);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 6]]);
      }));

      function load() {
        return _ref4.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: 'render',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var pagePathParamKey,
            filename,
            extname,
            _args3 = arguments;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _assert2.default.ok(!this.isDestroyed && !this.isDestroying && this.isLoaded);

                pagePathParamKey = this.renderer.constructor.pagePathParamKey;


                if (isString(pagePathParamKey) && isString(options)) {
                  filename = options;


                  options = isPresent(_args3.length <= 1 ? undefined : _args3[1]) ? _args3.length <= 1 ? undefined : _args3[1] : {};
                  options[pagePathParamKey] = filename;
                }

                if (isString(options.filename) && !isString(options.format)) {
                  extname = _path2.default.extname(options.filename || '');


                  if (extname.length > 1) {
                    options.format = extname.slice(1);
                  }
                }

                _context3.next = 6;
                return this.renderer._exec('render', this, options);

              case 6:
                return _context3.abrupt('return', _context3.sent);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function render() {
        return _ref5.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: 'destroy',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _assert2.default.ok(!this.isDestroying);

                this.isDestroying = true;

                _context4.prev = 2;
                _context4.next = 5;
                return this.renderer._exec('unload', this);

              case 5:
                this.isDestroyed = _context4.sent;


                if (this.isDestroyed) {
                  this.renderer.pages.splice(this.renderer.pages.indexOf(this), 1);
                }
                _context4.next = 13;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4['catch'](2);

                this.isDestroying = false;

                throw _context4.t0;

              case 13:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 9]]);
      }));

      function destroy() {
        return _ref6.apply(this, arguments);
      }

      return destroy;
    }()
  }, {
    key: 'isLoading',
    get: function get() {
      return this._isLoading || false;
    },
    set: function set(value) {
      _assert2.default.ok(isBoolean(value));

      this._isLoaded = false;
      this._isLoading = value;
    }
  }, {
    key: 'isLoaded',
    get: function get() {
      return this._isLoaded || false;
    },
    set: function set(value) {
      _assert2.default.ok(isBoolean(value));

      this._isLoading = false;
      this._isLoaded = value;
    }
  }, {
    key: 'isDestroying',
    get: function get() {
      return this._isDestroying || false;
    },
    set: function set(value) {
      _assert2.default.ok(isBoolean(value));

      this._isLoading = false;
      this._isLoaded = false;
      this._isDestroying = value;
    }
  }, {
    key: 'isDestroyed',
    get: function get() {
      return this._isDestroyed || false;
    },
    set: function set(value) {
      _assert2.default.ok(isBoolean(value));

      this._isLoading = false;
      this._isLoaded = false;
      this._isDestroying = false;
      this._isDestroyed = value;
    }
  }, {
    key: 'renderer',
    get: function get() {
      return this._renderer;
    },
    set: function set(value) {
      _assert2.default.ok(this.renderer === undefined, 'cannot overwrite renderer');
      _assert2.default.ok(value instanceof _renderer2.default, 'must set obj of type Renderer');

      this._renderer = value;
    }
  }]);
  return Page;
}();

exports.default = Page;