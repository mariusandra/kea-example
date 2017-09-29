import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  package: require('raw-loader!./code/package.txt'),
  store: require('raw-loader!./code/store.txt'),
  provider: require('raw-loader!./code/provider.txt'),
  cli: require('raw-loader!./code/cli.txt'),
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
            install any plugins and connect your store to Redux.
          </p>
          <p>
            This guide describes two ways to install Kea:
          </p>
          <ol>
            <li>Adding kea to an existing app, either with <code>create-redux-app</code> or without</li>
            <li>Starting a new kea app from scratch</li>
          </ol>

          <h3>1. Adding to an existing app</h3>
          <h4>1.1. Install the packages</h4>
          <p>First install the packages:</p>
          <Highlight className='bash'>{code.package}</Highlight>

          <h4>1.2. Configure Redux</h4>
          <p>
            Then configure the <a href='https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store'>Redux store</a>.
            You may either do it <Link to='/api/store#manual'>manually</Link> or use the <code>getStore</code> helper.
            We recommend using the helper, as it will also configure any installed plugins (e.g. <Link to='/api/saga'>kea-saga</Link>).
            You may pass additional middleware and reducers as <Link to='/api/store'>options</Link>.
          </p>
          <p>
            First, create a file called <code>store.js</code> with the following content:
          </p>
          <Highlight className='javascript'>{code.store}</Highlight>
          <p>
            Then import this in your app's entrypoint <strong>before</strong> any calls to <code>kea()</code> are made.
            In practice this means you should import your store before your root component.
          </p>
          <p>
            Finally, wrap your <code>&lt;App /&gt;</code> with Redux's <code>&lt;Provider /&gt;</code>.
          </p>
          <p>
            This is how your entrypoint would look like if you used <code>create-react-app</code>:
          </p>
          <Highlight className='javascript'>{code.provider}</Highlight>
          <h4>1.3. Optional: Enable decorators</h4>
          <p>
            Kea makes use of an experimental support for decorators to make your code nicer to read. If you
            wish to use this feature, follow the guide here: <a href='https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy'>babel-plugin-transform-decorators-legacy</a>.
          </p>

          <h5>1.3.1. Decorators for apps made with <code>create-react-app</code></h5>
          <p>
            If your app was made with <code>create-react-app</code>, you have two options for installing support for decorators.
          </p>
          <p>
            You may install them ejecting your webpack configuration and following
            the <a href='https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy'>guide</a> from above.
          </p>
          <p>
            If you wish to avoid that, you have to find some other way. The easiest option is to
            replace <code>react-scripts</code> with <a href='https://github.com/kitze/custom-react-scripts'><code>custom-react-scripts</code></a>.
          </p>
          <p>To do this, first run these commands:</p>
          <Highlight className='bash'>{code.craCustom1}</Highlight>
          <p>Then create a file called <code>.env</code> in the root of your project and add this:</p>
          <Highlight className='bash'>{code.craCustomEnv}</Highlight>
          <p>Now you will be able to use decorators in your code</p>

          <h3>2. Starting a new kea app from scratch</h3>
          <p>
            Kea comes with a CLI tool that can generate a skeleton for your app. Ues it like so:
          </p>
          <Highlight className='bash'>{code.cli}</Highlight>

          <h2>Continue with the guide</h2>

          Next page: <Link to='/guide/counter'>Counter</Link>
        </div>
      </div>
    )
  }
}
