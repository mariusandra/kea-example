import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put, fork } from 'redux-saga/effects'
import { Link } from 'react-router-dom'
import NProgress from 'nprogress'

import firebase from 'firebase/app'
import 'firebase/database'
import hackernews from 'firebase-hackernews'

const hnservice = hackernews.init(firebase)

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

      const stories = yield hnservice.stories(type, { page: page, count: 30 })
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

    let count = (page - 1) * 30 + 1

    return (
      <div>
        {isLoading
          ? <div>Loading...</div>
          : stories
            ? (
              <table>
                <tbody>
                  {stories.map(story => (
                    <tr key={story.id} className='hn-story'>
                      <td className='count'>
                        {count++}.
                      </td>
                      <td>
                        <div className='first-line'>
                          <a href={story.url}>{story.title}</a>
                        </div>
                        <div className='small-line'>
                          {story.score} points by <Link to={`/examples/hackernews/user/${story.by}`}>{story.by}</Link> | <Link to={`/examples/hackernews/item/${story.id}`}>{story.descendants} comments</Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
            : 'Nothing found!'}
        <Link to={`/examples/hackernews/${type}/${page + 1}`}>More</Link>
      </div>
    )
  }
}
