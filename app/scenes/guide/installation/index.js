import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'kea'

import Highlight from 'react-highlight'

import featuresLogic from '../features-logic'

const code = {
  package: require('raw-loader!./code/package.txt'),
  store: require('raw-loader!./code/store.txt'),
  cli: require('raw-loader!./code/cli.txt')
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
export default class InstallationScene extends Component {
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
      <div className='counter-singleton-scene'>
        <div className='description'>
          <h2>Installation</h2>
          Installing <code>kea</code> is rather straightforward. You need to add the <code>kea</code> package,
          hook it up to your reducers and run the saga.
          <br /><br />
          <h3>1. Adding to an existing app that already uses <code>redux</code> and <code>redux-saga</code></h3>
          First install the packages:
          <Highlight className='bash'>{code.package}</Highlight>
          Then configure the store:
          <Highlight className='javascript'>{code.store}</Highlight>

          <h3>2. Adding to apps made with create-redux-app</h3>
          TODO

          <h3>3. Starting a new kea app from scratch</h3>
          <Highlight className='bash'>{code.cli}</Highlight>

          <h2>Continue with the guide</h2>

          Next page: <a href='/guide/counter' onClick={this.handleRoute}>Counter</a>
        </div>
      </div>
    )
  }
}

