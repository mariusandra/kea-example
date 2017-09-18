import './styles.scss'

import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import Header from './header'

import List from './list'
import User from './user'
import Item from './item'

export default class ExampleHackerNewsScene extends Component {
  render () {
    return (
      <div className='example-hacker-news-scene'>
        <Header />
        <div className='hn-body'>
          <Switch>
            <Route path='/examples/hackernews/user/:user' render={props => (
              <User user={props.match.params.user} />
            )} />
            <Route path='/examples/hackernews/item/:item' render={props => <Item />} />
            <Route path='/examples/hackernews/:type?/:page?' render={props => <List />} />
          </Switch>
        </div>
      </div>
    )
  }
}
