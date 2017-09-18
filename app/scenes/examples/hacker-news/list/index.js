import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import { Link } from 'react-router-dom'
import NProgress from 'nprogress'

import hnAPI from '~/scenes/examples/hacker-news/utils/api'

import Story from './story'

@kea({
  actions: () => ({
    loadStories: (type, page) => ({ type, page }),
    setStories: (stories) => ({ stories })
  }),

  reducers: ({ actions }) => ({
    isLoading: [true, PropTypes.bool, {
      [actions.loadStories]: () => true,
      [actions.setStories]: () => false
    }],
    stories: [[], PropTypes.array, {
      [actions.setStories]: (_, payload) => payload.stories
    }]
  }),

  takeEvery: ({ actions }) => ({
    [actions.loadStories]: function * (action) {
      const { setStories } = this.actions
      const { type, page } = action.payload

      NProgress.start()

      const stories = yield hnAPI.stories(type, { page: page, count: 30 })
      console.log(stories)
      yield put(setStories(stories))

      NProgress.done()
    }
  })
})
export default class List extends Component {
  componentDidMount () {
    const { type, page } = this.props
    const { loadStories } = this.actions
    loadStories(type, page)
  }

  componentWillUpdate (nextProps) {
    const { loadStories } = this.actions

    if (this.props.type !== nextProps.type || this.props.page !== nextProps.page) {
      loadStories(nextProps.type, nextProps.page)
    }
  }

  render () {
    const { isLoading, stories, type, page } = this.props

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!stories) {
      return <div>Nothing found!</div>
    }

    let count = (page - 1) * 30 + 1

    return (
      <div>
        <table>
          <tbody>
            {stories.map(story => (
              <tr key={story.id} className='hn-list'>
                <td className='count'>
                  {count++}.
                </td>
                <td>
                  <Story {...story} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/examples/hackernews/${type}/${page + 1}`}>More</Link>
      </div>
    )
  }
}
