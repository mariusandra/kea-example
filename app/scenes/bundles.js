import async from '~/components/async'

// object key must match chunk name
export default {
  homepage: async('Homepage', () => import(/* webpackChunkName: "homepage" */'./homepage')),

  guideInstallation: async('GuideInstallation', () => import(/* webpackChunkName: "guideInstallation" */'./guide/installation')),
  guideSliders: async('GuideSliders', () => import(/* webpackChunkName: "guideSliders" */'./guide/sliders')),
  guideGithub: async('GuideGithub', () => import(/* webpackChunkName: "guideGithub" */'./guide/github')),
  guideMigration: async('GuideMigration', () => import(/* webpackChunkName: "guideMigration" */'./guide/migration')),
  guideForms: async('GuideForms', () => import(/* webpackChunkName: "guideForms" */'./guide/forms')),
  guidePlugins: async('GuidePlugins', () => import(/* webpackChunkName: "guidePlugins" */'./guide/plugins')),

  apiKea: async('ApiKea', () => import(/* webpackChunkName: "apiKea" */'./api/kea')),
  apiLogic: async('ApiLogic', () => import(/* webpackChunkName: "apiLogic" */'./api/logic')),
  apiConnect: async('ApiConnect', () => import(/* webpackChunkName: "apiConnect" */'./api/connect')),
  apiContext: async('ApiContext', () => import(/* webpackChunkName: "apiContext" */'./api/context')),
  apiAction: async('ApiAction', () => import(/* webpackChunkName: "apiAction" */'./api/action')),
  apiPlugins: async('ApiPlugins', () => import(/* webpackChunkName: "apiPlugins" */'./api/plugins')),
  apiHooks: async('ApiHooks', () => import(/* webpackChunkName: "apiHooks" */'./api/hooks')),

  pluginsLocalStorage: async('PluginsLocalStorage', () => import(/* webpackChunkName: "pluginsLocalStorage" */'./plugins/localstorage')),
  pluginsRouter: async('PluginsRouter', () => import(/* webpackChunkName: "pluginsRouter" */'./plugins/router')),
  pluginsSockets: async('PluginsSockets', () => import(/* webpackChunkName: "pluginsSockets" */'./plugins/sockets')),

  effectsListeners: async('EffectsListeners', () => import(/* webpackChunkName: "effectsListeners" */'./effects/listeners')),
  effectsSaga: async('EffectsSaga', () => import(/* webpackChunkName: "effectsSaga" */'./effects/saga')),
  effectsThunk: async('EffectsThunk', () => import(/* webpackChunkName: "effectsThunk" */'./effects/thunk')),

  playground: async('Playground', () => import(/* webpackChunkName: "playground" */'./playground'))
}
