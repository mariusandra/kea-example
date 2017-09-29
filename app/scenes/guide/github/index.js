import React, { Component } from 'react'
import { connect } from 'kea'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

import SagaSection from '~/components/sections/sagas'

import GithubFull from './github'
import GithubInput from './github/input'
import GithubAlmost from './github/almost'

import featuresLogic from '../features-logic'

const code = {
  input: require('raw-loader!./code/input.txt'),
  takeLatest: require('raw-loader!./code/takelatest.txt'),
  api: require('raw-loader!./code/api.txt'),
  reducers: require('raw-loader!./code/reducers.txt'),
  api2: require('raw-loader!./code/api2.txt'),
  view: require('raw-loader!./code/view.txt'),
  call: require('raw-loader!./code/call.txt'),
  put: require('raw-loader!./code/put.txt'),
  selector: require('raw-loader!./code/selector.txt'),
  full: require('raw-loader!./code/full.txt')
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
export default class GithubScene extends Component {
  render () {
    const { features } = this.props
    const { toggleFeature } = this.actions

    return (
      <div className='counter-singleton-scene'>
        <div className='description'>
          <h2>Example #4 - Github</h2>
          <p>
            In this guide we are going to build a component that asks for an username
            and then fetches all the repositories for that user on Github.
          </p>
          <p>The final result will look like this:</p>
          <div className='demo'>
            <GithubFull />
          </div>
        </div>

        <div className='description'>
          <SagaSection />
        </div>

        <div className='description'>
          <h2>1. Input the username</h2>
          <p>Now that you have seen the end result, let's build it, piece by piece.</p>
          <p>The first thing we want to do is to have an input element to enter the username.</p>
          <p>If you have followed the other parts of this guide, you should know how to get this part working.</p>
          <p>Hopefully after some tinkering you will come up with something like this:</p>
          <Highlight className='javascript'>{code.input}</Highlight>
          <p>Live demo:</p>
          <div className='demo'>
            <GithubInput />
          </div>
          <p>
            You could probably have gotten as far with react's <code>setState</code>, but since we want to capture this
            event, we'll go straight for the kea solution.
          </p>
        </div>
        <div className='description'>
          <h2>2. Capture <code>setUsername</code> and trigger an API call</h2>
          <p>The next step is to intercept Redux and listen for each instance of the <code>setUsername</code> action being triggered.</p>
          <p>We do this with the <code>takeLatest</code> option and a special worker function which does the API call.</p>

          <button onClick={() => toggleFeature('takeBoth')}>{'takeLatest vs takeEvery?'}</button>

          {features.takeBoth ? (
            <div className='extra-help'>
              <p>There are two helpers we can use: <code>takeLatest</code> and <code>takeEvery</code></p>
              <p>What's the difference?</p>
              <p>
                It's simple: <code>takeEvery</code> runs the worker every time an action is called. <code>takeLatest</code> does
                the same, but if a previous worker is still running, it will be cancelled and restarted.
              </p>
              <p>
                In practice this means <code>takeLatest</code> let's us write code with less bugs: we will only handle the last API call that was made.
              </p>
              <p>
                Otherwise, for example, there might be a race condition, where when typing "reactjs", the results for "reactj" will arrive after "reactjs"
                and invalidate our state.
              </p>
              <p>
                It's also super easy to implement debouncing and throttling when using <code>takeLatest</code>. We will do so in a short while.
              </p>
            </div>
          ) : null}

          <p>The code to hook them up would look something like this:</p>
          <Highlight className='javascript'>{code.takeLatest}</Highlight>
        </div>
        <div className='description'>
          <h2>3. Trigger the actual call</h2>
          <p>Now that we have a time and a place where we can make the API call, let's actually make it.</p>
          <p>We will use the standard <code>Fetch</code> API for it.</p>
          <p>The code for this, with an additional 100ms debounce, will look like this:</p>
          <Highlight className='javascript'>{code.api}</Highlight>
          <p>Note the <code>yield</code> statements that we use to synchronously resolve promises without any nested callbacks!</p>
          <p>There are more details on <code>yield</code> and the code that you can use inside the workers in the <Link to='/guide/sliders'>sliders guide</Link>.</p>
        </div>
        <div className='description'>
          <h2>4. Store the response of the call</h2>
          <p>Now that we get the repositories, where to put them?</p>
          <p>The answer: in a few new reducers.</p>
          <p>We're interested in 3 things:</p>
          <ol>
            <li>Whether we're currently fetching and data: <code>isLoading</code></li>
            <li>The repositories that we have fetched: <code>repositories</code></li>
            <li>Any error that might have occurred: <code>error</code></li>
          </ol>
          <p>We can get all of this by just adding two new actions:</p>
          <ol>
            <li>One to set the repositories: <code>setRepositories</code></li>
            <li>One to set the error message: <code>setFetchError</code></li>
          </ol>
          <p>Hooking them up gives the following result:</p>
          <Highlight className='javascript'>{code.reducers}</Highlight>
          <p>Now we just need to call the right actions from the worker:</p>
          <Highlight className='javascript'>{code.api2}</Highlight>
          <p>Note that we have to use the redux-saga <code>put</code> effect when dispatching the actions.</p>
        </div>
        <div className='description'>
          <h2>5. Display the result</h2>
          <p>The last step is to display the repositories to the user. To do this we use the following code:</p>
          <Highlight className='javascript'>{code.view}</Highlight>
          <p>Giving us the following result:</p>
          <div className='demo'>
            <GithubAlmost />
          </div>
          <p>It works! Almost...</p>
          <p>What's still missing?</p>
          <p>Well, for starters it would be nice if it would fetch all the respositories on page load.</p>
          <p>Also, it would be great to sort the repositories by the number of stars</p>
        </div>
        <div className='description'>
          <h2>6. Last steps</h2>
          <p>No problem, we can fix that!</p>
          <p>
            First, to load the repositories on page load, we have two options, both requiring
            the <code>start</code> function that is run when the component is mounted.
          </p>
          <p>Option #1 is to call the <code>fetchRepositories</code> worker directly using redux-saga's <code>call</code>:</p>
          <Highlight className='javascript'>{code.call}</Highlight>
          <p>This works, but it feels kind of hacky. We're pretending to be an action that triggers the worker.</p>
          <p>The other option is to go through redux and execute the <code>setUsername</code> action with the default username:</p>
          <Highlight className='javascript'>{code.put}</Highlight>
          <p>It feels cleaner, but there's still something weird with calling <code>setUsername</code> with the username that's already set.</p>
          <p>In the end, both approaches get the job done, and it's up to you to figure out which makes more sense depening on your situation.</p>
          <p>The second problem had to do with sorting the results.</p>
          <p>For that we can create a selector that takes the <code>repositories</code> as input and outputs a sorted array:</p>
          <Highlight className='javascript'>{code.selector}</Highlight>
          <p>Now all that's left to do is to replace <code>repositories</code> with <code>sortedRepositories</code> in your component.</p>
          <p>
            Because the selectors are made with <code>reselect</code> under the hood, you can be sure that they will only be
            recalculated (resorted in this case) when the original input (repositories) change.
          </p>
          <p>That's much better than re-sorting them on every call to <code>render()</code>.</p>
        </div>
        <div className='description'>
          <h2>7. Final result</h2>
          <p>Adding the finishing touches gives us this final result:</p>
          <div className='demo'>
            <GithubFull />
          </div>
          <p>With this code:</p>
          <Highlight className='javascript'>{code.full}</Highlight>
          <p>There's still one thing that's broken:</p>
          <p>
            If a github user or organisation has more than 100 repositories, only the first 100 results will be returned.
            Github's API provides a way to ask for the next 100 results (the <a href='https://developer.github.com/v3/repos/#response'><code>Link</code> headers</a>), but as resolving this is
            outside the scope of this guide, it will be left as an exercise for the reader ;).
          </p>
        </div>
        <div className='description'>
          Next page: <Link to='/guide/connected'>Connected logic</Link>
        </div>
      </div>
    )
  }
}
