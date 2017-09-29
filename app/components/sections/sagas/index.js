import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  importSaga: require('raw-loader!./code/import-saga.txt'),
  installSaga: require('raw-loader!./code/install-saga.txt'),
}

export default class SlidersScene extends Component {
  render () {
    return (
      <div>
        <h2>0. Install <code>kea-saga</code></h2>
        <p>
          We'll be using sagas in this example. To add support for them, install the <code>kea-saga</code> and <code>redux-saga</code> packages.
        </p>
        <Highlight className='bash'>{code.installSaga}</Highlight>
        <p>
          Then import <code>kea-saga</code> somewhere in your app's entrypoint or <code>store.js</code>,
          before any calls to <code>kea()</code> and <code>getStore()</code> are made:
        </p>
        <Highlight className='javascript'>{code.importSaga}</Highlight>
        <p>
          <Link to='/effects/saga'>Read here for more</Link>
        </p>
      </div>
    )
  }
}

