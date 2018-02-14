import async from '~/components/async'

// object key must match chunk name
export default {
  homepage: async('Homepage', () => import(/* webpackChunkName: "homepage" */'./homepage')),

  guideInstallation: async('GuideInstallation', () => import(/* webpackChunkName: "guideInstallation" */'./guide/installation')),
  guideCounter: async('GuideCounter', () => import(/* webpackChunkName: "guideCounter" */'./guide/counter')),
  guideCounterDynamic: async('GuideCounterDynamic', () => import(/* webpackChunkName: "guideCounterDynamic" */'./guide/counter-dynamic')),
  guideSliders: async('GuideSliders', () => import(/* webpackChunkName: "guideSliders" */'./guide/sliders')),
  guideGithub: async('GuideGithub', () => import(/* webpackChunkName: "guideGithub" */'./guide/github')),
  guideConnected: async('GuideConnected', () => import(/* webpackChunkName: "guideConnected" */'./guide/connected')),
  guideDynamicConnected: async('GuideDynamicConnected', () => import(/* webpackChunkName: "guideDynamicConnected" */'./guide/dynamic-connected')),
  guideConnectedServices: async('GuideConnectedServices', () => import(/* webpackChunkName: "guideConnectedServices" */'./guide/connected-services')),
  guideMigration: async('GuideMigration', () => import(/* webpackChunkName: "guideMigration" */'./guide/migration')),
  guideForms: async('GuideForms', () => import(/* webpackChunkName: "guideForms" */'./guide/forms')),
  guideTesting: async('GuideTesting', () => import(/* webpackChunkName: "guideTesting" */'./guide/testing')),
  guideFaq: async('GuideFaq', () => import(/* webpackChunkName: "guideFaq" */'./guide/faq')),

  apiLogic: async('ApiLogic', () => import(/* webpackChunkName: "apiLogic" */'./api/logic')),
  apiComponent: async('ApiComponent', () => import(/* webpackChunkName: "apiComponent" */'./api/component')),
  apiConnect: async('ApiConnect', () => import(/* webpackChunkName: "apiConnect" */'./api/connect')),
  apiReducer: async('ApiReducer', () => import(/* webpackChunkName: "apiReducer" */'./api/reducer')),
  apiStore: async('ApiStore', () => import(/* webpackChunkName: "apiStore" */'./api/store')),
  apiAction: async('ApiAction', () => import(/* webpackChunkName: "apiAction" */'./api/action')),
  apiReset: async('ApiReset', () => import(/* webpackChunkName: "apiReset" */'./api/reset')),

  pluginsLocalStorage: async('PluginsLocalStorage', () => import(/* webpackChunkName: "pluginsLocalStorage" */'./plugins/localstorage')),

  effectsSaga: async('EffectsSaga', () => import(/* webpackChunkName: "effectsSaga" */'./effects/saga')),
  effectsThunk: async('EffectsThunk', () => import(/* webpackChunkName: "effectsThunk" */'./effects/thunk')),

  examplesTodos: async('ExamplesTodos', () => import(/* webpackChunkName: "examplesTodos" */'./examples/todos')),
  examplesGithub: async('ExamplesGithub', () => import(/* webpackChunkName: "examplesGithub" */'./examples/github')),
  examplesHackerNews: async('ExamplesHackerNews', () => import(/* webpackChunkName: "examplesHackerNews" */'./examples/hacker-news')),

  playground: async('Playground', () => import(/* webpackChunkName: "playground" */'./playground'))
}
