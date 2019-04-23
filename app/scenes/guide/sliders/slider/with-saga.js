import './styles.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

import { take, race, put, delay } from 'redux-saga/effects'

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
  }),

  start: function * () {
    const { updateSlide } = this.actions

    console.log('Starting homepage slider saga')
    console.log(this, this.actions, this.props)

    while (true) {
      const { timeout } = yield race({
        change: take(action => action.type === updateSlide.toString() && action.payload.key === this.key),
        timeout: delay(5000)
      })

      if (timeout) {
        const currentSlide = yield this.get('currentSlide')
        yield put(updateSlide(currentSlide + 1))
      }
    }
  }
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
