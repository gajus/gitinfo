import fs from 'fs';
import path from 'path';
import {
    parseRemoteOriginURL,
    trim,
    parseINI,
    isGitDirectory
} from './utils';

/**
 * @property gitPath Path to the .git directory (default: __dirname).
 */
type TypeConfig = {
    gitPath: string
};

export default (config: TypeConfig = {}): Object => {
    let gitPath;

    config.gitPath = config.gitPath || __dirname;

    const gitinfo = {};

    /**
     * @returns Repository URL.
     */
    gitinfo.url = (): string => {
        return 'https://github.com/' + gitinfo.username() + '/' + gitinfo.name();
    };

    /**
     * Gets name of the current branch.
     *
     * @see http://stackoverflow.com/a/12142066/368691
     */
    gitinfo.branch = (): string => {
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
     * @returns Remote URL of the current branch.
     */
    gitinfo.remoteURL = (): string => {
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
     * @returns Absolute path to the .git/ directory.
     */
    gitinfo.gitPath = (): string => {
        return gitPath;
    };

    /**
     * @returns Username of the repository author.
     */
    gitinfo.username = (): string => {
        return parseRemoteOriginURL(gitinfo.remoteURL()).username;
    };

    /**
     * @returns Repository name.
     */
    gitinfo.name = (): string => {
        return parseRemoteOriginURL(gitinfo.remoteURL()).name;
    };

    /**
     * @returns Commit SHA of the current branch
     */
    gitinfo.sha = (): string => {
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
     * @returns Representation of the .git/config file.
     */
    gitinfo.config = (): Object => {
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
