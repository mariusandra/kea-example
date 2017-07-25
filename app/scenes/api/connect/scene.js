import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/api/connect/index'

export default createScene({
  name: 'apiConnect',
  component: sceneComponent
})
