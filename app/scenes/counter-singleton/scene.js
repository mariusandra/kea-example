import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/counter-singleton/index'

export default createScene({
  name: 'counterSingleton',
  component: sceneComponent
})
