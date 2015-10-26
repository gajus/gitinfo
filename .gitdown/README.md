# gitinfo

{"gitdown": "badge", "name": "travis"}
{"gitdown": "badge", "name": "npm-version"}

Get info about a local clone of a GitHub repository.

`gitinfo` is designed to be used during the runtime of the script. Querying the data such as "branch" will reflect the local state of the repository.

## API

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

## Download

Download using NPM:

```sh
npm install gitinfo
```
