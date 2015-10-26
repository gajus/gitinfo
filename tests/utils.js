import {
    expect
} from 'chai';

import utils from './../src/utils';

describe('utils', () => {
    describe('.parseRemoteOriginURL()', () => {
        it('parses HTTPS URL', () => {
            expect(utils.parseRemoteOriginURL('https://github.com/gajus/gitinfo.git')).to.deep.equal({
                username: 'gajus',
                name: 'gitinfo'
            });
        });
        it('parses SSH URL', () => {
            expect(utils.parseRemoteOriginURL('git@github.com:gajus/gitinfo.git')).to.deep.equal({
                username: 'gajus',
                name: 'gitinfo'
            });
        });
        it('parses Subeversion URL', () => {
            expect(utils.parseRemoteOriginURL('https://github.com/gajus/gitinfo')).to.deep.equal({
                username: 'gajus',
                name: 'gitinfo'
            });
        });
        it('throws an if URL cannot be broken into username and name', () => {
            expect(() => {
                utils.parseRemoteOriginURL('http://gajus.com/blog/some/post');
            }).to.throw(Error, 'Invalid remote origin URL ("http://gajus.com/blog/some/post").');
        });
    });

    describe('.trim()', () => {
        it('trims whitespaces, tabs and newlines', () => {
            expect(utils.trim('  \tsomeText with spaces\n')).to.equal('someText with spaces');
        });
    });
});
