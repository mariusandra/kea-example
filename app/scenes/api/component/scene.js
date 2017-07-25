import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/api/component/index'

export default createScene({
  name: 'apiComponent',
  component: sceneComponent
})
