import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'

export default function createForm (options) {
  const validate = options.validate || (() => ({}))
  const propType = options.propTypes ? PropTypes.shape(options.propTypes) : PropTypes.object
  const defaults = options.defaults || {}

  const submit = options.submit || (() => {})
  const success = options.success || (() => {})
  const failure = options.failure || (() => {})

  return kea({
    actions: () => ({
      setValue: (key, value) => ({ key, value }),
      setValues: (values) => ({ values }),

      submit: true,
      submitSuccess: true,
      submitFailure: true
    }),

    reducers: ({ actions }) => ({
      values: [defaults, propType, {
        [actions.setValue]: (state, payload) => Object.assign({}, state, { [payload.key]: payload.value }),
        [actions.setValues]: (state, payload) => Object.assign({}, state, payload.values),
        [actions.submitSuccess]: () => defaults
      }],
      isSubmitting: [false, PropTypes.bool, {
        [actions.submit]: () => true,
        [actions.submitSuccess]: () => false,
        [actions.submitFailure]: () => false
      }],
      hasTriedToSubmit: [false, PropTypes.bool, {
        [actions.submit]: () => true,
        [actions.submitSuccess]: () => false
      }]
    }),

    selectors: ({ selectors }) => ({
      allErrors: [
        () => [selectors.values],
        validate,
        PropTypes.object
      ],

      hasErrors: [
        () => [selectors.allErrors],
        (errors) => Object.values(errors).filter(k => k).length > 0,
        PropTypes.bool
      ],

      errors: [
        () => [selectors.allErrors, selectors.hasTriedToSubmit],
        (errors, hasTriedToSubmit) => hasTriedToSubmit ? errors : {},
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

        try {
          // simulate submitting
          const response = yield call(submit.bind(this))

          yield call(success.bind(this), response)
          yield put(submitSuccess())
        } catch (error) {
          yield call(failure.bind(this), error)
          yield put(submitFailure())
        }
      }
    })
  })
}
