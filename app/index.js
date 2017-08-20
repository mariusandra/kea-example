import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { ConnectedRouter } from 'react-router-redux'

import { store, history } from './store'
import App from './scenes/index'

import './index.html'

import bundles from './scenes/bundles'

function render () {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
}

// do we have to preload bundles before rendering?
if (typeof window !== 'undefined' && window.__keaPrerender) {
  Promise.all(window.__keaPrerender.map(chunk => bundles[chunk].loadComponent())).then(render).catch(render)
} else {
  render()
}
