#!/bin/bash
set -ev
rm -fr ./node_modules
git config --global user.name 'standard-version'
git config --global user.email 'standard-version@travis'
git checkout master
git pull origin master
npm install
NODE_ENV=production npm run build
standard-version
git push --follow-tags origin master
npm publish
