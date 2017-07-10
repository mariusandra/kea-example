import { combineScenesAndRoutes } from 'kea/scene'

const scenes = {
  homepage: require('bundle-loader?lazy&name=homepage!./homepage/scene.js'),
  connected: require('bundle-loader?lazy&name=connected!./connected/scene.js'),
  counterDynamic: require('bundle-loader?lazy&name=counterDynamic!./counter-dynamic/scene.js'),
  counterSingleton: require('bundle-loader?lazy&name=counterSingleton!./counter-singleton/scene.js'),
  sliders: require('bundle-loader?lazy&name=sliders!./sliders/scene.js'),
  todos: require('bundle-loader?lazy&name=todos!./todos/scene.js')
}

const routes = {
  '/': 'homepage',
  '/sliders': 'sliders',
  '/counter-dynamic': 'counterDynamic',
  '/counter-singleton': 'counterSingleton',
  '/connected': 'connected',
  '/todos': 'todos',
  '/todos/:visible': 'todos'
}

export default combineScenesAndRoutes(scenes, routes)
