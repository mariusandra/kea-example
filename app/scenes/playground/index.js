import React, { Component } from 'react'
import { kea } from 'kea'
import PropTypes from 'prop-types'

@kea({
  actions: () => ({
    showAlert: (id) => ({ id }),
    hideAlert: (id) => ({ id })
  }),
  reducers: ({ actions }) => ({
    visibleAlerts: [{}, PropTypes.object, {
      [actions.showAlert]: (state, payload) => ({ ...state, [payload.id]: true }),
      [actions.hideAlert]: (state, payload) => ({ ...state, [payload.id]: false })
    }]
  }),
  takeEvery: ({ actions }) => ({
    [actions.showAlert]: function * () {
      console.log('showAlert called')
    }
  })
})
export default class App extends Component {
  componentDidMount () {
    const { showAlert } = this.actions
    console.log('mounted')
    showAlert('Alert1')
  }

  render () {
    const { showAlert } = this.actions
    const { visibleAlerts } = this.props

    return (
      <div>
        {visibleAlerts.Alert1 ? 'alert1 visible' : ''}
        <button onClick={() => showAlert('Alert1')} disabled={visibleAlerts.Alert1}>Show Alert1</button>
        <br />
        {visibleAlerts.Alert2 ? 'alert2 visible' : ''}
        <button onClick={() => showAlert('Alert2')} disabled={visibleAlerts.Alert2}>Show Alert2</button>
      </div>
    )
  }
}
