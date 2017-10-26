import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'

import Example from './example'

const code = {
  install: require('raw-loader!./code/install.txt'),
  import: require('raw-loader!./code/import.txt'),
  local: require('raw-loader!./code/local.txt'),
  usage: require('raw-loader!./code/usage.txt')
}

export default class LocalStorage extends Component {
  render () {
    return (
      <div>
        <div className='description'>
          <h2>LocalStorage</h2>
          <p>
            You may store the content of your reducers in LocalStorage with the <a href='https://github.com/keajs/kea-localstorage'><code>kea-localstorage</code></a> plugin.
          </p>
        </div>
        <div className='description'>
          <h2>Installation</h2>
          <p>
            First install the <a href='https://github.com/keajs/kea-localstorage'><code>kea-localstorage</code></a> package:
          </p>
          <Highlight className='bash'>{code.install}</Highlight>
          <p>
            Then import <code>localStoragePlugin</code> from <code>kea-localstorage</code> in your <code>store.js</code> and add it to the plugins array
            in <code>getStore()</code>
          </p>
          <Highlight className='javascript'>{code.import}</Highlight>
          <p>
            Alternatively you may skip installing it globally and only include in the logic stores that need this plugin
          </p>
          <Highlight className='javascript'>{code.local}</Highlight>
        </div>
        <div className='description'>
          <h2>Usage</h2>
          <p>
            To make a reducer persist in LocalStorage, your logic store <strong>must</strong> have a defined <code>path</code>.
          </p>
          <p>
            Just add <code>{'{ persist: true }'}</code> as an option to your reducers, and it will be stored:
          </p>
          <Highlight className='javascript'>{code.usage}</Highlight>
        </div>
        <div className='description'>
          <h2>Example</h2>
          <p>
            Update the counter and refresh the page. The content should remain:
          </p>
          <div className='demo'>
            <Example />
          </div>
        </div>
      </div>
    )
  }
}
