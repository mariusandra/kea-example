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
  },
  thunk: {
    decorator: require('raw-loader!./code/thunk-decorator.txt'),
    hoc: require('raw-loader!./code/thunk-hoc.txt'),
    functional: require('raw-loader!./code/thunk-functional.txt'),
  },
  slider: {
    decorator: require('raw-loader!./code/slider-decorator.txt'),
    hoc: require('raw-loader!./code/slider-hoc.txt'),
    functional: require('raw-loader!./code/slider-functional.txt'),
  },
  github: {
    decorator: require('raw-loader!./code/github-decorator.txt'),
    hoc: require('raw-loader!./code/github-hoc.txt'),
    functional: require('raw-loader!./code/github-functional.txt'),
  },
  countdown: {
    decorator: require('raw-loader!./code/countdown-decorator.txt'),
    hoc: require('raw-loader!./code/countdown-hoc.txt'),
    functional: require('raw-loader!./code/countdown-functional.txt'),
  },
  connected: {
    decorator: require('raw-loader!./code/connected-decorator.txt'),
    hoc: require('raw-loader!./code/connected-hoc.txt'),
    functional: require('raw-loader!./code/connected-functional.txt'),
  },
  how: {
    logic: require('raw-loader!./code/how-logic.txt'),
    counter: require('raw-loader!./code/how-counter.txt'),
    wrapped: require('raw-loader!./code/how-wrapped.txt'),
    decorator: require('raw-loader!./code/how-decorator.txt'),
    connect: require('raw-loader!./code/how-connect.txt'),
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
              <strong>High level abstraction between <nobr>React and Redux</nobr></strong>
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
            Kea is a state management library for React.
            It <em>empowers</em> Redux, making it as easy to use as <code>setState</code> while
            retaining composability and improving code clarity.
          </p>
          <ul>
            <li>
              <strong>100% Redux</strong>:
              Built on top of <a href='http://redux.js.org/'>redux</a> and <a href='https://github.com/reactjs/reselect'>reselect</a>.
            </li>
            <li>
              <strong>Side effect agnostic</strong>:
              use <Link to='/effects/thunk'>thunks</Link> with redux-thunk, <Link to='/effects/saga'>sagas</Link> with redux-saga or (soon!) <a href='https://github.com/keajs/kea/issues/40'>epics</a> with redux-observable.
            </li>
            <li>
              <strong>Wrappable</strong>:
              Write logic alongside React components. Easier than <code>setState</code> and perfect for small components.
            </li>
            <li>
              <strong>Connectable</strong>:
              Pull in data and actions through ES6+ <Link to='/guide/connected'>imports</Link>. Built for large and ambitious apps.
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
        <h2>Thank you to our sponsors!</h2>
        <div className='description'>
          <p>
            <a href='https://opencollective.com/kea/sponsor/0/website' target='_blank'><img src='https://opencollective.com/kea/sponsor/0/avatar.svg' /></a>
            <a href='https://opencollective.com/kea/sponsor/1/website' target='_blank'><img src='https://opencollective.com/kea/sponsor/1/avatar.svg' /></a>
            <a href='https://opencollective.com/kea/sponsor/2/website' target='_blank'><img src='https://opencollective.com/kea/sponsor/2/avatar.svg' /></a>
          </p>
          <p>
            <a href='https://opencollective.com/kea#sponsor'>Support this project by becoming a sponsor</a>.
          </p>
          <p>
            Your logo will show up here and in the <a href='https://github.com/keajs/kea' target='_blank'>README</a> with a link to your website.
          </p>
        </div>
        <h2>How does it work?</h2>
        <div className='split'>
          <div className='wide-description'>
            <p>
              In Kea, you define logic stores with the <code>{'kea({})'}</code> function.
            </p>
            <p>
              Each logic store contains <code>actions</code>, <code>reducers</code> and <code>selectors</code>.
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
              <li>They are all pure functions (no side effects, same input = same output)</li>
              <li><strong>Actions</strong> are functions which take an input and return a payload</li>
              <li><strong>Reducers</strong> take actions as input and return new_data = old_data + payload</li>
              <li><strong>Selectors</strong> take the input of multiple reducers and return a combined output</li>
            </ul>
            <p>
              See here for a nice overview of how Redux
              works: <a href='https://medium.com/gitconnected/redux-logic-flow-crazy-simple-summary-35416eadabd8'>Redux Logic Flow — Crazy Simple Summary</a>
            </p>
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
              The logic stores can either
            </p>
            <p>
              1) be wrapped around your component or pure function:
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.wrapped}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              2) used as decorators:
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.decorator}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              or
            </p>
            <p>
              3) imported and then connected to.
            </p>
            <p>
              You can also connect logic stores together, to e.g:
            </p>
            <ul>
              <li>... use actions from one logic store in the reducer of another.</li>
              <li>... combine reducers from multiple logic stores into one selector.</li>
            </ul>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.connect}</Highlight>
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              Eventually you'll need side effects. Then you have a choice.
            </p>
            <p>
              You can use simple <Link to='/effects/thunk'>thunks</Link> via redux-thunk:
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.thunks}</Highlight>
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              .... or the more powerful <Link to='/effects/saga'>sagas</Link> via redux-saga.
            </p>
            <p>
              (coming soon: <a href='https://github.com/keajs/kea/issues/40'>support for epics</a> with redux-observable)
            </p>
            <p>
              Check out the examples below or <Link to='/guide/installation'>start reading the guide</Link> for more.
            </p>
            <p>
              If you're already using Redux in your apps, it's <Link to='/guide/migration'>really easy to migrate</Link>.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.sagas}</Highlight>
          </div>
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
            <p>
              Play with it in <a href='https://www.webpackbin.com/bins/-KxSPoMw6q-_lcXY8guq' target='_blank'>WebpackBin</a>
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

        <h2>Connected logic stores</h2>
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

