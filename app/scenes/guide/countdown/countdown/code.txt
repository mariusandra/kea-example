import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

import { put, cancelled, delay } from 'redux-saga/effects'

@kea({
  actions: () => ({
    start: true,
    finish: true,
    setCounter: (counter) => ({ counter })
  }),

  reducers: ({ actions, key, props }) => ({
    counter: [0, PropTypes.number, {
      [actions.setCounter]: (_, payload) => payload.counter
    }],
    finished: [false, PropTypes.bool, {
      [actions.start]: () => false,
      [actions.finish]: () => true
    }]
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.start]: function * () {
      try {
        const { setCounter, finish } = this.actions

        for (let i = 50; i >= 0; i--) {
          yield put(setCounter(i))
          yield delay(50)
        }
        yield put(finish())
      } finally {
        if (yield cancelled()) {
          console.log('Countdown was cancelled!')
        }
      }
    }
  })
})
export default class Counter extends Component {
  render () {
    const { counter, finished } = this.props
    const { start } = this.actions

    return (
      <div className='kea-counter'>
        Count: {counter}
        <br /><br />
        {finished
          ? 'We made it until the end! finish() action triggered'
          : 'Click start to trigger the finish() action in a few seconds'}
        <br /><br />
        <button onClick={() => start()}>Start</button>
      </div>
    )
  }
}
