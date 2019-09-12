import React from 'react'
import Highlight from '~/components/tags/highlight'

import Example from './example'

const code = {
  install: require('raw-loader!./code/install.txt'),
  import: require('raw-loader!./code/import.txt'),
  local: require('raw-loader!./code/local.txt'),
  usage: require('raw-loader!./code/usage.txt')
}

export default function LocalStorage () {
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
        Then install the plugin:
        </p>
        <Highlight className='javascript'>{code.import}</Highlight>
      </div>
      <div className='description'>
        <h2>Usage</h2>
        <p>
          <strong>NB!</strong> To make a reducer persist in LocalStorage, your logic store <strong>must</strong> have a defined <code>path</code>.
        </p>
        <p>
          Just add <code>{'{ persist: true }'}</code> as an option to your reducers, and it will be stored:
        </p>
        <Highlight className='javascript'>{code.usage}</Highlight>
      </div>
      <div className='description'>
        <h2>Example</h2>
        <p>
          Update the counter and refresh the page. The number should remain:
        </p>
        <div className='demo'>
          <Example />
        </div>
        <p>
          <em>Note: if you refresh, it may flash the number 0 for a brief moment, as that's what's stored in the pre-rendered HTML
          that's served when you open the page. It should then immediately update.</em>
        </p>
      </div>
    </div>
  )
}
