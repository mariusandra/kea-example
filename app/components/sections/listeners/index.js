import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  importListeners: require('raw-loader!./code/import-listeners.txt'),
  installListeners: require('raw-loader!./code/install-listeners.txt'),
}

export default class ListenersComponent extends Component {
  render () {
    return (
      <div>
        <h2>0. Install <code>kea-listeners</code></h2>
        <p>
          We'll be using listeners in this example. To add support for them, install the <code>kea-listeners</code> packages.
        </p>
        <Highlight className='bash'>{code.installListeners}</Highlight>
        <p>
          Then import <code>listenersPlugin</code> from <code>kea-listeners</code> and use it in the <code>plugins</code> array in your <code>resetContext()</code>.
        </p>
        <Highlight className='javascript'>{code.importListeners}</Highlight>
        <p>
          <Link to='/effects/listeners'>Read here for more</Link>
        </p>
      </div>
    )
  }
}

