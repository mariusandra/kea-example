import './styles.scss'

import React, { Component } from 'react'

import Slider from '../sliders/slider'

export default class HomepageScene extends Component {
  render () {
    return (
      <div className='homepage-scene'>
        <div style={{ margin: 20 }}>
          <Slider id={0} />
        </div>
        <div style={{ margin: 20 }}>
          Please check out the examples from the menu above!
        </div>
      </div>
    )
  }
}

