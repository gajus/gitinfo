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
 * @returns {string} Absolute path to the .git/ directory.
 */
repository.gitPath();

// /.git

/**
 * @returns {string} Username of the repository author.
 */
repository.username();

// gajus

/**
 * @returns {string} Repository name.
 */
repository.name();

// gitinfo

/**
 * @returns {string} Repository URL.
 */
repository.url();

// https://github.com/gajus/gitinfo

/**
 * @returns {string} Name of the current branch.
 */
repository.branch();

// master

/**
 * @returns {string} Remote URL of the current branch.
 */
repository.remoteURL();

// git@github.com:gajus/gitinfo.git

/**
 * @returns {string} Commit SHA of the current branch
 */
repository.sha();

// dcc075287eb8f6eb4ef34133a4747d2b50b28306
```

<h2 id="gitinfo-download">Download</h2>

Download using NPM:

```sh
npm install gitinfo
```
