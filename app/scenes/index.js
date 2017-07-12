import './styles.scss'
import 'highlight.js/styles/railscasts.css'

import React, { Component } from 'react'

import Header from '~/components/header'

export default class App extends Component {
  render () {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}
