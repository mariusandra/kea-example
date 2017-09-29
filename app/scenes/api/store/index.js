import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt'),
  sample: require('raw-loader!./code/sample.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>getStore</code></h2>
        <p>
          Get a redux store to use in your app, which is already configured to use all kea plugins.
        </p>
        <p>
          You are always free to create the redux store yourself, however in that case you must take care to install all
          the plugins yourself.
        </p>
        <h3>Usage</h3>
        <p>
          Shown are the default values:
        </p>
        <Highlight className='javascript'>{code.usage}</Highlight>

        <h3>Example with react-router</h3>
        <p>
          For example, when using react-router (v4) and the Redux Devtools Extension:
        </p>
        <Highlight className='javascript'>{code.sample}</Highlight>
      </div>
    )
  }
}
