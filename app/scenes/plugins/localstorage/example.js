import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

@kea({
  path: () => ['kea', 'localstorage', 'example'],

  actions: () => ({
    setText: (text) => ({ text })
  }),

  reducers: ({ actions }) => ({
    text: ['kea rocks!', PropTypes.string, { persist: true }, {
      [actions.setText]: (_, payload) => payload.text
    }]
  })
})
export default class LocalStorageExample extends Component {
  render () {
    const { text } = this.props
    const { setText } = this.actions

    return (
      <input value={text} type='text' onChange={e => setText(e.target.value)} />
    )
  }
}
