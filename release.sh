#!/bin/bash
set -ev

if [[ $TRAVIS_PULL_REQUEST = "true" ]]; then
  echo 'this is PR, exiting'

  exit 0
fi

if [[ $TRAVIS_TAG != "" ]]; then
    # Use NPM_TOKEN to enable NPM authentication
    echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc

    NODE_ENV=development npm install
    NODE_ENV=production npm run build

    npm publish
    exit 0
fi

if [[ $(git log --format=%B -n 1 $TRAVIS_COMMIT) == *"chore: release"* ]]; then
    echo 'this is a release, exiting'

    exit 0
fi;

git config --global user.name 'standard-version'
git config --global user.email 'standard-version@travis'

# Use GITHUB_TOKEN to enable GitHub authentication
git config credential.helper "store --file=.git/credentials"
echo "https://${GITHUB_TOKEN}:@github.com" > .git/credentials

git checkout master
git merge $TRAVIS_COMMIT

standard-version --message "chore: release %s"

npm run documentation

git add ./README.md
git commit --amend --no-edit

git push --follow-tags origin master
