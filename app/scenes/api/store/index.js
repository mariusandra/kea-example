import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'
import { Link } from 'react-router-dom'

const code = {
  usage: require('raw-loader!./code/usage.txt'),
  sample: require('raw-loader!./code/sample.txt'),
  manual: require('raw-loader!./code/manual.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>getStore</code></h2>
        <p>
          Get a redux store to use in your app, which is already configured to use all kea plugins.
        </p>
        <p>
          You are always free to create the redux store yourself (see the <a href='#manual'>last section</a>),
          however in that case you must take care to connect all the installed plugins yourself.
        </p>
        <h3>Usage</h3>
        <p>
          Shown are the default values:
        </p>
        <Highlight className='javascript'>{code.usage}</Highlight>

        <h3>Example with react-router</h3>
        <p>
          For example, when using react-router (v4) and the Redux Devtools Extension:
        </p>
        <Highlight className='javascript'>{code.sample}</Highlight>

        <h3 id='manual'>Manually creating a store</h3>
        <p>
          Up until Kea v0.24 you had to manually create the store. With <code>getStore</code> this is no longer necessary.
        </p>
        <p>
          If you still need to, here's how to do it:
        </p>
        <Highlight className='javascript'>{code.manual}</Highlight>
        <p>
          If you then add plugins (e.g. kea-saga or other side effect library), read their documentation
          to find out how to connect them to the store.
        </p>
        <p>
          See the documentation for <Link to='/api/reducer'>keaReducer</Link> to read more about it.
        </p>
      </div>
    )
  }
}
