import './index.scss';

import { nodeList } from 'utils';

import setupForm from './patterns/form/form.js';

const initialize = function() {
  // select all signup forms
  const forms = nodeList(document.getElementsByClassName('form__content'));
  forms.forEach(form => setupForm(form));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', e => {
    initialize();
  });
} else {
  initialize();
}
