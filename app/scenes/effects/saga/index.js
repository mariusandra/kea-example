import React from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  install: require('raw-loader!./code/install.txt'),
  import: require('raw-loader!./code/import.txt'),
  store: require('raw-loader!./code/store.txt'),
  usage: require('raw-loader!./code/usage.txt'),

  keaSagas: require('raw-loader!./code/kea-sagas.txt'),
  keaStart: require('raw-loader!./code/kea-start.txt'),
  keaStop: require('raw-loader!./code/kea-stop.txt'),
  keaTakeEvery: require('raw-loader!./code/kea-takeevery.txt'),
  keaTakeLatest: require('raw-loader!./code/kea-takelatest.txt'),
  keaWorkers: require('raw-loader!./code/kea-workers.txt')
}

export default function Saga () {
  return (
    <div>
      <div className='description'>
        <h2>Sagas</h2>
        <p>
          Kea has first class support for sagas via the <a href='https://github.com/keajs/kea-saga'><code>kea-saga</code></a> plugin.
        </p>
        <p>
          Read more about Sagas on the <a href='https://redux-saga.js.org/'>redux-saga</a> homepage.
        </p>
        <p>
          If you're upgrading from 0.x, please <a href='https://github.com/keajs/kea-saga/blob/master/CHANGELOG.md#a-note-regarding-sagas-and-actions'>read this</a> regarding
          the breaking change of automatically bound actions in Kea. If you have just <code>connect</code>ed to your actions, everything should work as it did before.
        </p>
      </div>
      <div className='description'>
        <h2>Installation</h2>
        <p>
          First install the <a href='https://github.com/keajs/kea-saga'><code>kea-saga</code></a> and <a href='https://github.com/redux-saga/redux-saga'><code>redux-saga</code></a> packages:
        </p>
        <Highlight className='bash'>{code.install}</Highlight>
        <p>
          Then you install the plugin:
        </p>
        <Highlight className='javascript'>{code.import}</Highlight>
      </div>
      <div className='description'>
        <h2>Usage</h2>
        <p>
          First, read the docs on the <a href='https://redux-saga.js.org/'>redux-saga</a> homepage to learn how sagas work.
        </p>
        <p>
          Adding <code>kea-saga</code> will give your logic stores access to the
          keys: <code>start</code>, <code>stop</code>, <code>takeEvery</code>, <code>takeLatest</code>, <code>workers</code>, <code>sagas</code>.
        </p>

        <Highlight className='javascript'>{code.usage}</Highlight>

        <h4>start: <code>function * () {'{}'}</code></h4>
        <p>
          Saga that is started whenever the component is connected or the saga exported from this component starts
        </p>
        <p>
          Note: sagas are started before your <u>wrapped component's</u> <code>componentDidMount</code>.
          Actions dispatched before this lifecycle method will not be seen inside <code>start</code>.
        </p>
        <Highlight className='javascript'>{code.keaStart}</Highlight>

        <h4>stop: <code>function * () {'{}'}</code></h4>
        <p>
          Saga that is started whenever the component is disconnected or the saga exported from this component is cancelled
        </p>
        <p>
          This function is called right before your <u>wrapped component's</u> <code>componentWillUnmount</code> lifecycle method.
        </p>
        <Highlight className='javascript'>{code.keaStop}</Highlight>

        <h4>takeEvery: <code>{'({ actions }) => ({})'}</code></h4>
        <p>
          Run the following workers every time the action is dispatched
        </p>
        <p>
          Note: sagas are started before your wrapped component's <code>componentDidMount</code>.
          Actions dispatched before this lifecycle method will not be seen by <code>takeEvery</code>.
        </p>
        <Highlight className='javascript'>{code.keaTakeEvery}</Highlight>

        <h4>takeLatest: <code>{'({ actions }) => ({})'}</code></h4>
        <p>
          Run the following workers every time the action is dispatched, cancel the previous worker if still running
        </p>
        <p>
          Note: sagas are started before your wrapped component's <code>componentDidMount</code>.
          Actions dispatched before this lifecycle method will not be seen by <code>takeLatest</code>.
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
    </div>
  )
}

