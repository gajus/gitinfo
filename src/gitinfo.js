'use strict';

var fs = require('fs');
var utils = require('./utils');

/**
 * @typedef config
 * @property {String} gitPath Path to the .git directory (default: __dirname).
 */

/**
 * @param {config} config
 */
module.exports = function(config) {
  var gitinfo;
  var gitPath;

  config = config || {};
  config.gitPath = config.gitPath || __dirname;

  gitinfo = {};

  /**
   * @return {String} Repository URL.
   */
  gitinfo.url = function() {
    return 'https://github.com/' + gitinfo.username() + '/' + gitinfo.name();
  };

  /**
   * Gets name of the current branch.
   *
   * @see http://stackoverflow.com/a/12142066/368691
   * @return {String}
   */
  gitinfo.branch = function() {
    var name = gitPath + '/HEAD';
    var head;
    var branch;

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
  gitinfo.remoteURL = function() {
    var branchName = gitinfo.branch();
    var config = gitinfo.config();
    var branch;
    var remote;

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
   * @return {String} Absolute path to the .git/ directory.
   */
  gitinfo.gitPath = function() {
    return gitPath;
  };

  /**
   * @return {String} Username of the repository author.
   */
  gitinfo.username = function() {
    return utils.parseRemoteOriginURL(gitinfo.remoteURL()).username;
  };

  /**
   * @return {String} Repository name.
   */
  gitinfo.name = function() {
    return utils.parseRemoteOriginURL(gitinfo.remoteURL()).name;
  };

  /**
   * Get object representation of the .git/config file.
   *
   * @return {Object}
   */
  gitinfo.config = function() {
    return utils.parseINI(gitPath + '/config');
  };

  if (utils.isGitDirectory(config.gitPath)) {
    gitPath = config.gitPath;
  } else {
    gitPath = utils.gitPath(config.gitPath);
  }

  if (!gitPath) {
    throw new Error('config.gitPath is not a descendant of .git/ director.');
  }

  return gitinfo;
};
