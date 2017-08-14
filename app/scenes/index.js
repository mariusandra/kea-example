import './styles.scss'

import React from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'

import asyncComponent from '~/utils/async-component'

import WithHeader from '~/components/header'

// all the root components in this app
export const Homepage = asyncComponent('Homepage', () => import(/* webpackChunkName: "homepage" */'./homepage'))

export const GuideInstallation = asyncComponent('GuideInstallation', () => import(/* webpackChunkName: "guideInstallation" */'./guide/installation'))
export const GuideCounter = asyncComponent('GuideCounter', () => import(/* webpackChunkName: "guideCounter" */'./guide/counter'))
export const GuideCounterDynamic = asyncComponent('GuideCounterDynamic', () => import(/* webpackChunkName: "guideCounterDynamic" */'./guide/counter-dynamic'))
export const GuideSliders = asyncComponent('GuideSliders', () => import(/* webpackChunkName: "guideSliders" */'./guide/sliders'))
export const GuideGithub = asyncComponent('GuideGithub', () => import(/* webpackChunkName: "guideGithub" */'./guide/github'))
export const GuideConnected = asyncComponent('GuideConnected', () => import(/* webpackChunkName: "guideConnected" */'./guide/connected'))
export const GuideConnectedServices = asyncComponent('GuideConnectedServices', () => import(/* webpackChunkName: "guideConnectedServices" */'./guide/connected-services'))
export const GuideMigration = asyncComponent('GuideMigration', () => import(/* webpackChunkName: "guideMigration" */'./guide/migration'))

export const ApiLogic = asyncComponent('ApiLogic', () => import(/* webpackChunkName: "apiLogic" */'./api/logic'))
export const ApiComponent = asyncComponent('ApiComponent', () => import(/* webpackChunkName: "apiComponent" */'./api/component'))
export const ApiConnect = asyncComponent('ApiConnect', () => import(/* webpackChunkName: "apiConnect" */'./api/connect'))
export const ApiReducer = asyncComponent('ApiReducer', () => import(/* webpackChunkName: "apiReducer" */'./api/reducer'))
export const ApiSaga = asyncComponent('ApiSaga', () => import(/* webpackChunkName: "apiSaga" */'./api/saga'))
export const ApiAction = asyncComponent('ApiAction', () => import(/* webpackChunkName: "apiAction" */'./api/action'))

export const ExampleTodos = asyncComponent('ExampleTodos', () => import(/* webpackChunkName: "exampleTodos" */'./examples/todos'))
export const ExampleGithub = asyncComponent('ExampleGithub', () => import(/* webpackChunkName: "exampleGithub" */'./examples/github'))

export const Playground = asyncComponent('Playground', () => import(/* webpackChunkName: "playground" */'./playground'))

export default () => (
  <WithHeader>
    <div>
      <Route exact path='/' component={Homepage} />

      <Route path='/guide'><Redirect to='/guide/installation' /></Route>
      <Route path='/guide/installation' component={GuideInstallation} />
      <Route path='/guide/counter' component={GuideCounter} />
      <Route path='/guide/counter-dynamic' component={GuideCounterDynamic} />
      <Route path='/guide/sliders' component={GuideSliders} />
      <Route path='/guide/github' component={GuideGithub} />
      <Route path='/guide/connected' component={GuideConnected} />
      <Route path='/guide/connected-services' component={GuideConnectedServices} />
      <Route path='/guide/migration' component={GuideMigration} />

      <Route path='/api'><Redirect to='/api/logic' /></Route>
      <Route path='/api/logic' component={ApiLogic} />
      <Route path='/api/component' component={ApiComponent} />
      <Route path='/api/connect' component={ApiConnect} />
      <Route path='/api/reducer' component={ApiReducer} />
      <Route path='/api/saga' component={ApiSaga} />
      <Route path='/api/action' component={ApiAction} />

      <Route path='/examples'><Redirect to='/examples/todos' /></Route>
      <Route path='/examples/todos' component={ExampleTodos} />
      <Route path='/examples/github' component={ExampleGithub} />

      <Route path='/playground' component={Playground} />
    </div>
  </WithHeader>
)
