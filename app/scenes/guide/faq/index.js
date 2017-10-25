import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  reactRouter1: require('raw-loader!./code/react-router-1.txt'),
  reactRouter2: require('raw-loader!./code/react-router-2.txt'),
  reactRouter3: require('raw-loader!./code/react-router-3.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li><a href='#react-router'>Using React-Router (V4) routes within kea connected components</a></li>
        </ul>
        <p>
          Got more questions to add? Think something belongs here? <a href='https://github.com/keajs/kea/issues'>Raise an issue!</a>
        </p>
        <h3 id='react-router'>Using React-Router (V4) routes within kea connected components</h3>
        <p>
          If your kea component contains routes from react-router, they will not automatically receive changes
          to the current location that's passed implicitly by React context due to how React optimizes for rendering.
          This will cause React Router's location-aware components out of sync, as in the following example:
        </p>
        <Highlight className='javascript'>{code.reactRouter1}</Highlight>
        <h4>Quick Solution</h4>
        <p>
          The easiest solution is to wrap the kea component with the withRouter() to remove the blocked states.
          This is not the most efficient solution.
        </p>
        <Highlight className='javascript'>{code.reactRouter2}</Highlight>
        <h4>Recommended Solution</h4>
        <p>
          The more efficient method is to pass the location explicitly as a prop to the kea component. Here's one approach:
        </p>
        <Highlight className='javascript'>{code.reactRouter3}</Highlight>
        <p>
          The detailed description for how to do this can be found
          at <a href='https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md'>
            Dealing with Update Blocking
          </a>.
        </p>
      </div>
    )
  }
}
