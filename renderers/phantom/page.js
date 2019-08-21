'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _system = require('system');

var _system2 = _interopRequireDefault(_system);

var _webpage = require('webpage');

var _webpage2 = _interopRequireDefault(_webpage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// n.b. Phantom's require uses a different resolver, so we concat to libraryPath
var _require = require(phantom.libraryPath + '/utils/sentinels'),
    SENTINELS = _require.SENTINELS;

var _require2 = require(phantom.libraryPath + '/utils/logger'),
    Logger = _require2.Logger;

var _require3 = require(phantom.libraryPath + '/utils/error'),
    PhantomError = _require3.PhantomError;

var logger = new Logger('Page');

var Page = exports.Page = function () {
  function Page() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random().toString(36).substring(10);
    (0, _classCallCheck3.default)(this, Page);

    this.id = id;
    this.page = this._createPage();
  }

  (0, _createClass3.default)(Page, [{
    key: 'load',
    value: function load() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          dpi = _ref.dpi,
          viewportSize = _ref.viewportSize,
          zoomFactor = _ref.zoomFactor,
          url = _ref.url,
          html = _ref.html;

      if (dpi !== undefined) {
        this.dpi = dpi;
      }

      if (viewportSize !== undefined) {
        this.viewportSize = viewportSize;
      }

      if (zoomFactor !== undefined) {
        this.zoomFactor = zoomFactor;
      }

      if (html && html.constructor === String) {
        this.html = html;
      } else if (url && url.constructor === String) {
        this.url = url;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          filename = _ref2.filename,
          _ref2$format = _ref2.format,
          format = _ref2$format === undefined ? 'pdf' : _ref2$format,
          _ref2$quality = _ref2.quality,
          quality = _ref2$quality === undefined ? '75' : _ref2$quality,
          _ref2$paperSize = _ref2.paperSize,
          paperSize = _ref2$paperSize === undefined ? {} : _ref2$paperSize;

      if (filename === undefined || filename === null) {
        filename = '/tmp/render-vendor-' + _system2.default.pid + '/' + Date.now() + '.' + format;
      }

      // n.b. paperSize must be set before render
      this.page.paperSize = this._computePaperSize(paperSize);
      this.page.render(filename, {
        type: format,
        quality: quality
      });

      return filename;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.page.close();
    }
  }, {
    key: '_createPage',
    value: function _createPage() {
      var _this = this;

      var didLoadPage = SENTINELS.didLoadPage,
          willLoadPage = SENTINELS.willLoadPage;

      var page = _webpage2.default.create();

      page.onError = function (msg, trace) {
        logger.error(new PhantomError(msg, trace));
      };

      page.onLoadStarted = function () {
        logger.emit(willLoadPage, _this.id);
      };

      page.onLoadFinished = function () {
        logger.emit(didLoadPage, _this.id);
      };

      page.onResourceError = function (_ref3) {
        var url = _ref3.url,
            errorCode = _ref3.errorCode,
            errorString = _ref3.errorString;

        logger.error('resource error: ' + url + ' - ' + errorCode + ' ' + errorString);
      };

      page.onResourceReceived = function (_ref4) {
        var url = _ref4.url;

        logger.info('resource received: ' + url);
      };

      page.onResourceRequested = function (_ref5) {
        var url = _ref5.url;

        logger.info('resource requested: ' + url);
      };

      page.onResourceTimeout = function (_ref6) {
        var url = _ref6.url,
            errorCode = _ref6.errorCode,
            errorString = _ref6.errorString;

        logger.error('resource timeout: ' + url + ' - ' + errorCode + ' ' + errorString);
      };

      page.onConsoleMessage = function (msg, lineNum, sourceId) {
        logger.info('CONSOLE: ' + msg + ' (from line ' + sourceId + ':' + lineNum + ')');
      };

      return page;
    }
  }, {
    key: '_computePaperSize',
    value: function _computePaperSize(options) {
      var _this2 = this;

      var content = this._getPageContent();
      var paper = { margin: options.margin || '0' };

      if (options.height !== undefined && options.width !== undefined) {
        paper.width = options.width;
        paper.height = options.height;
      } else if (options.isSinglePage === true) {
        var _page$evaluate = this.page.evaluate(function (heightMultiplier) {
          var body = document.getElementsByTagName('body')[0];

          return {
            width: body.scrollWidth,
            height: body.scrollHeight * heightMultiplier
          };
        }, options.singlePageHeightMultiplier || 1.31),
            width = _page$evaluate.width,
            height = _page$evaluate.height;

        paper.width = options.width || width;
        paper.height = options.height || height;
      } else {
        paper.format = options.format || 'A4';
        paper.orientation = options.orientation || 'portrait';
      }

      Array.prototype.forEach.call(['header', 'footer'], function (name) {
        if (options[name] || content[name]) {
          var defaultContent = content[name] || {};
          var option = options[name] || {};
          var styles = content.styles;

          paper[name] = _this2._getPageSection(defaultContent, option, styles);

          if (paper[name].height === undefined) {
            paper[name].height = name === 'header' ? '46mm' : '28mm';
          }
        }
      });

      return paper;
    }
  }, {
    key: '_getPageContent',
    value: function _getPageContent() {
      return this.page.evaluate(function () {
        var getElements = function getElements(doc, wildcard) {
          var wildcardMatcher = new RegExp(wildcard + '(.*)');
          var hasElements = false;
          var elements = {};
          var $elements = doc.querySelectorAll('[id*=\'' + wildcard + '\']');

          Array.prototype.forEach.call($elements, function ($elem) {
            var match = $elem.attributes.id.value.match(wildcardMatcher);

            if (match) {
              hasElements = true;
              elements[match[1]] = $elem.outerHTML;
              $elem.parentNode.removeChild($elem);
            }
          });

          return hasElements ? elements : {};
        };

        var getElement = function getElement(doc, id) {
          var $elem = doc.getElementById(id);
          var html = void 0;

          if ($elem) {
            html = $elem.outerHTML;
            $elem.parentNode.removeChild($elem);
          }

          return html;
        };

        var styles = Array.prototype.reduce.call(document.querySelectorAll('link,style'), function (string, node) {
          return string + (node.outerHTML || '');
        }, '');

        // Wildcard headers e.g. <div id="pageHeader-[first|0]">
        var header = getElements(document, 'pageHeader-');
        var footer = getElements(document, 'pageFooter-');

        // Default header and footer e.g. <div id="pageHeader">
        var h = getElement(document, 'pageHeader');
        var f = getElement(document, 'pageFooter');

        var $body = document.getElementById('pageContent');
        var body = $body !== null ? $body.outerHTML : document.body.outerHTML;

        if (h) {
          header.default = h;
        }

        if (f) {
          footer.default = f;
        }

        return { styles: styles, header: header, body: body, footer: footer };
      });
    }
  }, {
    key: '_getPageSection',
    value: function _getPageSection(defaultContent, option, styles) {
      var optionContent = option.contents;

      if ((typeof optionContent === 'undefined' ? 'undefined' : (0, _typeof3.default)(optionContent)) !== 'object') {
        optionContent = { default: optionContent };
      }

      function readSectionValue(key) {
        return optionContent[key] || defaultContent[key];
      }

      return {
        height: option.height,
        contents: phantom.callback(function (pageNum, numPages) {
          var html = readSectionValue(pageNum);

          if (pageNum === 1 && !html) {
            html = readSectionValue('first');
          }

          if (pageNum === numPages && !html) {
            html = readSectionValue('last');
          }

          return (html || readSectionValue(pageNum) || '').replace(/\$page/g, pageNum).replace(/\$numPages/g, numPages).concat(styles);
        })
      };
    }
  }, {
    key: 'html',
    get: function get() {
      return this.page.content;
    },
    set: function set(value) {
      this.page.setContent(value, null);
    }
  }, {
    key: 'url',
    get: function get() {
      return this.page.url;
    },
    set: function set(value) {
      this.page.open(value);
    }
  }]);
  return Page;
}();

exports.default = Page;