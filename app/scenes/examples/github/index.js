import './styles.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

const BASE_URL = 'https://api.github.com'

@kea({
  actions: () => ({
    setUsername: (username) => ({ username }),
    setRepositories: (repositories) => ({ repositories })
  }),

  reducers: ({ actions }) => ({
    username: ['keajs', PropTypes.string, {
      [actions.setUsername]: (_, payload) => payload.username
    }],
    repositories: [[], PropTypes.array, {
      [actions.setUsername]: () => [],
      [actions.setRepositories]: (state, payload) => payload.repositories
    }],
    isLoading: [true, PropTypes.bool, {
      [actions.setUsername]: () => true,
      [actions.setRepositories]: () => false
    }]
  }),

  selectors: ({ selectors }) => ({
    sortedRepositories: [
      () => [selectors.repositories],
      (repositories) => repositories.sort((a, b) => b.stargazers_count - a.stargazers_count),
      PropTypes.array
    ]
  }),

  start: function * () {
    const username = yield this.get('username')
    yield call(this.workers.fetchRepositories, { payload: { username } })
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.setUsername]: workers.fetchRepositories
  }),

  workers: {
    * fetchRepositories (action) {
      const { setRepositories } = this.actions
      const { username } = action.payload

      yield delay(100) // debounce for 100ms

      const response = yield window.fetch(`${BASE_URL}/users/${username}/repos?per_page=250`)
      const json = yield response.json()

      yield put(setRepositories(json))
    }
  }
})
export default class ExampleGithubScene extends Component {
  render () {
    const { username, isLoading, repositories, sortedRepositories } = this.props
    const { setUsername } = this.actions

    return (
      <div className='example-github-scene'>
        <div style={{marginBottom: 20}}>
          <h1>Search for a github user</h1>
          <input value={username} autoFocus type='text' onChange={e => setUsername(e.target.value)} />
        </div>
        {isLoading ? (
          <div>
            Loading...
          </div>
        ) : repositories.length > 0 ? (
          <div>
            Found {repositories.length} repositories for user {username}!
            {sortedRepositories.map(repo => (
              <div key={repo.id}>
                <a href={repo.url} target='_blank'>{repo.full_name}</a> - {repo.stargazers_count} stars, {repo.forks} forks.
              </div>
            ))}
          </div>
        ) : (
          <div>
            No repositories found
          </div>
        )}
      </div>
    )
  }
}
