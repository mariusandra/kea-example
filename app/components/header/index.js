import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'

import { push } from 'react-router-redux'

import logo from './logo.svg'

const menu = {
  homepage: {
    url: '/',
    title: 'Homepage'
  },
  guide: {
    url: '/guide/counter',
    title: 'Guide',
    children: [
      { url: '/guide/counter', title: 'Counter' },
      { url: '/guide/counter-dynamic', title: 'Dynamic Counter' },
      { url: '/guide/sliders', title: 'Sliders' },
      { url: '/guide/connected', title: 'Connected' }
    ]
  },
  examples: {
    url: '/examples/todos',
    title: 'Examples',
    children: [
      { url: '/examples/todos', title: 'TodoMVC' }
    ]
  }
}

@connect({
  props: [
    (state) => state.routing.locationBeforeTransitions, [
      'pathname as path'
    ]
  ]
})
export default class Header extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired,

    // react-router
    path: React.PropTypes.string.isRequired
  }

  handleLoad = (event) => {
    const { dispatch } = this.props

    event.preventDefault()
    if (event.target.attributes.href) {
      dispatch(push(event.target.attributes.href.value))
    } else {
      dispatch(push(event.target.parentElement.attributes.href.value))
    }
  }

  render () {
    const { path } = this.props

    const selectedMenuKey = path.split('/')[1] || 'homepage'

    return (
      <header className='body-header'>
        <nav className='first-level'>
          <a href='/' className='logo' onClick={this.handleLoad}>
            <img src={logo} height={40} alt='' />
          </a>
          {Object.keys(menu).map(key => (
            <a href={menu[key].url} key={key} onClick={this.handleLoad} className={selectedMenuKey === key ? 'active' : ''}>{menu[key].title}</a>
          ))}
          <a className='right' href='https://www.github.com/mariusandra/kea' target='_blank'>Fork on Github</a>
        </nav>
        {menu[selectedMenuKey].children ? (
          <nav className='second-level'>
            {menu[selectedMenuKey].children.map(child => (
              <a href={child.url} key={child.url} onClick={this.handleLoad} className={path === child.url ? 'active' : ''}>{child.title}</a>
            ))}
          </nav>
        ) : null}
      </header>
    )

    // <a href='/' onClick={this.load} className={path === '/' ? 'active' : ''}>Homepage</a>
    // <a href='/guide/counter-singleton' onClick={this.load} className={path === '/guide/counter-singleton' ? 'active' : ''}>Counter</a>
    // <a href='/guide/counter-dynamic' onClick={this.load} className={path === '/guide/counter-dynamic' ? 'active' : ''}>Dynamic Counter</a>
    // <a href='/guide/sliders' onClick={this.load} className={path === '/guide/sliders' ? 'active' : ''}>Sliders</a>
    // <a href='/guide/connected' onClick={this.load} className={path === '/guide/connected' ? 'active' : ''}>Connected</a>
    // <a href='/examples/todos' onClick={this.load} className={path.indexOf('/examples/todos') === 0 ? 'active' : ''}>Todos</a>
  }
}
