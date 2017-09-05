import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'

const noop = () => ({})

export default function createForm (options) {
  const propType = options.propTypes ? PropTypes.shape(options.propTypes) : PropTypes.object
  const defaults = options.defaults || {}
  const validate = options.validate || noop

  const submit = options.submit || noop
  const success = options.success || noop
  const failure = options.failure || noop

  return kea({
    actions: () => ({
      setValue: (key, value) => ({ key, value }),
      setValues: (values) => ({ values }),

      submit: true,
      submitSuccess: (response) => ({ response }),
      submitFailure: (error) => ({ error })
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

      showErrors: [false, PropTypes.bool, {
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

        try {
          const response = yield call(submit.bind(this))
          yield call(success.bind(this), response)
          yield put(submitSuccess(response))
        } catch (error) {
          yield call(failure.bind(this), error)
          yield put(submitFailure(error))
        }
      }
    })
  })
}
