import './index.scss';

import { nodeList } from 'utils';

import customPlayButton from './common-js/customPlay.js';

import setupForm from './patterns/form/form.js';
import shareButton from './patterns/share-panel/shareButton.js';
import flipCard from './patterns/card/card.js';
import { loadIntroVideoAfterImage } from './intro-video/introVideo.js';
import { loadTextures } from './backgrounds/texturedBackgrounds.js';

import setupAnalytics from './common-js/analytics.js';

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

  const introVideo = document.querySelector('.intro-video__video');
  const introMask = document.querySelector('.intro-video__mask');
  loadIntroVideoAfterImage(introVideo, introMask);

  const backgrounds = nodeList(document.getElementsByClassName('background'));
  backgrounds.forEach(bg => loadTextures(bg));

  setupAnalytics();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', e => {
    initialize();
  });
} else {
  initialize();
}
