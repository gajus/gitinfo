#!/bin/bash
set -ev
rm -fr ./node_modules
git config --global user.name 'standard-version'
git config --global user.email 'standard-version@travis'
git checkout master
git pull origin master
npm install --depth 0
NODE_ENV=production npm run build
standard-version
echo $GITHUB_TOKEN
echo $NPM_TOKEN
git push --follow-tags origin master
npm publish
