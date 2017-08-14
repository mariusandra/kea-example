import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Services from './services'

import Highlight from 'react-highlight'

const code = {
  // guideExample1: require('raw-loader!./code/guide-example-1.txt'),
  // guideExample2: require('raw-loader!./code/guide-example-2.txt'),
  // guideExample3: require('raw-loader!./code/guide-example-3.txt'),
  // guideExample4: require('raw-loader!./code/guide-example-4.txt'),
  // guideExample5: require('raw-loader!./code/guide-example-5.txt')
}

export default class ConnectedScene extends Component {
  render () {
    return (
      <div className='connected-scene'>
        <div className='description'>
          <h2>Example #6 - Connected services</h2>
          <p>The final result will look like this:</p>
          <div className='demo'>
            <Services />
          </div>
        </div>
        <div className='description'>
          <p>
            That's it for the guide!
          </p>
          <p>
            Check out the <Link to='/examples/todos'>example applications</Link> or
            read the <Link to='/api/logic'>API docs</Link>.
          </p>
        </div>
      </div>
    )
  }
}

