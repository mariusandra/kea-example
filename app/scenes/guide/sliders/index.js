import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'
import { Link } from 'react-router-dom'

import Slider from './slider'
import StaticSlider from './slider/static'
import SliderWithSaga from './slider/with-saga'

import Highlight from '~/components/tags/highlight'

import SagaSection from '~/components/sections/sagas'

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
  render () {
    const { features } = this.props
    const { toggleFeature } = this.actions

    return (
      <div className='sliders-scene'>
        <div className='description'>
          <h2>Example #3 - Sliders</h2>
          <p>
            This example demonstrates side effects through sagas.
          </p>
          <p>
            We will build a slider that will update its image every 5 seconds.
          </p>

          <h2>Final result</h2>
          <p>
            The final result will look like this:
          </p>
          <div className='demo'>
            <div className='slider-container'>
              <Slider id={1} initialSlide={0} />
            </div>
          </div>
          <p>
            Whenever you press any of the dots the 5 second counter will reset.
          </p>

          <SagaSection />

          <h2>1. The static component</h2>
          <p>
            Based on the knowledge from the previous chapters, you should be able to build a static slider.
          </p>
          <p>
            The code for it will look something like this:
          </p>
          <Highlight className='javascript'>{code.static}</Highlight>
          <p>
            Giving us the following result:
          </p>
          <div className='demo'>
            <div className='slider-container'>
              <StaticSlider />
            </div>
          </div>
          <p>
            Click it! It works, but won't change the slides automatically.
          </p>
          <h2>2. Just Add Sagas</h2>
          <p>
            For that we need to write some <a href='https://redux-saga.js.org/'>sagas</a>.
          </p>
          <p>
            <a href='https://redux-saga.js.org/'>Sagas</a> provide a nice way to write code that has side effects. They might be unfamiliar at first, but when you get to
            know them, you'll wonder how you ever wrote your frontend code without them.
          </p>
          <p>
            <button onClick={() => toggleFeature('sagas')}>I need to brush up on my Sagas</button>
          </p>

          {features.sagas ? (
            <div className='extra-help'>
              <p>
                Here is a quick refresher on sagas. Please read <a href='https://redux-saga.js.org/'>the redux-saga documentation</a> for more details.
              </p>
              <p>
                The cool thing with sagas is that they let you write async code in a sequential manner.
              </p>
              <p>
                When before you would write:
              </p>
              <Highlight className='javascript'>{code.saga1Before}</Highlight>
              <p>
                With sagas you can write the same code like this:
              </p>
              <Highlight className='javascript'>{code.saga1After}</Highlight>
              <p>
                This is a simple example, but you can probably see how the magical <code>yield</code> keyword will make your life so much easier.
              </p>
              <p>
                <button onClick={() => toggleFeature('sagasGenerators')}>What the ...?</button>
              </p>

              {features.sagasGenerators ? (
                <div className='extra-help'>
                  <p>
                    Notice the <code>*</code> between <code>function * doSomething()</code> and the <code>yield</code> before <code>yield api.fetchUsers()</code>.
                  </p>
                  <p>
                    The <code>*</code> indicates that youre creating a <a href='https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*'><em>generator function</em></a>.
                    From MDN: <em>Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.</em>
                  </p>
                  <p>
                    It's a bit like using the new ES <code>async</code> and <code>await</code> features.
                  </p>
                </div>
              ) : null}

              <p>
                In addition to simplifying promise-based callbacks, redux-saga provides a lot of helpers which
                make working with redux actions very simple.
              </p>
              <p>
                Here are a few of the special effects you can use to control your sagas:
              </p>
              <Highlight className='javascript'>{code.saga2Effects}</Highlight>
              <p>
                For this example it's important that you understand how the <code>put</code>, <code>take</code> and <code>race</code> effects work.
              </p>
              <p>
                <a href='https://redux-saga.js.org/docs/advanced/Concurrency.html'><code>takeEvery</code></a> and <a href='https://redux-saga.js.org/docs/advanced/Concurrency.html'><code>takeLatest</code></a> are very useful as well!
              </p>
            </div>
          ) : null}
          <p>
            First we must import the <code>redux-saga/effects</code> that we need. We'll also import a <code>delay</code> effect that just sleeps for the given amount of milliseconds.
          </p>
          <Highlight className='javascript'>{code.addSagaImports}</Highlight>
          <p>
            And then we create a <code>start</code> generator function inside <code>{'@kea({})'}</code>. This function is called every time your component is mounted.
          </p>
          <p>
            Inside this <code>start</code> function we create a <code>race</code> condition between two competing effects: a delay of 5 seconds and
            the action <code>updateSlide</code> being triggered.
          </p>
          <p>
            The code pauses at the <code>yield race()</code> call until one of the two conditions is met.
          </p>
          <p>
            In case the timeout won the race, we fetch the latest slide (<code>yield this.get(..)</code> is a shorthand to use the selectors
            defined in <code>{'@kea({})'}</code>)... and then we dispatch (<code>yield put()</code>) the <code>updateSlide</code> action with the next slide.
          </p>
          <Highlight className='javascript'>{code.addSagaStart}</Highlight>
          <p>
            All of this results in this:
          </p>
          <div className='demo'>
            <div className='slider-container'>
              <SliderWithSaga />
            </div>
          </div>
          <p>
            Now if you will always just have one slider on your screen, you're done. If you wish to have many slider instances, you will run into the same
            issue as with the dynamic counter example - both sliders will listen to and react to the <code>updateSlide</code> actions
            unless you explicitly prohibit them.
          </p>
          <p>
            The code below demonstrates a way to prevent this from happening. It also shows how to listen to actions using
            the <code>takeEvery</code> helper and the <code>workers</code> object.
          </p>
        </div>
        <div className='code'>
          <h2>Full source</h2>
          <p>
            Better documentation is coming one day. Until then, read the comments in the code
            and the <a href='https://redux-saga.js.org/'>redux-saga</a> documentation.
          </p>
          <Highlight className='javascript'>{code.full}</Highlight>
        </div>
      </div>
    )
  }
}

