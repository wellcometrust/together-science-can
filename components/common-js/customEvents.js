
const categories = [
  {
    categoryName: 'Top navigation links',
    events: [
      {
        eventName: 'click',
        action: 'click',
        targetSelector: '.main-nav--desktop__item .button, .main-nav--mobile .button',
        label: function(e) { return this.innerText; }
      }
    ]
  },
  {
    categoryName: 'Anchors',
    events: [
      {
        eventName: 'click',
        action: 'click',
        targetSelector: '.intro__cta .button',
        label: 'Top of page - Watch the film'
      }
    ]
  },
  {
    categoryName: 'Videos',
    events: [
      {
        eventName: 'click',
        action: 'Play',
        targetSelector: '.film__wrapper .custom-play__button',
        label: 'Film'
      },
      {
        eventName: 'click',
        action: 'Play',
        targetSelector: '.film__wrapper .custom-play__button',
        label: 'Film'
      }
    ]
  },
  {
    categoryName: 'Downloads',
    events: [
      {
        eventName: 'click',
        action: function(e) { return this.getAttribute('download'); },
        targetSelector: '.flip-cards__cards .button[download]',
        label: 'Poster'
      },
      {
        eventName: 'click',
        action: function(e) { return this.getAttribute('download'); },
        targetSelector: '.downloads__cards .card-wrapper:first-of-type .button[download]',
        label: 'Indivdidual action kit'
      },
      {
        eventName: 'click',
        action: function(e) { return this.getAttribute('download'); },
        targetSelector: '.downloads__cards .card-wrapper:last-of-type .button[download]',
        label: 'Organisation action kit'
      }
    ]
  },
  {
    categoryName: 'Forms',
    events: [
      {
        eventName: 'click',
        action: 'Join now',
        targetSelector: '.section--primary-signup input[type="submit"]',
        label: 'Primary'
      },
      {
        eventName: 'click',
        action: 'Join now',
        targetSelector: '.section--secondary-signup input[type="submit"]',
        label: 'Secondary'
      },
      {
        eventName: 'click',
        action: 'Join now',
        targetSelector: '.flip-cards__cards .card-wrapper:first-of-type .card--head .button',
        label: 'Flip card'
      },
      {
        eventName: 'click',
        action: 'Join now',
        targetSelector: '.flip-cards__cards .card-wrapper:first-of-type .card--tail input[type="submit"]',
        label: 'Flip card submission'
      }
    ]
  },
  {
    categoryName: 'Social media',
    events: [
      {
        eventName: 'click',
        action: 'Share the film',
        targetSelector: '.section--film .share-button--facebook',
        label: 'Facebook'
      },
      {
        eventName: 'click',
        action: 'Share the film',
        targetSelector: '.section--film .share-button--twitter',
        label: 'Twitter'
      },
      {
        eventName: 'click',
        action: 'Share the film',
        targetSelector: '.section--film .share-button--email',
        label: 'Email'
      },
      {
        eventName: 'click',
        action: 'Share the website',
        targetSelector: '.section--primary-signup .share-button--facebook',
        label: 'Primary form - Facebook'
      },
      {
        eventName: 'click',
        action: 'Share the website',
        targetSelector: '.section--primary-signup .share-button--twitter',
        label: 'Primary form - Twitter'
      },
      {
        eventName: 'click',
        action: 'Share the website',
        targetSelector: '.section--primary-signup .share-button--email',
        label: 'Primary form - Email'
      },
      {
        eventName: 'click',
        action: 'Share the website',
        targetSelector: '.section--secondary-signup .share-button--facebook',
        label: 'Bottom of page form - Facebook'
      },
      {
        eventName: 'click',
        action: 'Share the website',
        targetSelector: '.section--secondary-signup .share-button--twitter',
        label: 'Bottom of page form - Twitter'
      },
      {
        eventName: 'click',
        action: 'Share the website',
        targetSelector: '.section--secondary-signup .share-button--email',
        label: 'Bottom of page form - Email'
      }
    ]
  },
  {
    categoryName: 'Footer links',
    events: [
      {
        eventName: 'click',
        action: 'Email',
        targetSelector: '.footer a[href^=mailto]',
        label: 'contact@togethersciencecan.org'
      },
      {
        eventName: 'click',
        action: 'click',
        targetSelector: '.footer__partner-logo',
        label: function(e) { return this.href || this.alt; }
      },
      {
        eventName: 'click',
        action: 'click',
        targetSelector: '.footer__contact__link--facebook',
        label: 'Facebook'
      },
      {
        eventName: 'click',
        action: 'click',
        targetSelector: '.footer__contact__link--twitter',
        label: 'Twitter'
      },
      {
        eventName: 'click',
        action: 'click',
        targetSelector: '.footer__contact__link--instagram',
        label: 'Instagram'
      }
    ]
  }
];

export { categories };
