import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'

import form from './form'

@connect({
  actions: [
    form, [
      'setValue',
      'submit'
    ]
  ],
  props: [
    form, [
      'values',
      'isSubmitting',
      'errors'
    ]
  ]
})
export default class CreatedForm extends Component {
  render () {
    const { isSubmitting, errors } = this.props
    const { name, email, message } = this.props.values
    const { submit, setValue } = this.actions

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
