import React, { Component } from 'react'
import { connect } from 'kea'
import Highlight from '~/components/tags/highlight'
import { Link } from 'react-router-dom'

import featuresLogic from '../../guide/features-logic'

const code = {
  install: require('raw-loader!./code/install.txt'),
  import: require('raw-loader!./code/import.txt'),
  store: require('raw-loader!./code/store.txt'),
  usage: require('raw-loader!./code/usage.txt')
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
          <h2>Thunks</h2>
          <p>
            Thunks are simple ways to define side effects with Redux.
          </p>
        </div>
        <div className='description'>
          <h2>Installation</h2>
          <p>
            First install the <a href='https://github.com/keajs/kea-thunk'><code>kea-thunk</code></a> and <a href='https://github.com/gaearon/redux-thunk'><code>redux-thunk</code></a> packages:
          </p>
          <Highlight className='bash'>{code.install}</Highlight>
          <p>
            Then you have install the plugin:
          </p>
          <Highlight className='javascript'>{code.import}</Highlight>
        </div>
        <div className='description'>
          <h2>Usage</h2>
          <p>
            You define thunks in a block called <code>thunks</code>. Here are some examples:
          </p>
          <Highlight className='javascript'>{code.usage}</Highlight>
          <p>
            As you can see, you have access to the standard Redux <code>dispatch</code> and <code>getState</code> methods.
            However you don't need to call <code>dispatch</code> before any action in the actions object. They are wrapped automatically.
          </p>
        </div>
      </div>
    )
  }
}
