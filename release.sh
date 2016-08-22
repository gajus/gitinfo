#!/bin/bash
set -ev
rm -fr ./node_modules
git config --global user.name 'standard-version'
git config --global user.email 'standard-version@travis'
git remote "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"

echo $TRAVIS_BRANCH
echo $TRAVIS_COMMIT_RANGE
echo $TRAVIS_EVENT_TYPE
echo $TRAVIS_REPO_SLUG
echo $TRAVIS_PULL_REQUEST

git remote -v
git config --list

git checkout master
git pull origin master
NODE_ENV=development npm install --depth 0
NODE_ENV=production npm run build
standard-version
git push --follow-tags origin master
npm publish
