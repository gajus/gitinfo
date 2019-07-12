// @flow

import fs from 'fs';
import path from 'path';
import R from 'ramda';
import {
  parseRemoteOriginUrl,
  parseIni,
  isGitDirectory,
  findGitPath
} from './utils';

/**
 * @access public
 * @name gitinfo
 */
export default (userConfig) => {
  const gitinfo = {};

  const config = Object.assign(
    {},
    {
      gitPath: __dirname
    },
    userConfig
  );

  const gitPath = (() => {
    if (isGitDirectory(config.gitPath)) {
      return config.gitPath;
    } else {
      return findGitPath(config.gitPath);
    }
  })();

  /**
   * @access public
   * @returns GitHub repository URL.
   */
  gitinfo.getGithubUrl = () => {
    return 'https://github.com/' + gitinfo.getUsername() + '/' + gitinfo.getName();
  };

  /**
   * @see http://stackoverflow.com/a/12142066/368691
   * @access public
   * @returns Name of the current branch.
   */
  gitinfo.getBranchName = () => {
    const name = gitPath + '/HEAD';

    /* istanbul ignore next */
    if (!fs.existsSync(name)) {
      throw new Error('Git HEAD ("' + name + '") does not exist.');
    }

    const head = fs.readFileSync(name, {encoding: 'utf8'});

    const match = head.match(/^ref: refs\/heads\/(.*)$/m);
    const branch = match && match[1];

    if (branch) {
      return branch;
    }

    if (config.defaultBranchName) {
      return config.defaultBranchName;
    }

    /* istanbul ignore next */
    throw new Error('Cannot get the current branch name.');
  };

  /**
   * @access public
   * @returns Remote URL of the current branch.
   */
  gitinfo.getRemoteUrl = () => {
    const branchName = gitinfo.getBranchName();
    const gitConfig = gitinfo.getConfig();
    const branch = gitConfig['branch "' + branchName + '"'] ||
    gitConfig['branch "' + config.defaultBranchName + '"'];

    /* istanbul ignore next */
    if (!branch) {
      throw new Error('Branch ("' + branchName + '") definition does not exist in the config.');
    } else if (!branch.remote) {
      throw new Error('Branch ("' + branchName + '") does not define "remote".');
    }

    const remote = gitConfig['remote "' + branch.remote + '"'];

    /* istanbul ignore next */
    if (!remote) {
      throw new Error('Remote ("' + branch.remote + '") definition does not exist in the config.');
    } else if (!remote.url) {
      throw new Error('Remote ("' + branch.remote + '") does not define "url".');
    }

    return remote.url;
  };

  /**
   * @access public
   * @returns Absolute path to the .git/ directory.
   */
  gitinfo.getGitPath = () => {
    return gitPath;
  };

  /**
   * @access public
   * @returns Username of the repository author.
   */
  gitinfo.getUsername = () => {
    return parseRemoteOriginUrl(gitinfo.getRemoteUrl()).username;
  };

  /**
   * @access public
   * @returns Repository name.
   */
  gitinfo.getName = () => {
    return parseRemoteOriginUrl(gitinfo.getRemoteUrl()).name;
  };

  /**
   * @access public
   * @returns Commit SHA of the current branch.
   */
  gitinfo.getHeadSha = () => {
    let sha;

    const branch = gitinfo.getBranchName();
    const shaFile = path.join(gitPath, 'refs', 'heads', branch);

    try {
      sha = fs.readFileSync(shaFile, {encoding: 'utf8'});
    } catch (error) {
      /* istanbul ignore next */
      throw new Error('Cannot read the commit SHA of the current HEAD from the ' + shaFile + '.\n' + error);
    }

    return R.trim(sha);
  };

  /**
   * @access public
   * @returns Representation of the .git/config file.
   */
  gitinfo.getConfig = () => {
    return parseIni(gitPath + '/config');
  };

  return gitinfo;
};
