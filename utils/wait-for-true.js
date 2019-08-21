'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeoutError = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _rsvp = require('rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

var _makeErrorType = require('./make-error-type');

var _makeErrorType2 = _interopRequireDefault(_makeErrorType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFinite = _lodash2.default.isFinite;
var Promise = _rsvp2.default.Promise;


var CHECK_INTERVAL = 50;

var TimeoutError = exports.TimeoutError = (0, _makeErrorType2.default)('TimeoutError');

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(callback, timeout) {
    var isTrue, didTimeout, timeoutInterval;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isTrue = callback();
            didTimeout = false;
            timeoutInterval = Number(timeout);


            if (isFinite(timeoutInterval) && timeoutInterval > 0) {
              setTimeout(function () {
                return didTimeout = true;
              }, timeoutInterval);
            }

          case 4:
            if (!(!isTrue && !didTimeout)) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return new Promise(function (resolve) {
              setTimeout(function () {
                return resolve(callback(), CHECK_INTERVAL);
              });
            });

          case 7:
            isTrue = _context.sent;
            _context.next = 4;
            break;

          case 10:
            if (!didTimeout) {
              _context.next = 12;
              break;
            }

            throw new TimeoutError();

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function waitForTrue(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return waitForTrue;
}();