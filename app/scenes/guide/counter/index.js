import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'
import { Link } from 'react-router-dom'

import Highlight from 'react-highlight'

import Counter from './counter'

import featuresLogic from '../features-logic'

const code = {
  full: require('raw-loader!./code/full.txt'),
  import: require('raw-loader!./code/import.txt'),
  actions: require('raw-loader!./code/actions.txt'),
  actions2: require('raw-loader!./code/actions-2.txt'),
  actions3: require('raw-loader!./code/actions-3.txt'),
  actionsInject: require('raw-loader!./code/actions-inject.txt'),
  reducers: require('raw-loader!./code/reducers.txt'),
  selectors: require('raw-loader!./code/selectors.txt'),
  selectors2: require('raw-loader!./code/selectors-2.txt'),
  noDecorators: require('raw-loader!./code/no-decorators.txt'),
  todoReducer: require('raw-loader!./code/todo-reducer.txt'),
  component: require('raw-loader!./code/component.txt')
}

@connect({
  actions: [
    featuresLogic, [
      'toggleFeature'
    ]
  ],
  props: [
    featuresLogic, [
      'features'
    ]
  ]
})
export default class CounterSingletonScene extends Component {
  render () {
    const { features } = this.props
    const { toggleFeature } = this.actions

    return (
      <div className='counter-singleton-scene'>
        <div className='description'>
          <h2>Example #1 - Counter</h2>
          <p>
            Let's start with the most basic of all examples: creating a counter that we can increment and decrement with the push of a button!
          </p>
          <p>
            The final result should look something like this:
          </p>
          <div className='demo'>
            <Counter />
          </div>
          <p>
            Click the buttons to make sure it works! And then let's begin!
          </p>
        </div>

        <div className='description'>
          <h2>1. Connecting @kea</h2>
          <p>
            Everything starts with importing <code>{'{ kea }'}</code> into your application:
          </p>
          <Highlight className='javascript'>{code.import}</Highlight>
          <p>
            ... and connecting it to your React component:
          </p>
          <Highlight className='javascript'>{code.component}</Highlight>

          <button onClick={() => toggleFeature('decorators')}>{'What is this @kea({})?'}</button>

          {features.decorators ? (
            <div className='extra-help'>
              <p>
                The <code>{'@kea({})'}</code> syntax is made possible by an experimental ESnext feature called <strong>decorators</strong>.
                You need to add the babel plugin <a href='https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy'>babel-plugin-transform-decorators-legacy</a> for
                them to work.
              </p>
              <p>
                In case decorators are not your cup of tea, you may just write your code like so:
              </p>
              <Highlight className='javascript'>{code.noDecorators}</Highlight>
              <p>
                ... and it will work just fine. For the rest of this guide we will assume you have decorators enabled.
              </p>
            </div>
          ) : null}
        </div>

        <div className='description'>
          <h2>2. Actions, reducers, selectors, oh my!</h2>
          <p>
            Kea is built as a wrapper <strong>on top of</strong> <a href='http://redux.js.org/'>redux</a>, <a href='https://github.com/reactjs/reselect'>reselect</a> and <a href='https://redux-saga.js.org/'>redux-saga</a>.
          </p>
          <p>
            We strongly recommend you understand the <a href='http://redux.js.org/'>basics of Redux</a> before continuing, as kea liberally borrows concepts from it.
          </p>

          <h3>2.1. Actions</h3>
          <p>
            The first thing we do is define our actions:
          </p>
          <Highlight className='javascript'>{code.actions}</Highlight>
          <p>
            An action in kea is simply a function that takes some arguments and returns a payload.
            In this case the functions take one argument (amount - the amount to increment with) and return an object with it as the only key/value.
          </p>
          <p>
            <button onClick={() => toggleFeature('actionDetails')}>{'What is happening in the background?'}</button>
          </p>

          {features.actionDetails ? (
            <div className='extra-help'>
              <p>
                We're using the ES6 double arrow shorthand for creating functions. What we're actually doing is this:
              </p>
              <Highlight className='javascript'>{code.actions2}</Highlight>
              <p>
                Also note the line:
              </p>
              <Highlight className='javascript'>{code.actionsInject}</Highlight>
              <p>
                ... inside the <code>render()</code> function.
              </p>
              <p>
                When wrapping kea onto your React component, we also inject a new object, <code>this.actions</code>, which automatically
                binds these action creators to redux's <code>dispatch()</code> and generates a unique <code>type</code> for them.
              </p>
              <p>
                Calling <code>this.actions.increment(1)</code> in your React component is the same as doing:
              </p>
              <Highlight className='javascript'>{code.actions3}</Highlight>
            </div>
          ) : null}

          <h3>2.2. Reducers</h3>
          <p>
            Now that we can dispatch actions, we need to define reducers. This is where your data lives.
          </p>
          <p>
            Reducers have an initial <code>state</code> and define actions which change this state. They may also include an optional <code>propType</code>.
          </p>
          <p>
            The latest state of all of the reducers will be passed to your component as props.
          </p>
          <p>
            Here's an example:
          </p>

          <Highlight className='javascript'>{code.reducers}</Highlight>
          <p>
            The most important thing to remember about reducers is that they must consist of <a href='http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/'>pure functions</a>.
          </p>
          <p>
            This means that your reducer must:
          </p>
          <ol>
            <li>always return the same output for the same input</li>
            <li>never change the input! (e.g. when adding something to an array, create and return a new array)</li>
            <li>never have any other side effects, such as network requests (we'll get to them later in this guide)</li>
          </ol>
          <p>
            If you understand how reducers work <a href='http://redux.js.org/docs/basics/Reducers.html'>in redux</a>, you should feel right at home here.
          </p>
          <p>
            <button onClick={() => toggleFeature('reducerDetails')}>{'Tell me more!'}</button>
          </p>

          {features.reducerDetails ? (
            <div className='extra-help'>
              <p>
                To see more complex reducers in action, look at <a href='https://github.com/keajs/kea-example/blob/master/app/scenes/examples/todos/logic.js'>the code for the todos example</a> (copied below).
              </p>
              <p>
                We store all the todos in one object, and whenever we need to update anything for any todo, we return a completely new object.
              </p>
              <p>
                We use ES6 <a href='https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment'>destructuring</a> and <a href='https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator'>object spread</a> features extensively.
              </p>
              <Highlight className='javascript'>{code.todoReducer}</Highlight>
            </div>
          ) : null}

          <h3>2.3. Selectors</h3>
          <p>
            The final piece of the puzzle is <code>selectors</code>.
          </p>
          <p>
            Selectors (via <a href='https://github.com/reactjs/reselect'>reselect</a>) take as input other selectors and return
            some output. Selectors are cached and are only updated if their input changes. You should use them to run complex
            logic that is too costly to run in <code>render()</code> every time.
          </p>
          <p>
            Adding selectors gives us this final piece of code:
          </p>
          <Highlight className='javascript'>{code.selectors}</Highlight>
          <p>
            The selectors are defined like this:
          </p>
          <Highlight className='javascript'>{code.selectors2}</Highlight>
          <p>
            Note that kea automatically creates selectors for all the reducers that you have defined, so you can use <code>selectors.reducerName</code> immediately as input.
          </p>
        </div>

        <div className='description'>
          <h2>Final Example</h2>
          <p>
            Adding all of this together and rendering two  <code>{'<Counter />'}</code>s gives us the following result:
          </p>
          <div className='demo'>
            <Counter />
            <br />
            <Counter />
          </div>
          <p>
            You might notice that something odd is happening:
            Incrementing one counter automatically increments the other.
            Is there something we can do about this?
          </p>
          <p>
            Yes. That's what the next example is all about: <Link to='/guide/counter-dynamic'>Dynamic counters</Link>
          </p>
          <h2>Full source</h2>
          <Highlight className='javascript'>{code.full}</Highlight>
          <p>
            Next page: <Link to='/guide/counter-dynamic'>Dynamic counters</Link>
          </p>
        </div>
      </div>
    )
  }
}

