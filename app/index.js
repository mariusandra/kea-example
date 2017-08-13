import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { getRoutes } from 'kea/scene'

import store from './store'
import routes from './scenes/routes'
import App from './scenes/index'

import './index.html'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={getRoutes(App, store, routes)} />
  </Provider>,
  document.getElementById('root')
)
