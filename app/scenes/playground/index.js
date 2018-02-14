import React, { Component } from 'react'
import { kea, connect } from 'kea'
import PropTypes from 'prop-types'

// create a dynamic logic store
const mainLogic = kea({
  propTypes: {
    id: PropTypes.number.isRequired
  },
  key: (props) => props.id,
  path: (key) => ['scenes', 'main', key],
  actions: () => ({
    doit: true
  }),
  reducers: ({ actions, key }) => ({
    done: [false, PropTypes.bool, {
      [actions.doit]: (state, payload) => payload.key === key ? true : state
    }]
  }),
  selectors: ({ selectors }) => ({
    isDone: [
      () => [selectors.done],
      (done) => done,
      PropTypes.bool
    ]
  })
})

// wrap it around a component
@mainLogic
class Form extends Component {
  render () {
    return <div>id: {this.props.id}, done: {this.props.done ? 'true' : 'false'} <button onClick={this.actions.doit}>doit</button></div>
  }
}

// create another helper that wants data from this dynamic logic store
@connect({
  key: (props) => props.id,
  actions: [
    mainLogic.withKey(props => props.id), [
      'doit'
    ]
  ],
  props: [
    mainLogic.withKey(props => props.id), [
      'done',
      'isDone'
    ]
  ],
  propTypes: {
    id: PropTypes.number.isRequired
  }
})
class FormHelper extends Component {
  render () {
    return (
      <div>
        <p>helper id: {this.props.id}, done: {this.props.done ? 'true' : 'false'}, isDone: {this.props.isDone ? 'true' : 'false'}</p>
        <p><button onClick={this.actions.doit}>Do it!</button></p>
      </div>
    )
  }
}

// main demo
export default class Demo extends Component {
  render () {
    return (
      <div>
        <div>
          <Form id={123} />
          <FormHelper id={123} />
        </div>
        <div>
          <Form id={999} />
          <FormHelper id={999} />
        </div>
      </div>
    )
  }
}
