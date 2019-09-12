import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  keaUsage: require('raw-loader!./code/kea-usage.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>kea(input)</code></h2>
        <p>
          Create a new kea <code>logic</code>.
        </p>
        <h3>Usage</h3>
        <p>
          Here is a complete example with all the options available.
        </p>
        <Highlight className='javascript'>{code.keaUsage}</Highlight>
      </div>
    )
  }
}

