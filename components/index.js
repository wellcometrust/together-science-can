import './index.scss';

import { nodeList } from 'utils';

import customPlayButton from './common-js/customPlay.js';

import setupForm from './patterns/form/form.js';
import shareButton from './patterns/share-panel/shareButton.js';
import flipCard from './patterns/card/card.js';

const initialize = function() {
  // select all signup forms
  const forms = nodeList(document.getElementsByClassName('form__content'));
  forms.forEach(form => setupForm(form));

  const shareButtons = nodeList(document.getElementsByClassName('share-button'));
  shareButtons.forEach(button => shareButton(button));

  const flipCardWrappers = nodeList(document.getElementsByClassName('card-wrapper'));
  flipCardWrappers.forEach(wrapper => flipCard(wrapper));

  const customPlayWrappers = nodeList(document.getElementsByClassName('custom-play'));
  customPlayWrappers.forEach(wrapper => customPlayButton(wrapper));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', e => {
    initialize();
  });
} else {
  initialize();
}
