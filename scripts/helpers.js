export function isValidEmail(str) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(str)
}

export function isValidImage(str) {
  const re = /\.(gif|jpg|jpeg|tiff|png)$/i
  return re.test(str)
}

export function isMailchimpLink(str) {
  const re = new RegExp(`(eepurl)`)
  return re.test(str)
}

export function isVideoHref(str) {
  const re = new RegExp(`(Youtu|Vimeo|youtu|vimeo)`)
  return re.test(str)
}

export function isTypeformHref(str) {
  const re = new RegExp(`(typeform)`)
  return re.test(str)
}

export function getVideoSource(str) {
  if (str.includes('youtu') || str.includes('Youtu')) {
    return 'youtube'
  }
  return 'vimeo'
}

export function stripString(string, strip) {
  return string.replace(strip, '')
}

export function setDefaults(options, defaults) {
  return Object.assign({}, defaults, options)
}

export function getYoutubeId(str) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  const match = str.match(regExp)
  return match && match[7].length == 11 ? match[7] : false
}

export function mapResourceType(typeStr, plural) {
  switch (typeStr) {
    case 'resource-essay':
      return plural ? 'Essays' : 'Essay'
      break
    case 'resource-video':
      return plural ? 'Videos' : 'Video'
      break
    case 'resource-gallery':
      return plural ? 'Galleries' : 'Gallery'
      break
    default:
      return ''
  }
}

export function getUrlParameter(name) {
  let url = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + url + '=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export function stripHTML(html) {
  let tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

export function shorten(str, maxLen, separator = ' ') {
  if (str.length <= maxLen) return str
  return str.substr(0, str.lastIndexOf(separator, maxLen))
}

export function getLocation(href) {
  let l = document.createElement('a')
  l.href = href
  return l
}
