import React from 'react'
import Highlight from '~/components/tags/highlight'

const code = {
  useValues: require('raw-loader!./code/use-values.txt'),
  useAllValues: require('raw-loader!./code/use-all-values.txt'),
  useActions: require('raw-loader!./code/use-actions.txt'),
  useMountedLogic: require('raw-loader!./code/use-mounted-logic.txt')
}

export default function Hooks () {
  return (
    <div className='api-scene'>
      <h2>Hooks</h2>
      <p>
        There are a few hooks available to use:
      </p>

      <h3>useMountedLogic</h3>
      <p>Assure that the logic is mounted when the component renders and is unmounted when the component is destroyed.</p>
      <Highlight className='javascript'>{code.useMountedLogic}</Highlight>

      <h3>useActions</h3>
      <p>Assure the logic is mounted and fetch actions from the logic. Actions are automatically connected to <code>dispatch</code>.</p>
      <Highlight className='javascript'>{code.useActions}</Highlight>

      <h3>useValues</h3>
      <p>Assure the logic is mounted and fetch values from it.</p>
      <p>
        <strong>NB!</strong> You can only use <code>useValues</code> with destructoring (<code>{'const { a, b } = useValues(logic)'}</code>).
        This is because internally <code>useValues</code> uses <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get'>getter functions</a> that
        call react-redux's <a href='https://react-redux.js.org/next/api/hooks#useselector'><code>useSelector</code></a> hooks when a value is accessed.
        Because hooks need to always be called in the same order, you <u>can't</u> just store the object returned from <code>useValues</code> and then use its properties
        later in the code. Doing so might call the internal hooks in an unspecified order. Use <code>useAllValues</code> if you need to do this.
      </p>
      <Highlight className='javascript'>{code.useValues}</Highlight>

      <h3>useAllValues</h3>
      <p>Similar to <code>useValues</code>, but selects all the values in the logic and stores their current state in an object.</p>
      <Highlight className='javascript'>{code.useAllValues}</Highlight>
    </div>
  )
}
