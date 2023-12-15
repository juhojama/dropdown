# Dropdown

A work-in-progress dropdown module meticulously crafted to seamlessly integrate with predominantly vanilla Javascript applications.

## Markup

Use it with simple text values:

```HTML
<div class="dropdown-button">
    <button>Choose an option</button>
</div>
<div class="dropdown">
    <div class="option" data-value="1">
        Option 1
    </div>
    <div class="option" data-value="2">
        Option 2
    </div>
    <div class="option" data-value="3">
        Option 3
    </div>
</div>
<input type="hidden" class="dropdown-value">
```

Or with span element and text:

```HTML
<div class="dropdown-button">
  <button>Choose an emoji</button>
</div>
<div class="dropdown">
  <div class="option" data-value="1">
    <span>👾</span> Games
  </div>
  <div class="option" data-value="2">
    <span>🤖</span> Robots
  </div>
  <div class="option" data-value="3">
    <span>🎃</span> Pumpkins
  </div>
</div>
<input type="hidden" class="dropdown-value">
```

## Initialise

Import the module:

```javascript
const Dropdown = require('@juhojama/dropdown')
```

```javascript
let dropdown = new Dropdown(element)
dropdown.setListener()
```

You can monitor changes in dropdown by following ways:

1.  Listen for the custom event 'dropdownChange'

```javascript
dropdown.el.addEventListener('dropdownChange', function (event) {
  console.log('User chose option with value: ' + event.detail.value)
  console.log('Option label: ' + event.detail.label)
})
```

2.  Use MutationObserver:

```javascript
let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
      console.log('Input value has changed:', mutation.target.value)
    }
  })
})

let hiddenInputs = document.querySelectorAll('input[type="hidden"]')
hiddenInputs.forEach(input => {
  observer.observe(input, {
    attributes: true,
    attributeFilter: ['value']
  })
})
```
