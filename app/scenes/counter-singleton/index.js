import './styles.scss'

import React, { Component } from 'react'
import { kea } from 'kea'
import { push } from 'react-router-redux'

import Highlight from 'react-highlight'
import 'highlight.js/styles/railscasts.css'

import Counter from './counter'

const code = {
  full: require('raw-loader!./code/full.txt'),
  import: require('raw-loader!./code/import.txt'),
  actions: require('raw-loader!./code/actions.txt'),
  actions2: require('raw-loader!./code/actions-2.txt'),
  actions3: require('raw-loader!./code/actions-3.txt'),
  reducers: require('raw-loader!./code/reducers.txt'),
  reducers2: require('raw-loader!./code/reducers-2.txt'),
  selectors: require('raw-loader!./code/selectors.txt'),
  selectors2: require('raw-loader!./code/selectors-2.txt'),
  component: require('raw-loader!./code/component.txt')
}

@kea({}) // so we have dispatch
export default class CounterSingletonScene extends Component {
  handleRoute = (e) => {
    const { dispatch } = this.props
    const href = e.target.attributes.href.value

    e.preventDefault()
    dispatch(push(href))
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='counter-singleton-scene'>
        <div className='description'>
          <h2>Example #1 - Counter</h2>
          Let's start with the most basic of all examples: creating a counter that we can increment and decrement with the push of a button!
          <br /><br />
          The final result should look something like this:
          <div className='demo'>
            <Counter />
          </div>
          Click the buttons to make sure it works! And then let's begin!
        </div>

        <div className='description'>
          <h2>1. Connecting @kea</h2>
          Everything starts with importing <code>{'{ kea }'}</code> into your application:
          <Highlight className='javascript'>{code.import}</Highlight>
          ... and connecting it to your React component:
          <Highlight className='javascript'>{code.component}</Highlight>
        </div>

        <div className='description'>
          <h2>2. Actions, reducers, selectors, oh my!</h2>
          Kea is built as a wrapper <strong>on top of</strong> <a href='http://redux.js.org/'>redux</a>, <a href='https://github.com/reactjs/reselect'>reselect</a> and <a href='https://redux-saga.js.org/'>redux-saga</a>.
          <br /><br />
          We strongly recommend you understand the basics of redux before continuing, as kea liberally borrows concepts from it.

          <h3>2.1. Actions</h3>
          The first thing we do is define our actions:
          <Highlight className='javascript'>{code.actions}</Highlight>
          An action in kea is simply a function that takes some arguments and returns a payload.
          In this case the functions take one argument (amount - the amount to increment with) and return a hash with it as the only key/value.
          <br /><br />
          We're using the ES6 double arrow shortand for creating functions. What we're actually doing is this:
          <Highlight className='javascript'>{code.actions2}</Highlight>

          When wrapping kea onto your component, we also create a new object, <code>this.actions</code>, which automatically
          binds these actions to redux's <code>dispatch()</code> and adds accompanying types.
          <br /><br />
          Calling <code>this.actions.increment(1)</code> delegates to:
          <Highlight className='javascript'>{code.actions3}</Highlight>

          <h3>2.2. Reducers</h3>
          Now that we can dispatch redux actions, we need to define reducers.
          <Highlight className='javascript'>{code.reducers}</Highlight>

          If you understand redux's reducers, you should feel right at home here.
          <br /><br />
          The full definition of a reducer is something like this:

          <Highlight className='javascript'>{code.reducers2}</Highlight>

          <h3>2.3. Selectors</h3>
          The final piece of the puzzle is <code>selectors</code>.
          <br /><br />
          Selectors (via <a href='https://github.com/reactjs/reselect'>reselect</a>) take as input other selectors and return
          some output. Selectors are cached and are only updated if their input changes. You should use them to run complex
          logic that is too costly to be run in <code>render()</code> every time.
          <br /><br />
          Adding selectors gives us this final piece of code:
          <Highlight className='javascript'>{code.selectors}</Highlight>
          The selectors are defined like this:
          <Highlight className='javascript'>{code.selectors2}</Highlight>
          Note that kea automatically creates selectors for all the reducers that you have defined, so you can use them immediately as input.
        </div>

        <div className='description'>
          <h2>Final Example</h2>
          Adding all of this together and rendering two  <code>{'<Counter />'}</code>s gives us the following result:
          <div className='demo'>
            <Counter />
            <br />
            <Counter />
          </div>
          But you might notice that something is wrong. Incrementing one counter automatically increments the other.
          Is there something we can do about this?
          <br />
          <br />
          Yes. That's what the next example is all about: <a href='/counter-dynamic' onClick={this.handleRoute}>Dynamic counters</a>

          <h2>Full source</h2>
          <Highlight className='javascript'>{code.full}</Highlight>
        </div>
      </div>
    )
  }
}

