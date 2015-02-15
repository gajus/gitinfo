'use strict';

var Gitinfo,
    fs = require('fs');

Gitinfo = function Gitinfo (config) {
    var gitinfo,
        gitPath;

    if (!(this instanceof Gitinfo)) {
        return new Gitinfo(config);
    }

    config = config || {};
    config.gitPath = config.gitPath || __dirname;

    gitinfo = this;

    /**
     * @return {String} Repository URL.
     */
    gitinfo.url = function () {
        return 'https://github.com/' + gitinfo.username() + '/' + gitinfo.name();
    };

    /**
     * Gets name of the current branch.
     *
     * @see http://stackoverflow.com/a/12142066/368691
     * @return {String}
     */
    gitinfo.branch = function () {
        var name = gitPath + '/HEAD',
            fs = require('fs'),
            head,
            branch;

        if (!fs.existsSync(name)) {
            throw new Error('Git HEAD ("' + name + '") does not exist.');
        }

        head = fs.readFileSync(name, {encoding: 'utf8'});

        branch = head.match(/^ref: refs\/heads\/(.*)$/m);

        if (!branch) {
            throw new Error('Cannot get the current branch name.');
        }

        return branch[1];
    };

    /**
     * Get the remote URL of the current branch.
     *
     * @return {String}
     */
    gitinfo.remoteURL = function () {
        var branchName = gitinfo.branch(),
            config = gitinfo.config(),
            branch,
            remote;

        branch = config['branch "' + branchName + '"'];

        if (!branch) {
            throw new Error('Branch ("' + branchName + '") definition does not exist in the config.');
        } else if (!branch.remote) {
            throw new Error('Branch ("' + branchName + '") does not define "remote".')
        }

        remote = config['remote "' + branch.remote + '"'];

        if (!remote) {
            throw new Error('Remote ("' + branch.remote + '") definition does not exist in the config.');
        } else if (!remote.url) {
            throw new Error('Remote ("' + branch.remote + '") does not define "url".')
        }

        return remote.url;
    };

    /**
     * @return {String} Absolute path to the .git/ directory.
     */
    gitinfo.gitPath = function () {
        return gitPath;
    };

    /**
     * @return {String} Username of the repository author.
     */
    gitinfo.username = function () {
        return Gitinfo._parseRemoteOriginURL(gitinfo.remoteURL()).username;
    };

    /**
     * @return {String} Repository name.
     */
    gitinfo.name = function () {
        return Gitinfo._parseRemoteOriginURL(gitinfo.remoteURL()).name;
    };

    /**
     * Get object representation of the .git/config file.
     *
     * @return {Object}
     */
    gitinfo.config = function () {
        return Gitinfo._parseINI(gitPath + '/config');
    };

    gitPath = Gitinfo.gitPath(config.gitPath);

    if (!gitPath) {
        throw new Error('config.gitPath is not a descendant of .git/ director.');
    }
};

/**
 * Read INI file into an object.
 *
 * @param {String} name
 * @return {Object}
 */
Gitinfo._parseINI = function (name) {
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
 * @param {String} url Supported Git remote origin URL (https, git or SVN).
 * @return {Object} repository
 * @return {String} repository.username
 * @return {String} repository.name
 */
Gitinfo._parseRemoteOriginURL = function (input) {
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
 * Ascend the system's file tree looking for .git/ directory.
 *
 * @param {String} startPath The path where start the search.
 */
Gitinfo.gitPath = function (startPath) {
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


module.exports = Gitinfo;
