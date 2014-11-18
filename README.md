## Gitinfo

[![Build Status](https://travis-ci.org/gajus/gitinfo.png?branch=master)](https://travis-ci.org/gajus/gitinfo)
[![NPM version](https://badge.fury.io/js/gitinfo.svg)](http://badge.fury.io/js/gitinfo)

Get info about a GitHub repository.

```js
var Gitinfo = require('gitinfo'),
    gitinfo,
    config = {};

gitinfo = Gitinfo(config);

/**
 * @return {String} Absolute path to the .git/ directory.
 */
gitinfo.gitPath();

/**
 * @return {String} Username of the repository author.
 */
gitinfo.username();

/**
 * @return {String} Repository name.
 */
gitinfo.name();
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