import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  values: require('raw-loader!./code/values.txt'),
  actions: require('raw-loader!./code/actions.txt'),
  reducer: require('raw-loader!./code/reducer.txt'),
  import: require('raw-loader!./code/import.txt')
}

export default class ConnectedScene extends Component {
  render () {
    return (
      <div className='migration-scene'>
        <div className='description'>
          <h2>Migrating existing Redux applications</h2>
          <p>
            Since kea is just redux, it is very easy to connect it to an existing redux application.
          </p>

          <h2>Reading non-Kea state</h2>
          <p>
            You may pull in data from any part of the Redux tree with the Kea through <code>{'kea({ connect: { ... } })'}</code>.
          </p>
          <p>
            Instead of passing a logic to fetch from, pass a selector:
          </p>
          <Highlight className='javascript'>{code.values}</Highlight>

          <h2>Using non-Kea actions</h2>
          <p>
            Similarly, use an object of action creators and select the ones you need:
          </p>
          <Highlight className='javascript'>{code.actions}</Highlight>
          <p>
            You may listen to other actions and either have them influence your reducers or run a saga when they happen.
            Just replace <code>actions.something</code> with <code>ACTION_TYPE_CONSTANT</code>, like so:
          </p>
          <Highlight className='javascript'>{code.reducer}</Highlight>

          <h2>Using Kea actions and selectors elsewhere</h2>
          <p>
            If the redux-only part of your app needs access to some values or actions from kea logic stores, you can import them like so:
          </p>
          <Highlight className='javascript'>{code.import}</Highlight>
          <p>
            The <Link to='/api/logic'>API docs</Link> describe what is available to import.
          </p>
        </div>
      </div>
    )
  }
}
