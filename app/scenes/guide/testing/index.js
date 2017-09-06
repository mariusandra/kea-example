import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  reset: require('raw-loader!./code/reset.txt'),
  store: require('raw-loader!./code/store.txt'),
  logic: require('raw-loader!./code/logic.txt'),
  component: require('raw-loader!./code/component.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2>Testing logic stores</h2>
        <p>
          <strong>NOTE!</strong> This section of the guide is still <strong>heavily</strong> under construction!
          Please check back in a few days.
        </p>
        <h3>Generic test setup</h3>
        <p>
          For testing kea we recommend using <a href='https://facebook.github.io/jest/'>jest</a>.
        </p>

        <h3>Resetting the cache before each test</h3>
        <Highlight className='javascript'>{code.reset}</Highlight>

        <h3>Creating a store for your tests</h3>
        <Highlight className='javascript'>{code.store}</Highlight>

        <h2>Testing logic</h2>

        <Highlight className='javascript'>{code.logic}</Highlight>

        <h3>Testing components with enzyme</h3>
        <Highlight className='javascript'>{code.component}</Highlight>

        <h3>Other resources</h3>
        <p>
          Check out the source documentation on testing <a href='http://redux.js.org/docs/recipes/WritingTests.html'>redux</a>{', '}
          <a href='https://github.com/reactjs/reselect#q-how-do-i-test-a-selector'>selectors</a> and <a href='https://redux-saga.js.org/docs/advanced/Testing.html'>sagas</a>.
        </p>
      </div>
    )
  }
}
