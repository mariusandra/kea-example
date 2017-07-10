import './styles.scss'

import React, { Component } from 'react'

import Slider from './slider'

import Highlight from 'react-highlight'
import 'highlight.js/styles/railscasts.css'

import sliderCode from 'raw-loader!./source.txt'

export default class SlidersScene extends Component {
  render () {
    return (
      <div className='sliders-scene'>
        <div className='description'>
          <h2>Example #3 - Sliders</h2>

          This example demonstrates two components dynamically connected to redux.
          <br />
          Each have their own sagas that indepentenly update the image in the slider.
          <br /><br />
          Read the documentation for <a href='https://redux-saga.js.org/'>redux-saga</a> to fully understand this example.
        </div>
        <div className='slider-container'>
          <Slider id={1} initialSlide={0} />
          <Slider id={2} initialSlide={1} />
        </div>
        <div className='code'>
          <Highlight className='javascript'>{sliderCode}</Highlight>
        </div>
      </div>
    )
  }
}

