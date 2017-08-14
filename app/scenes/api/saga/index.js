import React, { Component } from 'react'
import Highlight from 'react-highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>keaSaga</code></h2>
        <p>
          You must run this saga in order to use the saga functionality in kea (<code>start</code>, <code>stop</code>, <code>takeEvery</code>, <code>takeLatest</code>, ...)
        </p>
        <h3>Usage</h3>
        <Highlight className='javascript'>{code.usage}</Highlight>
      </div>
    )
  }
}
