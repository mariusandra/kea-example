import './styles.scss'

import React, { Component } from 'react'
import { kea } from 'kea'
import { Link } from 'react-router-dom'

import CodeStyleHighlight from '~/components/tags/code-style-highlight'
import Highlight from '~/components/tags/highlight'

import logo from '~/assets/logo.svg'

import Slider from '../guide/sliders/slider'
import Counter from './widgets/counter'
import Github from './widgets/github'
import DelayedCoutner from './widgets/delayed-counter'

const code = {
  counter: {
    decorator: require('raw-loader!./code/counter-decorator.txt'),
    hoc: require('raw-loader!./code/counter-hoc.txt'),
    functional: require('raw-loader!./code/counter-functional.txt'),
    hooks: require('raw-loader!./code/counter-hooks.txt'),
  },
  listeners: {
    decorator: require('raw-loader!./code/listeners-decorator.txt'),
    hoc: require('raw-loader!./code/listeners-hoc.txt'),
    functional: require('raw-loader!./code/listeners-functional.txt'),
    hooks: require('raw-loader!./code/listeners-hooks.txt'),
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
    sagas: require('raw-loader!./code/how-sagas.txt'),
    mountLogic: require('raw-loader!./code/how-mount-logic.txt'),
    create: require('raw-loader!./code/how-create.txt'),
    extend: require('raw-loader!./code/how-extend.txt'),
    keyHooks: require('raw-loader!./code/how-key-hooks.txt'),
    keyComponent: require('raw-loader!./code/how-key-component.txt'),
    events: require('raw-loader!./code/how-events.txt')
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
    view: [{ react: 1, connectKea: 1, effects: 1, key: 1 }, {
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
        <h2>Why Kea?</h2>
        <div className='description'>
          <p>
            The Kea project began when I first started to use <a href='https://redux.js.org'>Redux</a> in a <a href='https://reactjs.org/'>React</a> app in 2015.
          </p>
          <p>
            Redux was fine, but I kept writing very similar code over and over again. Eventually I looked for ways to
            simplify things. I wrote several helper functions that automatised most of these repetitive tasks.
          </p>
          <p>
            That loose collection of functions grew into the first public release of Kea, version 0.1 at the start of 2016.
          </p>
          <p>
            Those in turn evolved into a unified <u>high level abstraction over Redux</u>. The small helper functions
            morphed into a standardised way to describe your app's state and all the logic that manipulates it,
            including side effects. (versions 0.1 to 0.28 over 3 years).
          </p>
          <p>
            That worked well. There were plenty of users and businesses who depended on Kea to power their apps.
            Several of them said very nice things about it.
          </p>
          <p>
            Then things got complicated.
          </p>
          <p>
            Recent changes in React and React-Redux combined with community feedback through unsolvable feature requests
            forced me to take a step back and have a fresh look at what was Kea and where was it heading. It was time for a refactor...
            Which turned into a rewrite... Which took on a life of its own... and kept <a href='https://github.com/keajs/kea/blob/master/docs/CHANGES-1.0.md'>expanding and expanding and expanding</a>.
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
        <h2>What is Kea?</h2>
        <div className='description'>
          <p>
            Think of React as the <u>User Interface (UI) layer</u> of your application. It takes your application's
            state and converts it into something the user can interact with.
            It is <a href='https://2018.stateofjs.com/front-end-frameworks/overview/'>exceptionally good</a> at this.
          </p>
          <p>
            React, however, is unopinionated as to where you actually store this state. While it provides some primitives
            to get you going (think <code>useState</code>), most apps eventually implement a dedicated state management solution.
          </p>
          <p>
            Kea is one such solution. It adds a <u>Data Layer</u> to React's UI layer and acts as the brain of
            your application. There is seamless interoperability between both layers as we are standing on the
            great work done by the react-redux team.
          </p>
          <p>
            Kea, however, is more than just a state container.
            There are plenty of nice features to make any developer happy.
            Read on to find out more!
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
                {view.react === 6 ? <p>Good to know: <code>{'connect({})'}</code> is just a shorthand for <code>{'kea({ connect: {} })'}</code></p> : null}
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
                  <a href='https://github.com/keajs/kea-listeners'>Listeners</a> are functions that run after the action they are listening to is dispatched.
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
                  <a href='https://github.com/keajs/kea-thunk'>Thunks</a> are functions that can be called like actions, but instead of
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
                  <a href='https://github.com/keajs/kea-saga'>Sagas</a> enable <a href='https://redux-saga.js.org/'>really powerful effects</a>, substantially increse your bundle size (+20kb minified) and have a steeper learning curve.
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

        <h2>Any other interesting plugins?</h2>

        <div className='split'>
          <div className='wide-description'>
            <p>
              Yes! There are many other plugins you can extend your logic with.
            </p>
            <p>
              For example <code><a href='https://gist.github.com/mariusandra/ed989e0a362cb9beb30526abf85b1021'>kea-dimensions</a></code>,
              which sets a value based on the screen dimensions.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.plugins.dimensions}</Highlight>
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              ... or <code><a href='https://github.com/keajs/kea-router'>kea-router</a></code>, which dispatches actions in response to URL changes...
              and changes the URL in response to dispatched actions.
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
              You can connect logic with one another. For example to:
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
              You can programmatically create logic.
            </p>
            <p>
              This example function <code>createGetterSetterLogic(...)</code> creates for the options <code>{'{ foo: "bar", moo: "baz" }'}</code> logic:
            </p>
            <ol>
              <li>... with the actions <code>setFoo</code> and <code>setMoo</code></li>
              <li>... with reducers for <code>foo</code> and <code>moo</code> (defaulting to "bar" and "baz")</li>
            </ol>
            <p>
              You can abstract away repetetive code like this.
            </p>
            <p>
              See the chapter in the guide about <Link to='/guide/forms'>forms</Link> for one example of this approach.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.create}</Highlight>
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              You can extend already created logic through <code>{'logic.extend({})'}</code>
            </p>
            <p>
              Inside <code>{'logic.extend({})'}</code> you use exactly the same syntax as in <code>{'kea({})'}</code>.
            </p>
            <p>
              Split code out of <code>{'kea({})'}</code> blocks into functions that <code>extend</code> them with certain features.
            </p>
            <p>
              When needed, further abstract these extensions into a plugin.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.extend}</Highlight>
          </div>
        </div>

        <h2>Cool. Is that it?</h2>

        <div className='split'>
          <div className='wide-description'>
            <p>No! There's a lot more Kea can do!</p>
            <p>
              For example, if you give your logic a <code>key</code>, you can have multiple independent copies of it.
            </p>
            <p>
              The <code>key</code> is derived from <code>props</code>, which is either:
            </p>
            <ol>
              <li>
                {this.renderViewLink('key', 1, <span>Passed to the logic as arguments when using hooks</span>)}
                {view.key === 1 ? <p>
                  Use the format: <code>{'useActions(logic(props))'}</code>
                </p> : null}
              </li>
              <li>
                {this.renderViewLink('key', 2, <span>Taken from your component's props</span>)}
                {view.key === 2 ? <p>
                  The keyed logic must wrap the component... or be <code>connect</code>ed to from a logic that wraps the component.
                </p> : null}
              </li>
            </ol>
            <p>
              Imagine having multiple independent ['image galleries', 'todo items', 'text edit forms', ...] on one page with their own state and actions.
            </p>
          </div>
          <div className='code'>
            {view.key === 1 ? <Highlight className='javascript'>{code.how.keyHooks}</Highlight> : null}
            {view.key === 2 ? <Highlight className='javascript'>{code.how.keyComponent}</Highlight> : null}
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              When you use Kea with React, your <code>logic</code>'s reducers are automatically added to redux when your component renders
              and removed when it's destroyed.
            </p>
            <p>
              However, you can also interact with <code>logic</code> outside React if you mount it manually (or set <code>autoMount</code> to true
              when initializing Kea).
            </p>
            <ul>
              <li>Call <code>logic.mount()</code> to initialize the logic and connect it to redux.</li>
              <li>Then call <code>logic.actions.doSomething()</code> to dispatch actions</li>
              <li>... and use <code>logic.values.something</code> to get the values</li>
              <li>... and access everything else that is defined on a built logic.</li>
            </ul>
            <p>
              If your logic uses a key, you must build it first:
            </p>
            <p>
              <code>{'const builtLogic = logic({ id: 123 })'}</code>
            </p>
            <p>
              And then call <code>builtLogic.mount()</code> to mount it.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.mountLogic}</Highlight>
          </div>
        </div>

        <div className='split'>
          <div className='wide-description'>
            <p>
              Events.
            </p>
            <p>
              A logic has 4 events that you can hook into:
            </p>
            <ul>
              <li><code>beforeMount()</code> - runs before the logic is mounted</li>
              <li><code>afterMount()</code> - runs after the logic was mounted</li>
              <li><code>beforeUnmount()</code> - runs before the logic is unmounted</li>
              <li><code>afterUnmount()</code> - runs after the logic was unmounted</li>
            </ul>
            <p>
              We recommend keeping your events light and only dispatching actions from them.
            </p>
            <p>
              These actions should then be caught by reducers or listeners which do whatever is needed.
            </p>
          </div>
          <div className='code'>
            <Highlight className='javascript'>{code.how.events}</Highlight>
          </div>
        </div>

        <h2>Okay, that must be it with the features?</h2>

        <div className='description'>
          <p>
            Almost! There are few more concepts and keywords that we didn't cover yet:
          </p>
          <ul>
            <li><code>path</code> - to make it easier to debug</li>
            <li><code>constants</code> - for when you need a place to store enums</li>
            <li><code>actionCreators</code> - raw redux actions without dispatch</li>
            <li><code>selectors</code> - raw reselect selectors, abstracted away by <code>values</code>, but there if you need them</li>
            <li><code>defaults</code> - set default values for reducers by selecting data from props or other logic</li>
            <li><code>cache</code> - a transient object for storing temporary data in plugins</li>
            <li>how to create plugins</li>
            <li>the kea context and plugin contexts</li>
            <li>using props in selectors</li>
            <li>initialized vs built vs mounted logic</li>
          </ul>
          <p>
            ... to name a few.
          </p>
          <p>
            Check out the examples below or <Link to='/guide/installation'>start reading the docs</Link> to learn more!
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
          </div>
        </div>

        <h2>Delayed Counter <small>with <Link to='/effects/listeners'>kea-listeners</Link></small></h2>
        <div className='split'>
          <div className='code'>
            <CodeStyleHighlight language='javascript' code={code.listeners} />
          </div>
          <div className='description'>
            <div className='demo'>
              <DelayedCoutner />
            </div>
            <p>
              Read more about <Link to='/effects/listeners'>kea-listeners</Link>
            </p>
          </div>
        </div>

        <h2>Github <small>with <Link to='/effects/listeners'>kea-listeners</Link></small></h2>
        <div className='split'>
          <div className='code'>
            <CodeStyleHighlight language='javascript' code={code.github} />
          </div>
          <div className='description'>
            <div className='demo'>
              <Github />
            </div>
            <br />
            Read the guide: <Link to='/guide/github'>Github API</Link>
          </div>
        </div>

        <h2>Slider <small>with <Link to='/effects/saga'>kea-saga</Link></small></h2>
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
      </div>
    )
  }
}
