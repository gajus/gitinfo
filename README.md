<h1 id="gitinfo">gitinfo</h1>

[![Travis build status](http://img.shields.io/travis/gajus/gitinfo/master.svg?style=flat)](https://travis-ci.org/gajus/gitinfo)
[![NPM version](http://img.shields.io/npm/v/gitinfo.svg?style=flat)](https://www.npmjs.org/package/gitinfo)

Get info about a local clone of a GitHub repository.

`gitinfo` is designed to be used during the runtime of the script. Querying the data such as "branch" will reflect the local state of the repository.

<h2 id="gitinfo-api">API</h2>

```js
var gitinfo = require('gitinfo'),
    repository;

/**
 * @typedef config
 * @property {String} gitPath Path to the .git directory (default: __dirname).
 */

/**
 * @param {config} config
 */
repository = gitinfo();

/**
 * @return {String} Absolute path to the .git/ directory.
 */
repository.gitPath();

// /.git

/**
 * @return {String} Username of the repository author.
 */
repository.username();

// gajus

/**
 * @return {String} Repository name.
 */
repository.name();

// gitinfo

/**
 * @return {String} Repository URL.
 */
repository.url();

// https://github.com/gajus/gitinfo

/**
 * @return {String} Name of the current branch.
 */
repository.branch();

// master

/**
 * @return {String} Remote URL of the current branch.
 */
repository.remoteURL();

// git@github.com:gajus/gitinfo.git
```

<h2 id="gitinfo-download">Download</h2>

Download using NPM:

```sh
npm install gitinfo
```
