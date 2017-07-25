import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/api/reducer/index'

export default createScene({
  name: 'apiReducer',
  component: sceneComponent
})
