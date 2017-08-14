#!/bin/bash

# prerequisites: clone keajs/kea to ../gh-pages/kea and set to gh-pages branch

npm run build
rsync -ar static/* ../gh-pages/kea/
cd ../gh-pages/kea
mkdir -p guide
mkdir -p examples
mkdir -p api
cp index.html guide/index.html
cp index.html guide/installation.html
cp index.html guide/counter.html
cp index.html guide/counter-dynamic.html
cp index.html guide/connected.html
cp index.html guide/connected-services.html
cp index.html guide/github.html
cp index.html guide/migration.html
cp index.html guide/sliders.html
cp index.html examples/index.html
cp index.html examples/todos.html
cp index.html examples/github.html
cp index.html api/index.html
cp index.html api/logic.html
cp index.html api/component.html
cp index.html api/connect.html
cp index.html api/action.html
cp index.html api/saga.html
cp index.html api/reducer.html
mkdir -p img
cp ../../kea-website/app/assets/logo.svg img/logo.svg
cp ../../kea-website/app/assets/logo.png img/logo.png
git add .
git commit -m 'website update'
git push
cd ../../kea-website
