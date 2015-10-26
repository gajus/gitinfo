'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

/**
 * @typedef config
 * @property {string} gitPath Path to the .git directory (default: __dirname).
 */

/**
 * @param {config} config
 * @returns {Object}
 */

exports['default'] = function () {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var gitPath = undefined,
        gitinfo = undefined;

    config.gitPath = config.gitPath || __dirname;

    gitinfo = {};

    /**
     * @return {string} Repository URL.
     */
    gitinfo.url = function () {
        return 'https://github.com/' + gitinfo.username() + '/' + gitinfo.name();
    };

    /**
     * Gets name of the current branch.
     *
     * @see http://stackoverflow.com/a/12142066/368691
     * @return {string}
     */
    gitinfo.branch = function () {
        var branch = undefined,
            head = undefined,
            name = undefined;

        name = gitPath + '/HEAD';

        if (!_fs2['default'].existsSync(name)) {
            throw new Error('Git HEAD ("' + name + '") does not exist.');
        }

        head = _fs2['default'].readFileSync(name, { encoding: 'utf8' });

        branch = head.match(/^ref: refs\/heads\/(.*)$/m);

        if (!branch) {
            throw new Error('Cannot get the current branch name.');
        }

        return branch[1];
    };

    /**
     * Get the remote URL of the current branch.
     *
     * @return {string}
     */
    gitinfo.remoteURL = function () {
        var branch = undefined,
            branchName = undefined,
            config = undefined,
            remote = undefined;

        branchName = gitinfo.branch();
        config = gitinfo.config();

        branch = config['branch "' + branchName + '"'];

        if (!branch) {
            throw new Error('Branch ("' + branchName + '") definition does not exist in the config.');
        } else if (!branch.remote) {
            throw new Error('Branch ("' + branchName + '") does not define "remote".');
        }

        remote = config['remote "' + branch.remote + '"'];

        if (!remote) {
            throw new Error('Remote ("' + branch.remote + '") definition does not exist in the config.');
        } else if (!remote.url) {
            throw new Error('Remote ("' + branch.remote + '") does not define "url".');
        }

        return remote.url;
    };

    /**
     * @return {string} Absolute path to the .git/ directory.
     */
    gitinfo.gitPath = function () {
        return gitPath;
    };

    /**
     * @return {string} Username of the repository author.
     */
    gitinfo.username = function () {
        return _utils2['default'].parseRemoteOriginURL(gitinfo.remoteURL()).username;
    };

    /**
     * @return {string} Repository name.
     */
    gitinfo.name = function () {
        return _utils2['default'].parseRemoteOriginURL(gitinfo.remoteURL()).name;
    };

    /**
     * @returns {string} Commit SHA of the current branch
     */
    gitinfo.sha = function () {
        var branch = undefined,
            sha = undefined,
            shaFile = undefined;

        branch = gitinfo.branch();
        shaFile = _path2['default'].join(gitPath, 'refs', 'heads', branch);

        try {
            sha = _fs2['default'].readFileSync(shaFile, { encoding: 'utf8' });
        } catch (err) {
            throw new Error('Cannot read the commit SHA of the current HEAD from the ' + shaFile + '.\n' + err);
        }
        return _utils2['default'].trim(sha);
    };

    /**
     * Get object representation of the .git/config file.
     *
     * @returns {Object}
     */
    gitinfo.config = function () {
        return _utils2['default'].parseINI(gitPath + '/config');
    };

    if (_utils2['default'].isGitDirectory(config.gitPath)) {
        gitPath = config.gitPath;
    } else {
        gitPath = _utils2['default'].gitPath(config.gitPath);
    }

    if (!gitPath) {
        throw new Error('config.gitPath is not a descendant of .git/ director.');
    }

    return gitinfo;
};

module.exports = exports['default'];
//# sourceMappingURL=gitinfo.js.map
