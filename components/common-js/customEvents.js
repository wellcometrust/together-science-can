
const categories = [
  {
    categoryName: 'Header links',
    events: [
      {
        eventName: 'click',
        action: 'click',
        targetSelector: '.main-nav--desktop__item .button, .main-nav--mobile .button',
        label: function(e) { return this.innerText; }
      }
    ]
  }
];

export { categories };
