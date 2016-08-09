import fs from 'fs';
import path from 'path';
import {
    parseRemoteOriginUrl,
    trim,
    parseIni,
    isGitDirectory,
    findGitPath
} from './utils';

/**
 * @property gitPath Path to the .git directory (default: __dirname).
 */
type TypeConfig = {
    gitPath: string
};

export default (config: TypeConfig = {}): Object => {
    let gitPath: string|null;

    const gitinfo = {};

    /**
     * @returns GitHub repository URL.
     */
    gitinfo.getGithubUrl = (): string => {
        return 'https://github.com/' + gitinfo.getUsername() + '/' + gitinfo.getName();
    };

    /**
     * Gets name of the current branch.
     *
     * @see http://stackoverflow.com/a/12142066/368691
     */
    gitinfo.getBranchName = (): string => {
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
    gitinfo.getRemoteUrl = (): string => {
        const branchName = gitinfo.getBranchName();
        const gitConfig = gitinfo.getConfig();
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
    gitinfo.getGitPath = (): string => {
        return gitPath;
    };

    /**
     * @returns Username of the repository author.
     */
    gitinfo.getUsername = (): string => {
        return parseRemoteOriginUrl(gitinfo.getRemoteUrl()).username;
    };

    /**
     * @returns Repository name.
     */
    gitinfo.getName = (): string => {
        return parseRemoteOriginUrl(gitinfo.getRemoteUrl()).name;
    };

    /**
     * @returns Commit SHA of the current branch.
     */
    gitinfo.getHeadSha = (): string => {
        let sha;

        const branch = gitinfo.getBranchName();
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
    gitinfo.getConfig = (): Object => {
        return parseIni(gitPath + '/config');
    };

    config.gitPath = config.gitPath || __dirname;

    gitPath = null;

    if (isGitDirectory(config.gitPath)) {
        gitPath = config.gitPath;
    } else {
        gitPath = findGitPath(config.gitPath);
    }

    /* istanbul ignore next */
    if (gitPath === null) {
        throw new Error('config.gitPath is not a descendant of .git/ director.');
    }

    return gitinfo;
};
