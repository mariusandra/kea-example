import React from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  usageUrlAction: require('raw-loader!./code/usage-url-action.txt'),
  usageListener: require('raw-loader!./code/usage-listener.txt'),
  usageLink: require('raw-loader!./code/usage-link.txt'),
  usagePathname: require('raw-loader!./code/usage-pathname.txt'),
  usageScenes: require('raw-loader!./code/usage-scenes.txt'),
  import: require('raw-loader!./code/import.txt'),
  install: require('raw-loader!./code/install.txt'),
  config: require('raw-loader!./code/config.txt'),
}

export default function Router () {
  return (
    <div>
      <div className='description'>
        <h2>Router</h2>
        <p>
          Please help write this section or read more
          about <a href='https://github.com/keajs/kea-router'><code>kea-router</code></a> on github!
        </p>

        <h2>Installation</h2>
        <p>
          First install the <a href='https://github.com/keajs/kea-router'><code>kea-router</code></a> and <a href='https://github.com/keajs/kea-listeners'><code>kea-listeners</code></a> packages:
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
        <p>Use <code>actionToUrl</code> to change the URL in response to actions and <code>urlToAction</code> to dispatch actions when the route changes</p>
        <Highlight className='javascript'>{code.usageUrlAction}</Highlight>

        <p>Import <code>router</code> to control the router directly</p>
        <Highlight className='javascript'>{code.usagePathname}</Highlight>

        <p>Create an <code>A</code> tag to make linking easier</p>
        <Highlight className='javascript'>{code.usageLink}</Highlight>

        <p>Listen to the <code>locationChanged</code> action to react to URL changes manually</p>
        <Highlight className='javascript'>{code.usageListener}</Highlight>

        <p>Here's sample code for a global scene router</p>
        <Highlight className='javascript'>{code.usageScenes}</Highlight>

      </div>
    </div>
  )
}
