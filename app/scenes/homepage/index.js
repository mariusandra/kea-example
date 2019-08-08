import './styles.scss'

import React, { Component } from 'react'
import { kea } from 'kea'
import { Link } from 'react-router-dom'

import CodeStyleHighlight from '~/components/tags/code-style-highlight'
import Highlight from '~/components/tags/highlight'

import logo from '~/assets/logo.svg'

import Slider from '../guide/sliders/slider'
import Counter from '../guide/counter/counter'
import Countdown from '../guide/countdown/countdown'
import Github from '../guide/github/github'
import ThunkCounter from '../guide/thunk/thunk-counter'
import ConnectedToggle from '../guide/connected/connected-toggle'

const code = {
  counter: {
    decorator: require('raw-loader!./code/counter-decorator.txt'),
    hoc: require('raw-loader!./code/counter-hoc.txt'),
    functional: require('raw-loader!./code/counter-functional.txt'),
    hooks: require('raw-loader!./code/counter-hooks.txt'),
  },
  thunk: {
    decorator: require('raw-loader!./code/thunk-decorator.txt'),
    hoc: require('raw-loader!./code/thunk-hoc.txt'),
    functional: require('raw-loader!./code/thunk-functional.txt'),
    hooks: require('raw-loader!./code/thunk-hooks.txt'),
  },
  slider: {
    decorator: require('raw-loader!./code/slider-decorator.txt'),
    hoc: require('raw-loader!./code/slider-hoc.txt'),
    functional: require('raw-loader!./code/slider-functional.txt'),
    hooks: require('raw-loader!./code/slider-hooks.txt'),
  },
  github: {
    decorator: require('raw-loader!./code/github-decorator.txt'),
    hoc: require('raw-loader!./code/github-hoc.txt'),
    functional: require('raw-loader!./code/github-functional.txt'),
    hooks: require('raw-loader!./code/github-hooks.txt'),
  },
  countdown: {
    decorator: require('raw-loader!./code/countdown-decorator.txt'),
    hoc: require('raw-loader!./code/countdown-hoc.txt'),
    functional: require('raw-loader!./code/countdown-functional.txt'),
    hooks: require('raw-loader!./code/countdown-hooks.txt'),
  },
  connected: {
    decorator: require('raw-loader!./code/connected-decorator.txt'),
    hoc: require('raw-loader!./code/connected-hoc.txt'),
    functional: require('raw-loader!./code/connected-functional.txt'),
    hooks: require('raw-loader!./code/connected-hooks.txt'),
  },
  how: {
    kea: require('raw-loader!./code/how-kea.txt'),
    logic: require('raw-loader!./code/how-logic.txt'),
    counter: require('raw-loader!./code/how-counter.txt'),
    wrappedComp: require('raw-loader!./code/how-wrapped-comp.txt'),
    wrappedFunc: require('raw-loader!./code/how-wrapped-func.txt'),
    wrappedHook: require('raw-loader!./code/how-wrapped-hook.txt'),
    decorator: require('raw-loader!./code/how-decorator.txt'),
    connect: require('raw-loader!./code/how-connect.txt'),
    connectKea: require('raw-loader!./code/how-connect-kea.txt'),
    listeners: require('raw-loader!./code/how-listeners.txt'),
    thunks: require('raw-loader!./code/how-thunks.txt'),
    sagas: require('raw-loader!./code/how-sagas.txt')
  }
}

