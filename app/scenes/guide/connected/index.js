import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'
import { push } from 'react-router-redux'

import featuresLogic from '../features-logic'

import Highlight from 'react-highlight'

const code = {
  guideExample1: require('raw-loader!./code/guide-example-1.txt'),
  guideExample2: require('raw-loader!./code/guide-example-2.txt'),
  guideExample3: require('raw-loader!./code/guide-example-3.txt'),
  guideExample4: require('raw-loader!./code/guide-example-4.txt'),
  guideExample5: require('raw-loader!./code/guide-example-5.txt')
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
export default class ConnectedScene extends Component {
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
      <div className='connected-scene'>
        <div className='description'>
          <h2>Example #5 - Connected logic</h2>
          <p>
            Attaching actions, reducers and selectors to your components will get you pretty far.
          </p>
          <p>
            However, there comes a time in every application's life when that's no longer enough.
            Perhaps you need to share code between components? Perhaps you want to separate concerns to make it more readable?
            Perhaps the logic has grown over 200 lines and really should be yanked out of <code>index.js</code>?
          </p>
          <p>
            Whatever the reason, you're in luck! Kea was originally built just for this.
            The inline version that we've been using until now (<code>{'@kea({})(Component)'}</code>) came much later.
          </p>
          <p>
            So how do you separate your <strong>logic</strong> from your components?
          </p>
          <p>
            Let's look at a real world example: this guide itself.
          </p>
        </div>
        <div className='description'>
          <h2>Separating concerns</h2>
          <p>
            You might have noticed buttons that look like this:
          </p>
          <p>
            <button onClick={() => toggleFeature('connectedGuideHelp')}>{'Tell me more!'}</button>
          </p>
          {features.connectedGuideHelp ? (
            <div className='extra-help'>
              "more"!
            </div>
          ) : null}
          <p>
            How do they work?
          </p>
          <p>
            When I started writing the guide, I just put this code on top of every component:
          </p>
          <Highlight className='javascript'>{code.guideExample1}</Highlight>
          <p>
            The code is rather straightforward, perhaps just a little bit unfamiliar.
          </p>
          <p>
            We have an object, <code>features</code>, which contains booleans that can be toggled on and off. We return a new object
            every time the action <code>toggleFeature(feature)</code> is called, flipping the boolean for the requested feature.
          </p>
          <p>
            While it worked fine, it became repetetive to copy this same code on top of every page in the guide.
            Code duplication is usually a <button onClick={() => toggleFeature('connectedCodeSmell')}>code smell</button> and
            should be handled approriately.
          </p>
          {features.connectedCodeSmell ? (
            <div className='extra-help'>
              <a href='https://en.wikipedia.org/wiki/Code_smell'>Wikipedia</a>{': '}
              <em><strong>Code smell,</strong> also known as bad smell, in computer programming code, refers to any symptom in the source code of
              a program that possibly indicates a deeper problem. According to Martin Fowler, "a code smell is a surface indication that usually
              corresponds to a deeper problem in the system". Another way to look at smells is with respect to principles and
              quality: <strong>"smells are certain structures in the code that indicate violation of fundamental design principles and negatively impact
              design quality"</strong>. Code smells are usually not bugs—they are not technically incorrect and do not currently prevent the program
              from functioning. Instead, they indicate weaknesses in design that may be slowing down development or increasing the risk of
              bugs or failures in the future. Bad code smells can be an indicator of factors that contribute to technical debt.</em>
              <br /><br />
              Yeah, yeah... I just wanted to use another hint box!
            </div>
          ) : null}
          <p>
            So how do we stop this madness?
          </p>
          <p>
            First we must extract the logic to a separate file. Let's call it <code>features-logic.js</code>:
          </p>
          <Highlight className='javascript'>{code.guideExample2}</Highlight>
          <p>
            You skip the <code>@</code> in front of <code>@kea</code>, but everything else remains the same.
          </p>
          <p>
            Then we have a few ways to import it.
          </p>
          <p>
            The simplest is to do a drop-in replacement:
          </p>
          <Highlight className='javascript'>{code.guideExample3}</Highlight>
          <p>
            That's simple and works fine, but will only get you so far. There are a few things wrong with this approach:
          </p>
          <p>
            First, it's not clear what you're importing.
            As <a href='https://mariusandra.com/blog/2012/09/two-strategies-for-writing-better-code/'>code is read far more times than it's written</a>,
            it's very very useful to be as explicit as possible. Your future self will thank you immensely!
            In this case you have no idea what extra props and actions your component will receive without having to
            open <code>features-logic.js</code> and checking it out yourself.
          </p>
          <p>
            You also don't know what baggage you're getting. There might be hundreds of new actions and props, which your relatively simple
            component will receive. That will slow down the page, as a change in each of them will trigger re-rendering.
          </p>
          <p>
            What if one of the props changes? For example the new intern replaces the action <code>toggleFeature</code> with
            two new actions: <code>setFeature</code> and <code>clearFeature</code>.
            Without (manually or automatically) clicking the buttons, you won't know that the action is no longer there. Bummer.
          </p>
          <p>
            What's more, you can't chain calls like this and you can't add other actions that only this component will use.
          </p>
          <p>
            So what's the solution? Answer: the <code>{'@connect({ ... })'}</code> helper!
          </p>
          <Highlight className='javascript'>{code.guideExample4}</Highlight>
          <p>
            While the syntax may look alien at first, it's very comfortable to use and optimised for readability.
          </p>
          <p>
            With <code>connect</code> you may import as many props and actions from as many logic stores as you like. In case you make a typo
            (<code>highlghtTheme</code> instead of <code>highlightTheme</code>), you will get an error in the JS console and can fix it immediately.
            Just connect your logic and use it!
          </p>
          <p>
            What if you also want to add actions and reducers only this component will use?
          </p>
          <p>
            No problem! Just replace <code>@connect</code> with <code>{'@kea({ connect: {}, /* other stuff */ })'}</code> like so:
          </p>
          <Highlight className='javascript'>{code.guideExample5}</Highlight>
          <p>
            If this is not redux-heaven, I don't know what is!
          </p>
          <h2>Next steps</h2>
          <p>
            That's it for the guide!
          </p>
          <p>
            Check out the <a href='/examples/todos' onClick={this.handleRoute}>example applications</a> or read the <a href='/api/logic' onClick={this.handleRoute}>API docs</a>.
          </p>
        </div>
      </div>
    )
  }
}

