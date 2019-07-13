# gitinfo

[![Travis build status](http://img.shields.io/travis/gajus/gitinfo/master.svg?style=flat-square)](https://travis-ci.org/gajus/gitinfo)
[![NPM version](http://img.shields.io/npm/v/gitinfo.svg?style=flat-square)](https://www.npmjs.org/package/gitinfo)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

Gets information about Git repository.

## Implementation

gitinfo reads the contents of the `./git` directory to extract information.

## API

```js
import createGitinfo from 'gitinfo';

/**
 * @typedef Configuration
 * @property {string} [defaultBranchName] Default branch name to fallback to. Default: throws an error if branch cannot be resolved.
 * @property {string} [gitPath] Path used to resolve .git path. Defaults to `__dirname`.
 */

/**
 * @access public
 * @name createGitinfo
 * @param {Configuration} userConfig
 */
const gitinfo = createGitinfo();

/**
 * Returns **Any** GitHub repository URL.
 */
gitinfo.getGithubUrl();

/**
 * Returns **Any** Name of the current branch.
 */
gitinfo.getBranchName();

/**
 * Returns **Any** Remote URL of the current branch.
 */
gitinfo.getRemoteUrl();

/**
 * Returns **Any** Absolute path to the .git/ directory.
 */
gitinfo.getGitPath();

/**
 * Returns **Any** Username of the repository author.
 */
gitinfo.getUsername();

/**
 * Returns **Any** Repository name.
 */
gitinfo.getName();

/**
 * Returns **Any** Commit SHA of the current branch.
 */
gitinfo.getHeadSha();

/**
 * Returns **Any** Representation of the .git/config file.
 */
gitinfo.getConfig();

```

## Download

Download using NPM:

```sh
npm install gitinfo

```
