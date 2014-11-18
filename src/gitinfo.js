var Gitinfo,
    exec = require('shelljs').exec;

Gitinfo = function Gitinfo () {
    var gitinfo;

    if (!(this instanceof Gitinfo)) {
        return new Gitinfo();
    }

    gitinfo = this;

    gitinfo._remoteOriginURL = function () {
        var options;

        // @see https://github.com/arturadib/shelljs#execcommand--options--callback
        options = {
            async: false,
            silent: true
        };

        return exec('git config --get remote.origin.url', options).output.trim();
    };

    gitinfo.username = function () {
        return gitinfo._remoteOriginURL().split(':')[1].split('/')[0];
    };

    gitinfo.name = function () {
        return gitinfo._remoteOriginURL().split('/')[1].slice(0, -4);
    };
};

module.exports = Gitinfo;