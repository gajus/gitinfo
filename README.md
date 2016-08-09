# gitinfo

[![Travis build status](http://img.shields.io/travis/gajus/gitinfo/master.svg?style=flat-square)](https://travis-ci.org/gajus/gitinfo)
[![Coveralls](https://img.shields.io/coveralls/gajus/gitinfo.svg?style=flat-square)](https://github.com/gajus/gitinfo)
[![NPM version](http://img.shields.io/npm/v/gitinfo.svg?style=flat-square)](https://www.npmjs.org/package/gitinfo)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

Get info about a local clone of a GitHub repository.

`gitinfo` is designed to be used during the runtime of the script. Querying the data such as "branch" will reflect the local state of the repository.

## API

```js
import gitinfo from 'gitinfo';

let repository;

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

## Download

Download using NPM:

```sh
npm install gitinfo
```
