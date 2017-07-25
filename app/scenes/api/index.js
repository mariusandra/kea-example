import './styles.scss'

import React, { Component } from 'react'
import Highlight from 'react-highlight'

const code = {
  import: require('raw-loader!./code/import.txt'),
  keaUsage: require('raw-loader!./code/kea-usage.txt'),
  keaPath: require('raw-loader!./code/kea-path.txt'),
  keaConstants: require('raw-loader!./code/kea-constants.txt'),
  keaActions: require('raw-loader!./code/kea-actions.txt'),
  keaReducers: require('raw-loader!./code/kea-reducers.txt'),
  keaSelectors: require('raw-loader!./code/kea-selectors.txt'),
  keaConnect: require('raw-loader!./code/kea-connect.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h1>API</h1>
        <Highlight className='javascript'>{code.import}</Highlight>
        <div id='kea'>
          <a name='kea' />
          <h2><code>kea(options)</code></h2>
          <p>
            Create a new kea logic store and connect it to redux.
          </p>
          <p style={{fontStyle: 'italic'}}>
            Note: For the dynamically connected instances, see the section <code>kea(options)(Component)</code> below.
          </p>
          <h3>Usage</h3>
          <Highlight className='javascript'>{code.keaUsage}</Highlight>

          <h3>Options</h3>

          <h4>path: <code>() => []</code></h4>
          <p>
            Give a name to the component and register it in a certain location in your application's Redux tree.
          </p>
          <Highlight className='javascript'>{code.keaPath}</Highlight>

          <h4>constants: <code>() => []</code></h4>
          <p>
          </p>
          <Highlight className='javascript'>{code.keaConstants}</Highlight>

          <h4>actions: <code>{'({ path, constants }) => ({})'}</code></h4>
          <p>
          </p>
          <Highlight className='javascript'>{code.keaActions}</Highlight>

          <h4>reducers: <code>{'({ path, constants, actions }) => ({})'}</code></h4>
          <p>
          </p>
          <Highlight className='javascript'>{code.keaReducers}</Highlight>

          <h4>selectors: <code>{'({ path, constants, actions, selectors }) => ({})'}</code></h4>
          <p>
          </p>
          <Highlight className='javascript'>{code.keaSelectors}</Highlight>

          <h4>connect: <code>{'{}'}</code></h4>
          <p>
          </p>
          <Highlight className='javascript'>{code.keaConnect}</Highlight>

          <h4>start: <code>function * () {'{}'}</code></h4>
          <h4>stop: <code>function * () {'{}'}</code></h4>
          <h4>takeEvery: <code>{'({ actions }) => ({})'}</code></h4>
          <h4>takeLatest: <code>{'({ actions }) => ({})'}</code></h4>
          <h4>workers: <code>{'{}'}</code></h4>
          <h3>Returns</h3>
        </div>

        <div id='component'>
          <a name='component' />
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
        </div>

        <div id='connect'>
          <h2><code>connect(options)</code></h2>
          <p>
            Shorthand for <code>{'kea({ connect: options })'}</code>
          </p>
        </div>

        <div id='reducer'>
          <h2><code>keaReducer(reducerRoot)</code></h2>
        </div>

        <div id='saga'>
          <h2><code>keaSaga</code></h2>
        </div>

        <div id='createaction'>
          <h2><code>createAction</code></h2>
        </div>
      </div>
    )
  }
}

