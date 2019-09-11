import React from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt')
}

export default function Listeners () {
  return (
    <div>
      <div className='description'>
        <h2>Router</h2>
        <p>
          Please help write this section or read more
          about <a href='https://github.com/keajs/kea-router'><code>kea-router</code></a> on github!
        </p>
        <h2>Sample usage</h2>
        <Highlight className='bash'>{code.usage}</Highlight>
      </div>
    </div>
  )
}
