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
  },
  plugins: {
    dimensions: require('raw-loader!./code/plugins-dimensions.txt'),
    router: require('raw-loader!./code/plugins-router.txt')
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
          <p><strong>NB!</strong> This documentation is for the 1.0 release. To see docs for 0.28, click here.</p>
        </div>
        <h2>Why does Kea exist?</h2>
        <div className='description'>
          <p>
            The Kea project began when I first started to use Redux in a React app in 2015.
          </p>
          <p>
            Redux was fine, but I kept writing very similar code over and over again. Eventually I looked for ways to
            simplify things. I wrote several helper functions that automatised most of these repetitive tasks. 
          </p>
          <p>
            That loose collection of functions grew into the first public release of Kea: v0.1 at the start of 2016.
          </p>
          <p>
            Those in turn evolved into a unified <u>high level abstraction over Redux</u>. The helper functions from
            v0.1 morphed into a standardised way to describe your app's state and all the logic that manipulates it, 
            including side effects. (v0.1 to v0.28 over 3 years).
          </p>
          <p>
            That worked well. There were plenty of users and businesses who depended on Kea to power their apps.
            Several of them said very nice things about it.
          </p>
          <p>
            Then I decided to complicate my life.
          </p>
          <p>
            Recent changes in React and Redux combined with community feedback through unsolvable feature requests 
            forced a fresh look at what Kea was and where it was heading. It was time for a refactor...
            Which turned into a rewrite... Which took on a life of its own... and kept expanding and expanding and expanding.
          </p>
          <p>
            All of this while retaining the same bundle size as before (16kb minified -> 17kb minified).
          </p>
          <p>
            After 5+ months of hard work over 300+ commits Kea 1.0 was born.
          </p>
          <p>
            It's a complete rewrite of what came before, taking Kea from being just an abstraction over Redux into 
            proper framework territory.
          </p>
        </div>
        <h2>What is Kea now?</h2>
        <div className='description'>
          <p>          
            Kea 1.0 complements React (the UI layer) by implementing a <u>Data Layer</u> that acts as the brains of
            your application. Because it's standing on the work done by the react-redux team, there is seamless 
            interoperability between both layers and plenty of nice features to make any developer happy.
          </p>
          <p>
            ... to write ...
          </p>
        </div>
        <h2>How does it work?</h2>
        <div className='split'>
          <div className='wide-description'>
            <p>
              In Kea, you create <code>logic</code> from input with the <code>{'kea()'}</code> function.
            </p>
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
              <li><strong>Actions</strong> request changes in the system</li>
              <li><strong>Reducers</strong> manage your data and change it in response to actions</li>
              <li><strong>Selectors</strong> combine one or more reducers into a new output</li>
            </ul>
            <p>
              They must all be pure functions and perform no side effects.
            </p>
            <p>
              If this is new to you, see <a href='https://medium.com/gitconnected/redux-logic-flow-crazy-simple-summary-35416eadabd8' target='_blank'>here</a> for a nice overview of how Redux works.
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
                {this.renderViewLink('react', 2, <span>Wrap the <code>logic</code> around your functional component</span>)}
              </li>
              <li>
                {this.renderViewLink('react', 3, <span>Wrap the <code>logic</code> around your Class component</span>)}
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
              Eventually you'll need side effects (e.g. to talk to your API).
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
                {view.effects === 1 && <p>
                  They have built in support for cancellation and debouncing through breakpoints.
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
                  <a href='https://redux-saga.js.org/'>Sagas</a> enable really powerful effects, significantly increse your bundle size (+20kb minified) and have a steeper learning curve.
                </p>}
                {view.effects === 3 && <p>
                  They are essential in higly interactive applications, such as games, fleet tracking software, etc.
                </p>}
                {view.effects === 3 && <p>
                  We recommend starting with listeners and when needed, rewriting your highly interacive parts to use sagas.
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


        <h2>Any other neat tricks?</h2>

        <div className='split'>
          <div className='wide-description'>
            <p>
              There are many other plugins you can extend your logic with.
            </p>
            <p>
              For examle <code>kea-dimensions</code>, which sets a reducer based on the screen dimensions:
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.plugins.dimensions}</Highlight>
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              Or <code>kea-router</code>, which dispatches actions in response to route changes:
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.plugins.router}</Highlight>
          </div>
        </div>


        <h2>What more can Kea do?</h2>

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
              You can give your logic a <code>key</code> and have multiple copies of it.
            </p>
          </div>
          <div className='code'>
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

