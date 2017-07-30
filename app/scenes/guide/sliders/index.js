import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'
import { push } from 'react-router-redux'

import Slider from './slider'
import StaticSlider from './slider/static'
import SliderWithSaga from './slider/with-saga'

import Highlight from 'react-highlight'

import featuresLogic from '../features-logic'

const code = {
  full: require('raw-loader!./code/full.txt'),
  static: require('raw-loader!./code/static.txt'),
  addSagaImports: require('raw-loader!./code/add-saga-imports.txt'),
  addSagaStart: require('raw-loader!./code/add-saga-start.txt'),
  saga1Before: require('raw-loader!./code/saga-1-before.txt'),
  saga1After: require('raw-loader!./code/saga-1-after.txt'),
  saga2Effects: require('raw-loader!./code/saga-2-effects.txt')
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
export default class SlidersScene extends Component {
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
      <div className='sliders-scene'>
        <div className='description'>
          <h2>Example #3 - Sliders</h2>

          This example demonstrates side effects through sagas.
          <br /><br />
          We will build a slider that will update its image every 5 seconds.

          <h2>Final result</h2>
          The final result will look like this:
          <div className='demo'>
            <div className='slider-container'>
              <Slider id={1} initialSlide={0} />
            </div>
          </div>
          Whenever you press any of the dots the 5 second counter will reset.

          <h2>1. The static component</h2>
          Based on the knowledge from the previous chapters, you should be able to build a static slider.
          <br /><br />
          The code for it will look something like this:
          <Highlight className='javascript'>{code.static}</Highlight>

          Giving us the following result:

          <div className='demo'>
            <div className='slider-container'>
              <StaticSlider />
            </div>
          </div>

          Click it! It works, but won't change the slides automatically.

          <h2>2. Just Add Sagas</h2>

          For that we need to write some <a href='https://redux-saga.js.org/'>sagas</a>.
          <br /><br />
          <a href='https://redux-saga.js.org/'>Sagas</a> provide a nice way to write code that has side effects. They might be unfamiliar at first, but when you get to
          know them, you'll wonder how you ever wrote your frontend code without them.
          <br /><br />

          <button onClick={() => toggleFeature('sagas')}>I need to brush up on my Sagas</button>
          <br />

          {features.sagas ? (
            <div className='extra-help'>
              Here is a quick refresher on sagas. Please read <a href='https://redux-saga.js.org/'>the redux-saga documentation</a> for more details.
              <br /><br />
              The cool thing with sagas is that they let you write async code in a sequential manner.
              <br /><br />
              When before you would write:
              <Highlight className='javascript'>{code.saga1Before}</Highlight>
              With sagas you can write the same code like this:
              <Highlight className='javascript'>{code.saga1After}</Highlight>
              This is a simple example, but you can probably see how the magical <code>yield</code> keyword will make your life so much easier.
              <br /><br />

              <button onClick={() => toggleFeature('sagasGenerators')}>What the ...?</button>
              <br />

              {features.sagasGenerators ? (
                <div className='extra-help'>
                  Notice the <code>*</code> between <code>function * doSomething()</code> and the <code>yield</code> before <code>yield api.fetchUsers()</code>.
                  <br /><br />
                  The <code>*</code> indicates that youre creating a <a href='https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*'><em>generator function</em></a>.
                  From MDN: <em>Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.</em>
                  <br /><br />
                  It's a bit like using the new ES <code>async</code> and <code>await</code> features.
                </div>
              ) : null}
              <br />

              In addition to simplifying promise-based callbacks, redux-saga provides a lot of helpers which
              make working with redux actions very simple.
              <br /><br />

              Here are a few of the special effects you can use to control your sagas:

              <Highlight className='javascript'>{code.saga2Effects}</Highlight>

              For this example it's important that you understand how the <code>put</code>, <code>take</code> and <code>race</code> effects work.
              <br /><br />

              <a href='https://redux-saga.js.org/docs/advanced/Concurrency.html'><code>takeEvery</code></a> and <a href='https://redux-saga.js.org/docs/advanced/Concurrency.html'><code>takeLatest</code></a> are very useful as well!
            </div>
          ) : null}
          <br />

          First we must import the <code>redux-saga/effects</code> that we need. We'll also import a <code>delay</code> effect that just sleeps for the given amount of milliseconds.

          <Highlight className='javascript'>{code.addSagaImports}</Highlight>

          And then we create a <code>start</code> generator function inside <code>{'@kea({})'}</code>. This function is called every time your component is mounted.
          <br /><br />
          Inside this <code>start</code> function we create a <code>race</code> condition between two competing effects: a delay of 5 seconds and
          the action <code>updateSlide</code> being triggered.
          <br /><br />
          The code pauses at the <code>yield race()</code> call until one of the two conditions is met.
          <br /><br />
          In case the timeout won the race, we fetch the latest slide (<code>yield this.get(..)</code> is a shorthand to use the selectors
          defined in <code>{'@kea({})'}</code>)... and then we dispatch (<code>yield put()</code>) the <code>updateSlide</code> action with the next slide.

          <Highlight className='javascript'>{code.addSagaStart}</Highlight>

          All of this results in this:

          <div className='demo'>
            <div className='slider-container'>
              <SliderWithSaga />
            </div>
          </div>

          Now if you will always just have one slider on your screen, you're done. If you wish to have many slider instances, you will run into the same
          issue as with the dynamic counter example - both sliders will listen to and react to the <code>updateSlide</code> actions
          unless you explicitly prohibit them.
          <br /><br />
          The code below demonstrates a way to prevent this from happening. It also shows how to listen to actions using
          the <code>takeEvery</code> helper and the <code>workers</code> object.
        </div>
        <div className='code'>
          <h2>Full source</h2>
          Better documentation is coming soon. Until then, read the comments in the code
          and the <a href='https://redux-saga.js.org/'>redux-saga</a> documentation.
          <Highlight className='javascript'>{code.full}</Highlight>

          Next page: <a href='/guide/github' onClick={this.handleRoute}>Github API</a>
        </div>
      </div>
    )
  }
}

