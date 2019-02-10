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
