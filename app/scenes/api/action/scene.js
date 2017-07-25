import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/api/action/index'

export default createScene({
  name: 'apiAction',
  component: sceneComponent
})
