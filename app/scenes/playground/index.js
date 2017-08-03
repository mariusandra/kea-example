import './styles.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

const books = {
  1: 'book1',
  2: 'book2'
}

const booksLogic = kea({
  reducers: ({ actions }) => ({
    books: [books, PropTypes.object, {}]
  })
})

@kea({
  selectors: ({ selectors }) => ({
    book: [
      () => [booksLogic.selectors.books, (_, props) => props.bookId],
      (books, bookId) => books[bookId],
      PropTypes.object
    ]
  })
})
class BookDetail extends Component {
  render () {
    const { book } = this.props
    return <div>{book}</div>
  }
}

export default class Playground extends Component {
  render () {
    return (
      <div className='playground-scene'>
        <BookDetail bookId={1} />
        <BookDetail bookId={2} />
      </div>
    )
  }
}

