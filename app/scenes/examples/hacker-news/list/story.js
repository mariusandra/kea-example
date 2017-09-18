import React from 'react'
import { Link } from 'react-router-dom'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import getDomain from '~/scenes/examples/hacker-news/utils/get-domain'

export default ({ title, url, id, score, by, descendants, time }) =>
  <div className='hn-story'>
    <div className='first-line'>
      {url ? (
        <a href={url}>{title}</a>
      ) : (
        <Link to={`/examples/hackernews/item/${id}`}>{title}</Link>
      )}
      {url ? (
        <span className='small-line'> ({getDomain(url)})</span>
      ) : null}
    </div>
    <div className='small-line'>
      {score} points
      by <Link to={`/examples/hackernews/user/${by}`}>{by}</Link>
      {' '}
      {distanceInWordsToNow(time * 1000, { addSuffix: true }).split('about ').join('')}
      {' | '}
      <Link to={`/examples/hackernews/item/${id}`}>{descendants} comments</Link>
    </div>
  </div>
