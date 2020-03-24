import React from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  import: require('raw-loader!./code/import.txt'),
  install: require('raw-loader!./code/install.txt'),
  config: require('raw-loader!./code/config.txt'),
  usage: require('raw-loader!./code/usage.txt'),
}

export default function Loaders () {
  return (
    <div>
      <div className='description'>
        <h2>Loaderes</h2>
        <p>
          When making network requests that fetch data, you end up writing the same thing over and over again:
        </p>
        <p>
          1) an action to make the request<br/>
          2) an action to handle success<br/>
          3) an action to handle errors<br/>
          4) a reducer to store the data<br/>
          5) a reducer to store the loading state<br />
          6) a listener (or a saga) to actually call <code>fetch</code>
        </p>
        <p>
          The <code>kea-loaderes</code> plugin abstracts this pattern into a system of loaders.
        </p>

        <h2>Installation</h2>
        <p>
          First install the <a href='https://github.com/keajs/kea-loaders'><code>kea-loaders</code></a> and <a href='https://github.com/keajs/kea-listeners'><code>kea-listeners</code></a> packages:
        </p>
        <Highlight className='bash'>{code.install}</Highlight>
        <p>
          Then install the plugin:
        </p>
        <Highlight className='javascript'>{code.import}</Highlight>

        <h2>Configuration options</h2>
        <p>The plugin takes the following options:</p>
        <Highlight className='javascript'>{code.config}</Highlight>

        <h2>Sample usage</h2>
        <Highlight className='javascript'>{code.usage}</Highlight>
      </div>
    </div>
  )
}
