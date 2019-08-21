'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _system = require('system');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger = exports.Logger = function () {
  function Logger(name) {
    (0, _classCallCheck3.default)(this, Logger);

    this.name = name;
  }

  (0, _createClass3.default)(Logger, [{
    key: 'emit',
    value: function emit(sentinel) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      _system2.default.stdout.write(sentinel + '\n' + data);
    }
  }, {
    key: 'info',
    value: function info(message) {
      this.print(message);
    }
  }, {
    key: 'error',
    value: function error(err) {
      var message = err.toString();

      if (typeof err.stack === 'string') {
        message = message + ':\nStack: ' + err.stack;
      }

      this.print(message, _system2.default.stderr);
    }
  }, {
    key: 'print',
    value: function print(message) {
      var stream = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _system2.default.stdout;

      stream.write('RenderVendor (' + this.name + '): ' + message);
    }
  }]);
  return Logger;
}();

exports.default = Logger;