import './styles.scss'

import React from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'

import asyncComponent from '~/utils/async-component'

import WithHeader from '~/components/header'

// all the root components in this app
const Homepage = asyncComponent('Homepage', () => import(/* webpackChunkName: "homepage" */'./homepage'))

const guideRedirect = () => (<Redirect to='/guide/installation' />)
const GuideInstallation = asyncComponent('GuideInstallation', () => import(/* webpackChunkName: "guideInstallation" */'./guide/installation'))
const GuideCounter = asyncComponent('GuideCounter', () => import(/* webpackChunkName: "guideCounter" */'./guide/counter'))
const GuideCounterDynamic = asyncComponent('GuideCounterDynamic', () => import(/* webpackChunkName: "guideCounterDynamic" */'./guide/counter-dynamic'))
const GuideSliders = asyncComponent('GuideSliders', () => import(/* webpackChunkName: "guideSliders" */'./guide/sliders'))
const GuideGithub = asyncComponent('GuideGithub', () => import(/* webpackChunkName: "guideGithub" */'./guide/github'))
const GuideConnected = asyncComponent('GuideConnected', () => import(/* webpackChunkName: "guideConnected" */'./guide/connected'))
const GuideConnectedServices = asyncComponent('GuideConnectedServices', () => import(/* webpackChunkName: "guideConnectedServices" */'./guide/connected-services'))
const GuideMigration = asyncComponent('GuideMigration', () => import(/* webpackChunkName: "guideMigration" */'./guide/migration'))

const apiRedirect = () => (<Redirect to='/api/logic' />)
const ApiLogic = asyncComponent('ApiLogic', () => import(/* webpackChunkName: "apiLogic" */'./api/logic'))
const ApiComponent = asyncComponent('ApiComponent', () => import(/* webpackChunkName: "apiComponent" */'./api/component'))
const ApiConnect = asyncComponent('ApiConnect', () => import(/* webpackChunkName: "apiConnect" */'./api/connect'))
const ApiReducer = asyncComponent('ApiReducer', () => import(/* webpackChunkName: "apiReducer" */'./api/reducer'))
const ApiSaga = asyncComponent('ApiSaga', () => import(/* webpackChunkName: "apiSaga" */'./api/saga'))
const ApiAction = asyncComponent('ApiAction', () => import(/* webpackChunkName: "apiAction" */'./api/action'))

const examplesRedirect = () => (<Redirect to='/examples/todos' />)
const ExamplesTodos = asyncComponent('ExamplesTodos', () => import(/* webpackChunkName: "examplesTodos" */'./examples/todos'))
const ExamplesGithub = asyncComponent('ExamplesGithub', () => import(/* webpackChunkName: "examplesGithub" */'./examples/github'))

const Playground = asyncComponent('Playground', () => import(/* webpackChunkName: "playground" */'./playground'))

export default () => (
  <WithHeader>
    <div>
      <Route exact path='/' component={Homepage} />

      <Route path='/guide' exact render={guideRedirect} />
      <Route path='/guide/installation' component={GuideInstallation} />
      <Route path='/guide/counter' component={GuideCounter} />
      <Route path='/guide/counter-dynamic' component={GuideCounterDynamic} />
      <Route path='/guide/sliders' component={GuideSliders} />
      <Route path='/guide/github' component={GuideGithub} />
      <Route path='/guide/connected' component={GuideConnected} />
      <Route path='/guide/connected-services' component={GuideConnectedServices} />
      <Route path='/guide/migration' component={GuideMigration} />

      <Route path='/api' exact render={apiRedirect} />
      <Route path='/api/logic' component={ApiLogic} />
      <Route path='/api/component' component={ApiComponent} />
      <Route path='/api/connect' component={ApiConnect} />
      <Route path='/api/reducer' component={ApiReducer} />
      <Route path='/api/saga' component={ApiSaga} />
      <Route path='/api/action' component={ApiAction} />

      <Route path='/examples' exact render={examplesRedirect} />
      <Route path='/examples/todos' component={ExamplesTodos} />
      <Route path='/examples/github' component={ExamplesGithub} />

      <Route path='/playground' component={Playground} />
    </div>
  </WithHeader>
)
