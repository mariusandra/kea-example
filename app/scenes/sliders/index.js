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

          This example demonstrates side effects through sagas.
          <br /><br />
          You will see one component with two instances that dynamically receive separate props.
          Each instance has its own saga that indepentenly updates the image after a delay.
          <br /><br />
          Read the documentation for <a href='https://redux-saga.js.org/'>redux-saga</a> to fully understand this example.

          <h2>Final result</h2>
          <div className='demo'>
            <div className='slider-container'>
              <Slider id={1} initialSlide={0} />
              <Slider id={2} initialSlide={1} />
            </div>
          </div>
        </div>
        <div className='code'>
          <h2>Full source</h2>
          Better documentation is coming soon. Until then, read the comments in the code
          and the <a href='https://redux-saga.js.org/'>redux-saga</a> documentation.
          <Highlight className='javascript'>{sliderCode}</Highlight>
        </div>
      </div>
    )
  }
}

