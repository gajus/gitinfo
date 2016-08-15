<h1 id="gitinfo">gitinfo</h1>

[![Travis build status](http://img.shields.io/travis/gajus/gitinfo/master.svg?style=flat-square)](https://travis-ci.org/gajus/gitinfo)
[![Coveralls](https://img.shields.io/coveralls/gajus/gitinfo.svg?style=flat-square)](https://github.com/gajus/gitinfo)
[![NPM version](http://img.shields.io/npm/v/gitinfo.svg?style=flat-square)](https://www.npmjs.org/package/gitinfo)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

Get info about a local clone of a GitHub repository.

`gitinfo` is designed to be used during the runtime of the script. Querying the data such as "branch" will reflect the local state of the repository.

<h2 id="gitinfo-api">API</h2>

<h1 id="gitinfo">gitinfo</h1>

<h2 id="gitinfo-getgithuburl">getGithubUrl</h2>

Returns **Any** GitHub repository URL.

<h2 id="gitinfo-getbranchname">getBranchName</h2>

Returns **Any** Name of the current branch.

<h2 id="gitinfo-getremoteurl">getRemoteUrl</h2>

Returns **Any** Remote URL of the current branch.

<h2 id="gitinfo-getgitpath">getGitPath</h2>

Returns **Any** Absolute path to the .git/ directory.

<h2 id="gitinfo-getusername">getUsername</h2>

Returns **Any** Username of the repository author.

<h2 id="gitinfo-getname">getName</h2>

Returns **Any** Repository name.

<h2 id="gitinfo-getheadsha">getHeadSha</h2>

Returns **Any** Commit SHA of the current branch.

<h2 id="gitinfo-getconfig">getConfig</h2>

Returns **Any** Representation of the .git/config file.


<h2 id="gitinfo-download">Download</h2>

Download using NPM:

```sh
npm install gitinfo
```
