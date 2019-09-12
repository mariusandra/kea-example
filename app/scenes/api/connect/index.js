import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>connect(options)</code></h2>
        <p>
          Shorthand for <code>{'kea({ connect: options })'}</code>
        </p>
        <p>
          It's very handy for connecting actions and values to class components.
        </p>
        <h3>Usage</h3>
        <Highlight className='javascript'>{code.usage}</Highlight>
      </div>
    )
  }
}

