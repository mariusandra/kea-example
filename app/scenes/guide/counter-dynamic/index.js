import './styles.scss'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from 'react-highlight'

import Counter from './counter'

const code = {
  full: require('raw-loader!./code/full.txt'),
  keyPath: require('raw-loader!./code/key-path.txt'),
  reducers: require('raw-loader!./code/reducers.txt')
}

export default class CounterDynamicScene extends Component {
  render () {
    return (
      <div className='counter-dynamic-scene'>
        <div className='description'>
          <h2>Example #2 - Dynamic Counter</h2>
          <p>
            This example demonstrates dynamically created actions and reducers.
          </p>
          <p>
            As we saw in the <Link to='/guide/counter'>previous example</Link>, if you render multiple instances of the
            same connected component, they will share the state.
          </p>
          <p>
            The guide below shows how to create multiple instances of one component with separate states:
          </p>
          <div className='demo'>
            <Counter id={1} />
            <br />
            <Counter id={2} />
          </div>

          <h2>1. Key and path</h2>
          <p>
            The code for this example is almost the same as for the <Link to='/guide/counter'>previous counter</Link>.
          </p>
          <p>
            The big difference is that we must manually tell our component instances where to store their data:
          </p>

          <Highlight className='javascript'>{code.keyPath}</Highlight>
          <p>
            The <code>key</code> function receives your component instance's <code>props</code> as input and must return a key that's unique for the
            life of the component. Usually it's something like <nobr><code>key = (props) => props.id</code></nobr> if your component is
            rendered as <nobr><code>{'<Component id=\'somethingUnique\' />'}</code></nobr>
          </p>
          <p>
            The <em>optional</em> <code>path</code> function specifies where the data for your component will live in Redux. It takes just one argument,
            the <code>key</code> from the previous step.
          </p>
          <p>
            Note! You may also use <code>path</code> with non-dynamic components (like the <Link to='/guide/counter'>previous example</Link>) if you wish to specify
            where they will store their data.
          </p>
          <p>
            It makes your redux tree more readable and helps with debugging. In that case you have to skip the <code>key</code> line.
          </p>

          <h2>2. Limiting the reducers</h2>
          <p>
            There's one last thing you need to do.
          </p>
          <p>
            While the reducers are unique for each component instance, the actions are shared.
          </p>
          <p>
            No matter which instance of your component triggers the action, all the reducers will receive it.
            So if counter #1 dispatches the <code>increment</code> action, counter #2 will also receive it.
          </p>
          <p>
            In order to prevent this, you must check for the key in your reducers, like so:
          </p>
          <Highlight className='javascript'>{code.reducers}</Highlight>
          <p>
            This way you can choose if your actions are processed by each instance of the component or by all instances simultaneously.
          </p>
        </div>

        <div className='description'>
          <h2>Final Example</h2>
          <p>
            While the following counters have separate data, they are still connected to the counters on top of this page, as they share the same <code>id</code>s. You can mix and match!
          </p>
          <div className='demo'>
            <Counter id={1} />
            <br />
            <Counter id={2} />
          </div>
          <p>
            Next, check out the <Link to='/guide/sliders'>sliders</Link> demo to see how to add side effects to your code.
          </p>
          <h2>Full source</h2>
          <Highlight className='javascript'>{code.full}</Highlight>
          <p>
            Next page: <Link to='/guide/sliders'>Sliders</Link>
          </p>
        </div>
      </div>
    )
  }
}

