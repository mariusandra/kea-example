import { PropTypes } from 'react'
import { kea } from 'kea'

export default kea({
  path: () => ['scenes', 'homepage', 'index'],

  // constants: () => [
  //   'SOMETHING'
  // ],
  //

  actions: ({ constants }) => ({
    updateName: name => ({ name })
  }),

  reducers: ({ actions, constants }) => ({
    name: ['Chirpy', PropTypes.string, {
      [actions.updateName]: (state, payload) => payload.name
    }]
  }),

  selectors: ({ constants, selectors }) => ({
    capitalizedName: [
      () => [selectors.name],
      (name) => {
        return name.trim().split(' ').map(k => `${k.charAt(0).toUpperCase()}${k.slice(1).toLowerCase()}`).join(' ')
      },
      PropTypes.string
    ]
  })
})
