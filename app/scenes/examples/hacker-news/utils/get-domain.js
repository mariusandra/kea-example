let domainCache = {}

export default function (url) {
  if (domainCache[url]) {
    return domainCache[url]
  }
  const link = document.createElement('a')
  link.setAttribute('href', url)
  const parts = link.hostname.split('.')

  const withCo = parts.length > 2 && parts[parts.length - 2] === 'co'

  domainCache[url] = parts.slice(parts.length - (withCo ? 3 : 2), parts.length).join('.')

  return domainCache[url]
}
