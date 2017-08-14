import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { ConnectedRouter } from 'react-router-redux'

import { store, history } from './store'
import App from './scenes/index'

import './index.html'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
