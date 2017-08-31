import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'

import { routeSelector } from '~/store'
import { Link, NavLink } from 'react-router-dom'

const menu = {
  homepage: {
    url: '/',
    paths: ['homepage'],
    title: 'Home'
  },
  guide: {
    url: '/guide',
    paths: ['guide', 'api'],
    title: 'Docs',
    children: [
      {
        title: 'Guide',
        children: [
          { url: '/guide/installation', title: 'Installation' },
          { url: '/guide/counter', title: 'Counter' },
          { url: '/guide/counter-dynamic', title: 'Dynamic Counter' },
          { url: '/guide/sliders', title: 'Sliders' },
          { url: '/guide/github', title: 'Github API' },
          { url: '/guide/connected', title: 'Connected Logic' },
          // { url: '/guide/forms', title: 'Forms' },
          { url: '/guide/migration', title: 'Migrating Redux Apps' }
          // TODO: not yet ready
          // { url: '/guide/connected-services', title: 'Connected Services' }
        ]
      },
      {
        title: 'API',
        children: [
          { url: '/api/logic', title: 'kea(options)' },
          { url: '/api/component', title: 'kea(options)(Component)' },
          { url: '/api/connect', title: 'connect(options)' },
          { url: '/api/reducer', title: 'keaReducer' },
          { url: '/api/saga', title: 'keaSaga' },
          { url: '/api/action', title: 'createAction' }
        ]
      }
    ]
  },
  examples: {
    url: '/examples',
    paths: ['examples'],
    title: 'Examples',
    children: [
      {
        title: 'Examples',
        children: [
          { url: '/examples/todos', title: 'TodoMVC', className: 'darker', source: 'https://github.com/keajs/kea-website/tree/master/app/scenes/examples/todos' },
          { url: '/examples/github', title: 'Github', source: 'https://github.com/keajs/kea-website/blob/master/app/scenes/examples/github/index.js' }
        ]
      }
    ]
  }
}

const darker = [
  '/examples/todos'
]

@connect({
  props: [
    routeSelector, [
      'pathname'
    ]
  ]
})
export default class Header extends Component {
  render () {
    const { pathname } = this.props

    const selectedPage = pathname.split('/')[1] || 'homepage'
    const selectedMenuKey = Object.keys(menu).filter(k => menu[k].paths.indexOf(selectedPage) >= 0)[0]

    const hasSidebar = selectedMenuKey && menu[selectedMenuKey] && menu[selectedMenuKey].children
    const isDarker = darker.filter(route => pathname.indexOf(route) === 0).length > 0

    return (
      <div>
        <header className='body-header'>
          <nav className='first-level'>
            {Object.keys(menu).map(key => (
              <Link key={key} to={menu[key].url} className={menu[key].paths.indexOf(selectedPage) >= 0 ? 'active' : ''}>{menu[key].title}</Link>
            ))}
            <a className='right' href='https://www.github.com/keajs/kea' target='_blank'>Github</a>
          </nav>
        </header>
        <main>
          <section className={hasSidebar ? 'with-sidebar' : ''}>
            {hasSidebar ? (
              <aside className='kea-sidebar'>
                <nav className='second-level'>
                  {menu[selectedMenuKey].children.map(section => (
                    <div key={section.title}>
                      <strong className='section-title'>{section.title}</strong>
                      <ul>
                        {section.children.map(child => (
                          <li key={child.url}>
                            <NavLink to={child.url}>{child.title}</NavLink>
                            {child.source ? (
                              <small style={{marginLeft: 10}}><a href={child.source} target='_blank'>source</a></small>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </aside>
            ) : null}
            <div className={`content ${hasSidebar ? 'with-sidebar' : 'without-sidebar'}${isDarker ? ' darker' : ''}`}>
              {this.props.children}
            </div>
          </section>
        </main>
      </div>
    )
  }
}
