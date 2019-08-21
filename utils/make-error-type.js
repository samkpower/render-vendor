"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.default = makeErrorType;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeErrorType(_parent, _name, _defaultMessage) {
  var parent = _parent instanceof Error ? _parent : Error;
  var name = _parent instanceof Error ? _parent.name + "." + _name : _parent;
  var defaultMessage = _parent instanceof Error ? _defaultMessage : _name;

  var CustomError = function CustomError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMessage;

    this.name = parent instanceof Error ? name : parent;
    this.message = message;
    this.stack = new Error().stack;
  };

  CustomError.prototype = (0, _create2.default)(parent.prototype);
  CustomError.prototype.constructor = CustomError;

  return CustomError;
}