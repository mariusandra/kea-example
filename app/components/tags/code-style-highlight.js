import React from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

import Highlight from './highlight'

const logic = kea({
  constants: () => [
    'decorator',
    'hoc',
    'functional'
  ],

  actions: () => ({
    setCodeStyle: (codeStyle) => ({ codeStyle })
  }),

  reducers: ({ actions, constants }) => ({
    codeStyle: [constants.decorator, PropTypes.string, { persist: true }, {
      [actions.setCodeStyle]: (_, payload) => payload.codeStyle
    }]
  })
})

const CodeStyleHighlight = ({
  // props
  code,
  language,

  // kea
  codeStyle,
  actions: { setCodeStyle }
}) =>
  <div>
    <div className='code-style-bar'>
      {Object.keys(logic.constants).map(cs => (
        <button key={cs} className={codeStyle === cs ? 'active' : ''} onClick={() => setCodeStyle(cs)}>{cs}</button>
      ))}
    </div>
    <Highlight className={language}>{code[codeStyle]}</Highlight>
  </div>

export default logic(CodeStyleHighlight)
