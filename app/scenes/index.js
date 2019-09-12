import './styles.scss'

import React from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'

import WithHeader from '~/components/header'

import bundles from './bundles'

const guideRedirect = () => (<Redirect to='/guide/installation' />)
const apiRedirect = () => (<Redirect to='/api/logic' />)
const effectsRedirect = () => (<Redirect to='/effects/listeners' />)
const pluginsRedirect = () => (<Redirect to='/plugins/router' />)

export default () => (
  <WithHeader>
    <div>
      <Route exact path='/' component={bundles.homepage} />

      <Route path='/guide' exact render={guideRedirect} />
      <Route path='/guide/installation' component={bundles.guideInstallation} />
      <Route path='/guide/sliders' component={bundles.guideSliders} />
      <Route path='/guide/github' component={bundles.guideGithub} />
      <Route path='/guide/migration' component={bundles.guideMigration} />
      <Route path='/guide/forms' component={bundles.guideForms} />
      <Route path='/guide/plugins' component={bundles.guidePlugins} />

      <Route path='/api' exact render={apiRedirect} />
      <Route path='/api/kea' component={bundles.apiKea} />
      <Route path='/api/logic' component={bundles.apiLogic} />
      <Route path='/api/connect' component={bundles.apiConnect} />
      <Route path='/api/context' component={bundles.apiContext} />
      <Route path='/api/action' component={bundles.apiAction} />

      <Route path='/effects' exact render={effectsRedirect} />
      <Route path='/effects/listeners' component={bundles.effectsListeners} />
      <Route path='/effects/saga' component={bundles.effectsSaga} />
      <Route path='/effects/thunk' component={bundles.effectsThunk} />

      <Route path='/plugins' exact render={pluginsRedirect} />
      <Route path='/plugins/router' component={bundles.pluginsRouter} />
      <Route path='/plugins/localstorage' component={bundles.pluginsLocalStorage} />

      <Route path='/playground' component={bundles.playground} />
    </div>
  </WithHeader>
)
