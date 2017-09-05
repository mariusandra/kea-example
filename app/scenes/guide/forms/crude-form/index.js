import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

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
  })
})
export default class CrudeForm extends Component {
  render () {
    const { isSubmitting, values } = this.props
    const { submit, setValue } = this.actions

    const { name, email, message } = values

    return (
      <div>
        <div className='form-field'>
          <label>Name</label>
          <input type='text' value={name} onChange={e => setValue('name', e.target.value)} />
        </div>

        <div className='form-field'>
          <label>E-mail</label>
          <input type='text' value={email} onChange={e => setValue('email', e.target.value)} />
        </div>

        <div className='form-field'>
          <label className='block'>Message</label>
          <textarea value={message} onChange={e => setValue('message', e.target.value)} />
        </div>

        <button disabled={isSubmitting} onClick={submit}>
          {isSubmitting ? 'Submitting...' : 'Submit!'}
        </button>
      </div>
    )
  }
}
