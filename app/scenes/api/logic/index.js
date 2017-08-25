import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  keaUsage: require('raw-loader!./code/kea-usage.txt'),
  keaPath: require('raw-loader!./code/kea-path.txt'),
  keaConstants: require('raw-loader!./code/kea-constants.txt'),
  keaActions: require('raw-loader!./code/kea-actions.txt'),
  keaReducers: require('raw-loader!./code/kea-reducers.txt'),
  keaSelectors: require('raw-loader!./code/kea-selectors.txt'),
  keaConnect: require('raw-loader!./code/kea-connect.txt'),

  keaSagas: require('raw-loader!./code/kea-sagas.txt'),
  keaStart: require('raw-loader!./code/kea-start.txt'),
  keaStop: require('raw-loader!./code/kea-stop.txt'),
  keaTakeEvery: require('raw-loader!./code/kea-takeevery.txt'),
  keaTakeLatest: require('raw-loader!./code/kea-takelatest.txt'),
  keaWorkers: require('raw-loader!./code/kea-workers.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>kea(options)</code></h2>
        <p>
          Create a new kea <strong>logic store</strong> and connect it to redux.
        </p>
        <h3>Usage</h3>
        <p>
          Here is a complete example with all the options available. See below for further explanations.
        </p>
        <Highlight className='javascript'>{code.keaUsage}</Highlight>

        <h3>Options</h3>

        <h4>path: <code>() => []</code></h4>
        <p>
          Give a name to the logic store and register it in a certain location in your application's Redux tree.
        </p>
        <Highlight className='javascript'>{code.keaPath}</Highlight>

        <h4>constants: <code>() => []</code></h4>
        <p>
          Create constants that can be used in other parts of the logic store.
        </p>
        <Highlight className='javascript'>{code.keaConstants}</Highlight>

        <h4>actions: <code>{'({ path, constants }) => ({})'}</code></h4>
        <p>
          Define action creators
        </p>
        <Highlight className='javascript'>{code.keaActions}</Highlight>

        <h4>reducers: <code>{'({ path, constants, actions }) => ({})'}</code></h4>
        <p>
          Define the structure and logic of your reducers
        </p>
        <Highlight className='javascript'>{code.keaReducers}</Highlight>

        <h4>selectors: <code>{'({ path, constants, actions, selectors }) => ({})'}</code></h4>
        <p>
          Define selectors, which are only recomputed when their input changes
        </p>
        <Highlight className='javascript'>{code.keaSelectors}</Highlight>

        <h4>connect: <code>{'{}'}</code></h4>
        <p>
          Fetch actions and selectors/props from other logic stores.
        </p>
        <Highlight className='javascript'>{code.keaConnect}</Highlight>

        <h4>start: <code>function * () {'{}'}</code></h4>
        <p>
          Saga that is started whenever the component is connected or the saga exported from this component starts
        </p>
        <p>
          Note: sagas are started with your component's <code>componentDidMount</code>. Actions dispatched before this lifecycle
          method will not be seen inside <code>start</code>.
        </p>
        <Highlight className='javascript'>{code.keaStart}</Highlight>

        <h4>stop: <code>function * () {'{}'}</code></h4>
        <p>
          Saga that is started whenever the component is disconnected or the saga exported from this component is cancelled
        </p>
        <Highlight className='javascript'>{code.keaStop}</Highlight>

        <h4>takeEvery: <code>{'({ actions }) => ({})'}</code></h4>
        <p>
          Run the following workers every time the action is dispatched
        </p>
        <p>
          Note: sagas are started with your component's <code>componentDidMount</code>. Actions dispatched before this lifecycle
          method will not be seen by <code>takeEvery</code>.
        </p>
        <Highlight className='javascript'>{code.keaTakeEvery}</Highlight>

        <h4>takeLatest: <code>{'({ actions }) => ({})'}</code></h4>
        <p>
          Run the following workers every time the action is dispatched, cancel the previous worker if still running
        </p>
        <p>
          Note: sagas are started with your component's <code>componentDidMount</code>. Actions dispatched before this lifecycle
          method will not be seen by <code>takeLatest</code>.
        </p>
        <Highlight className='javascript'>{code.keaTakeLatest}</Highlight>

        <h4>workers: <code>{'{}'}</code></h4>
        <p>
          An object of workers which you may reference in other sagas.
        </p>
        <Highlight className='javascript'>{code.keaWorkers}</Highlight>

        <h4>sagas: <code>[]</code></h4>
        <p>
          Array of sagas that get exported with this component's saga
        </p>
        <Highlight className='javascript'>{code.keaSagas}</Highlight>
      </div>
    )
  }
}

