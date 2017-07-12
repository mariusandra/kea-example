import { combineScenesAndRoutes } from 'kea/scene'

const scenes = {
  homepage: require('bundle-loader?lazy&name=homepage!./homepage/scene.js'),

  guideInstallation: require('bundle-loader?lazy&name=guide!./guide/installation/scene.js'),
  guideCounter: require('bundle-loader?lazy&name=guide!./guide/counter/scene.js'),
  guideCounterDynamic: require('bundle-loader?lazy&name=guide!./guide/counter-dynamic/scene.js'),
  guideSliders: require('bundle-loader?lazy&name=guide!./guide/sliders/scene.js'),
  guideConnected: require('bundle-loader?lazy&name=guide!./guide/connected/scene.js'),

  exampleTodos: require('bundle-loader?lazy&name=exampleTodos!./examples/todos/scene.js')
}

const routes = {
  '/': 'homepage',

  '/guide': 'guideInstallation',
  '/guide/installation': 'guideInstallation',
  '/guide/counter': 'guideCounter',
  '/guide/counter-dynamic': 'guideCounterDynamic',
  '/guide/sliders': 'guideSliders',
  '/guide/connected': 'guideConnected',

  '/examples/todos': 'exampleTodos',
  '/examples/todos/:visible': 'exampleTodos'
}

export default combineScenesAndRoutes(scenes, routes)
