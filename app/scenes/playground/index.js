import React, { Component } from 'react'
import { kea } from 'kea'
import PropTypes from 'prop-types'

const Auth = kea({
  actions: () => ({
    setUser: (user) => ({ user })
  }),
  reducers: ({ actions }) => ({
    user: [null, PropTypes.object, {
      [actions.setUser]: (_, payload) => payload.user
    }],
    isLoggedIn: [false, PropTypes.bool, {
      [actions.setUser]: () => true
    }]
  })
})

export const LoginGate = kea({
  selectors: () => ({
    isLoginPath: [
      () => [() => window.location.pathname === '/login'],
      isLoginPath => isLoginPath,
      PropTypes.bool
    ]
  }),
  connect: {
    props: [
      Auth, [
        'isLoggedIn'
      ]
    ]
  }
})(({ isLoginPath, isLoggedIn, children }) => <div>{isLoggedIn ? children : isLoginPath ? 'login page' : 'no login'}</div>)

export default class ThunkCounter extends Component {
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <LoginGate>
          logged in
        </LoginGate>
      </div>
    )
  }
}
