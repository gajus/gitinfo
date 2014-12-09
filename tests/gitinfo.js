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
    describe('.branch()', function () {
        it('returns name of the current branch', function () {
            expect(gitinfo.branch()).to.equal('master');
        });
    });
    describe('.remoteURL', function () {
        it('gets the remote URL of the current branch.', function () {
            expect(gitinfo.remoteURL()).to.equal('git@github.com:gajus/gitinfo.git');
        });
    })
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
});
describe('Gitinfo', function () {
    describe('._parseRemoteOriginURL()', function () {
        it('parses HTTPS URL', function () {
            expect(Gitinfo._parseRemoteOriginURL('https://github.com/gajus/gitinfo.git')).to.deep.equal({username: 'gajus', name: 'gitinfo'});
        });
        it('parses SSH URL', function () {
            expect(Gitinfo._parseRemoteOriginURL('git@github.com:gajus/gitinfo.git')).to.deep.equal({username: 'gajus', name: 'gitinfo'});
        });
        it('parses Subeversion URL', function () {
            expect(Gitinfo._parseRemoteOriginURL('https://github.com/gajus/gitinfo')).to.deep.equal({username: 'gajus', name: 'gitinfo'});
        });
        it('throws an if URL cannot be broken into username and name', function () {
            expect(function () {
                Gitinfo._parseRemoteOriginURL('http://gajus.com/blog/some/post');
            }).to.throw(Error, 'Invalid remote origin URL ("http://gajus.com/blog/some/post").');
        });
    });
});