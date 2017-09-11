let domainCache = {}

export default function (url) {
  if (domainCache[url]) {
    return domainCache[url]
  }
  var link = document.createElement('a')
  link.setAttribute('href', url)
  var parts = link.hostname.split('.')

  domainCache[url] = parts.slice(parts.length - 2, parts.length).join('.')

  return domainCache[url]
}
