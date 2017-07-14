import PropTypes from 'prop-types'
import { kea } from 'kea'

export default kea({
  actions: () => ({
    toggleFeature: (feature) => ({ feature })
  }),
  reducers: ({ actions }) => ({
    features: [{}, PropTypes.object, {
      [actions.toggleFeature]: (state, payload) => {
        const { feature } = payload
        return {
          ...state,
          [feature]: !state[feature]
        }
      }
    }]
  })
})
