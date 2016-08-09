// @flow

import fs from 'fs';
import URL from 'url';
import ini from 'ini';

/**
 * Read INI file into an object.
 *
 * @access protected
 */
export const parseIni = (name: string): Object => {
    let config;

    /* istanbul ignore next */
    if (!fs.existsSync(name)) {
        throw new Error('INI file ("' + name + '") does not exist.');
    }

    config = fs.readFileSync(name, {encoding: 'utf8'});
    config = ini.parse(config);

    return config;
};

type TypeRepository = {
    username: string,
    name: string
};

/**
 * @access protected
 * @param input Supported Git remote origin URL (https, git or SVN).
 */
export const parseRemoteOriginUrl = (input: string): TypeRepository => {
    let url;

    // git@github.com:gajus/gitdown.git
    // https://github.com/gajus/gitdown.git
    // https://github.com/gajus/gitdown

    if (input.indexOf('com:') === -1) {
        const parsedUrl = URL.parse(input);

        if (parsedUrl && parsedUrl.path) {
            url = parsedUrl.path.slice(1);
        } else {
            /* istanbul ignore next */
            throw new Error('Cannot parse origin URL.');
        }
    } else {
        url = input.split('com:')[1];
    }

    if (/\.git$/.test(url)) {
        url = url.slice(0, -4);
    }

    url = url.split('/');

    /* istanbul ignore next */
    if (url.length !== 2) {
        throw new Error('Invalid remote origin URL ("' + input + '").');
    }

    return {
        name: url[1],
        username: url[0]
    };
};

/**
 * @access protected
 */
export const isGitDirectory = (path: string): boolean => {
    try {
        fs.statSync(path + '/HEAD');
        fs.statSync(path + '/objects');
        fs.statSync(path + '/refs');
        fs.statSync(path + '/config');

        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Ascend the system's file tree looking for .git/ directory.
 *
 * @access protected
 * @param startPath The path where start the search.
 */
export const findGitPath = (startPath: string): string => {
    let dirname,
        gitpath;

    dirname = startPath;

    do {
        if (fs.existsSync(dirname + '/.git')) {
            gitpath = dirname + '/.git';

            break;
        }

        dirname = fs.realpathSync(dirname + '/..');
    } while (fs.existsSync(dirname) && dirname !== '/');

    /* istanbul ignore next */
    if (!gitpath) {
        throw new Error('Cannot locate .git directory.');
    }

    return gitpath;
};

/**
 * @param value A string to be trimmed.
 * @returns An initial string without leading and trailing spaces, tabs, newlines
 */
export const trim = (value: string): string => {
    return value.replace(/^\s+|\s+$/g, '');
};
