import React from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt'),
  import: require('raw-loader!./code/import.txt'),
  install: require('raw-loader!./code/install.txt')
}

export default function Listeners () {
  return (
    <div>
      <div className='description'>
        <h2>Listeners</h2>
        <p>
          Please help write this section or read more
          about <a href='https://github.com/keajs/kea-listeners'>kea-listeners on github</a>!
        </p>

        <h2>Installation</h2>
        <p>
          First install the <a href='https://github.com/keajs/kea-listeners'><code>kea-listeners</code></a> package:
        </p>
        <Highlight className='bash'>{code.install}</Highlight>
        <p>
          Then install the plugin:
        </p>
        <Highlight className='javascript'>{code.import}</Highlight>

        <h2>Sample usage</h2>
        <Highlight className='bash'>{code.usage}</Highlight>
      </div>
    </div>
  )
}
