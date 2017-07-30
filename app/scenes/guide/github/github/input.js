import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

@kea({
  actions: () => ({
    setUsername: (username) => ({ username })
  }),

  reducers: ({ actions }) => ({
    username: ['keajs', PropTypes.string, {
      [actions.setUsername]: (_, payload) => payload.username
    }]
  })
})
export default class ExampleGithubScene extends Component {
  render () {
    const { username } = this.props
    const { setUsername } = this.actions

    return (
      <div className='example-github-scene'>
        <div style={{marginBottom: 20}}>
          <h1>Search for a github user</h1>
          <input value={username}
                 type='text'
                 onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          Repos will come here...
        </div>
      </div>
    )
  }
}
