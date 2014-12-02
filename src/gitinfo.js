var Gitinfo,
    fs = require('fs'),
    exec = require('shelljs').exec;

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
     *
     */
    gitinfo._exec = function (command) {
        var options;

        // @see https://github.com/arturadib/shelljs#execcommand--options--callback
        options = {
            async: false,
            silent: true
        };

        return exec('cd ' + gitinfo.gitPath() + ';' + command, options).output.trim();
    };

    gitinfo._remoteOriginURL = function () {
        return gitinfo._exec('git config --get remote.origin.url');
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
        return Gitinfo._parseRemoteOriginURL(gitinfo._remoteOriginURL()).username;
    };

    /**
     * @return {String} Repository name.
     */
    gitinfo.name = function () {
        return Gitinfo._parseRemoteOriginURL(gitinfo._remoteOriginURL()).name;
    };

    /**
     * @return {String} Repository URL.
     */
    gitinfo.url = function () {
        return 'https://github.com/' + gitinfo.username() + '/' + gitinfo.name();
    };

    /**
     * @return {String} Current branch name.
     */
    gitinfo.branch = function () {
        return gitinfo._exec('git rev-parse --abbrev-ref HEAD');
    };

    gitPath = Gitinfo.gitPath(config.gitPath);

    if (!gitPath) {
        throw new Error('config.gitPath is not a descendant of .git/ director.');
    }
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

    if (url.length != 2) {
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
    var gitpath = false;

    dirname = startPath;

    do {
        if (fs.existsSync(dirname + '/.git')) {
            gitpath = dirname + '/.git';

            break;
        }

        dirname = fs.realpathSync(dirname + '/..');
    } while (fs.existsSync(dirname) && dirname != '/');

    return gitpath;
};


module.exports = Gitinfo;