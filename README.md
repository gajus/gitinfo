<!--
This file has been generated using GitDown (https://github.com/gajus/gitdown).
Direct edits to this will be be overwritten. Look for GitDown markup file under ./.gitdown/ path.
-->
<h1 id="gitinfo">Gitinfo</h1>

[![Travis build status](http://img.shields.io/travis/gajus/gitinfo/master.svg?style=flat)](https://travis-ci.org/gajus/gitinfo)
[![NPM version](http://img.shields.io/npm/v/gitinfo.svg?style=flat)](https://www.npmjs.org/package/gitinfo)

Get info about a local clone of a GitHub repository.

Gitinfo is designed to be used during the runtime of the script. Querying the data such as "branch" will reflect the local state of the repository.

If you have ideas how to extend Gitinfo, [raise an issue](https://github.com/gajus/gitinfo/issues).

<h2 id="gitinfo-api">API</h2>

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

<h3 id="gitinfo-api-configuration">Configuration</h3>

| Name | Description | Default |
| --- | --- | --- |
| `gitPath` | Path to the .git directory. | `__dirname` |

<h2 id="gitinfo-download">Download</h2>

Download using NPM:

```sh
npm install gitinfo
```