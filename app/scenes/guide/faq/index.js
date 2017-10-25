import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  router1: require('raw-loader!./code/react-router-1.txt'),
  router2: require('raw-loader!./code/react-router-2.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2>Frequently Asked Questions</h2>
        <h3>Using React-Router (V4) routes within kea connected components</h3>
        <p>
          If your kea component contains routes from react-router, they will not automatically receive changes
          to the current location that's passed implicitly by React context due to how React optimizes for rendering.
          This will cause React Router's location-aware components out of sync, as in the following example:
          <Highlight className='javascript'>{code.router1}</Highlight>
        </p>
        <h4>Quick Solution</h4>
        <p>
          The easiest solution is to wrap the kea component with the withRouter() to remove the blocked states.
          This is not the most efficient solution.
          <Highlight className='javascript'>{code.router2}</Highlight>
        </p>
        <h4>Recommended Solution</h4>
        <p>
          The more efficient method is to pass the location explicitly as a prop to the kea component.
          The detailed description for how to do this can be found at  <a href="https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md">
            Dealing with Update Blocking
          </a>
        </p>
        <br />
        <p>
          <strong>NOTE!</strong> This section of the guide is still <strong>heavily</strong> under construction!
          Please check back in a few days.
        </p>
      </div>
    )
  }
}
