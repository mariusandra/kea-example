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
  guideConnectedServices: async('GuideConnectedServices', () => import(/* webpackChunkName: "guideConnectedServices" */'./guide/connected-services')),
  guideMigration: async('GuideMigration', () => import(/* webpackChunkName: "guideMigration" */'./guide/migration')),
  guideForms: async('GuideForms', () => import(/* webpackChunkName: "guideForms" */'./guide/forms')),
  guideTesting: async('GuideTesting', () => import(/* webpackChunkName: "guideTesting" */'./guide/testing')),

  apiLogic: async('ApiLogic', () => import(/* webpackChunkName: "apiLogic" */'./api/logic')),
  apiComponent: async('ApiComponent', () => import(/* webpackChunkName: "apiComponent" */'./api/component')),
  apiConnect: async('ApiConnect', () => import(/* webpackChunkName: "apiConnect" */'./api/connect')),
  apiReducer: async('ApiReducer', () => import(/* webpackChunkName: "apiReducer" */'./api/reducer')),
  apiSaga: async('ApiSaga', () => import(/* webpackChunkName: "apiSaga" */'./api/saga')),
  apiAction: async('ApiAction', () => import(/* webpackChunkName: "apiAction" */'./api/action')),
  apiReset: async('ApiReset', () => import(/* webpackChunkName: "apiReset" */'./api/reset')),

  examplesTodos: async('ExamplesTodos', () => import(/* webpackChunkName: "examplesTodos" */'./examples/todos')),
  examplesGithub: async('ExamplesGithub', () => import(/* webpackChunkName: "examplesGithub" */'./examples/github')),

  playground: async('Playground', () => import(/* webpackChunkName: "playground" */'./playground'))
}
