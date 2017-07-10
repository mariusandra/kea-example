import './styles.scss'

import React, { Component } from 'react'

import Highlight from 'react-highlight'
import 'highlight.js/styles/railscasts.css'

import counterCode from 'raw-loader!./source.txt'
import Counter from './counter'

export default class CounterSingletonScene extends Component {
  render () {
    return (
      <div className='counter-singleton-scene'>
        <div style={{ marginTop: 20 }}>
          This example demonstrates the basics of kea and components that share state between each other.
        </div>
        <div>
          <Counter />
          <Counter />
        </div>
        <div className='code'>
          <Highlight className='javascript'>{counterCode}</Highlight>
        </div>
      </div>
    )
  }
}

