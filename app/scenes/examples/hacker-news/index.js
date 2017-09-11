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
            <Route path='/examples/hackernews/item/:item' render={props => (
              <Item id={props.match.params.item} />
            )} />
            <Route path='/examples/hackernews/:type?/:page?' render={props => (
              <List type={props.match.params.type || 'top'} page={parseInt(props.match.params.page || 1)} />
            )} />
          </Switch>
        </div>
      </div>
    )
  }
}
