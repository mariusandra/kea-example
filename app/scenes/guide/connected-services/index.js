import React, { Component } from 'react'
import { connect } from 'kea'
import { push } from 'react-router-redux'

import featuresLogic from '../features-logic'

import Services from './services'

import Highlight from 'react-highlight'

const code = {
  // guideExample1: require('raw-loader!./code/guide-example-1.txt'),
  // guideExample2: require('raw-loader!./code/guide-example-2.txt'),
  // guideExample3: require('raw-loader!./code/guide-example-3.txt'),
  // guideExample4: require('raw-loader!./code/guide-example-4.txt'),
  // guideExample5: require('raw-loader!./code/guide-example-5.txt')
}

@connect({
  actions: [
    featuresLogic, [
      'toggleFeature'
    ]
  ],
  props: [
    featuresLogic, [
      'features'
    ]
  ]
})
export default class ConnectedScene extends Component {
  handleRoute = (e) => {
    const { dispatch } = this.props
    const href = e.target.attributes.href.value

    e.preventDefault()
    dispatch(push(href))
    window.scrollTo(0, 0)
  }

  render () {
    const { features } = this.props
    const { toggleFeature } = this.actions

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
            Check out the <a href='/examples/todos' onClick={this.handleRoute}>example applications</a> or read the <a href='/api/logic' onClick={this.handleRoute}>API docs</a>.
          </p>
        </div>
      </div>
    )
  }
}

