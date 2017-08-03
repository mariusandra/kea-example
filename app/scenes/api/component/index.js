import React, { Component } from 'react'
import { kea } from 'kea'
import { push } from 'react-router-redux'

import Highlight from 'react-highlight'

const code = {
  usage: require('raw-loader!./code/usage.txt'),
  decorators: require('raw-loader!./code/decorators.txt'),
  path: require('raw-loader!./code/path.txt'),
  key: require('raw-loader!./code/key.txt'),
  selectors: require('raw-loader!./code/selectors.txt')
}

@kea({})
export default class API extends Component {
  handleRoute = (e) => {
    const { dispatch } = this.props
    const href = e.target.attributes.href.value

    e.preventDefault()
    dispatch(push(href))
    window.scrollTo(0, 0)
  }

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
          See the <a href='/guide/installation' onClick={this.handleRoute}>installation guide</a> for details.
        </p>
        <h3>Options</h3>
        <p>
          Wrapped logic stores accept all the same options as regular logic stores.
          See the documentation for <code><a href='/api/logic' onClick={this.handleRoute}>{'kea(options)'}</a></code> for more details.
        </p>
        <p>
          These options are different:
        </p>

        <h4>key: <code>(props) => 'key'</code></h4>
        <p>
          If you wish, you may define a <code>key</code> that distinguishes instances of the component
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

