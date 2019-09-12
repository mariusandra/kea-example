import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  everything: require('raw-loader!./code/everything.txt')
}

export default class Plugins extends Component {
  render () {
    return (
      <div className='plugins-scene'>
        <div className='description'>
          <h2>Writing Plugins</h2>
          <p>
            Kea has a powerful system for authoring plugins. When you find yourself writing repetitive code, it might be time to extract it into a plugin.
          </p>
          <h2>Everything a plugin can contain</h2>
          <p>
            Here are all the options you can use within a plugin:
          </p>
          <Highlight className='javascript'>{code.everything}</Highlight>
        </div>
      </div>
    )
  }
}
