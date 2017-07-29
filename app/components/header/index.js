import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'

import { push } from 'react-router-redux'

const menu = {
  homepage: {
    url: '/',
    paths: ['homepage'],
    title: 'Home'
  },
  guide: {
    url: '/guide/installation',
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
          { url: '/guide/connected', title: 'Connected' }
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
    url: '/examples/todos',
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

    const selectedPage = path.split('/')[1] || 'homepage'
    const selectedMenuKey = Object.keys(menu).filter(k => menu[k].paths.indexOf(selectedPage) >= 0)[0]

    const hasSidebar = selectedMenuKey && menu[selectedMenuKey] && menu[selectedMenuKey].children

    return (
      <div>
        <header className='body-header'>
          <nav className='first-level'>
            {Object.keys(menu).map(key => (
              <a href={menu[key].url} key={key} onClick={this.handleLoad} className={selectedMenuKey === key ? 'active' : ''}>{menu[key].title}</a>
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
                            <a href={child.url} onClick={this.handleLoad} className={path === child.url ? 'active' : ''}>{child.title}</a>
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
            <div className={`content ${hasSidebar ? 'with-sidebar' : 'without-sidebar'}${darker.indexOf(path) >= 0 ? ' darker' : ''}`}>
              {this.props.children}
            </div>
          </section>
        </main>
      </div>
    )
  }
}
