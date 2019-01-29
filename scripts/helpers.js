export function isVideoHref(str) {
  const re = new RegExp(`(Youtu|Vimeo|youtu|vimeo)`)
  return re.test(str)
}

export function getVideoSource(str) {
  if (str.includes('youtu') || str.includes('Youtu')) {
    return 'youtube'
  }
  return 'vimeo'
}

const MODAL_HASH = 'modal'
export function isModalHash(str) {
  const re = new RegExp(`(#${MODAL_HASH})`)
  return re.test(str)
}

const ACTION_PARAM = '?action='
export function getModalAction(str) {
  if (str.includes(ACTION_PARAM)) {
    return str.substring(str.lastIndexOf(ACTION_PARAM) + ACTION_PARAM.length)
  }
  return undefined
}

export function stripString(string, strip) {
  return string.replace(strip, '')
}
