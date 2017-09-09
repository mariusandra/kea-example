import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

import logo from '~/assets/logo.svg'

export default class Header extends Component {
  render () {
    return (
      <div className='hn-header'>
        <img src={logo} width={20} height={20} />
        <Link className='root-link' to='/examples/hackernews'>Kea Hacker News</Link>
        <NavLink to='/examples/hackernews/new'>new</NavLink>
        {' | '}
        <NavLink to='/examples/hackernews/show'>show</NavLink>
        {' | '}
        <NavLink to='/examples/hackernews/ask'>ask</NavLink>
        {' | '}
        <NavLink to='/examples/hackernews/job'>jobs</NavLink>
      </div>
    )
  }
}
