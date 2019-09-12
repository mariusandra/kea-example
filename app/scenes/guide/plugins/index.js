import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  example: require('raw-loader!./code/example.txt'),
  start: require('raw-loader!./code/start.txt'),
  actions: require('raw-loader!./code/actions.txt')
}

export default class Plugins extends Component {
  render () {
    return (
      <div className='plugins-scene'>
        <div className='description'>
          <p><strong>NB!</strong> See the <Link to='/api/plugins'>plugins API page</Link> for a list of everything that plugins can do.</p>
          <h2>Requests plugin</h2>
          <p>
            In this guide we will write a simple plugin called "requests" that takes as input an action and creates 3 actions
            for different states of this action. Something like this:
          </p>
          <Highlight className='javascript'>{code.example}</Highlight>
          <p>
            The first step in authoring a plugin is to create a blank plugin and add it to the plugins array in <code>resetContext</code>.
          </p>
          <p>
            Here's a sample skeleton structure for a plugin, extracted from the code on the <Link to='/api/plugins'>plugins API page</Link>.
            See that page for all that you can do with plugins.
          </p>
          <Highlight className='javascript'>{code.start}</Highlight>
          <p>
            This time we're only interested in the <code>afterLogic</code> event. We will take the input from our "requests" object and
            extend the logic with the actions that we generate from it.
          </p>
          <Highlight className='javascript'>{code.actions}</Highlight>
          <p>
            <strong>TODO</strong> This documentation is still a work in progress... but I hope you can imagine what happens next :)
          </p>
        </div>
      </div>
    )
  }
}
