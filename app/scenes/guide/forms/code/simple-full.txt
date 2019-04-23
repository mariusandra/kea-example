import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put, delay } from 'redux-saga/effects'

const isEmailValid = (email) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)

const defaultValues = {
  name: 'John Doe',
  email: '',
  message: ''
}

const propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  message: PropTypes.string
}

const missingText = 'This field is required'

@kea({
  actions: () => ({
    setValue: (key, value) => ({ key, value }),
    setValues: (values) => ({ values }),

    submit: true,
    submitSuccess: true,
    submitFailure: true
  }),

  reducers: ({ actions }) => ({
    values: [defaultValues, PropTypes.shape(propTypes), {
      [actions.setValue]: (state, payload) => Object.assign({}, state, { [payload.key]: payload.value }),
      [actions.setValues]: (state, payload) => Object.assign({}, state, payload.values),
      [actions.submitSuccess]: () => defaultValues
    }],

    isSubmitting: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.submitSuccess]: () => false,
      [actions.submitFailure]: () => false
    }],

    showErrors: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.submitSuccess]: () => false
    }]
  }),

  selectors: ({ selectors }) => ({
    allErrors: [
      () => [selectors.values],
      (values) => ({
        name: !values.name ? missingText : null,
        email: !values.email ? missingText : (!isEmailValid(values.email) ? 'Invalid e-mail' : null),
        message: !values.message ? missingText : null
      }),
      PropTypes.object
    ],

    hasErrors: [
      () => [selectors.allErrors],
      (allErrors) => Object.values(allErrors).filter(k => k).length > 0,
      PropTypes.bool
    ],

    errors: [
      () => [selectors.allErrors, selectors.showErrors],
      (errors, showErrors) => showErrors ? errors : {},
      PropTypes.object
    ]
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.submit]: function * () {
      const { submitSuccess, submitFailure } = this.actions

      const hasErrors = yield this.get('hasErrors')

      if (hasErrors) {
        yield put(submitFailure())
        return
      }

      // get the form data...
      const values = yield this.get('values')
      console.log('Submitting form with values:', values)

      // simulate a 1sec async request.
      yield delay(1000)

      if (values) {
        window.alert('Success')
        yield put(submitSuccess())
      } else {
        window.alert('Error')
        yield put(submitFailure())
      }
    }
  })
})
export default class SimpleForm extends Component {
  render () {
    const { isSubmitting, errors, values } = this.props
    const { submit, setValue } = this.actions

    const { name, email, message } = values

    return (
      <div>
        <div className='form-field'>
          <label>Name</label>
          <input type='text' value={name} onChange={e => setValue('name', e.target.value)} />
          {errors.name ? <div className='form-error'>{errors.name}</div> : null}
        </div>

        <div className='form-field'>
          <label>E-mail</label>
          <input type='text' value={email} onChange={e => setValue('email', e.target.value)} />
          {errors.email ? <div className='form-error'>{errors.email}</div> : null}
        </div>

        <div className='form-field'>
          <label className='block'>Message</label>
          <textarea value={message} onChange={e => setValue('message', e.target.value)} />
          {errors.message ? <div className='form-error'>{errors.message}</div> : null}
        </div>

        <button disabled={isSubmitting} onClick={submit}>
          {isSubmitting ? 'Submitting...' : 'Submit!'}
        </button>
      </div>
    )
  }
}
