var utils,
    fs = require('fs');

utils = {};

/**
 * Read INI file into an object.
 *
 * @access protected
 * @param {String} name
 * @return {Object}
 */
utils.parseINI = function (name) {
    var fs = require('fs'),
        ini = require('ini'),
        config;

    if (!fs.existsSync(name)) {
        throw new Error('INI file ("' + name + '") does not exist.');
    }

    config = fs.readFileSync(name, {encoding: 'utf8'});
    config = ini.parse(config);

    return config;
};

/**
 * @access protected
 * @param {String} url Supported Git remote origin URL (https, git or SVN).
 * @return {Object} repository
 * @return {String} repository.username
 * @return {String} repository.name
 */
utils.parseRemoteOriginURL = function (input) {
    var URL = require('url'),
        url;

    // git@github.com:gajus/gitdown.git
    // https://github.com/gajus/gitdown.git
    // https://github.com/gajus/gitdown

    if (input.indexOf('com:') !== -1) {
        url = input.split('com:')[1];
    } else {
        url = URL.parse(input).path.slice(1);
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
 * @return {Boolean}
 */
utils.isGitDirectory = function (path) {
    try {
        fs.statSync(path + '/HEAD');
        fs.statSync(path + '/objects');
        fs.statSync(path + '/refs');
        fs.statSync(path + '/config');

        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Ascend the system's file tree looking for .git/ directory.
 *
 * @access protected
 * @param {String} startPath The path where start the search.
 */
utils.gitPath = function (startPath) {
    var gitpath = false,
        dirname;

    dirname = startPath;

    do {
        if (fs.existsSync(dirname + '/.git')) {
            gitpath = dirname + '/.git';

            break;
        }

        dirname = fs.realpathSync(dirname + '/..');
    } while (fs.existsSync(dirname) && dirname !== '/');

    return gitpath;
};

module.exports = utils;
