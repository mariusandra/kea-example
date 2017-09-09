import './styles.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'

import Header from './header'
import List from './list'

export default class ExampleHackerNewsScene extends Component {
  render () {
    return (
      <div className='example-hacker-news-scene'>
        <Header />
        <div className='hn-body'>
          <Route path='/examples/hackernews/:type?/:page?' exact render={props => (
            <List
              key={props.match.params.type + '_' + props.match.params.page}
              type={props.match.params.type || 'top'}
              page={parseInt(props.match.params.page || 1)} />
          )} />
        </div>
      </div>
    )
  }
}
