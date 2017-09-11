import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import NProgress from 'nprogress'

import hnAPI from '~/scenes/examples/hacker-news/utils/api'

@kea({
  actions: () => ({
    loadUser: (user) => ({ user }),
    setUser: (user) => ({ user })
  }),

  reducers: ({ actions }) => ({
    isLoading: [true, PropTypes.bool, {
      [actions.loadUser]: () => true,
      [actions.setUser]: () => false
    }],
    userData: [{}, PropTypes.object, {
      [actions.setUser]: (_, payload) => payload.user
    }]
  }),

  takeEvery: ({ actions }) => ({
    [actions.loadUser]: function * (action) {
      const { setUser } = this.actions
      const { user } = action.payload

      NProgress.start()

      const userData = yield hnAPI.user(user)
      yield put(setUser(userData))

      console.log(userData)

      NProgress.done()
    }
  })
})
export default class User extends Component {
  componentDidMount () {
    const { user } = this.props
    const { loadUser } = this.actions
    loadUser(user)
  }

  componentWillUpdate (nextProps) {
    const { loadUser } = this.actions

    if (this.props.user !== nextProps.user) {
      loadUser(nextProps.user)
    }
  }

  render () {
    const { isLoading, userData } = this.props

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!userData) {
      return <div>Nothing found!</div>
    }

    return (
      <div>
        <p>
          user: {userData.id}
        </p>
        <p>
          created: {Math.floor(((new Date().valueOf() / 1000) - userData.created) / 86400)} days ago
        </p>
        <p>
          karma: {userData.karma}
        </p>
      </div>
    )
  }
}
