import React, { Component } from 'react'
import Highlight from 'react-highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt'),
  beforeApp: require('raw-loader!./code/before-app.txt'),
  afterApp: require('raw-loader!./code/after-app.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>keaReducer(reducerRoot)</code></h2>
        <p>
          Define paths in Redux which kea can use.
        </p>
        <h3>Usage</h3>
        <Highlight className='javascript'>{code.usage}</Highlight>
        <p>
          After this you may use paths like <code>path: () => ['scenes', '...', 'bla']</code> in your logic stores.
        </p>
        <p>
          All logic stores that are defined without paths will be mounted under the first registered reducer, in this case under <code>kea.*</code>
        </p>
        <h3>Run <code>keaReducer</code> before <code>kea</code>!</h3>
        <p>
          Please note that the call to <code>keaReducer</code> has to be executed before any subsequent calls to <code>kea()</code>.
          Take for example this sample scenario:
        </p>
        <Highlight className='javascript'>{code.beforeApp}</Highlight>
        <p>
          In this case when you <code>import App from 'app'</code>, you're immediately running the <code>kea()</code> calls.
          Even though you imported <code>createStore</code> before <code>App</code> and run it before rendering the app,
          the <code>kea()</code> functions are run before <code>keaReducer</code>.
        </p>
        <p>
          When running this code, you will run into errors such as: <em>[KEA-LOGIC] Path starting with "scenes" is not connected to the reducer tree! (3) ["scenes", "counter", "index"]</em>.
        </p>
        <p>
          To fix this, you must bring <code>keaReducer</code> up by one level, so it's evaluated when <code>createStore</code> is imported, like so:
        </p>
        <Highlight className='javascript'>{code.afterApp}</Highlight>
        <p>
          Happy hacking! :)
        </p>
      </div>
    )
  }
}
