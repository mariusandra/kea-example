import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/api/index'

export default createScene({
  name: 'api',
  component: sceneComponent
})
