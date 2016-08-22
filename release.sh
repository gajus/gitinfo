#!/bin/bash
set -ev

if [ $TRAVIS_PULL_REQUEST == "true" ]; then
  echo "this is PR, exiting"
  exit 0
fi

rm -fr ./node_modules
git config --global user.name 'standard-version'
git config --global user.email 'standard-version@travis'
git remote "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"

git config credential.helper "store --file=.git/credentials"
echo "https://${GITHUB_TOKEN}:@github.com" > .git/credentials

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
