// eslint-disable-next-line no-unused-vars
let currentDropdown = null

module.exports = class Dropdown {
  constructor ({ el, useTabIndex = false }) {
    this.el = el
    this.button = el.previousElementSibling.firstElementChild
    this.value = el.nextElementSibling
    this.options = el.children
    this.config = { useTabIndex }
    this.caret = el.previousElementSibling.firstElementChild.lastElementChild
  }

  toggle (event) {
    event.preventDefault()
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

  hasCaret () {
    if (this.caret) {
      if (this.caret.classList.contains('caret')) {
        return true
      }
    }
    return false
  }

  updateCaret (selected) {
    if (this.hasCaret()) {
      if (selected) {
        this.caret.classList.add('selected')
      }
      this.button.innerHTML += this.caret.outerHTML
    }
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

    this.updateCaret(true)

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

    this.close()
  }

  tabIndex (el) {
    if (!this.config.useTabIndex) return
    el.setAttribute('tabIndex', '0')
  }

  init () {
    for (const option of this.options) {
      this.tabIndex(option)
    }
    this.setListener()
    return this
  }

  setListener () {
    this.button.addEventListener('click', this.toggle.bind(this))
    document.addEventListener('click', this.close.bind(this))

    'click keydown'.split(' ').forEach(eventType => {
      this.el.addEventListener(eventType, event => {
        if (eventType === 'keypress') {
          if (event.key === 'Escape') {
            this.close()
          } else if (event.key != 'Enter') {
            return
          }
        }
        if (
          event.target.classList.contains('option') &&
          !event.target.classList.contains('disabled')
        ) {
          this.choose(event)
        }
      })
    })
  }
}
