import './styles.scss'

import React, { Component } from 'react'
import { kea } from 'kea'
import { push } from 'react-router-redux'

import Highlight from 'react-highlight'
import 'highlight.js/styles/railscasts.css'

import Counter from './counter'

const code = {
  full: require('raw-loader!./code/full.txt'),
  keyPath: require('raw-loader!./code/key-path.txt'),
  reducers: require('raw-loader!./code/reducers.txt')
}

@kea({}) // so we get dispatch
export default class CounterDynamicScene extends Component {
  handleRoute = (e) => {
    const { dispatch } = this.props
    const href = e.target.attributes.href.value

    e.preventDefault()
    dispatch(push(href))
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='counter-dynamic-scene'>
        <div className='description'>
          <h2>Example #2 - Dynamic Counter</h2>
          This example demonstrates dynamically created actions and reducers.
          <br /><br />
          Dynamically in this context means <em>on mount</em>. In short, this allows you to create multiple instances of the component with separate state.

          <div className='demo'>
            <Counter id={1} />
            <br />
            <Counter id={2} />
          </div>

          <h2>1. Key and path</h2>
          The code for this example is almost the same as for the <a href='/guide/counter' onClick={this.handleRoute}>singleton counter</a>.
          <br /><br />
          The big difference is that we must manually tell our component instances where to store their data:

          <Highlight className='javascript'>{code.keyPath}</Highlight>

          The <code>key</code> function receives your component's props as input and must return a key that's unique for the
          life of the component. Usually it's something like <code>key = (props) => props.id</code> if your component is rendered as <code>{'<Component id=\'somethingUnique\' />'}</code>
          <br />
          <br />
          The <code>path</code> specifies where the data for your component lives in redux. It takes just one argument,
          the <code>key</code> from the previous step.
          <br />
          <br />
          Note! You may also use <code>path</code> with singleton components (like the <a href='/guide/counter' onClick={this.handleRoute}>previous example</a>) if you wish to specify
          where they will store their data.
          <br /><br />
          It makes your redux tree more readable and helps with debugging. In that case you must skip the <code>key</code> line.

          <h2>2. Limiting the reducers</h2>
          There's one last thing you need to do.
          <br /><br />
          No matter which instance of your component triggers the action, all the reducers will receive it.
          So if counter #1 dispatches the <code>increment</code> action, counter #2 will also receive it.
          <br /><br />
          In order to prevent this, you must check for the key in your reducers, like so:

          <Highlight className='javascript'>{code.reducers}</Highlight>

          And we're done!
        </div>

        <div className='description'>
          <h2>Final Example</h2>

          While the following counters have separate data, they are still connected to the counters on top of this page, as they share the same <code>id</code>s. You can mix and match!

          <div className='demo'>
            <Counter id={1} />
            <br />
            <Counter id={2} />
          </div>

          Next, check out the <a href='/guide/sliders' onClick={this.handleRoute}>sliders</a> demo to see how to add side effects to your code.

          <h2>Full source</h2>

          <Highlight className='javascript'>{code.full}</Highlight>

          <a href='/guide/sliders' onClick={this.handleRoute}>Next demo</a>
        </div>
      </div>
    )
  }
}

