#!/bin/bash

# prerequisites: clone keajs/kea to ../gh-pages/kea and set to gh-pages branch

npm run build || { echo 'build failed' ; exit 1; }
npm run prerender || { echo 'prerender failed' ; exit 1; }
rsync -ar static/* ../gh-pages/kea/
cd ../gh-pages/kea
mkdir -p img
cp ../../kea-website/app/assets/logo.svg img/logo.svg
cp ../../kea-website/app/assets/logo.png img/logo.png
git add . || { echo 'git add failed' ; exit 1; }
git commit -m 'website update' || { echo 'git commit failed' ; exit 1; }
git push || { echo 'git push failed' ; exit 1; }
cd ../../kea-website
