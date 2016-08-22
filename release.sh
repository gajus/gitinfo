#!/bin/bash
set -ev
rm -fr ./node_modules
git config --global user.name 'standard-version'
git config --global user.email 'standard-version@travis'

echo $TRAVIS_BRANCH
echo $TRAVIS_COMMIT_RANGE
echo $TRAVIS_EVENT_TYPE
echo $TRAVIS_REPO_SLUG
echo $TRAVIS_PULL_REQUEST

git remote -v

git checkout master
git pull origin master
NODE_ENV=development npm install --depth 0
NODE_ENV=production npm run build
standard-version
git push --follow-tags origin master
npm publish
