import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

@kea({
  path: () => ['scenes', 'localstorage', 'counter'],

  actions: () => ({
    increment: (amount = 1) => ({ amount }),
    decrement: (amount = 1) => ({ amount })
  }),

  reducers: ({ actions, key, props }) => ({
    counter: [0, PropTypes.number, { persist: true }, {
      [actions.increment]: (state, payload) => state + payload.amount,
      [actions.decrement]: (state, payload) => state - payload.amount
    }]
  })
})
export default class Counter extends Component {
  render () {
    const { counter } = this.props
    const { increment, decrement } = this.actions

    return (
      <div>
        Count: {counter}<br />
        <button onClick={() => increment(1)}>Increment</button>
        <button onClick={() => decrement(1)}>Decrement</button>
      </div>
    )
  }
}
