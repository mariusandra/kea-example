import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'

import { routeSelector } from '~/store'
import { Link, NavLink } from 'react-router-dom'

const menu = {
  homepage: {
    url: '/',
    paths: ['homepage'],
    title: 'Kea 1.0'
  },
  guide: {
    url: '/guide',
    paths: ['guide', 'api', 'effects', 'plugins'],
    title: 'Docs',
    children: [
      {
        title: 'Guide',
        children: [
          { url: '/guide/installation', title: 'Installation' },
          { url: '/guide/github', title: 'Github API', small: 'with kea-saga' },
          { url: '/guide/forms', title: 'Forms', small: 'with kea-saga' },
          { url: '/guide/sliders', title: 'Sliders', small: 'with kea-saga' },
          { url: '/guide/migration', title: 'Migrating Redux Apps' },
          // TODO: not yet ready
          // { url: '/guide/connected-services', title: 'Connected Services' }
        ]
      },
      {
        title: 'Side effects',
        children: [
          { url: '/effects/saga', title: 'Sagas' },
          { url: '/effects/thunk', title: 'Thunks' }
        ]
      },
      {
        title: 'Plugins',
        children: [
          { url: '/plugins/localstorage', title: 'LocalStorage' }
        ]
      },
      {
        title: 'API',
        children: [
          { url: '/api/logic', title: 'kea(options)' },
          { url: '/api/component', title: 'kea(options)(Component)' },
          { url: '/api/connect', title: 'connect(options)' },
          { url: '/api/store', title: 'getStore' },
          { url: '/api/reducer', title: 'keaReducer' },
          { url: '/api/action', title: 'createAction' },
          { url: '/api/reset', title: 'resetKeaCache' }
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
            <a className='right' href='https://github.com/keajs/kea' target='_blank'><span className='long-text'>Github</span><span className='short-text'>GH</span></a>
            <a className='opencollective' href='https://opencollective.com/kea' target='_blank'><span className='long-text'>OpenCollective</span><span className='short-text'>OC</span></a>
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
                            {child.small ? (
                              <small style={{marginLeft: 10, color: '#aaa', fontWeight: 300}}>{child.small}</small>
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
        <footer className='opencollective-footer'>
          <p>
            Developing Kea and writing this documentation takes a fair bit of work.
          </p>
          <p>
            Please support this work by sponsoring us on <a href='https://opencollective.com/kea' target='_blank'>OpenCollective</a>.
          </p>
          <p>
            Just <strong>$2/month</strong> will make a huge difference in our mission to develop the best state management solution for React!
          </p>
        </footer>
      </div>
    )
  }
}
