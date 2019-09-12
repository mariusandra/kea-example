import React, { Component } from 'react'
import Highlight from '~/components/tags/highlight'
import { Link } from 'react-router-dom'

const code = {
  reset: require('raw-loader!./code/reset.txt'),
  get: require('raw-loader!./code/get.txt')
}

export default function Context () {
  return (
    <div className='api-scene'>
      <h2>Context</h2>
      <p>
        Kea stores all of its runtime data on a context. This context must be reset before you can use your app.
      </p>

      <h3>resetContext</h3>
      <p>Call <code>resetContext</code> before you render your app and connect all the different plugins to it.</p>
      <p>Here are all the options you can pass to it:</p>
      <Highlight className='javascript'>{code.reset}</Highlight>

      <h3>getContext</h3>
      <p>Call <code>getContext()</code> from anywhere to peek into the context</p>
      <Highlight className='javascript'>{code.get}</Highlight>
    </div>
  )
}
