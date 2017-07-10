#!/bin/bash

# prerequisites: clone mariusandra/kea to ../gh-pages/kea and set to gh-pages branch

npm run build
rsync -ar static/* ../gh-pages/kea/
cd ../gh-pages/kea
cp index.html counter-singleton.html
cp index.html counter-dynamic.html
cp index.html connected.html
cp index.html sliders.html
cp index.html todos.html
git add .
git commit -m 'website update'
git push
cd ../../kea-example
