'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ini = require('ini');

var _ini2 = _interopRequireDefault(_ini);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var utils = undefined;

utils = {};

/**
 * Read INI file into an object.
 *
 * @access protected
 * @param {string} name
 * @returns {Object}
 */
utils.parseINI = function (name) {
    var config = undefined;

    if (!_fs2['default'].existsSync(name)) {
        throw new Error('INI file ("' + name + '") does not exist.');
    }

    config = _fs2['default'].readFileSync(name, { encoding: 'utf8' });
    config = _ini2['default'].parse(config);

    return config;
};

/**
 * @access protected
 * @param {string} input Supported Git remote origin URL (https, git or SVN).
 * @returns {Object} repository
 * @returns {string} repository.username
 * @returns {string} repository.name
 */
utils.parseRemoteOriginURL = function (input) {
    var url = undefined;

    // git@github.com:gajus/gitdown.git
    // https://github.com/gajus/gitdown.git
    // https://github.com/gajus/gitdown

    if (input.indexOf('com:') !== -1) {
        url = input.split('com:')[1];
    } else {
        url = _url2['default'].parse(input).path.slice(1);
    }

    if (/\.git$/.test(url)) {
        url = url.slice(0, -4);
    }

    url = url.split('/');

    if (url.length !== 2) {
        throw new Error('Invalid remote origin URL ("' + input + '").');
    }

    return {
        username: url[0],
        name: url[1]
    };
};

/**
 * @access protected
 * @param {string} path
 * @returns {boolean}
 */
utils.isGitDirectory = function (path) {
    try {
        _fs2['default'].statSync(path + '/HEAD');
        _fs2['default'].statSync(path + '/objects');
        _fs2['default'].statSync(path + '/refs');
        _fs2['default'].statSync(path + '/config');

        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Ascend the system's file tree looking for .git/ directory.
 *
 * @access protected
 * @param {string} startPath The path where start the search.
 * @returns {string}
 */
utils.gitPath = function (startPath) {
    var dirname = undefined,
        gitpath = undefined;

    gitpath = false;

    dirname = startPath;

    do {
        if (_fs2['default'].existsSync(dirname + '/.git')) {
            gitpath = dirname + '/.git';

            break;
        }

        dirname = _fs2['default'].realpathSync(dirname + '/..');
    } while (_fs2['default'].existsSync(dirname) && dirname !== '/');

    return gitpath;
};

/**
 * @param {string} string A string to be trimmed
 * @returns {string} An initial string without leading and trailing spaces, tabs, newlines
 */
utils.trim = function (string) {
    return string.replace(/^\s+|\s+$/g, '');
};

module.exports = utils;
//# sourceMappingURL=utils.js.map
