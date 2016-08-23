import fs from 'fs';
import path from 'path';
import {
    expect
} from 'chai';
import gitinfo from './../src/gitinfo.js';

describe('gitinfo', () => {
  let repository;

  beforeEach(() => {
    repository = gitinfo({
      gitPath: path.resolve(__dirname, './dummy_git')
    });
  });
  describe('.getGitPath()', () => {
    it('returns absolute path to the .git directory', () => {
      expect(repository.getGitPath()).to.equal(fs.realpathSync(path.resolve(__dirname, './dummy_git/')));
    });
  });
  describe('.getBranchName()', () => {
    it('returns name of the current branch', () => {
      expect(repository.getBranchName()).to.equal('master');
    });
  });
  describe('.getRemoteUrl()', () => {
    it('gets the remote URL of the current branch.', () => {
      expect(repository.getRemoteUrl()).to.equal('git@github.com:foo/bar.git');
    });
  });
  describe('.getUsername()', () => {
    it('returns the username of the repository author', () => {
      expect(repository.getUsername()).to.equal('foo');
    });
  });
  describe('.getName()', () => {
    it('returns name of the repository', () => {
      expect(repository.getName()).to.equal('bar');
    });
  });
  describe('.getGithubUrl()', () => {
    it('returns URL of the repository', () => {
      expect(repository.getGithubUrl()).to.equal('https://github.com/foo/bar');
    });
  });
  describe('.getHeadSha()', () => {
    it('returns commit SHA of the current HEAD', () => {
      expect(repository.getHeadSha()).to.equal('dcc075287eb8f6eb4ef34133a4747d2b50b28306');
    });
  });
});
