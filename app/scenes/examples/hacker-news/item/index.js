import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import NProgress from 'nprogress'

import { LOCATION_CHANGE } from 'connected-react-router'

import hnAPI from '~/scenes/examples/hacker-news/utils/api'

import Story from '../list/story'
import Comment from './comment'

const getItemFromUrl = (pathname) => {
  const urlParts = pathname.split('/examples/hackernews/item/').join('').split('/')
  return urlParts[0]
}

const Kid = ({ id, kids }) =>
  <div>
    {kids[id] ? <Comment {...kids[id]} /> : 'Loading...'}
    {kids[id] && kids[id].kids && kids[id].kids.length > 0 ? (
      <div className='indent'>
        {kids[id].kids.map(kidId => <Kid key={kidId} id={kidId} kids={kids} />)}
      </div>
    ) : null}
  </div>

@kea({
  actions: () => ({
    loadItem: (id) => ({ id }),
    itemLoaded: (item) => ({ item }),
    kidsLoaded: (kids) => ({ kids }),
    finishedLoading: true
  }),

  reducers: ({ actions, key, props }) => ({
    isLoading: [!props.itemData, PropTypes.bool, {
      [actions.loadItem]: (state, payload) => true,
      [actions.finishedLoading]: () => false
    }],
    loadedItemData: [null, PropTypes.object, {
      [actions.loadItem]: () => null,
      [actions.itemLoaded]: (state, payload) => payload.item
    }],
    kids: [{}, PropTypes.object, {
      [actions.loadItem]: () => ({}),
      [actions.kidsLoaded]: (state, payload) => {
        let newState = Object.assign({}, state)
        payload.kids.forEach(kid => {
          newState[kid.id] = kid
        })
        return newState
      }
    }]
  }),

  selectors: ({ selectors }) => ({
    item: [
      () => [(_, props) => props.itemData, selectors.loadedItemData],
      (d1, d2) => d1 || d2,
      PropTypes.object
    ]
  }),

  * start () {
    yield call(this.workers.loadItem)
  },

  takeEvery: ({ actions, workers }) => ({
    [LOCATION_CHANGE]: function * (action) {
      if (action.payload.pathname.indexOf('/examples/hackernews/item/')) {
        yield call(workers.loadItem)
      }
    }
  }),

  workers: {
    * loadItem (action) {
      const { itemLoaded, kidsLoaded } = this.actions

      const pathname = (action && action.payload && action.payload.pathname) || window.location.pathname
      const id = getItemFromUrl(pathname)

      NProgress.start()

      const itemData = yield hnAPI.items(id)
      yield put(itemLoaded(itemData[0]))

      let unloadedKids = itemData[0].kids || []

      while (unloadedKids.length > 0) {
        const loadedKids = yield hnAPI.items(unloadedKids.filter(i => i))
        yield put(kidsLoaded(loadedKids))
        unloadedKids = []
        loadedKids.forEach(kid => {
          if (kid.kids) {
            unloadedKids = unloadedKids.concat(kid.kids)
          }
        })
      }

      NProgress.done()
    }
  }
})
export default class Item extends Component {
  componentDidMount () {
    const { id, itemData } = this.props
    const { loadItem } = this.actions

    if (id && !itemData) {
      loadItem(id)
    }
  }

  componentWillUpdate (nextProps) {
    const { loadItem } = this.actions

    if (this.props.id !== nextProps.id && !nextProps.itemData) {
      loadItem(nextProps.id)
    }
  }

  render () {
    const { isLoading, item, kids } = this.props

    if (!item) {
      return <div>{isLoading ? 'Loading...' : 'Nothing found!'}</div>
    }

    return (
      <div>
        {item.type === 'story' ? <Story {...item} /> : null}
        {item.type === 'story' && item.text ? (
          <div className='story-body' dangerouslySetInnerHTML={{ __html: item.text }} />
        ) : null}

        {item.type === 'comment' ? <Comment {...item} /> : null}

        <div>
          {item.kids && item.kids.map(id => (
            <Kid key={id} kids={kids} id={id} />
          ))}
        </div>
      </div>
    )
  }
}
