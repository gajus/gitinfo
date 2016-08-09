/* eslint-disable max-nested-callbacks */

import path from 'path';
import {
    expect
} from 'chai';
import {
    gitPath,
    parseRemoteOriginURL,
    trim
} from './../src/utils';

describe('utils', () => {
    describe('parseRemoteOriginURL()', () => {
        it('parses HTTPS URL', () => {
            expect(parseRemoteOriginURL('https://github.com/gajus/gitinfo.git')).to.deep.equal({
                name: 'gitinfo',
                username: 'gajus'
            });
        });
        it('parses SSH URL', () => {
            expect(parseRemoteOriginURL('git@github.com:gajus/gitinfo.git')).to.deep.equal({
                name: 'gitinfo',
                username: 'gajus'
            });
        });
        it('parses Subeversion URL', () => {
            expect(parseRemoteOriginURL('https://github.com/gajus/gitinfo')).to.deep.equal({
                name: 'gitinfo',
                username: 'gajus'
            });
        });
        it('throws an if URL cannot be broken into username and name', () => {
            expect(() => {
                parseRemoteOriginURL('http://gajus.com/blog/some/post');
            }).to.throw(Error, 'Invalid remote origin URL ("http://gajus.com/blog/some/post").');
        });
    });
    describe('gitPath()', () => {
        context('a path of a descendant directory that has a parent directory that includes .git directory', () => {
            it('resolves path of the .git directory', () => {
                const targetPath = path.resolve(__dirname, './../.git');
                const resolvedPath = gitPath(__dirname);

                expect(resolvedPath).to.equal(targetPath);
            });
        });
    });
    describe('trim()', () => {
        it('trims whitespaces, tabs and newlines', () => {
            expect(trim('  \tsomeText with spaces\n')).to.equal('someText with spaces');
        });
    });
});
