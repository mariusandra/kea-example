import PropTypes from 'prop-types'
import { kea } from 'kea'

import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga'

const API_URL = 'https://hacker-news.firebaseio.com/v0/user/'

export default kea({
  actions: () => ({
    fetchDetails: (username) => ({ username }),
    setDetails: (karma, stories) => ({ karma, stories }),
    setFetchError: (message) => ({ message })
  }),

  reducers: ({ actions }) => ({
    username: ['keajs', PropTypes.string, {
      [actions.fetchDetails]: (_, payload) => payload.username
    }],
    karma: [null, PropTypes.number, {
      [actions.fetchDetails]: () => [],
      [actions.setDetails]: (state, payload) => payload.karma
    }],
    stories: [[], PropTypes.array, {
      [actions.fetchDetails]: () => [],
      [actions.setDetails]: (state, payload) => payload.stories
    }],
    isLoading: [true, PropTypes.bool, {
      [actions.fetchDetails]: () => true,
      [actions.setDetails]: () => false,
      [actions.setFetchError]: () => false
    }],
    error: [null, PropTypes.string, {
      [actions.fetchDetails]: () => null,
      [actions.setFetchError]: (_, payload) => payload.message
    }]
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchDetails]: workers.fetchDetails
  }),

  workers: {
    * fetchDetails (action) {
      const { setDetails, setFetchError } = this.actions
      const { username } = action.payload

      yield delay(100) // debounce for 100ms

      const response = yield window.fetch(`${API_URL}${username}.json`)
      const json = yield response.json()
      if (json) {
        yield put(setDetails(json.karma, json.submitted))
      } else {
        yield put(setFetchError('Repository not found'))
      }
    }
  }
})
