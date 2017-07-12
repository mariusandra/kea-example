#!/bin/bash

# prerequisites: clone mariusandra/kea to ../gh-pages/kea and set to gh-pages branch

npm run build
rsync -ar static/* ../gh-pages/kea/
cd ../gh-pages/kea
mkdir -p guide
mkdir -p examples
cp index.html guide/index.html
cp index.html guide/counter-singleton.html
cp index.html guide/counter-dynamic.html
cp index.html guide/connected.html
cp index.html guide/sliders.html
cp index.html examples/index.html
cp index.html examples/todos.html
git add .
git commit -m 'website update'
git push
cd ../../kea-example
