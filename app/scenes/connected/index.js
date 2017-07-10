import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'

import sceneSaga from './saga'
import sceneLogic from './logic'

import Highlight from 'react-highlight'
import 'highlight.js/styles/railscasts.css'

import connectedCode from 'raw-loader!./source.txt'

@connect({
  actions: [
    sceneLogic, [
      'updateName'
    ]
  ],
  props: [
    sceneLogic, [
      'name',
      'capitalizedName'
    ]
  ],
  sagas: [
    sceneSaga
  ]
})
export default class HomepageScene extends Component {
  updateName = () => {
    const { name } = this.props
    const { updateName } = this.props.actions

    const newName = window.prompt('Please enter the name', name)

    if (newName) {
      updateName(newName)
    }
  }

  render () {
    const { capitalizedName } = this.props

    return (
      <div className='homepage-scene'>
        <div style={{margin: 20}}>
          This example demonstrates connected components.
          <br /><br />
          As your application grows in size you may want to separate kea() calls into separate
          files. You may then use the @connect helper (or connect: {}) to attach actions and properties
          from the connected logic.
        </div>
        <h1>
          Hello, I'm <em onClick={this.updateName}>{capitalizedName}</em> the Kea
        </h1>
        <div className='code'>
          <Highlight className='javascript'>{connectedCode}</Highlight>
        </div>
      </div>
    )
  }
}

