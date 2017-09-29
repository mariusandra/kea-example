import React, { Component } from 'react'
import { kea } from 'kea'
import PropTypes from 'prop-types'

const delay = ms => new Promise(resolve => window.setTimeout(resolve, ms))

@kea({
  actions: () => ({
    increase: true
  }),
  reducers: ({ actions }) => ({
    counter: [0, PropTypes.number, {
      [actions.increase]: (state, payload) => state + 1
    }]
  }),
  thunks: ({ actions }) => ({
    increaseAsync: async (ms) => {
      await delay(ms)
      await actions.increase()
    }
  })
})
export default class ThunkCounter extends Component {
  render () {
    const { increase, increaseAsync } = this.actions
    const { counter } = this.props

    return (
      <div style={{textAlign: 'center'}}>
        <div>{counter}</div>
        {[0, 10, 100, 500, 1000, 2000].map(ms => (
          <button key={ms} onClick={() => ms === 0 ? increase() : increaseAsync(ms)}>{ms}</button>
        ))}
      </div>
    )
  }
}
