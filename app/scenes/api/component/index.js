import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Highlight from '~/components/tags/highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt'),
  decorators: require('raw-loader!./code/decorators.txt'),
  stateless: require('raw-loader!./code/stateless.txt'),
  path: require('raw-loader!./code/path.txt'),
  key: require('raw-loader!./code/key.txt'),
  selectors: require('raw-loader!./code/selectors.txt')
}

export default class API extends Component {
  render () {
    return (
      <div className='api-scene'>
        <h2><code>kea(options)(Component)</code></h2>
        <p>
          Wrap a kea logic store around a React component.
        </p>
        <p>
          The React component will receive all of the logic store's selectors in <code>this.props</code> and all actions under <code>this.actions</code>.
        </p>
        <Highlight className='javascript'>{code.usage}</Highlight>
        <p>
          It's up to you if you wish to use decorators or not:
        </p>
        <Highlight className='javascript'>{code.decorators}</Highlight>
        <p>
          See the <Link to='/guide/installation'>installation guide</Link> for details.
        </p>

        <h3>Stateless functional components</h3>
        <p>
          You may also use kea with stateless functional components. The syntax can get quite <em>lispy</em> with all the brackets, but it works:
        </p>
        <Highlight className='javascript'>{code.stateless}</Highlight>

        <h3>Options</h3>
        <p>
          Wrapped logic stores accept all the same options as regular logic stores.
          See the documentation for <code><Link to='/api/logic'>{'kea(options)'}</Link></code> for more details.
        </p>
        <p>
          These options are different:
        </p>

        <h4>key: <code>(props) => 'key'</code></h4>
        <p>
          If you wish, you may define a <code>key</code> that distinguishes instances of the component.
        </p>
        <p>
          Read the <Link to='/guide/counter-dynamic'>dynamic counter guide</Link> guide to learn about in more depth!
        </p>
        <Highlight className='javascript'>{code.key}</Highlight>

        <h4>path: <code>(key) => []</code></h4>
        <p>
          The path takes the key as an argument if you wish to define the location in redux for the component instance
        </p>
        <Highlight className='javascript'>{code.path}</Highlight>

        <h4>selectors: <code>{'({ path, constants, actions, selectors }) => ({})'}</code></h4>
        <p>
          The <code>selectors</code> have an additional feature with wrapped logic stores. You can access the <code>props</code> passed to
          your component like so:
        </p>
        <Highlight className='javascript'>{code.selectors}</Highlight>
      </div>
    )
  }
}

