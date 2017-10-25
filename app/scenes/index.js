import './styles.scss'

import React from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'

import WithHeader from '~/components/header'

import bundles from './bundles'

const guideRedirect = () => (<Redirect to='/guide/installation' />)
const apiRedirect = () => (<Redirect to='/api/logic' />)
const effectsRedirect = () => (<Redirect to='/effects/saga' />)
const examplesRedirect = () => (<Redirect to='/examples/todos' />)

export default () => (
  <WithHeader>
    <div>
      <Route exact path='/' component={bundles.homepage} />

      <Route path='/guide' exact render={guideRedirect} />
      <Route path='/guide/installation' component={bundles.guideInstallation} />
      <Route path='/guide/counter' component={bundles.guideCounter} />
      <Route path='/guide/counter-dynamic' component={bundles.guideCounterDynamic} />
      <Route path='/guide/sliders' component={bundles.guideSliders} />
      <Route path='/guide/github' component={bundles.guideGithub} />
      <Route path='/guide/connected' component={bundles.guideConnected} />
      <Route path='/guide/connected-services' component={bundles.guideConnectedServices} />
      <Route path='/guide/migration' component={bundles.guideMigration} />
      <Route path='/guide/forms' component={bundles.guideForms} />
      <Route path='/guide/testing' component={bundles.guideTesting} />
      <Route path='/guide/faq' component={bundles.guideFaq} />

      <Route path='/api' exact render={apiRedirect} />
      <Route path='/api/logic' component={bundles.apiLogic} />
      <Route path='/api/component' component={bundles.apiComponent} />
      <Route path='/api/connect' component={bundles.apiConnect} />
      <Route path='/api/reducer' component={bundles.apiReducer} />
      <Route path='/api/store' component={bundles.apiStore} />
      <Route path='/api/action' component={bundles.apiAction} />
      <Route path='/api/reset' component={bundles.apiReset} />

      <Route path='/effects' exact render={effectsRedirect} />
      <Route path='/effects/saga' component={bundles.effectsSaga} />
      <Route path='/effects/thunk' component={bundles.effectsThunk} />

      <Route path='/examples' exact render={examplesRedirect} />
      <Route path='/examples/todos' component={bundles.examplesTodos} />
      <Route path='/examples/github' component={bundles.examplesGithub} />
      <Route path='/examples/hackernews' component={bundles.examplesHackerNews} />

      <Route path='/playground' component={bundles.playground} />
    </div>
  </WithHeader>
)
