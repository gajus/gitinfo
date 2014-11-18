# Gitinfo

[![Build Status](https://travis-ci.org/gajus/gitinfo.png?branch=master)](https://travis-ci.org/gajus/gitinfo)
[![NPM version](https://badge.fury.io/js/gitinfo.svg)](http://badge.fury.io/js/gitinfo)

Get info about a local GitHub repository.

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
 * @return {String} Current branch name.
 */
gitinfo.branch();

// master
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