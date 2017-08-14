import React from 'react'
import { kea } from 'kea'
import PropTypes from 'prop-types'

const appLogic = kea({
  actions: () => ({
    showAlert: (id) => ({ id }),
    hideAlert: (id) => ({ id })
  }),
  reducers: ({ actions }) => ({
    visibleAlerts: [{}, PropTypes.object, {
      [actions.showAlert]: (state, payload) => ({ ...state, [payload.id]: true }),
      [actions.hideAlert]: (state, payload) => ({ ...state, [payload.id]: false })
    }]
  })
})

const alertLogic = kea({
  connect: {
    actions: [
      appLogic, [
        'hideAlert'
      ]
    ]
  },
  selectors: ({ selectors }) => ({
    isVisible: [
      () => [(_, props) => props.id, appLogic.selectors.visibleAlerts],
      (id, visibleAlerts) => visibleAlerts[id],
      PropTypes.bool
    ]
  })
})

const Alert = alertLogic(
  ({ message, isVisible, id, actions: { hideAlert } }) => (
    isVisible ? (
      <div>
        {message}
        &nbsp;
        <button onClick={() => hideAlert(id)}>x</button>
      </div>
    ) : null
  )
)

const App = appLogic(
  ({ actions: { showAlert }, visibleAlerts }) => (
    <div>
      <Alert message='Hello React' id='Alert1' />
      <button onClick={() => showAlert('Alert1')} disabled={visibleAlerts.Alert1}>Show Alert</button>
      <br />
      <Alert message='Hello again React' id='Alert2' />
      <button onClick={() => showAlert('Alert2')} disabled={visibleAlerts.Alert2}>Show Alert</button>
    </div>
  )
)

export default App
