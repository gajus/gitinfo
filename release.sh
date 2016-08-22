#!/bin/bash
set -ev

if [[ $TRAVIS_PULL_REQUEST == "true" ]]; then
  echo "this is PR, exiting"
  exit 0
fi

if [[ $TRAVIS_TAG == "true" ]]; then
    NODE_ENV=development npm install --depth 0
    NODE_ENV=production npm run build

    npm publish
    exit 0
fi

git config --global user.name 'standard-version'
git config --global user.email 'standard-version@travis'

# Use GITHUB_TOKEN to enable GitHub authentication
git config credential.helper "store --file=.git/credentials"
echo "https://${GITHUB_TOKEN}:@github.com" > .git/credentials

# Use NPM_TOKEN to enable NPM authentication
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc

git checkout master
git merge $TRAVIS_COMMIT

echo 'before'
git status

standard-version --message "chore: release %s [skip ci]"

echo 'after'
git status

git push --follow-tags origin master
