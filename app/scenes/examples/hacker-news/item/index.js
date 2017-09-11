import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import NProgress from 'nprogress'

import hnAPI from '~/scenes/examples/hacker-news/utils/api'

const Story = ({ title, url }) =>
  <div>
    {title ? (
      url ? (
        <a href={url}>{title}</a>
      ) : null
    ) : null}
  </div>

const Comment = ({ text, by }) =>
  <div className='item'>
    <div className='small-line'>
      by {by}
    </div>
    <div dangerouslySetInnerHTML={{ __html: text }} />
  </div>

const logic = kea({
  key: (props) => props.id,
  path: (key) => ['scenes', 'hackerNews', 'items', key],

  actions: () => ({
    loadItem: (id) => ({ id, key: id }),
    setItem: (item) => ({ item, key: item.id }),
    loadKids: (id, ids) => ({ id, ids, key: id }),
    setKids: (kids, key) => ({ kids, key })
  }),

  reducers: ({ actions, key, props }) => ({
    isLoading: [!props.itemData, PropTypes.bool, {
      [actions.loadItem]: (state, payload) => parseInt(payload.key) === parseInt(key) ? true : state,
      [actions.setItem]: (state, payload) => parseInt(payload.key) === parseInt(key) ? false : state
    }],
    loadedItemData: [null, PropTypes.object, {
      [actions.setItem]: (state, payload) => parseInt(payload.key) === parseInt(key) ? payload.item : state
    }],
    kidsLoading: [false, PropTypes.bool, {
      [actions.loadKids]: (state, payload) => parseInt(payload.key) === parseInt(key) ? true : state,
      [actions.setKids]: (state, payload) => parseInt(payload.key) === parseInt(key) ? false : state
    }],
    kids: [null, PropTypes.array, {
      [actions.setKids]: (state, payload) => parseInt(payload.key) === parseInt(key) ? payload.kids : state
    }]
  }),

  selectors: ({ selectors }) => ({
    item: [
      () => [(_, props) => props.itemData, selectors.loadedItemData],
      (d1, d2) => d1 || d2,
      PropTypes.object
    ]
  }),

  takeEvery: ({ actions }) => ({
    [actions.loadItem]: function * (action) {
      const { setItem, loadKids } = this.actions
      const { id } = action.payload

      NProgress.start()

      const itemData = yield hnAPI.items(id)

      yield put(setItem(itemData[0]))

      if (itemData[0].kids) {
        yield put(loadKids(id, itemData[0].kids))
      }

      NProgress.done()
    },

    [actions.loadKids]: function * (action) {
      const { setKids } = this.actions
      const { id, ids } = action.payload

      NProgress.start()

      const kids = yield hnAPI.items(ids)
      console.log(kids)

      yield put(setKids(kids, id))

      NProgress.done()
    }
  })
})

class Item extends Component {
  componentDidMount () {
    const { id, itemData } = this.props
    const { loadItem } = this.actions

    if (id && !itemData) {
      loadItem(id)
    }
    // if (itemData && itemData.kids) {
    //   loadKids(id, itemData.kids)
    // }
  }

  componentWillUpdate (nextProps) {
    const { loadItem } = this.actions

    if (this.props.id !== nextProps.id && !nextProps.itemData) {
      loadItem(nextProps.id)
    }
  }

  render () {
    const { isLoading, item, kids, kidsLoading } = this.props

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!item) {
      return <div>Nothing found!</div>
    }

    return (
      <div>
        {item.type === 'story' ? <Story {...item} /> : null}
        {item.type === 'comment' ? <Comment {...item} /> : null}

        <div className='indent'>
          {kidsLoading ? 'Loading...' : null}
          {kids ? kids.map(kid => (
            <ConnectedItem key={kid.id} id={kid.id} itemData={kid} />
          )) : null}
        </div>
      </div>
    )
  }
}

const ConnectedItem = logic(Item)

export default ConnectedItem
