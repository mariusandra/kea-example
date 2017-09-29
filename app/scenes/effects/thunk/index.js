import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'
import { Link } from 'react-router-dom'

const code = {
  install: require('raw-loader!./code/install.txt'),
  import: require('raw-loader!./code/import.txt'),
  store: require('raw-loader!./code/store.txt'),
  usage: require('raw-loader!./code/usage.txt')
}

export default class API extends Component {
  render () {
    return (
      <div>
        <div className='description'>
          <h2>Thunks</h2>
          <p>
            Thunks are the simplest ways to define side effects with Redux.
          </p>
        </div>
        <div className='description'>
          <h2>Installation</h2>
          <p>
            First install the <code>kea-thunk</code> and <code>redux-thunk</code> packages:
          </p>
          <Highlight className='bash'>{code.install}</Highlight>
          <p>
            Then import <code>kea-thunk</code> somewhere in your app's entrypoint or <code>store.js</code>,
            before any calls to <code>kea()</code> and <code>getStore()</code> are made:
          </p>
          <Highlight className='javascript'>{code.import}</Highlight>
          <p>
            If you have configured your store through <Link to='/api/store'><code>getStore()</code></Link>, you're all set!
          </p>
          <p>
            If, however, you wish to configure your store manually, connect the thunk middleware like so:
          </p>
          <Highlight className='javascript'>{code.store}</Highlight>
        </div>
        <div className='description'>
          <h2>Usage</h2>
          <p>
            You define thunks in a block called <code>thunks</code>. Here are some examples:
          </p>
          <Highlight className='javascript'>{code.usage}</Highlight>
          <p>
            As you can see, you have access to the standard Redux <code>dispatch</code> and <code>getState</code> methods.
            However you don't need to call <code>dispatch</code> before any action in the actions object. They are wrapped automatically.
          </p>
        </div>
      </div>
    )
  }
}
