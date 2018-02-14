import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea, connect } from 'kea'

// create a dynamic logic store
const dynamicLogic = kea({
  key: (props) => props.id,

  path: (key) => ['scenes', 'dynamic', key],

  actions: () => ({
    doit: true
  }),

  reducers: ({ actions, key }) => ({
    done: [false, PropTypes.bool, {
      [actions.doit]: (state, payload) => key === payload.key ? true : state
    }]
  })
})

// wrap it around a component
@dynamicLogic
class OnlyData extends Component {
  render () {
    return <div>OnlyData - id: {this.props.id}, done: {this.props.done ? 'true' : 'false'}</div>
  }
}

// create another helper that wants data from this dynamic logic store
@connect({
  actions: [
    dynamicLogic.withKey(props => props.id), [
      'doit'
    ]
  ],
  props: [
    dynamicLogic.withKey(props => props.id), [
      'done'
    ]
  ]
})
class DataWithButtion extends Component {
  render () {
    return (
      <div>
        DataWithButtion - id: {this.props.id}, done: {this.props.done ? 'true' : 'false'}
        <button onClick={this.actions.doit}>Do it!</button>
      </div>
    )
  }
}

// main demo
export default class Demo extends Component {
  render () {
    return (
      <div>
        <div style={{ border: '1px solid black', padding: 10 }}>
          <OnlyData id={123} />
          <DataWithButtion id={123} />
        </div>
        <br />
        <div style={{ border: '1px solid black', padding: 10 }}>
          <DataWithButtion id={999} />
          <OnlyData id={999} />
        </div>
      </div>
    )
  }
}
