import { nodeList } from 'utils';
import { trackScrollDepth } from './scrollDepth.js';
import { categories } from './customEvents.js';

/**
 * Sends a GA event with provided params.
 *
 * @param      {string}  category  The category
 * @param      {string}  action    The action
 * @param      {string}  label     The label
 * @return     {void}
 */
const sendEvent = (category, action, label) => {
  window[window.GoogleAnalyticsObject](
    'send', 'event', category, action, label
  );
};

/**
 * Sets up tracking for the provided events category object
 *
 * @param      {object}  category  The category
 * @return     {void}
 */
const trackCategory = category => {
  category.events.forEach(event => trackEvent(category.categoryName)(event));
};

/**
 * Creates a function which tracks the provided event within the specified category
 *
 * @param      {string}  category  The category
 * @return     {Function}  the event binding function
 */
const trackEvent = category => event => {
  const elements = nodeList(document.querySelectorAll(event.targetSelector));

  elements.forEach(el => el.addEventListener(event.eventName, e => {
    const label = typeof event.label === 'function'
      ? event.label.bind(el)(e)
      : event.label;

    const action = typeof event.action === 'function'
      ? event.action.bind(el)(e)
      : event.action;

    sendEvent(category, action, label);
  }));
};

/**
 * Initiates events tracking for analytics
 */
export default function setupAnalytics() {
  if (ENV.development) return;

  trackScrollDepth([0.25, 0.5, 0.75, 0.9]);
  categories.forEach(trackCategory);
};
