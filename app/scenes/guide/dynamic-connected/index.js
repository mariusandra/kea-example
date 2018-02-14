import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'
import { Link } from 'react-router-dom'

import featuresLogic from '../features-logic'

import Highlight from '~/components/tags/highlight'

const code = {
  guideExample1: require('raw-loader!./code/guide-example-1.txt'),
  guideExample2: require('raw-loader!./code/guide-example-2.txt'),
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
  render () {
    const { features } = this.props
    const { toggleFeature } = this.actions

    return (
      <div className='connected-scene'>
        <div className='description'>
          <h2>Dynamic Connected logic</h2>
          <p>
            If you need to have dynamic components that also want to share data with other components you would need to connect this logic in a special way.
          </p>
          <p>
            You need to use the <code>withKey</code> method of the logic, like this:
          </p>
          <Highlight className='javascript'>{code.guideExample1}</Highlight>
          <p>
            The only difference with a regular connected component is that you need to specify the key to be passed to the logic.
            In this example it's dynamically passed from the <code>id</code> prop.
          </p>
          <p>
            Here you can see a complete example:
          </p>
          <Highlight className='javascript'>{code.guideExample2}</Highlight>
        </div>
      </div>
    )
  }
}
