var expect = require('chai').expect,
    utils = require('../src/utils');

describe('utils', function () {
    describe('.parseRemoteOriginURL()', function () {
        it('parses HTTPS URL', function () {
            expect(utils.parseRemoteOriginURL('https://github.com/gajus/gitinfo.git')).to.deep.equal({username: 'gajus', name: 'gitinfo'});
        });
        it('parses SSH URL', function () {
            expect(utils.parseRemoteOriginURL('git@github.com:gajus/gitinfo.git')).to.deep.equal({username: 'gajus', name: 'gitinfo'});
        });
        it('parses Subeversion URL', function () {
            expect(utils.parseRemoteOriginURL('https://github.com/gajus/gitinfo')).to.deep.equal({username: 'gajus', name: 'gitinfo'});
        });
        it('throws an if URL cannot be broken into username and name', function () {
            expect(function () {
                utils.parseRemoteOriginURL('http://gajus.com/blog/some/post');
            }).to.throw(Error, 'Invalid remote origin URL ("http://gajus.com/blog/some/post").');
        });
    });
});
