// The code below is borrowed from here:
// https://blog.emilecantin.com/web/react/javascript/2017/05/16/ssr-react-router-4-webpack-code-split.html

import React, { Component } from 'react'

import NProgress from 'nprogress'

import './styles.scss'

class NProgressTag extends Component {
  componentWillMount () {
    NProgress.start()
  }

  componentWillUnmount () {
    NProgress.done()
  }

  render () {
    return <div />
  }
}

function asyncComponent (chunkName, getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null

    static loadComponent () { // The function we call before rendering
      return getComponent().then(m => m.default).then(Component => {
        AsyncComponent.Component = Component
        return Component
      })
    }

    mounted = false

    state = {
      Component: AsyncComponent.Component
    }

    componentWillMount () {
      if (this.state.Component === null) {
        AsyncComponent.loadComponent().then(Component => {
          if (this.mounted) {
            this.setState({ Component })
          }
        })
      }
    }

    componentDidMount () {
      this.mounted = true
    }

    componentWillUnmount () {
      this.mounted = false
    }

    render () {
      const {Component} = this.state

      if (Component !== null) {
        return (<Component {...this.props} />)
      }
      return <NProgressTag /> // or <div /> with a loading spinner, etc..
    }
  }
}

export default asyncComponent
