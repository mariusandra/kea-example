import React, { Component } from 'react'
import Highlight from 'react-highlight/lib/optimized'

const code = {
  usage: require('raw-loader!./code/usage.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>createAction</code></h2>
        <p>
          Create actions which you can use in your kea reducers.
        </p>
        <h3>Usage</h3>
        <Highlight className='javascript'>{code.usage}</Highlight>
      </div>
    )
  }
}
