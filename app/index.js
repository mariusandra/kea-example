import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { ConnectedRouter } from 'connected-react-router'

import { store, history } from './store'
import App from './scenes/index'

import './index.html'

import bundles from './scenes/bundles'

function deploy (method) {
  method(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
}

function render () {
  deploy(ReactDOM.render)
}

function hydrate () {
  deploy(ReactDOM.hydrate)
}

// do we have to preload bundles before rendering?
if (typeof window !== 'undefined' && window.__keaPrerender) {
  Promise.all(window.__keaPrerender.map(chunk => bundles[chunk].loadComponent())).then(hydrate).catch(render)
} else {
  render()
}
