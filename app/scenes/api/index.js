import './styles.scss'

import React, { Component } from 'react'

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h1>API</h1>
        <code>{"import { kea, connect, keaReducer, keaSaga } from 'kea'"}</code>
        <h2><code>kea(options)</code></h2>
        <p>
          Initiate a kea instance.
        </p>
        <h3>Options</h3>
        <h4>path: <code>(obj) => []</code></h4>
        <h4>constants: <code>(obj) => []</code></h4>
        <h4>actions: <code>(obj) => ({'{}'})</code></h4>
        <h4>reducers: <code>(obj) => ({'{}'})</code></h4>
        <h4>selectors: <code>(obj) => ({'{}'})</code></h4>
        <h4>connect: <code>{'{}'}</code></h4>
        <h4>start: <code>function * () {'{}'}</code></h4>
        <h4>stop: <code>function * () {'{}'}</code></h4>
        <h4>takeEvery: <code>(obj) => ({'{}'})</code></h4>
        <h4>takeLatest: <code>(obj) => ({'{}'})</code></h4>
        <h4>workers: <code>{'{}'}</code></h4>

        <h2><code>kea(options)(Component)</code></h2>
        <p>
          Wrap a kea instance around a React component.
        </p>
        <h3>Options</h3>
        <p>
          Same as above, but in addition
        </p>
        <h4>key: <code>(props) => 'key'</code></h4>
        <h4>path: <code>(key) => []</code></h4>

        <h2><code>connect(options)</code></h2>
        <p>
          Shorthand for <code>{'kea({ connect: options })'}</code>
        </p>

        <h2><code>keaReducer(reducerRoot)</code></h2>
        <h2><code>keaSaga</code></h2>
        </div>
    )
  }
}

