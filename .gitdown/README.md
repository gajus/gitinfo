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

## Download

Download using NPM:

```sh
npm install gitinfo
```
