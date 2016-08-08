/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';
import {
    parseRemoteOriginURL,
    trim
} from './../src/utils';

describe('utils', () => {
    describe('.parseRemoteOriginURL()', () => {
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

    describe('.trim()', () => {
        it('trims whitespaces, tabs and newlines', () => {
            expect(trim('  \tsomeText with spaces\n')).to.equal('someText with spaces');
        });
    });
});
