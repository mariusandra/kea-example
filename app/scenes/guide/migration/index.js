import React, { Component } from 'react'
import { connect } from 'kea'
import { push } from 'react-router-redux'

import featuresLogic from '../features-logic'

import Highlight from 'react-highlight'

const code = {
  // guideExample1: require('raw-loader!./code/guide-example-1.txt'),
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
      <div className='migration-scene'>
        <div className='description'>
          <h2>Migrating existing Redux applications</h2>
          <p>
            Since kea is just redux, it is very easy to connect it to an existing redux application.
          </p>


          <Highlight className='javascript'>{code.guideExample5}</Highlight>

          <h2>Next steps</h2>
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

