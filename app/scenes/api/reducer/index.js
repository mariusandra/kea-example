import React, { Component } from 'react'
import Highlight from 'react-highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>keaReducer(reducerRoot)</code></h2>
        <p>
          Define paths in Redux which kea can use.
        </p>
        <h3>Usage</h3>
        <Highlight className='javascript'>{code.usage}</Highlight>
        <p>
          After this you may use paths like <code>path: () => ['scenes', '...', 'bla']</code> in your logic stores.
        </p>
        <p>
          All logic stores that are defined without paths will be mounted under the first registered reducer, in this case under <code>kea.*</code>
        </p>
      </div>
    )
  }
}

