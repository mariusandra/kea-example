import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/examples/github/index'

export default createScene({
  name: 'examplesGithub',
  component: sceneComponent
})
