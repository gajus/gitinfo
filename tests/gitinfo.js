var expect = require('chai').expect,
    Gitinfo = require('../src/gitinfo.js'),
    fs = require('fs');

describe('gitinfo', function () {
    var gitinfo;
    beforeEach(function () {
        gitinfo = Gitinfo();
    });
    describe('.gitPath()', function () {
        it('returns absolute path to the .git directory', function () {
            expect(gitinfo.gitPath()).to.equal( fs.realpathSync(__dirname + '/../.git') )
        });
    });
    describe('.username()', function () {
        it('returns the username of the repository author', function () {
            expect(gitinfo.username()).to.equal('gajus');
        });
    });
    describe('.name()', function () {
        it('returns name of the repository', function () {
            expect(gitinfo.name()).to.equal('gitinfo');
        });
    });
    describe('.url()', function () {
        it('returns URL of the repository', function () {
            expect(gitinfo.url()).to.equal('https://github.com/gajus/gitinfo');
        });
    });
    describe('.branch()', function () {
        it('returns name of the current branch', function () {
            expect(gitinfo.branch()).to.equal('master');
        });
    });
});