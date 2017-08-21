import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  package: require('raw-loader!./code/package.txt'),
  store: require('raw-loader!./code/store.txt'),
  cli: require('raw-loader!./code/cli.txt'),
  craInstall: require('raw-loader!./code/cra-install.txt'),
  craPackage: require('raw-loader!./code/cra-package.txt'),
  craStore: require('raw-loader!./code/cra-store.txt'),
  craIndex: require('raw-loader!./code/cra-index.txt'),
  craCustom1: require('raw-loader!./code/cra-custom1.txt'),
  craCustomEnv: require('raw-loader!./code/cra-customenv.txt')
}

export default class InstallationScene extends Component {
  render () {
    return (
      <div className='counter-singleton-scene'>
        <div className='description'>
          <h2>Installation</h2>
          <p>
            Installing <code>kea</code> is rather straightforward. You need to add the <code>kea</code> package,
            hook it up to your reducers and run the saga.
          </p>
          <p>
            This guide describes three ways to install:
          </p>
          <ol>
            <li>Adding kea to an existing app that already uses <code>redux</code> (and <code>redux-saga</code>?)</li>
            <li>Adding to apps made with <code>create-redux-app</code></li>
            <li>Starting a new kea app from scratch</li>
          </ol>
          <h3>1. Adding to an existing app that already uses <code>redux</code> (and <code>redux-saga</code>?)</h3>
          <h4>1.1. Packages</h4>
          <p>First install the packages:</p>
          <Highlight className='bash'>{code.package}</Highlight>
          <h4>1.2. Store</h4>
          <p>Then configure the store:</p>
          <Highlight className='javascript'>{code.store}</Highlight>
          <p>
            NB! Make sure the store is loaded before any <code>kea()</code> calls. In practice this usually means you should
            import your store before your components in your app's entrypoint.
          </p>
          <h4>1.3. Optional: Enable decorators</h4>
          Kea makes use of an experimental support for decorators to make your code nicer to read. If you
          wish to use this feature, follow the guide here: <a href='https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy'>babel-plugin-transform-decorators-legacy</a>.

          <h3>2. Adding to apps made with <code>create-redux-app</code></h3>
          <h4>2.1. Create your app</h4>
          <p>Follow the <a href='https://github.com/facebookincubator/create-react-app'>create-react-app guide</a> to create an app</p>

          <Highlight className='bash'>{code.craInstall}</Highlight>

          <h4>2.2. Install kea, redux, redux-saga and reselect</h4>
          <Highlight className='bash'>{code.craPackage}</Highlight>

          <h4>2.3. Configure your store</h4>
          <p>Create a file called <code>src/store.js</code> and enter the following code</p>
          <Highlight className='javascript'>{code.craStore}</Highlight>

          <h4>2.4. Update your app's entrypoint to use redux</h4>
          <p>You need to add the following lines to your <code>src/index.js</code> to make your app work with redux and redux-saga:</p>
          <Highlight className='javascript'>{code.craIndex}</Highlight>

          <h4>2.5. Optional: Enable decorators</h4>
          <p>
            To support calls such as <code>{'@kea({})'}</code> before your React components, you must enable an experimental ES feature
            called <a href='https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy'>decorators</a>.
          </p>
          <p>
            You may either do it by ejecting your webpack configuration and following the steps of 1.3. If you wish to avoid that,
            you have to find some other way. The easiest option is to
            replace <code>react-scripts</code> with <a href='https://github.com/kitze/custom-react-scripts'><code>custom-react-scripts</code></a>.
          </p>
          <p>To do this, first run these commands:</p>
          <Highlight className='bash'>{code.craCustom1}</Highlight>
          <p>Then create a file called <code>.env</code> in the root of your project and add this:</p>
          <Highlight className='bash'>{code.craCustomEnv}</Highlight>
          <p>Now you will be able to use decorators in your code</p>

          <h3>3. Starting a new kea app from scratch</h3>
          <Highlight className='bash'>{code.cli}</Highlight>

          <h2>Continue with the guide</h2>

          Next page: <Link to='/guide/counter'>Counter</Link>
        </div>
      </div>
    )
  }
}
