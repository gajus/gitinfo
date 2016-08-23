/* eslint-disable max-nested-callbacks */

import path from 'path';
import {
    expect
} from 'chai';
import {
    findGitPath,
    parseRemoteOriginUrl
} from './../src/utils';

describe('utils', () => {
  describe('parseRemoteOriginUrl()', () => {
    it('parses HTTPS URL', () => {
      expect(parseRemoteOriginUrl('https://github.com/gajus/gitinfo.git')).to.deep.equal({
        name: 'gitinfo',
        username: 'gajus'
      });
    });
    it('parses SSH URL', () => {
      expect(parseRemoteOriginUrl('git@github.com:gajus/gitinfo.git')).to.deep.equal({
        name: 'gitinfo',
        username: 'gajus'
      });
    });
    it('parses Subeversion URL', () => {
      expect(parseRemoteOriginUrl('https://github.com/gajus/gitinfo')).to.deep.equal({
        name: 'gitinfo',
        username: 'gajus'
      });
    });
    it('throws an if URL cannot be broken into username and name', () => {
      expect(() => {
        parseRemoteOriginUrl('http://gajus.com/blog/some/post');
      }).to.throw(Error, 'Invalid remote origin URL ("http://gajus.com/blog/some/post").');
    });
  });
  describe('findGitPath()', () => {
    context('a path of a descendant directory that has a parent directory that includes .git directory', () => {
      it('resolves path of the .git directory', () => {
        const targetPath = path.resolve(__dirname, './../.git');
        const resolvedPath = findGitPath(__dirname);

        expect(resolvedPath).to.equal(targetPath);
      });
    });
  });
});
