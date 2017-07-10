import './styles.scss'

import React, { Component } from 'react'
import { kea } from 'kea'
import { push } from 'react-router-redux'

import Slider from '../sliders/slider'

@kea({})
export default class HomepageScene extends Component {
  handleRoute = (e) => {
    const { dispatch } = this.props
    const href = e.target.attributes.href.value

    e.preventDefault()
    dispatch(push(href))
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='homepage-scene'>
        <div style={{ margin: 20 }}>
          <Slider id={0} />
        </div>
        <div style={{ margin: 20 }}>
          Please check out the examples from the menu above!
          <br />
          <br />
          <a href='/counter-singleton' onClick={this.handleRoute}>Or click here to begin</a>
          <br />
          <br />
          <a href='https://www.github.com/mariusandra/kea'>Fork on GitHub</a>
        </div>
      </div>
    )
  }
}

