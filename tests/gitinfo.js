// @flow

import {
  writeFile,
  realpathSync
} from 'fs';
import path from 'path';
import {
  expect
} from 'chai';
import gitinfo from '../src/gitinfo';

const writeFileAsync = (fileName) => {
  return (data) => {
    return new Promise((resolve, reject) => {
      writeFile(fileName, data, 'utf8', (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };
};

describe('gitinfo', () => {
  let repository;
  const directory = path.resolve(__dirname, './dummy_git');

  beforeEach(() => {
    repository = gitinfo({
      defaultBranchName: 'master',
      gitPath: directory
    });
  });
  describe('.getGitPath()', () => {
    it('returns absolute path to the .git directory', () => {
      expect(repository.getGitPath()).to.equal(realpathSync(path.resolve(__dirname, './dummy_git/')));
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

    it('fallback to default branch if local branch is not tracking upstream', (done) => {
      writeFileAsync(directory + '/HEAD')('ref: refs/heads/dummy')
        .then(() => {
          expect(repository.getRemoteUrl()).to.equal('git@github.com:foo/bar.git');

          return writeFileAsync(directory + '/HEAD')('ref: refs/heads/master');
        })
        .then(() => {
          return done();
        })
        .catch((error) => {
          throw new Error(error);
        });
    });

    it('fallback to default branch if "You are in \'detached HEAD\' state."', (done) => {
      writeFileAsync(directory + '/HEAD')('32d1ad0c4b984cfb01b52f0477da528cfd1fe4c8')
        .then(() => {
          expect(repository.getRemoteUrl()).to.equal('git@github.com:foo/bar.git');

          return writeFileAsync(directory + '/HEAD')('ref: refs/heads/master');
        })
        .then(() => {
          return done();
        })
        .catch((error) => {
          throw new Error(error);
        });
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
