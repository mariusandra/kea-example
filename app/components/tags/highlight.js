// code from the "react-highlight" package, but made to work with react 16
// https://raw.githubusercontent.com/akiran/react-highlight/master/src/optimized.js

import hljs from 'highlight.js/lib/highlight'
import React from 'react'
import ReactDOM from 'react-dom'

class Highlight extends React.Component {
  componentDidMount () {
    this.highlightCode()
  }

  componentDidUpdate () {
    this.highlightCode()
  }

  setRef = (ref) => { this._preRef = ref }

  highlightCode () {
    const {className, languages} = this.props
    const domNode = ReactDOM.findDOMNode(this._preRef)
    const nodes = domNode.querySelectorAll('code')

    if ((languages.length === 0) && className) {
      languages.push(className)
    }

    languages.forEach(lang => {
      hljs.registerLanguage(lang, require('highlight.js/lib/languages/' + lang))
    })

    let i
    for (i = 0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i])
    }
  }

  render () {
    const {children, className} = this.props

    return <pre ref={this.setRef}><code className={className}>{children}</code></pre>
  }
}

Highlight.defaultProps = {
  className: '',
  languages: []
}

export default Highlight
