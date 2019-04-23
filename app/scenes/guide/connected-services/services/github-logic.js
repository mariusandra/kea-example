import PropTypes from 'prop-types'
import { kea } from 'kea'

import { put, delay } from 'redux-saga/effects'

const API_URL = 'https://api.github.com'

export default kea({
  actions: () => ({
    fetchRepositories: (username) => ({ username }),
    setRepositories: (repositories) => ({ repositories }),
    setFetchError: (message) => ({ message })
  }),

  reducers: ({ actions }) => ({
    username: ['keajs', PropTypes.string, {
      [actions.fetchRepositories]: (_, payload) => payload.username
    }],
    repositories: [[], PropTypes.array, {
      [actions.fetchRepositories]: () => [],
      [actions.setRepositories]: (state, payload) => payload.repositories
    }],
    isLoading: [true, PropTypes.bool, {
      [actions.fetchRepositories]: () => true,
      [actions.setRepositories]: () => false,
      [actions.setFetchError]: () => false
    }],
    error: [null, PropTypes.string, {
      [actions.fetchRepositories]: () => null,
      [actions.setFetchError]: (_, payload) => payload.message
    }]
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchRepositories]: workers.fetchRepositories
  }),

  workers: {
    * fetchRepositories (action) {
      const { setRepositories, setFetchError } = this.actions
      const { username } = action.payload

      yield delay(100) // debounce for 100ms

      const response = yield window.fetch(`${API_URL}/users/${username}/repos?per_page=250`)
      if (response.status === 200) {
        const json = yield response.json()
        yield put(setRepositories(json))
      } else {
        const json = yield response.json()
        yield put(setFetchError(json.message))
      }
    }
  }
})
