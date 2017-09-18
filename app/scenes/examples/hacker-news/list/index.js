import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import { Link } from 'react-router-dom'
import NProgress from 'nprogress'

import { LOCATION_CHANGE } from 'react-router-redux'

import hnAPI from '~/scenes/examples/hacker-news/utils/api'

import Story from './story'

const getTypePageFromUrl = (pathname) => {
  const urlParts = pathname.split('/examples/hackernews').join('').split('/')
  return {
    type: urlParts[1] || 'top',
    page: urlParts[2] ? urlParts[2] - 0 : 1
  }
}

@kea({
  actions: () => ({
    loadStories: (type, page) => ({ type, page }),
    setStories: (type, page, stories, moreAvailable) => ({ type, page, stories, moreAvailable })
  }),

  reducers: ({ actions }) => ({
    isLoading: [true, PropTypes.bool, {
      [actions.loadStories]: () => true,
      [actions.setStories]: () => false
    }],
    type: ['top', PropTypes.string, {
      [actions.setStories]: (_, payload) => payload.type
    }],
    page: [1, PropTypes.number, {
      [actions.setStories]: (_, payload) => payload.page
    }],
    stories: [[], PropTypes.array, {
      [actions.setStories]: (_, payload) => payload.stories
    }],
    hasMore: [false, PropTypes.bool, {
      [actions.setStories]: (_, payload) => payload.moreAvailable
    }]
  }),

  * start () {
    yield call(this.workers.loadStories)
  },

  takeEvery: ({ actions, workers }) => ({
    [LOCATION_CHANGE]: workers.loadStories
  }),

  workers: {
    * loadStories (action) {
      const { setStories } = this.actions

      const pathname = (action && action.payload && action.payload.pathname) || window.location.pathname
      const { type, page } = getTypePageFromUrl(pathname)

      NProgress.start()

      const stories = yield hnAPI.stories(type, { page: page, count: 30, force: true })
      const length = yield hnAPI.length(type)

      yield put(setStories(type, page, stories, length > page * 30))

      NProgress.done()
    }
  }
})
export default class List extends Component {
  render () {
    const { isLoading, stories, type, page, hasMore } = this.props

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
        {hasMore ? (
          <Link to={`/examples/hackernews/${type}/${page + 1}`}>More</Link>
        ) : null}
      </div>
    )
  }
}