@kea({})
export default class HomepageScene extends Component {
  render () {
    return (
      <div className='homepage-scene'>
        <div className='landing'>
          <div className='intro'>
            <img src={logo} alt='' />
            <div className='text'>
              <h1>Kea</h1>
              <strong>Data Layer for React. Powered by Redux.</strong>
              <div className='links'>
                <Link to='/guide/installation'>Get started</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href='https://www.github.com/keajs/kea'>Fork on GitHub</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <iframe src='https://ghbtns.com/github-btn.html?user=keajs&repo=kea&type=star&count=true' frameBorder='0' scrolling='0' width='100px' height='20px' style={{verticalAlign: 'sub'}} />
              </div>
            </div>
          </div>
        </div>
        <h2>What is Kea?</h2>
        <div className='description'>
          <p>
            Kea is a <em>batteries-included</em> and <em>battle-tested</em> high level abstraction between <nobr>React and Redux</nobr>.
          </p>
        </div>
        <h2>How does it work?</h2>
        <div className='split'>
          <div className='wide-description'>
            <p>
              In Kea, you create <code>logic</code> from input with the <code>{'kea()'}</code> function.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.kea}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              Each logic contains <code>actions</code>, <code>reducers</code> and <code>selectors</code>.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.logic}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              They work just like in Redux:
            </p>
            <ul>
              <li><strong>Actions</strong> are functions which take an input and return a <code>payload</code></li>
              <li><strong>Reducers</strong> take actions as input and return <code>newState = oldState + payload</code></li>
              <li><strong>Selectors</strong> take the input of one or more reducers and return a combined output</li>
            </ul>
            <p>
              If this is new to you, see <a href='https://medium.com/gitconnected/redux-logic-flow-crazy-simple-summary-35416eadabd8'>here</a> for a nice overview of how Redux works.
            </p>
            <p>
              You can only write <code>actions</code>, <code>reducers</code> and <code>selectors</code> as pure functions:
            </p>
            <ul>
              <li>the same input always gives the same output</li>
              <li>no side effects (API calls, etc)</li>
              <li>values are immutable (unless you enable immer)</li>
            </ul>
            <p>
              For example, to build a simple counter:
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.counter}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              To access the actions and the data from React you either:
            </p>
            <p>
              1) Use hooks:
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.wrappedHook}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              2) Wrap it around your functional component:
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.wrappedFunc}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              3) Wrap it around your Class component:
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.wrappedComp}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              4) Use a (legacy) decorator:
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.decorator}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              5) Wrap your components with <code>connect()</code> to fetch props and actions from multiple logics.
            </p>
            <p>
              This step is not needed if you use hooks.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.connect}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              You can also connect logic with one another, for example to:
            </p>
            <ul>
              <li>use actions from one logic in the reducer of another.</li>
              <li>combine reducers from multiple logic into one selector.</li>
            </ul>
            <p>
              Also notice that we added PropTypes in this example. 
              They will be automatically injected into your wrapped React components if defined.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.connectKea}</Highlight>
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              Eventually you'll need side effects. For example to talk to your API. 
              Then you have a choice.
            </p>
            <p>
              1) You can use <Link to='/effects/listener'>listeners</Link> via kea-listeners:
            </p>
            <p>
              Listeners are functions that run after the action they are listening to is dispatched.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.listeners}</Highlight>
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              2) You can use <Link to='/effects/thunk'>thunks</Link> via kea-thunk &amp; redux-thunk.
            </p>
            <p>
              Thunks are functions that can be called like actions, but instead of
              dispatching they run custom code.
            </p>
            <p>
              Please note that since thunks are not real actions, you can't use them in reducers.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.thunks}</Highlight>
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              3) You can use <Link to='/effects/saga'>sagas</Link> via kea-saga &amp; redux-saga.
            </p>
            <p>
              Sagas enable really powerful effects, but significantly increse your bundle size and have a steeper learning curve.
            </p>
            <p>
              In addition to <code>takeEvery</code>, which works like kea-listeners, sagas give you
              task cancellation (not possible with promises), race conditions and lots of other goodies. 
              You can write complicated control flow routines using simple sequential code.
            </p>
            <p>
              Read the guide for more.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.sagas}</Highlight>
          </div>
        </div>

        <div className='description'>
          <p>
            Check out the examples below or <Link to='/guide/installation'>start reading the guide</Link> for more.
          </p>
          <p>
            If you're already using Redux in your apps, it's <Link to='/guide/migration'>really easy to migrate</Link>.
          </p>
        </div>

        <h2>What makes it different?</h2>
        <div className='description'>
          <p>
            Kea is a <em>batteries-included</em> and <em>battle-tested</em> High level abstraction between <nobr>React and Redux</nobr>.
          </p>
          <ul>
            <li>
              <strong>100% Redux</strong>:
              Built on top of <a href='http://redux.js.org/'>redux</a> and <a href='https://github.com/reactjs/reselect'>reselect</a>.
            </li>
            <li>
              <strong>Side effect agnostic</strong>:
              Use <Link to='/effects/thunk'>thunks</Link> with redux-thunk, <Link to='/effects/saga'>sagas</Link> with redux-saga or listeners with kea-listeners.
            </li>
            <li>
              <strong>Modern</strong>:
              Store your data outside of components, use React hooks or wrapper functions to access it.
            </li>
            {/* <li>
              <strong>Hookable</strong>:
              Write logic alongside React components. Pull in data with hooks or wrap
            </li>
            <li>
              <strong>Wrappable</strong>:
              Write logic alongside React components. Easier than <code>setState</code> and perfect for small components.
            </li>
            <li>
              <strong>Connectable</strong>:
              Pull in data and actions through ES6+ <Link to='/guide/connected'>imports</Link>. Built for large and ambitious apps.
            </li> */}
            <li>
              <strong>Extendable</strong>:
              Extend the core functionality and abstract repetitive code with easy-to-write plugins.
            </li>
            <li>
              <strong>Code-splittable</strong>:
              Reducers mount automatically when requested by components. Forget manually maintaining a reducer tree.
            </li>
            <li>
              <strong>No boilerplate</strong>:
              Forget <code>mapStateToProps</code> and redundant constants. Only write code that matters!
            </li>
            <li>
              <strong>No new concepts</strong>:
              Use actions, reducers and selectors.
              Gradually migrate <Link to='/guide/migration'>existing Redux applications</Link>.
            </li>
          </ul>
          <p>
            Compare it to other state management libraries: <a href='https://medium.com/@mariusandra/kea-vs-setstate-redux-mobx-dva-jumpstate-apollo-etc-4aa26ea11d02'>Kea vs setState, Redux, Mobx, Dva, JumpState, Apollo, etc.</a>
          </p>
        </div>


        <h2>Simple counter</h2>
        <div className='split'>
          <div className='code'>
            <CodeStyleHighlight language='javascript' code={code.counter} />
          </div>
          <div className='description'>
            <div className='demo'>
              <Counter />
            </div>
            <br />
            Read the guide: <Link to='/guide/counter'>Counter</Link>
          </div>
        </div>

        <h2>Delayed Counter <small>with <Link to='/effects/thunk'>thunks</Link></small></h2>
        <div className='split'>
          <div className='code'>
            <CodeStyleHighlight language='javascript' code={code.thunk} />
          </div>
          <div className='description'>
            <div className='demo'>
              <ThunkCounter />
            </div>
            <p>
              Read the docs: <Link to='/effects/thunk'>kea-thunk</Link>
            </p>
          </div>
        </div>

        <h2>Slider <small>with <Link to='/effects/saga'>sagas</Link></small></h2>
        <div className='split'>
          <div className='code'>
            <CodeStyleHighlight language='javascript' code={code.slider} />
          </div>
          <div className='description'>
            <div className='demo'>
              <Slider id={999} />
            </div>
            <br />
            Read the guide: <Link to='/guide/sliders'>Sliders</Link>
          </div>
        </div>

        <h2>Github <small>with <Link to='/effects/saga'>sagas</Link></small></h2>
        <div className='split'>
          <div className='code'>
            <CodeStyleHighlight language='javascript' code={code.github} />
          </div>
          <div className='description'>
            <div className='demo'>
              <Github />
            </div>
            <br />
            Read the guide: <Link to='/guide/github'>Github</Link>
          </div>
        </div>

        <h2>Debounced countdown <small>with <Link to='/effects/saga'>sagas</Link></small></h2>
        <div className='split'>
          <div className='code'>
            <CodeStyleHighlight language='javascript' code={code.countdown} />
          </div>
          <div className='description'>
            <div className='demo'>
              <Countdown />
            </div>
            <br />
          </div>
        </div>

        <h2>Connected logic</h2>
        <div className='split'>
          <div className='code'>
            <CodeStyleHighlight language='javascript' code={code.connected} />
          </div>
          <div className='description'>
            <div className='demo'>
              <ConnectedToggle />
            </div>
            <br />
            Read the guide: <Link to='/guide/connected'>Connected</Link>
          </div>
        </div>
      </div>
    )
  }
}

