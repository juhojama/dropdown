// eslint-disable-next-line no-unused-vars
let currentDropdown = null

module.exports = class Dropdown {
  constructor (el) {
    this.el = el
    this.button = el.previousElementSibling
    this.value = el.nextElementSibling
    this.options = el.children
  }

  toggle (event) {
    event.stopPropagation()
    if (currentDropdown) {
      currentDropdown.classList.remove('show')
    }
    this.el.classList.toggle('show')
    currentDropdown = this.el
  }

  close () {
    this.el.classList.remove('show')
  }

  choose (event) {
    let label = ''
    if (event.target.firstElementChild !== null) {
      if (event.target.firstElementChild.tagName === 'SPAN') {
        this.button.innerHTML = event.target.firstElementChild.outerHTML
        if (event.target.firstElementChild.nextSibling !== null) {
          label = event.target.firstElementChild.nextSibling.textContent
            ? event.target.firstElementChild.nextSibling.textContent
            : event.target.firstElementChild.nextSibling.innerText
        }
      }
    } else {
      this.button.innerHTML = event.target.outerHTML
      label = event.target.innerHTML
    }

    let value = event.target.dataset.value
    this.value.value = value
    this.value.dataset.value = value

    this.value.dataset.label = label

    let dropdownEvent = new CustomEvent('dropdownChange', {
      detail: {
        value: event.target.dataset.value,
        label: label
      }
    })

    this.el.dispatchEvent(dropdownEvent)
  }

  setListener () {
    this.button.addEventListener('click', this.toggle.bind(this))
    document.addEventListener('click', this.close.bind(this))

    this.el.addEventListener('click', event => {
      if (
        event.target.classList.contains('option') &&
        !event.target.classList.contains('disabled')
      ) {
        this.choose(event)
      }
    })
  }
}
