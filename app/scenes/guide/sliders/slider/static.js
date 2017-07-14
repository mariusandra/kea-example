import './styles.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

import range from '~/utils/range'

import images from './images'

@kea({
  actions: () => ({
    updateSlide: index => ({ index })
  }),

  reducers: ({ actions }) => ({
    currentSlide: [0, PropTypes.number, {
      [actions.updateSlide]: (state, payload) => payload.index % images.length
    }]
  }),

  selectors: ({ selectors }) => ({
    currentImage: [
      () => [selectors.currentSlide],
      (currentSlide) => images[currentSlide],
      PropTypes.object
    ]
  })
})
export default class StaticSlider extends Component {
  render () {
    const { currentSlide, currentImage } = this.props
    const { updateSlide } = this.actions

    const title = `Image copyright by ${currentImage.author}`

    return (
      <div className='kea-slider'>
        <img src={currentImage.src} alt={title} title={title} />
        <div className='buttons'>
          {range(images.length).map(i => (
            <span key={i} className={i === currentSlide ? 'selected' : ''} onClick={() => updateSlide(i)} />
          ))}
        </div>
      </div>
    )
  }
}
