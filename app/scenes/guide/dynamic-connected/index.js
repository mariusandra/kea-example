import React, { Component } from 'react'
import { connect } from 'kea'
import { Link } from 'react-router-dom'

import Demo from './demo'

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
            If you need dynamic components (with a <code>key</code>) that also share data with other components,
            you will need to connect them in a special way.
          </p>
          <p>
            You will need to use the <code>withKey(key)</code> method on the logic and pass it the <code>key</code> that
            points to the part of the dynamic logic store that you want to access.
          </p>
          <Highlight className='javascript'>{code.guideExample1}</Highlight>
          <p>
            The <code>key</code> can either be a regular string, number or oter literal... or you can pass a function
            that calculates it from the props of the component you are connecting to.
          </p>
          <p>
            In the last example we dynamically passed the key from the <code>id</code> prop.
          </p>
          <p>
            Here you can see a complete example:
          </p>
          <Highlight className='javascript'>{code.guideExample2}</Highlight>
          <p>
            And here you can see it in action:
          </p>
          <div className='demo'>
            <Demo />
          </div>
          <p>
            Next page: <Link to='/guide/forms'>Forms</Link>
          </p>
        </div>
      </div>
    )
  }
}
