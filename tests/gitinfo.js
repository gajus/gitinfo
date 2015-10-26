import {
    expect
} from 'chai';

import gitinfo from './../src/gitinfo.js';
import fs from 'fs';
import path from 'path';

describe('gitinfo', () => {
    let repository;

    beforeEach(() => {
        repository = gitinfo({
            gitPath: path.resolve(__dirname, './dummy_git')
        });
    });
    describe('.gitPath()', () => {
        it('returns absolute path to the .git directory', () => {
            expect(repository.gitPath()).to.equal(fs.realpathSync(path.resolve(__dirname, './dummy_git/')));
        });
    });
    describe('.branch()', () => {
        it('returns name of the current branch', () => {
            expect(repository.branch()).to.equal('master');
        });
    });
    describe('.remoteURL()', () => {
        it('gets the remote URL of the current branch.', () => {
            expect(repository.remoteURL()).to.equal('git@github.com:foo/bar.git');
        });
    });
    describe('.username()', () => {
        it('returns the username of the repository author', () => {
            expect(repository.username()).to.equal('foo');
        });
    });
    describe('.name()', () => {
        it('returns name of the repository', () => {
            expect(repository.name()).to.equal('bar');
        });
    });
    describe('.url()', () => {
        it('returns URL of the repository', () => {
            expect(repository.url()).to.equal('https://github.com/foo/bar');
        });
    });
    describe('.sha()', () => {
        it('returns commit SHA of the current HEAD', () => {
            expect(repository.sha()).to.equal('dcc075287eb8f6eb4ef34133a4747d2b50b28306');
        });
    });
});
