import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt'),
  wrap: require('raw-loader!./code/wrap.txt'),
  build: require('raw-loader!./code/build.txt'),
  mount: require('raw-loader!./code/mount.txt'),
  extend: require('raw-loader!./code/extend.txt'),
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>logic</code></h2>
        <p>
          Once you have initialised a logic with <code>{'const logic = kea({})'}</code>, there are a few things you can do with it:
        </p>
        <h3>logic()</h3>
        <p>By calling just <code>logic(something)</code>, we call any of the following methods:</p>
        <Highlight className='javascript'>{code.usage}</Highlight>

        <h3>logic.wrap()</h3>
        <p>Wrap the logic around a React Component (functional or Class) and give it access to all actions and values</p>
        <Highlight className='javascript'>{code.wrap}</Highlight>

        <h3>logic.build()</h3>
        <p>Build the logic, but don't yet connect it to Redux</p>
        <p>Builds are cached on the context, so calling it a on every render is very fast, assuming the key doesn't change.</p>
        <Highlight className='javascript'>{code.build}</Highlight>

        <h3>logic.mount()</h3>
        <p>Mount the logic on Redux, return a function that unmounts</p>
        <p>Shorthand for <code>logic.build().mount()</code></p>
        <Highlight className='javascript'>{code.mount}</Highlight>

        <h3>logic.extend()</h3>
        <p>Add more features to the logic</p>
        <Highlight className='javascript'>{code.extend}</Highlight>
      </div>
    )
  }
}

