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
    decoratorInline: require('raw-loader!./code/how-decorator-inline.txt'),
    connect: require('raw-loader!./code/how-connect.txt'),
    connectKeaActions: require('raw-loader!./code/how-connect-kea-actions.txt'),
    connectKeaValues: require('raw-loader!./code/how-connect-kea-values.txt'),
    listeners: require('raw-loader!./code/how-listeners.txt'),
    thunks: require('raw-loader!./code/how-thunks.txt'),
    sagas: require('raw-loader!./code/how-sagas.txt')
  }
}

@kea({
  actions: () => ({
    setView: (key, id) => ({ key, id })
  }),
  reducers: ({ actions }) => ({
    view: [{ react: 1, connectKea: 1, effects: 1 }, {
      [actions.setView]: (state, payload) => ({ ...state, [payload.key]: payload.id })
    }]
  })
})
export default class HomepageScene extends Component {
  renderViewLink (key, id, text) {
    const { view } = this.props
    const { setView } = this.actions

    return (
      <a href='#' onClick={(e) => { e.preventDefault(); setView(key, id) }} style={{ fontWeight: view[key] === id ? 'bold' : 'normal' }}>{text}</a>
    )
  }

  render () {
    const { view } = this.props
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
        <div className='description'>
          <p>This documentation is for the 1.0 release. To see docs for 0.28, click here.</p>
        </div>
        <h2>Why Kea?</h2>
        <div className='description'>
          <p>
            As your app grows beyond a few components, there comes a point when
            you need to get serious about handling your data.
          </p>
          <p>
            React's hooks and context APIs can ger you pretty far, but not yet all the way.
            Eventually you will hit a wall and must implement a proper state management solution... like Redux, Mobx... or Kea.
          </p>
          <p>
            
          </p>
        </div>
        <h2>What is Kea?</h2>
        <div className='description'>
          <p>
            Kea is a <em>batteries-included</em> and <em>battle-tested</em> high level abstraction between <nobr>React and Redux</nobr>.
          </p>
          <p>
            When you have high level data that must be accessed from several independent components, store it in a logic.
            Store the operations to manage it in the logic as well
            Connect to this data from react components or other logics.
            Build a data layer to complements react's render tree
          </p>
          <p>
            As your app grows to contain data which must be 
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
              They must all be pure functions:
            </p>
            <ul>
              <li>the same input always gives the same output</li>
              <li>no side effects (API calls, etc)</li>
              <li>values are immutable (unless you enable immer)</li>
            </ul>
            <p>
              If this is new to you, see <a href='https://medium.com/gitconnected/redux-logic-flow-crazy-simple-summary-35416eadabd8'>here</a> for a nice overview of how Redux works.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.counter}</Highlight>
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              To access these actions and values from React you either:
            </p>
            <ol>
              <li>
                {this.renderViewLink('react', 1, <span>Use hooks</span>)}
              </li>
              <li>
                {this.renderViewLink('react', 2, <span>Wrap it around your functional component</span>)}
              </li>
              <li>
                {this.renderViewLink('react', 3, <span>Wrap it around your Class component</span>)}
              </li>
              <li>
                {this.renderViewLink('react', 4, <span>Use a (legacy) decorator</span>)}
              </li>
              <li>
                {this.renderViewLink('react', 5, <span>Use an inline (legacy) decorator</span>)}
              </li>
              <li>
                {this.renderViewLink('react', 6, <span>Use <code>connect()</code> to wrap actions and values from multiple logic around one component.</span>)}
              </li>
            </ol>
          </div>
          <div className='code'>
            {view.react === 1 ? <Highlight className='javascript'>{code.how.wrappedHook}</Highlight> : null}
            {view.react === 2 ? <Highlight className='javascript'>{code.how.wrappedFunc}</Highlight> : null}
            {view.react === 3 ? <Highlight className='javascript'>{code.how.wrappedComp}</Highlight> : null}
            {view.react === 4 ? <Highlight className='javascript'>{code.how.decorator}</Highlight> : null}
            {view.react === 5 ? <Highlight className='javascript'>{code.how.decoratorInline}</Highlight> : null}
            {view.react === 6 ? <Highlight className='javascript'>{code.how.connect}</Highlight> : null}
          </div>
        </div>
        <div className='split'>
          <div className='wide-description'>
            <p>
              You can also connect logic with one another, for example to:
            </p>
            <ol>
              <li>{this.renderViewLink('connectKea', 1, <span>Use actions from one logic in the reducer of another</span>)}</li>
              <li>{this.renderViewLink('connectKea', 2, <span>Use values from one logic in the selector of another</span>)}</li>
            </ol>
          </div>
          <div className='code'>
            {view.connectKea === 1 ? <Highlight className='javascript'>{code.how.connectKeaActions}</Highlight> : null}
            {view.connectKea === 2 ? <Highlight className='javascript'>{code.how.connectKeaValues}</Highlight> : null}
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              Eventually you'll need side effects. For example to talk to your API. 
              Then you have a choice:
            </p>
            <ol>
              <li>
                <p>
                  {this.renderViewLink('effects', 1, <span>You can use listeners via kea-listeners</span>)}
                </p>
                {view.effects === 1 && <p>
                  Listeners are functions that run after the action they are listening to is dispatched.
                </p>}
              </li>
              <li>
                <p>
                  {this.renderViewLink('effects', 2, <span>You can use thunks via kea-thunk &amp; redux-thunk</span>)}
                </p>
                {view.effects === 2 && <p>
                  Thunks are functions that can be called like actions, but instead of
                  dispatching they run custom code.
                </p>}
                {view.effects === 2 && <p>
                  Please note that since thunks are not real actions, you can't use them in reducers.
                </p>}
              </li>
              <li>
                <p>
                  {this.renderViewLink('effects', 3, <span>You can use sagas via kea-saga &amp; redux-saga</span>)}
                </p>
                {view.effects === 3 && <p>
                  Sagas enable really powerful effects, but significantly increse your bundle size (+20kb minified) and have a steep learning curve.
                </p>}
                {view.effects === 3 && <p>
                  In addition to <code>takeEvery</code>, which works like kea-listeners, sagas give you
                  task cancellation (not possible with promises), race conditions and lots of other goodies. 
                  You can write complicated control flow routines using simple sequential code.
                </p>}
              </li>
            </ol>
          </div>
          <div className='code'>
            {view.effects === 1 ? <Highlight className='javascript'>{code.how.listeners}</Highlight> : null}
            {view.effects === 2 ? <Highlight className='javascript'>{code.how.thunks}</Highlight> : null}
            {view.effects === 3 ? <Highlight className='javascript'>{code.how.sagas}</Highlight> : null}
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

