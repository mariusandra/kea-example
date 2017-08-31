import React, { Component } from 'react'
import { connect } from 'kea'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

import Form from './form'

import featuresLogic from '../features-logic'

const code = {
  basicFull: require('raw-loader!./code/basic-full.txt')
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
export default class FormsScene extends Component {
  render () {
    const { features } = this.props
    const { toggleFeature } = this.actions

    return (
      <div className='counter-singleton-scene'>
        <div className='description'>
          <h2>Example #6 - Forms</h2>
          <p>
            Before Kea I used to dread forms in React. They would always require a lot of boilerplate to get going. With Kea, even the boilerplate is easy to setup.
          </p>
          <p>
            In this chapter we will first build a simple form like this:
          </p>
          <div className='demo'>
            <Form />
          </div>
          <p>
            ... and then we will abstract the remaining boilerplate into a form builder.
          </p>
        </div>

        <div className='description'>
          <h2>Defining the features we need</h2>
          <p>
            If you played with the demo above, you'll see what we need to build the following features:
          </p>
          <ul>
            <li>Default values</li>
            <li>Custom validation rules</li>
            <li>Show errors only after we have pressed "submit"</li>
            <li>Disable the submit button when submitting</li>
            <li>Async processing of the request</li>
          </ul>
          <p>
            For this we need a minimum of ...
          </p>
          <Highlight className='javascript'>{code.basicFull}</Highlight>
        </div>
      </div>
    )
  }
}

