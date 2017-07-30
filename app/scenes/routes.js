import { combineScenesAndRoutes } from 'kea/scene'

const scenes = {
  homepage: require('bundle-loader?lazy&name=homepage!./homepage/scene.js'),

  guideInstallation: require('bundle-loader?lazy&name=guide!./guide/installation/scene.js'),
  guideCounter: require('bundle-loader?lazy&name=guide!./guide/counter/scene.js'),
  guideCounterDynamic: require('bundle-loader?lazy&name=guide!./guide/counter-dynamic/scene.js'),
  guideSliders: require('bundle-loader?lazy&name=guide!./guide/sliders/scene.js'),
  guideGithub: require('bundle-loader?lazy&name=guide!./guide/github/scene.js'),
  guideConnected: require('bundle-loader?lazy&name=guide!./guide/connected/scene.js'),

  apiLogic: require('bundle-loader?lazy&name=api!./api/logic/scene.js'),
  apiComponent: require('bundle-loader?lazy&name=api!./api/component/scene.js'),
  apiConnect: require('bundle-loader?lazy&name=api!./api/connect/scene.js'),
  apiReducer: require('bundle-loader?lazy&name=api!./api/reducer/scene.js'),
  apiSaga: require('bundle-loader?lazy&name=api!./api/saga/scene.js'),
  apiAction: require('bundle-loader?lazy&name=api!./api/action/scene.js'),

  exampleTodos: require('bundle-loader?lazy&name=exampleTodos!./examples/todos/scene.js'),
  exampleGithub: require('bundle-loader?lazy&name=exampleGithub!./examples/github/scene.js'),

  playground: require('bundle-loader?lazy&name=playground!./playground/scene.js')
}

const routes = {
  '/': 'homepage',

  '/guide': 'guideInstallation',
  '/guide/installation': 'guideInstallation',
  '/guide/counter': 'guideCounter',
  '/guide/counter-dynamic': 'guideCounterDynamic',
  '/guide/sliders': 'guideSliders',
  '/guide/github': 'guideGithub',
  '/guide/connected': 'guideConnected',

  '/api': 'apiLogic',
  '/api/logic': 'apiLogic',
  '/api/component': 'apiComponent',
  '/api/connect': 'apiConnect',
  '/api/reducer': 'apiReducer',
  '/api/saga': 'apiSaga',
  '/api/action': 'apiAction',

  '/examples/todos': 'exampleTodos',
  '/examples/todos/:visible': 'exampleTodos',

  '/examples/github': 'exampleGithub',
  '/examples/github/:username': 'exampleGithub',
  '/examples/github/:username/:repository': 'exampleGithub',

  '/playground': 'playground'
}

export default combineScenesAndRoutes(scenes, routes)
