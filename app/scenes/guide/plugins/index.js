import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  example: require('raw-loader!./code/example.txt'),
  start: require('raw-loader!./code/start.txt'),
  everything: require('raw-loader!./code/everything.txt'),
  // reducer: require('raw-loader!./code/reducer.txt'),
  // import: require('raw-loader!./code/import.txt')
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
          <h2>Requests plugin</h2>
          <p>
            In this guide we will write a simple plugin called "requests" that takes as input an action and creates 3 actions
            for different states of this action. Something like this:
          </p>
          <Highlight className='javascript'>{code.example}</Highlight>
          <p>
            The first step in authoring a plugin is to create a blank plugin and add it to the plugins array in <code>resetContext</code>:
          </p>
          <Highlight className='javascript'>{code.start}</Highlight>


          <h2>Everything a plugin can contain:</h2>
          <Highlight className='javascript'>{code.everything}</Highlight>
        </div>
      </div>
    )
  }
}
