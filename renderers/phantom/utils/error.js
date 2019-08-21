'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomError = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhantomError = exports.PhantomError = function (_Error) {
  (0, _inherits3.default)(PhantomError, _Error);

  function PhantomError(message) {
    var trace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    (0, _classCallCheck3.default)(this, PhantomError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PhantomError.__proto__ || (0, _getPrototypeOf2.default)(PhantomError)).call(this, message));

    _this.trace = trace.map(function (t) {
      var src = t.file || t.sourceURL;
      var line = t.line;
      var fn = t.function;

      return '  at ' + (src || t.sourceURL) + ':' + line + ' (in function ' + fn + ')';
    }).join('\n');
    return _this;
  }

  return PhantomError;
}(Error);

exports.default = PhantomError;