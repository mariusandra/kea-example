import './styles.scss'

import React, { Component } from 'react'
import { kea } from 'kea'
import { push } from 'react-router-redux'

import Highlight from 'react-highlight'

import logo from '~/assets/logo.svg'

import Slider from '../guide/sliders/slider'
import Counter from '../guide/counter/counter'

const code = {
  counter: require('raw-loader!../guide/counter/code/selectors.txt'),
  slider: require('raw-loader!../guide/sliders/code/just-enough.txt')
}

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

        <div className='landing'>
          <div className='intro'>
            <img src={logo} alt='' />
            <div className='text'>
              <h1>Kea</h1>
              <strong>High Level Architecture for React Apps</strong>

              <a href='/guide/installation' onClick={this.handleRoute}>Get started</a>
              {' - '}
              <a href='https://www.github.com/mariusandra/kea'>Fork on GitHub</a>
            </div>
          </div>
        </div>

        <h2>Simple counter</h2>
        <div className='split'>
          <div className='code'>
            <Highlight className='javascript'>{code.counter}</Highlight>
          </div>
          <div className='description'>
            <div className='demo'>
              <Counter />
            </div>
            <br />
            Read the guide: <a href='/guide/counter' onClick={this.handleRoute}>Counter</a>
          </div>
        </div>

        <h2>Slider</h2>
        <div className='split'>
          <div className='code'>
            <Highlight className='javascript'>{code.slider}</Highlight>
          </div>
          <div className='description'>
            <div className='demo'>
              <Slider id={999} />
            </div>
            <br />
            Read the guide: <a href='/guide/sliders' onClick={this.handleRoute}>Sliders</a>
          </div>
        </div>
      </div>
    )
  }
}

