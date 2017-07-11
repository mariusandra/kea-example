import './styles.scss'

import React, { Component, PropTypes } from 'react'
import { kea } from 'kea'

import Slider from './slider'
import StaticSlider from './slider/static'
import SliderWithSaga from './slider/with-saga'

import Highlight from 'react-highlight'
import 'highlight.js/styles/railscasts.css'

const code = {
  full: require('raw-loader!./code/full.txt'),
  static: require('raw-loader!./code/static.txt'),
  addSagaImports: require('raw-loader!./code/add-saga-imports.txt'),
  addSagaStart: require('raw-loader!./code/add-saga-start.txt')
}

@kea({
  actions: () => ({
    toggleFeature: (feature) => ({ feature })
  }),
  reducers: ({ actions }) => ({
    features: [{}, PropTypes.object, {
      [actions.toggleFeature]: (state, payload) => {
        const { feature } = payload
        return {
          ...state,
          [feature]: !state[feature]
        }
      }
    }]
  })
})
export default class SlidersScene extends Component {
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
          Whenever you press any of the dots the counter reset.

          <h2>1. The static component</h2>
          Based on knowledge from the previous chapers, you should be able to build a static slider.
          <br /><br />
          The code for it will look something like this:
          <Highlight className='javascript'>{code.static}</Highlight>

          This will give us the following result:

          <div className='demo'>
            <div className='slider-container'>
              <StaticSlider />
            </div>
          </div>

          Click it! It works! But it won't change the slides automatically.

          <h2>2. Just Add Sagas</h2>

          For that we need to write some sagas.
          <br /><br />
          Sagas provide a nice way to write code that has side effects. They might be unfamiliar at first, but when you get to
          know them, you'll wonder how you ever wrote your frontend code without them.
          <br /><br />

          <button onClick={() => toggleFeature('decorators')}>I need to brush up on my Sagas</button>
          <br />

          {features.decorators ? (
            <div className='extra-help'>
              Coming soon! For now, please read the documentation for <a href='https://redux-saga.js.org/'>redux-saga</a>.
              <br /><br />
              For this example it's important that you understand how the <code>put</code>, <code>take</code> and <code>race</code> effects work. <code>takeEvery</code> is nice to know as well!
            </div>
          ) : null}
          <br />

          First we must import the <code>redux-saga/effects</code> that we need. We'll also import a <code>delay</code> effect that just sleeps for the given amount of milliseconds.

          <Highlight className='javascript'>{code.addSagaImports}</Highlight>

          And then we create a <code>start</code> generator function inside <code>{'@kea({})'}</code>. This function is called every time your component is mounted.
          <br /><br />
          Inside this function we create a <code>race</code> condition between two competing effects: a delay of 5 sec and
          the action <code>updateSlide</code> being triggered. The code pauses at the <code>yield race()</code> call until
          one of the two conditions comes through.
          <br /><br />
          In case it was the timeout that happened, we fetch the latest slide (<code>yield this.get(..)</code> is a shorthand to use the selectors
          defined in <code>{'@kea({})'}</code>)... and then we dispatch (<code>yield put</code>) the <code>updateSlide</code> action with the next slide.

          <Highlight className='javascript'>{code.addSagaStart}</Highlight>

          All of this results in this:

          <div className='demo'>
            <div className='slider-container'>
              <SliderWithSaga />
            </div>
          </div>

          Now if you will always just have one slider on your screen, you're done. If you wish to run many, you will run into the same
          issue as with the dynamic counter example - both sliders will listen to and react to the <code>updateSlide</code> actions
          unless you explicitly prohibit them.
          <br /><br />
          The code below demonstrates a way to prevent this from happening. It also shows the other saga functions that are available in kea.
        </div>
        <div className='code'>
          <h2>Full source</h2>
          Better documentation is coming soon. Until then, read the comments in the code
          and the <a href='https://redux-saga.js.org/'>redux-saga</a> documentation.
          <Highlight className='javascript'>{code.full}</Highlight>
        </div>
      </div>
    )
  }
}

