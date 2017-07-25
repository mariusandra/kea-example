import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/api/saga/index'

export default createScene({
  name: 'apiSaga',
  component: sceneComponent
})
