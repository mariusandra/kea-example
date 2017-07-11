import './styles.scss'

import React, { Component, PropTypes } from 'react'
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
  selectors: require('raw-loader!./code/selectors.txt'),
  selectors2: require('raw-loader!./code/selectors-2.txt'),
  noDecorators: require('raw-loader!./code/no-decorators.txt'),
  todoReducer: require('raw-loader!./code/todo-reducer.txt'),
  component: require('raw-loader!./code/component.txt')
}

@kea({
  actions: () => ({
    toggleFeature: (feature) => ({ feature })
  }),
  reducers: ({ actions }) => ({
    features: [{}, PropTypes.object, {
      [actions.toggleFeature]: (state, payload) => {
        const { feature } = payload
        return {
          ...state,
          [feature]: !state[feature]
        }
      }
    }]
  })
})
export default class CounterSingletonScene extends Component {
  handleRoute = (e) => {
    const { dispatch } = this.props
    const href = e.target.attributes.href.value

    e.preventDefault()
    dispatch(push(href))
    window.scrollTo(0, 0)
  }

  render () {
    const { features } = this.props
    const { toggleFeature } = this.actions

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

          <button onClick={() => toggleFeature('decorators')}>{'What is this @kea({})?'}</button>

          {features.decorators ? (
            <div className='extra-help'>
              The <code>{'@kea({})'}</code> syntax is made possible by an experimental ESnext feature called <strong>decorators</strong>.
              You need to add the babel plugin <a href='https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy'>babel-plugin-transform-decorators-legacy</a> for
              them to work.
              <br /><br />
              In case decorators are not your cup of tea, you may just write your code like so:
              <Highlight className='javascript'>{code.noDecorators}</Highlight>
            </div>
          ) : null}
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
          In this case the functions take one argument (amount - the amount to increment with) and return an object with it as the only key/value.
          <br /><br />

          <button onClick={() => toggleFeature('actionDetails')}>{'What is happening in the background?'}</button>

          {features.actionDetails ? (
            <div className='extra-help'>
              We're using the ES6 double arrow shortand for creating functions. What we're actually doing is this:
              <Highlight className='javascript'>{code.actions2}</Highlight>

              When wrapping kea onto your component, we also create a new object, <code>this.actions</code>, which automatically
              binds these action creators to redux's <code>dispatch()</code> and generates a unique <code>type</code> for them.
              <br /><br />
              Calling <code>this.actions.increment(1)</code> is the same as doing:
              <Highlight className='javascript'>{code.actions3}</Highlight>
            </div>
          ) : null}

          <h3>2.2. Reducers</h3>
          Now that we can dispatch actions, we need to define reducers. This is where your data lives.
          <br /><br />
          Reducers have an initial <code>state</code> and define actions which change this state. They may also include an optional <code>propType</code>. Here's an example:

          <Highlight className='javascript'>{code.reducers}</Highlight>

          The most important thing to remember about reducers is that they must consist of <a href='http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/'>pure functions</a>.
          <br /><br />
          This means that your reducer must:<br />
          <ol>
            <li>always return the same output for the same input</li>
            <li>never change the input! (e.g. when adding something to an array, create and return a new array)</li>
            <li>never have any other side effects, such as network requests (we'll get to them later in this guide)</li>
          </ol>
          If you understand how reducers work <a href='http://redux.js.org/docs/basics/Reducers.html'>in redux</a>, you should feel right at home here.
          <br /><br />

          <button onClick={() => toggleFeature('reducerDetails')}>{'Tell me more!'}</button>

          {features.reducerDetails ? (
            <div className='extra-help'>
              To see more complex reducers in action, look at <a href='https://github.com/mariusandra/kea-example/blob/master/app/scenes/todos/logic.js'>the code for the todos example</a> (copied below).
              <br /><br />
              We store all the todos in one object, and whenever we need to update anything for any todo, we return a completely new object.
              <br /><br />
              We use ES6 <a href='https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment'>destructuring</a> and <a href='https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator'>object spread</a> features extensively.
              <Highlight className='javascript'>{code.todoReducer}</Highlight>
            </div>
          ) : null}

          <h3>2.3. Selectors</h3>
          The final piece of the puzzle is <code>selectors</code>.
          <br /><br />
          Selectors (via <a href='https://github.com/reactjs/reselect'>reselect</a>) take as input other selectors and return
          some output. Selectors are cached and are only updated if their input changes. You should use them to run complex
          logic that is too costly to run in <code>render()</code> every time.
          <br /><br />
          Adding selectors gives us this final piece of code:
          <Highlight className='javascript'>{code.selectors}</Highlight>
          The selectors are defined like this:
          <Highlight className='javascript'>{code.selectors2}</Highlight>
          Note that kea automatically creates selectors for all the reducers that you have defined, so you can use <code>selectors.reducerName</code> immediately as input.
        </div>

        <div className='description'>
          <h2>Final Example</h2>
          Adding all of this together and rendering two  <code>{'<Counter />'}</code>s gives us the following result:
          <div className='demo'>
            <Counter />
            <br />
            <Counter />
          </div>
          You might notice that something odd is happening:
          Incrementing one counter automatically increments the other.
          Is there something we can do about this?
          <br />
          <br />
          Yes. That's what the next example is all about: <a href='/counter-dynamic' onClick={this.handleRoute}>Dynamic counters</a>

          <h2>Full source</h2>
          <Highlight className='javascript'>{code.full}</Highlight>
          <a href='/counter-dynamic' onClick={this.handleRoute}>Next demo</a>
        </div>
      </div>
    )
  }
}

