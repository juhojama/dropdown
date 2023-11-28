## Initialise

```
let dropdown = new Dropdown(element)
dropdown.setListener()
```

You can monitor changes in dropdown by following ways:

1.  Listen for the custom event 'dropdownChange'

```
dropdown.el.addEventListener('dropdownChange', function (event) {
console.log('User chose option with value: ' + event.detail.value);
console.log('Option label: ' + event.detail.label);
});
```

2.  Use MutationObserver:

```
let observer = new MutationObserver((mutations) => {
   mutations.forEach((mutation) => {
       if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
           console.log('Input value has changed:', mutation.target.value);
       }
   });
});


let hiddenInputs = document.querySelectorAll('input[type="hidden"]');
hiddenInputs.forEach((input) => {
   observer.observe(input, {
       attributes: true,
       attributeFilter: ['value']
   });
});
```
