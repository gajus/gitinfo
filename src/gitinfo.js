import fs from 'fs';
import path from 'path';
import {
    parseRemoteOriginURL,
    trim,
    parseINI,
    isGitDirectory
} from './utils';

/**
 * @typedef config
 * @property {string} gitPath Path to the .git directory (default: __dirname).
 */

/**
 * @param {config} config
 * @returns {Object}
 */
export default (config = {}) => {
    let gitPath;

    config.gitPath = config.gitPath || __dirname;

    const gitinfo = {};

    /**
     * @returns {string} Repository URL.
     */
    gitinfo.url = () => {
        return 'https://github.com/' + gitinfo.username() + '/' + gitinfo.name();
    };

    /**
     * Gets name of the current branch.
     *
     * @see http://stackoverflow.com/a/12142066/368691
     * @returns {string}
     */
    gitinfo.branch = () => {
        const name = gitPath + '/HEAD';

        /* istanbul ignore next */
        if (!fs.existsSync(name)) {
            throw new Error('Git HEAD ("' + name + '") does not exist.');
        }

        const head = fs.readFileSync(name, {encoding: 'utf8'});

        const branch = head.match(/^ref: refs\/heads\/(.*)$/m);

        /* istanbul ignore next */
        if (!branch) {
            throw new Error('Cannot get the current branch name.');
        }

        return branch[1];
    };

    /**
     * Get the remote URL of the current branch.
     *
     * @returns {string}
     */
    gitinfo.remoteURL = () => {
        const branchName = gitinfo.branch();
        const gitConfig = gitinfo.config();
        const branch = gitConfig['branch "' + branchName + '"'];

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
     * @returns {string} Absolute path to the .git/ directory.
     */
    gitinfo.gitPath = () => {
        return gitPath;
    };

    /**
     * @returns {string} Username of the repository author.
     */
    gitinfo.username = () => {
        return parseRemoteOriginURL(gitinfo.remoteURL()).username;
    };

    /**
     * @returns {string} Repository name.
     */
    gitinfo.name = () => {
        return parseRemoteOriginURL(gitinfo.remoteURL()).name;
    };

    /**
     * @returns {string} Commit SHA of the current branch
     */
    gitinfo.sha = () => {
        let sha;

        const branch = gitinfo.branch();
        const shaFile = path.join(gitPath, 'refs', 'heads', branch);

        try {
            sha = fs.readFileSync(shaFile, {encoding: 'utf8'});
        } catch (err) {
            /* istanbul ignore next */
            throw new Error('Cannot read the commit SHA of the current HEAD from the ' + shaFile + '.\n' + err);
        }

        return trim(sha);
    };

    /**
     * Get object representation of the .git/config file.
     *
     * @returns {Object}
     */
    gitinfo.config = () => {
        return parseINI(gitPath + '/config');
    };

    if (isGitDirectory(config.gitPath)) {
        gitPath = config.gitPath;
    } else {
        gitPath = gitPath(config.gitPath);
    }

    /* istanbul ignore next */
    if (!gitPath) {
        throw new Error('config.gitPath is not a descendant of .git/ director.');
    }

    return gitinfo;
};
