import './styles.scss'

import React, { Component } from 'react'
import { kea } from 'kea'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'
import CodeStyleHighlight from '~/components/tags/code-style-highlight'

import logo from '~/assets/logo.svg'

import Slider from '../guide/sliders/slider'
import Counter from '../guide/counter/counter'
import Countdown from '../guide/countdown/countdown'
import Github from '../guide/github/github'
import ConnectedToggle from '../guide/connected/connected-toggle'

const code = {
  counter: {
    decorator: require('raw-loader!./code/counter-decorator.txt'),
    hoc: require('raw-loader!./code/counter-hoc.txt'),
    functional: require('raw-loader!./code/counter-functional.txt'),
  },
  slider: require('raw-loader!../guide/sliders/code/homepage.txt'),
  countdown: require('raw-loader!../guide/countdown/countdown/code.txt'),
  github: require('raw-loader!../guide/github/code/full.txt'),
  connected: require('raw-loader!../guide/connected/code/homepage.txt')
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
              Built on top of <a href='http://redux.js.org/'>redux</a>, <a href='https://redux-saga.js.org/'>redux-saga</a> and <a href='https://github.com/reactjs/reselect'>reselect</a>.
            </li>
            <li>
              <strong>No boilerplate</strong>:
              Forget <code>mapStateToProps</code> and redundant constants. Only write code that matters!
            </li>
            <li>
              <strong>No new concepts</strong>:
              Use actions, reducers, selectors and sagas.
              Gradually migrate <Link to='/guide/migration'>existing Redux applications</Link>.
            </li>
            <li>
              <strong>Interoperability</strong>:
              Seamlessly <Link to='/guide/connected'>connect</Link> different parts of your application.
            </li>
          </ul>
          <p>
            Compare it to other state management libraries: <a href='https://medium.com/@mariusandra/kea-vs-setstate-redux-mobx-dva-jumpstate-apollo-etc-4aa26ea11d02'>Kea vs setState, Redux, Mobx, Dva, JumpState, Apollo, etc.</a>
          </p>
          <p>
            <Link to='/guide/installation'>Read the guide</Link> or check out the examples below:
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

        <h2>Slider</h2>
        <div className='split'>
          <div className='code'>
            <Highlight className='javascript'>{code.slider}</Highlight>
          </div>
          <div className='description'>
            <div className='demo'>
              <Slider id={999} />
            </div>
            <br />
            Read the guide: <Link to='/guide/sliders'>Sliders</Link>
          </div>
        </div>

        <h2>Github</h2>
        <div className='split'>
          <div className='code'>
            <Highlight className='javascript'>{code.github}</Highlight>
          </div>
          <div className='description'>
            <div className='demo'>
              <Github />
            </div>
            <br />
            Read the guide: <Link to='/guide/github'>Github</Link>
          </div>
        </div>

        <h2>Debounced countdown</h2>
        <div className='split'>
          <div className='code'>
            <Highlight className='javascript'>{code.countdown}</Highlight>
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
            <Highlight className='javascript'>{code.connected}</Highlight>
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

