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
          { url: '/guide/github', title: 'Example: Github API' },
          { url: '/guide/forms', title: 'Example: Forms' },
          { url: '/guide/sliders', title: 'Example: Sliders' },
          { url: '/guide/migration', title: 'Migrating Redux Apps' }
        ]
      },
      {
        title: 'Side effects',
        children: [
          { url: '/effects/listeners', title: 'Listeners' },
          { url: '/effects/saga', title: 'Sagas' },
          { url: '/effects/thunk', title: 'Thunks' }
        ]
      },
      {
        title: 'Plugins',
        children: [
          { url: '/plugins/router', title: 'Router' },
          { url: '/plugins/localstorage', title: 'LocalStorage' }
        ]
      },
      {
        title: 'API',
        children: [
          { url: '/api/context', title: 'context' },
          { url: '/api/kea', title: 'kea' },
          { url: '/api/logic', title: 'logic' },
          { url: '/api/connect', title: 'connect' },
          { url: '/api/action', title: 'createAction' },
        ]
      }
    ]
  }
}
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

    return (
      <div>
        <header className='body-header'>
          <nav className='first-level'>
            {Object.keys(menu).map(key => (
              <Link key={key} to={menu[key].url} className={menu[key].paths.indexOf(selectedPage) >= 0 ? 'active' : ''}>{menu[key].title}</Link>
            ))}
            <a className='right' href='https://github.com/keajs/kea' target='_blank'><span className='long-text'>Github</span><span className='short-text'>GH</span></a>
            <a className='opencollective' href='https://opencollective.com/kea' target='_blank'><span className='long-text'>Support Kea</span><span className='short-text'>OC</span></a>
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
            <div className={`content ${hasSidebar ? 'with-sidebar' : 'without-sidebar'}`}>
              {this.props.children}
            </div>
          </section>
        </main>
      </div>
    )
  }
}
