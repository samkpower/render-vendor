'use strict';

var _system = require('system');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require(phantom.libraryPath + '/server'),
    Server = _require.Server;

var _require2 = require(phantom.libraryPath + '/utils/logger'),
    Logger = _require2.Logger;

var _require3 = require(phantom.libraryPath + '/utils/error'),
    PhantomError = _require3.PhantomError;

var logger = new Logger('Main');
var server = new Server();

phantom.onError = function onError(msg, trace) {
  var error = new PhantomError(msg, trace);

  phantom.exit(1);
  logger.error(error);
};

try {
  while (!server.isBooted && !server.isBooting) {
    var port = _system2.default.stdin.readLine();
    server.boot(port);
  }
} catch (error) {
  logger.error(error);
  phantom.exit(1);
}