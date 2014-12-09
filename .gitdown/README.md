# Gitinfo

{"gitdown": "badge", "name": "travis"}
{"gitdown": "badge", "name": "npm-version"}

Get info about a local clone of a GitHub repository.

Gitinfo is designed to be used during the runtime of the script. Querying the data such as "branch" will reflect the local state of the repository.

If you have ideas how to extend Gitinfo, [raise an issue](https://github.com/gajus/gitinfo/issues).

## API

```js
var Gitinfo = require('gitinfo'),
    gitinfo,
    config = {};

gitinfo = Gitinfo(config);

/**
 * @return {String} Absolute path to the .git/ directory.
 */
gitinfo.gitPath();

// /.git

/**
 * @return {String} Username of the repository author.
 */
gitinfo.username();

// gajus

/**
 * @return {String} Repository name.
 */
gitinfo.name();

// gitinfo

/**
 * @return {String} Repository URL.
 */
gitinfo.url();

// https://github.com/gajus/gitinfo

/**
 * @return {String} Name of the current branch.
 */
gitinfo.branch();

// master

/**
 * @return {String} Remote URL of the current branch.
 */
gitinfo.remoteURL();

// git@github.com:gajus/gitinfo.git
```

### Configuration

| Name | Description | Default |
| --- | --- | --- |
| `gitPath` | Path to the .git directory. | `__dirname` |

## Download

Download using NPM:

```sh
npm install gitinfo
```