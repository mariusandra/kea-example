import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

import { put } from 'redux-saga/effects'

import githubLogic from './github-logic'
import hackerNewsLogic from './hacker-news-logic'

@kea({
  connect: {
    actions: [
      githubLogic, [
        'fetchRepositories'
      ],
      hackerNewsLogic, [
        'fetchDetails'
      ]
    ],
    props: [
      githubLogic, [
        'repositories',
        'isLoading as isGithubLoading',
        'error as githubError'
      ],
      hackerNewsLogic, [
        'stories',
        'karma',
        'isLoading as isHackerNewsLoading',
        'error as hackerNewsError'
      ]
    ]
  },

  actions: () => ({
    setUsername: (username) => ({ username })
  }),

  reducers: ({ actions }) => ({
    username: ['google', PropTypes.string, {
      [actions.setUsername]: (_, payload) => payload.username
    }]
  }),

  sagas: [
    githubLogic.saga,
    hackerNewsLogic.saga
  ],

  start: function * () {
    const { setUsername } = this.actions
    const username = yield this.get('username')
    yield put(setUsername(username))
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.setUsername]: function * (action) {
      const { fetchRepositories, fetchDetails } = this.actions
      const { username } = action.payload

      yield put(fetchRepositories(username))
      yield put(fetchDetails(username))
    }
  })
})
export default class ExampleGithubScene extends Component {
  render () {
    const { username, isGithubLoading, isHackerNewsLoading, repositories, githubError, hackerNewsError, karma, stories } = this.props
    const { setUsername } = this.actions

    return (
      <div className='example-github-scene'>
        <div style={{marginBottom: 20}}>
          <h1>Search for a github AND hackernews user:</h1>
          <input value={username} type='text' onChange={e => setUsername(e.target.value)} />
        </div>

        {isHackerNewsLoading ? (
          <div>
            Loading...
          </div>
        ) : hackerNewsError ? (
          <div>
            Error: {hackerNewsError}
          </div>
        ) : (
          <div>
            HN Karma: {karma}
            <br />
            HN Stories: {stories.join(', ')}
          </div>
        )}
        <br />
        {isGithubLoading ? (
          <div>
            Loading...
          </div>
        ) : repositories.length > 0 ? (
          <div>
            Found {repositories.length} repositories for user {username}!
            {repositories.map(repo => (
              <div key={repo.id}>
                <a href={repo.html_url} target='_blank'>{repo.full_name}</a> - {repo.stargazers_count} stars, {repo.forks} forks.
              </div>
            ))}
          </div>
        ) : (
          <div>
            {githubError ? `Error: ${githubError}` : 'No repositories found'}
          </div>
        )}
      </div>
    )
  }
}
