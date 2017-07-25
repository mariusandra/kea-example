import React, { Component } from 'react'
import Highlight from 'react-highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
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

        <Highlight className='javascript'>{code.usage}</Highlight>

        <h3>Options</h3>
      </div>
    )
  }
}

