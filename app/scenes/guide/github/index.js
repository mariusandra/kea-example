import React, { Component } from 'react'
import { connect } from 'kea'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

import Listeners from '~/components/sections/listeners'

import GithubFull from './github'
import GithubInput from './github/input'
import GithubAlmost from './github/almost'

import featuresLogic from '../features-logic'

const code = {
  input: require('raw-loader!./code/input.txt'),
  listeners: require('raw-loader!./code/listeners.txt'),
  api: require('raw-loader!./code/api.txt'),
  reducers: require('raw-loader!./code/reducers.txt'),
  api2: require('raw-loader!./code/api2.txt'),
  view: require('raw-loader!./code/view.txt'),
  call: require('raw-loader!./code/call.txt'),
  put: require('raw-loader!./code/put.txt'),
  selector: require('raw-loader!./code/selector.txt'),
  full: require('raw-loader!./code/full.txt')
}

export default class GithubScene extends Component {
  render () {
    return (
      <div className='counter-singleton-scene'>
        <div className='description'>
          <h2>Example - Github API</h2>
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
          <Listeners />
        </div>

        <div className='description'>
          <h2>1. Input the username</h2>
          <p>Now that you have seen the end result, let's build it, piece by piece.</p>
          <p>The first thing we want to do is to have an input field to enter the username and store it in kea:</p>
          <Highlight className='javascript'>{code.input}</Highlight>
          <p>Live demo:</p>
          <div className='demo'>
            <GithubInput />
          </div>
        </div>
        <div className='description'>
          <h2>2. Capture calls <code>setUsername</code> and trigger an API call</h2>
          <p>The next step is to listen for the  <code>setUsername</code> action and run some code whenever it has been dispatched:</p>
          <Highlight className='javascript'>{code.listeners}</Highlight>
        </div>
        <div className='description'>
          <h2>3. Trigger the actual call</h2>
          <p>We must ask Github for data about this user.</p>
          <p>For this we'll use the standard <code>window.Fetch</code> API. We also add 300 milliseconds
          of debounce before actually making the call, to give the user time to add another keystroke:</p>
          <Highlight className='javascript'>{code.api}</Highlight>
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
        </div>
        <div className='description'>
          <h2>6. Last steps</h2>
          <p>What's still missing?</p>
          <p>Well, for starters it would be nice if it would fetch all the respositories on page load.</p>
          <p>Also, it would be great to sort the repositories by the number of stars</p>
          <p>Let's fix these points!</p>
          <p>
            First, to load the repositories on page load, we can use kea's mount events and run an action whenever the logic is mounted:
          </p>
          <Highlight className='javascript'>{code.call}</Highlight>

          <p>To stort the results we can create a selector that takes <code>repositories</code> as input and outputs a sorted array:</p>
          <Highlight className='javascript'>{code.selector}</Highlight>
          <p>Now all that's left to do is to replace <code>repositories</code> with <code>sortedRepositories</code> in your component.</p>
          <p>
            Because the selectors are made with <code>reselect</code> under the hood, you can be sure that they will only be
            recalculated (resorted in this case) when the original input (repositories) change, not between other renders.
          </p>
        </div>
        <div className='description'>
          <h2>7. Final result</h2>
          <p>Adding the finishing touches gives us this final masterpiece:</p>
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
      </div>
    )
  }
}
