import React from 'react'
import { Link } from 'react-router-dom'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

export default ({ text, by, time }) =>
  <div className='comment'>
    <div className='small-line'>
      <Link to={`/examples/hackernews/user/${by}`}>{by}</Link>
      {' '}
      {distanceInWordsToNow(time * 1000, { addSuffix: true }).split('about ').join('')}
    </div>
    <div dangerouslySetInnerHTML={{ __html: text }} />
  </div>
