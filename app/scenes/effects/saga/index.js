import React, { Component } from 'react'
import { connect } from 'kea'
import Highlight from '~/components/tags/highlight'
import { Link } from 'react-router-dom'

import featuresLogic from '../../guide/features-logic'

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

@connect({
  actions: [
    featuresLogic, [
      'toggleFeature'
    ]
  ],
  props: [
    featuresLogic, [
      'features'
    ]
  ]
})
export default class API extends Component {
  render () {
    const { features } = this.props
    const { toggleFeature } = this.actions

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
            Also read the sections of the guide marked "with kea-saga" to learn more.
          </p>
        </div>
        <div className='description'>
          <h2>Installation</h2>
          <p>
            First install the <a href='https://github.com/keajs/kea-saga'><code>kea-saga</code></a> and <a href='https://github.com/redux-saga/redux-saga'><code>redux-saga</code></a> packages:
          </p>
          <Highlight className='bash'>{code.install}</Highlight>
          <p>
            Then you have a few ways to install the plugin:
          </p>
          <Highlight className='javascript'>{code.import}</Highlight>
          <p>
            Use whichever way is most convenient for your setup.
          </p>
          <p>
            Note that the <code>kea-saga</code> plugin needs to be installed globally as it needs to add its middleware to the store.
            You can't use it as a local plugin inside <code>{'kea({})'}</code> calls.
          </p>
          <p>
            If you have configured your store through <Link to='/api/store'><code>getStore()</code></Link>, you're all set!
          </p>
          <p>
            <button onClick={() => toggleFeature('sagaManualStore')}>I'm not using <code>getStore</code></button>
          </p>
          {features.sagaManualStore ? (
            <div className='extra-help'>
              <p>
                If, you wish to configure your store manually, connect the saga middleware like so:
              </p>
              <Highlight className='javascript'>{code.store}</Highlight>
            </div>
          ) : null}
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
        <div className='description'>
          <h2>FAQ</h2>
          <p>
            <strong>My sagas won't start with my component!</strong>
          </p>
          <p>
            <code>kea-saga</code> injects itself into your component's <code>componentDidMount</code> function and starts the sagas
            before returning control to the original <code>componentDidMount</code>.
          </p>
          <p>
            Because <a href='https://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&code_lz=MYGwhgzhAEDKD2BbApgFwBYEsB2BzaA3gFDTTDzYSoBOArsKvNdABQCUhJpZFE8IyAHQh4uFgHIqYaqhy5xbLgF8uXKdgAm0jQDFa2BpgqsOxbj0r8hIseIBG4BcqJdp1eAHc9B2cYC8JtB-AHyc5uSWAsKiEg5gcU6kKipEEXxRNiwIKBhyggAO7oyoAJ75Qupa1Lr6hhSKAPQN0AC0oQBmtb7YgQQpaVbRYtloWHgFRfCl5YJunt512I3NbdD6GsjtOMgaLgKo0Hw5Y_gB2MgecEijcuxERzfjldoL3XdEQA&debug=false&circleciRepo=&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=6.26.0'>of the way</a> ES
            classes work, if you define your <code>componentDidMount</code> as an arrow function (<code>{'componentDidMount = () => {}'}</code>), it
            will only be declared after your class is instantiated and it will overwrite modifications by <code>kea-saga</code>.
          </p>
          <p>
            Thus, at least for now, keep your <code>componentDidMount</code> as a regular function. See more details in <a href='https://github.com/keajs/kea-saga/issues/2'>this issue</a>.
          </p>
        </div>

      </div>
    )
  }
}
