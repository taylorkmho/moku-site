export class ConvertLinksToModal {
  constructor(className) {
    if (
      document.querySelector(className).querySelectorAll('a') &&
      document.querySelector(className).querySelectorAll('a').length < 1
    ) {
      return
    }

    this.elements = document.querySelector(className).querySelectorAll('a')
    this.convertLinks()
  }

  convertLinks() {
    this.elements.forEach(el => {
      el.onclick = e => {
        if (!el.href.match(/(Youtube|Vimeo|youtube|vimeo)/g)) {
          return
        }
        e.preventDefault()
        console.log('🧨 open the modal')
      }
    })
  }
}
