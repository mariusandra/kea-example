import './styles.scss'

import React, { Component } from 'react'
import { kea } from 'kea'

const sagaLogic = kea({
  start: function * () {
    console.log('started scene, mounted component')
  }
})

@kea({
  sagas: [
    sagaLogic.saga
  ]
})
export default class Playground extends Component {
  render () {
    return (
      <div className='playground-scene'>
        Test whatever needs to be tested here
      </div>
    )
  }
}

