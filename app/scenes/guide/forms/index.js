import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

import CrudeForm from './crude-form'
import CrudeSubmitForm from './crude-submit-form'
import ErrorsForm from './errors-form'
import FinalForm from './final-form'
import CreatedForm from './created-form'

import featuresLogic from '../features-logic'

const code = {
  actionsReducers: require('raw-loader!./code/actions-reducers.txt'),
  component: require('raw-loader!./code/component.txt'),
  takeLatest: require('raw-loader!./code/takelatest.txt'),
  errorsForm: require('raw-loader!./code/errors-form.txt'),
  errorsIndex: require('raw-loader!./code/errors-index.txt'),
  showErrorsRender: require('raw-loader!./code/show-errors-render.txt'),
  showErrorsSelector: require('raw-loader!./code/show-errors-selector.txt'),
  simpleFull: require('raw-loader!./code/simple-full.txt'),
  createStub: require('raw-loader!./code/create-stub.txt'),
  createFormCall: require('raw-loader!./code/create-form-call.txt'),
  createFormFunction: require('raw-loader!./code/create-form-function.txt'),
  createFormIndex: require('raw-loader!./code/create-form-index.txt')
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
            Before Kea I used to dread forms in React. They would always require a lot of work to set up properly.
          </p>
          <p>
            I could either use <code>setState</code> for the simplest one-component forms... or
            a <a href='https://github.com/erikras/redux-form/issues/2315'>bulky library</a> like <a href='https://redux-form.com/'>redux-form</a> for
            a connected Redux-based form. Neither of those is a great option... and writing a pure-redux-form requires way too much boilerplate.
          </p>
          <p>
            With Kea, forms are finally easy! Even the code to setup a form from scratch is quick to write, as you shall soon see.
          </p>
        </div>
        <div className='description'>
          <h2>What shall we do?</h2>
          <p>
            In this chapter we will first build a simple form that looks like this:
          </p>
          <div className='demo'>
            <FinalForm />
          </div>
          <p>
            <em>Go ahead, play with it!</em>
          </p>
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
            <li>An object <code>values</code>, which contains the form data (<code>name</code>, <code>email</code> and <code>message</code>)</li>
            <li>A boolean <code>isSubmitting</code>, which knows if we're actively submitting the form or not</li>
            <li>A boolean <code>hasTriedToSubmit</code> to know if we will show errors or not</li>
          </ul>
          <p>
            These three reducers are enough to give us everything, except for validation rules and errors. We'll skip those for now.
          </p>
          <p>
            What about the actions we can perform on the form? The minimum set is as follows:
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
            Seems clear enough? :)
          </p>
        </div>
        <div className='description'>
          <h2>The component</h2>
          <p>
            We could continue extending the logic by adding error handling, validations and actual submission logic,
            but since it's nice to see something tangible, let's first build the component itself!
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
            We need to add some logic to make it actually do something.
          </p>
        </div>
        <div className='description'>
          <h2>Submitting the form</h2>
          <p>
            We will use the <code>takeLatest</code> helper to listen to the submit action and respond with either
            a <code>submitSuccess</code> or <code>submitFailure</code> action:
          </p>
          <Highlight className='javascript'>{code.takeLatest}</Highlight>
          <p>
            Adding this code results in the following form:
          </p>
          <div className='demo'>
            <CrudeSubmitForm />
          </div>
          <p>
            Go ahead, write some data and try submitting it!
          </p>
          <p>
            If you replace the <code>yield delay(1000)</code> part with an actual API call, this will be a fully functional form.
          </p>
          <p>
            Only one thing left to do...
          </p>
        </div>
        <div className='description'>
          <h2>Errors and validation</h2>
          <p>
            We want to prevent an empty form from being submitted!
          </p>
          <p>
            The easiest solution is to create a selector <code>errors</code> that depends on <code>values</code>. This selector
            checks the content of each field and returns and object describing which fields have errors.
          </p>
          <p>
            We'll also create another selector <code>hasErrors</code>, which gives a simple yes/no answer to the question "does this form have errors?".
          </p>
          <p>
            Finally, we'll check the value of <code>hasErrors</code> in the <code>submit</code> worker, and dispatch a <code>submitFailure</code> action
            in case the form doesn't pass the validation.
          </p>
          <p>
            Something like this:
          </p>
          <Highlight className='javascript'>{code.errorsForm}</Highlight>
          <p>
            In order to display the errors, we will also update our component as follows:
          </p>
          <Highlight className='javascript'>{code.errorsIndex}</Highlight>
          <p>
            Plugging in the changes results in the following form:
          </p>
          <div className='demo'>
            <ErrorsForm />
          </div>
          <p>
            Almost perfect! The only thing: we don't want to show the <span style={{color: 'red'}}>red</span> errors <em>before</em> the user submits the form.
          </p>
          <p>
            Remember the <code>hasTriedToSubmit</code> reducer from before? Now is its time to shine!
          </p>
          <p>
            We have two choices with it. We can either use it in our <code>render</code> function like so:
          </p>
          <Highlight className='javascript'>{code.showErrorsRender}</Highlight>
          <p>
            ... or we can simply return an empty hash for the <code>errors</code> selector until <code>hasTriedToSubmit</code> becomes true.
          </p>
          <p>
            I prefer the second approach as it moves the form logic away from the <code>render</code> function.
          </p>
          <p>
            In order to do this, we'll rename the previous selector <code>errors</code> into <code>allErrors</code> and make an new
            selector <code>errors</code>, that depends on both <code>allErrors</code> and <code>hasTriedToSubmit</code>. We'll also
            make <code>hasErrors</code> depend on the renamed <code>allErrors</code>:
          </p>
          <Highlight className='javascript'>{code.showErrorsSelector}</Highlight>
          <p>
            And that's it! With a few actons, reducers and selectors, totalling about 75 lines of code, you have a fully functional and
            extremely extendable form library at your disposal!
          </p>
          <p>
            This is the final result:
          </p>
          <p>
            <em>Note that it shares data with the form on top of the page.</em>
          </p>
          <div className='demo'>
            <FinalForm />
          </div>
          <p>
            <button onClick={() => toggleFeature('finalCode')}>Show the full source</button>
          </p>
          {features.finalCode ? (
            <Highlight className='javascript'>{code.simpleFull}</Highlight>
          ) : null}
        </div>
        <div className='description'>
          <h2>Abstracting <code>createForm</code></h2>
          <p>
            As you saw, it's really easy to create forms with Kea. As a side-effect you're no longer dependant on heavy 50KB form libraries.
          </p>
          <p>
            That said, what if you need a second form on your page? Should you copy paste all this code around?
          </p>
          <p>
            There's not a lot of boilerplate with this solution, but even what is there could be eliminated.
          </p>
          <p>
            Let's build a form builder!
          </p>
          <p>
            The principle here is simple. We'll create a function, <code>createForm</code>, that takes as an input all the form-specific
            data and returns a <code>{'kea({})'}</code> logic store. Something like this:
          </p>
          <Highlight className='javascript'>{code.createStub}</Highlight>
          <p>
            So what is all of the form-specific data? What kind of API do we want the <code>createForm</code> function to have?
          </p>
          <p>
            Well, here's one option:
          </p>
          <Highlight className='javascript'>{code.createFormCall}</Highlight>
          <p>
            That's about as lean as it gets!
          </p>
          <p>
            And what about this <code>createForm</code>?
          </p>
          <p>
            Turns out it requires very minimal changes from the code above. Here it is in all its glory. See if you can spot what changed:
          </p>
          <Highlight className='javascript'>{code.createFormFunction}</Highlight>
          <p>
            Since the result of calling <code>createForm</code> is just a regular kea logic store, you may connect to it
            in any way you please. In fact, the code for the component is identical to what you saw above.
          </p>
          <p>
            Here it is again for completion:
          </p>
          <Highlight className='javascript'>{code.createFormIndex}</Highlight>
          <p>
            And this is the created form in action:
          </p>
          <div className='demo'>
            <CreatedForm />
          </div>
          <p>
            Now, there are surely additional things that can be done. For example:
          </p>
          <ol>
            <li>You may create an abstract <code>Field</code> component that removes even more boilerplate.</li>
            <li>You may add extra code for async validation. E.g. checking if the username is taken or not.</li>
            <li>You may publish this <code>createForm</code> as a separate NPM package and reap all the fame that comes with being an open source maintainer :).</li>
          </ol>
          <p>
            ... but those things are outside the scope of this guide and are left as an exercise for the reader.
          </p>
          <p>
            I hope you found this guide useful!
          </p>
          <p>
            Happy hacking! :D
          </p>
          <h2>Next steps</h2>
          <p>
            The last topic in this guide: <Link to='/guide/migration'>How to migrate existing Redux applications?</Link> or
            read the <Link to='/api/logic'>API docs</Link>.
          </p>
        </div>
      </div>
    )
  }
}
