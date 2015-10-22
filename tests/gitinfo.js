var expect = require('chai').expect,
    gitinfo = require('../src/gitinfo.js'),
    fs = require('fs');

describe('gitinfo', function () {
    var repository;
    beforeEach(function () {
        repository = gitinfo({
            gitPath: __dirname + '/dummy_git'
        });
    });
    describe('.gitPath()', function () {
        it('returns absolute path to the .git directory', function () {
            expect(repository.gitPath()).to.equal( fs.realpathSync(__dirname + '/dummy_git/') )
        });
    });
    describe('.branch()', function () {
        it('returns name of the current branch', function () {
            expect(repository.branch()).to.equal('master');
        });
    });
    describe('.remoteURL()', function () {
        it('gets the remote URL of the current branch.', function () {
            expect(repository.remoteURL()).to.equal('git@github.com:foo/bar.git');
        });
    })
    describe('.username()', function () {
        it('returns the username of the repository author', function () {
            expect(repository.username()).to.equal('foo');
        });
    });
    describe('.name()', function () {
        it('returns name of the repository', function () {
            expect(repository.name()).to.equal('bar');
        });
    });
    describe('.url()', function () {
        it('returns URL of the repository', function () {
            expect(repository.url()).to.equal('https://github.com/foo/bar');
        });
    });
    describe('.sha()', function () {
        it('returns commit SHA of the current HEAD', function () {
            expect(repository.sha()).to.equal('dcc075287eb8f6eb4ef34133a4747d2b50b28306');
        });
    });
});
