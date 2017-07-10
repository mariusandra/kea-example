import './styles.scss'

import React, { Component } from 'react'

import Highlight from 'react-highlight'
import 'highlight.js/styles/railscasts.css'

import counterCode from 'raw-loader!./source.txt'
import Counter from './counter'

export default class CounterDynamicScene extends Component {
  render () {
    return (
      <div className='counter-dynamic-scene'>
        <div style={{ marginTop: 20 }}>
          This example demonstrates dynamically created actions and reducers.
        </div>
        <div>
          <Counter id={1} />
          <Counter id={2} />
        </div>
        <div className='code'>
          <Highlight className='javascript'>{counterCode}</Highlight>
        </div>
      </div>
    )
  }
}

