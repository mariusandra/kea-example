import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'

import sceneSaga from './saga'
import sceneLogic from './logic'

import Highlight from 'react-highlight'
import 'highlight.js/styles/railscasts.css'

const code = {
  index: require('raw-loader!./code/index.txt'),
  logic: require('raw-loader!./code/logic.txt'),
  saga: require('raw-loader!./code/saga.txt')
}

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
        <div className='description'>
          <h2>Example #4 - Connected components</h2>
          This example demonstrates connected components.
          <br /><br />
          As your application grows in size you may want to separate <code>kea({})</code> calls into separate
          files. You may then use the <code>@connect</code> helper (or <code>{'@kea({ connect: {} })'}</code>) to pull in actions
          and properties from the connected logic.
          <h2>Final result</h2>
          <div className='demo'>
            <h1>
              Hello, I'm <em onClick={this.updateName}>{capitalizedName}</em> the Kea
            </h1>
          </div>
        </div>
        <div className='code'>
          <h2>The code</h2>
          <h3>1. logic.js</h3>
          <Highlight className='javascript'>{code.logic}</Highlight>
        </div>
        <div className='code'>
          <h3>2. saga.js</h3>
          <Highlight className='javascript'>{code.saga}</Highlight>
        </div>
        <div className='code'>
          <h3>3. index.js</h3>
          <Highlight className='javascript'>{code.index}</Highlight>
        </div>
      </div>
    )
  }
}

