var utils;
var fs = require('fs');

utils = {};

/**
 * @access protected
 * @param {string} name A path to the INI file
 * @returns {Object} Read INI file into an object.
 */
utils.parseINI = function(name) {
  var ini = require('ini');
  var config;

  if (!fs.existsSync(name)) {
    throw new Error('INI file ("' + name + '") does not exist.');
  }

  config = fs.readFileSync(name, {encoding: 'utf8'});
  config = ini.parse(config);

  return config;
};

/**
 * @access protected
 * @param {string} input Supported Git remote origin URL (https, git or SVN).
 * @returns {Object} repository
 * @returns {string} repository.username
 * @returns {string} repository.name
 */
utils.parseRemoteOriginURL = function(input) {
  var URL = require('url');
  var url;

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
 * @param {string} path A path to the .git folder
 * @returns {boolean} Returns true if the passed folder path is a .git folder
 */
utils.isGitDirectory = function(path) {
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
 * @access protected
 * @param {string} startPath The path where start the search.
 * @returns {string} Ascend the system's file tree looking for .git/ directory.
 */
utils.gitPath = function(startPath) {
  var gitpath = false;
  var dirname;

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

/**
 * @param {string} string A string to be trimmed
 * @returns {string} An initial string without leading and trailing spaces, tabs, newlines
 */
utils.trim = function(string) {
  return string.replace(/^\s+|\s+$/g, '');
};

module.exports = utils;
