import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

import SimpleForm from './simple-form'
import CrudeForm from './crude-form'
import CrudeSubmitForm from './crude-submit-form'

import featuresLogic from '../features-logic'

const code = {
  actionsReducers: require('raw-loader!./code/actions-reducers.txt'),
  component: require('raw-loader!./code/component.txt'),
  takeLatest: require('raw-loader!./code/takelatest.txt')
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
export default class FormsScene extends Component {
  render () {
    const { features } = this.props
    const { toggleFeature } = this.actions

    return (
      <div className='counter-singleton-scene'>
        <div className='description'>
          <h2>Example #6 - Forms</h2>
          <p>
            Before Kea I used to dread forms in React. They would always require a lot of boilerplate to get going.
          </p>
          <p>
            With Kea, that's no longer the case. Even the boilerplate is quick to write, as we will soon demonstrate.
          </p>
          <p>
            In this chapter we will first build a simple form that looks like this:
          </p>
          <div className='demo'>
            <SimpleForm />
          </div>
          <p>
            ... and then abstract the remaining boilerplate into a form builder.
          </p>
        </div>

        <div className='description'>
          <h2>Defining the features we need</h2>
          <p>
            If you played with the demo above, you'll see what we need to build the following features:
          </p>
          <ul>
            <li>Default values</li>
            <li>Custom validation rules</li>
            <li>Show errors only after we have pressed "submit"</li>
            <li>Disable the submit button when submitting</li>
            <li>Async processing of the request</li>
          </ul>
          <p>
            Let's build it piece by piece, starting with the data model.
          </p>
        </div>

        <div className='description'>
          <h2>Actions and reducers</h2>
          <p>
            So what do we need to keep track of in order to build this form?
          </p>
          <p>
            At the very minimum, we'll need the following reducers:
          </p>
          <ul>
            <li>An object <code>values</code>, which contains the form data</li>
            <li>A boolean <code>isSubmitting</code>, which knows if we're actively submitting the form or not</li>
            <li>A boolean <code>hasTriedToSubmit</code> to know if we will show the errors or not</li>
          </ul>
          <p>
            These three reducers are enough to give us everything, except for validation rules and errors. We'll skip those for now.
          </p>
          <p>
            What about the actions we can perform on the form? The bare minimum set is as follows:
          </p>
          <ul>
            <li><code>setValue</code> to update the value of one field (or <code>setValues</code> to update many simultaneously)</li>
            <li><code>submit</code>, to try to submit the form</li>
            <li><code>submitSuccess</code>, if the form was successfully submitted</li>
            <li><code>submitFailure</code>, if there was an error, e.g. a validation mismatch</li>
          </ul>
          <p>
            Putting them together and adding <code>defaults</code> and <code>propTypes</code> gives us the following code:
          </p>
          <Highlight className='javascript'>{code.actionsReducers}</Highlight>
          <p>
            Seems clear enough?
          </p>
        </div>
        <div className='description'>
          <h2>The form component</h2>
          <p>
            We could continue extending the logic by adding error handling, validations and actual submission logic,
            but since it's nice to already see something tangible, let's first build the component itself!
          </p>
          <p>
            A very crude version will look something like this:
          </p>
          <Highlight className='javascript'>{code.component}</Highlight>
          <p>
            This code works! In fact, try it below:
          </p>
          <div className='demo'>
            <CrudeForm />
          </div>
          <p>
            The only problem: once you hit "submit", it will forever be stuck in the <code>isSubmitting</code> state.
          </p>
          <p>
            We need to add some logic to make it actually do anything.
          </p>
        </div>
        <div className='description'>
          <h2>Handling the submissions</h2>
          <p>
            We will use the <code>takeLatest</code> helper to listent to the submit event and respond with either
            a <code>submitSuccess</code> or <code>submitFailure</code> action:
          </p>
          <Highlight className='javascript'>{code.takeLatest}</Highlight>
          <p>
            Adding this code results in the following form:
          </p>
          <div className='demo'>
            <CrudeSubmitForm />
          </div>
        </div>
      </div>
    )
  }
}
