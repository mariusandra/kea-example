import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/api/logic/index'

export default createScene({
  name: 'apiLogic',
  component: sceneComponent
})
