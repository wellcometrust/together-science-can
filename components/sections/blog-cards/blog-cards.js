const POSTS_ENDPOINT = 'http://dev.wmdev.ratliffe/tsc-medium-latest-content.json';
const { monthNames } = require('../../common-js/utils');
/**
 * Dynamically loads embedded posts from Medium into a cards.
 *
 * @param      {HTMLElement}  container   The container of the blog posts
 * @return     {void}
 */
const loadMediumPosts = (container) => {
  const xhr = new window.XMLHttpRequest();
  xhr.open('GET', POSTS_ENDPOINT);
  xhr.addEventListener('load', e => {
    if (xhr.status === 200) {
      try {
        const data = JSON.parse(xhr.responseText);
        const cards = container.querySelectorAll('.card-wrapper');
        cards.forEach((node, i) => {
          const post = data[i];
          const date = new Date(post.date);
          node.querySelectorAll('img')[0].setAttribute('src', post.image_url);
          node.querySelectorAll('.card__subtitle')[0].innerText = post.title || 'here is some text';
          node.querySelectorAll('.card__body')[0].innerText = post.description || 'here is some text';
          node.querySelectorAll('.card__footer')[0].innerText = monthNames[date.getMonth()] + ' ' + date.getDate();
          node.querySelectorAll('a')[0].href = post.post_url;
        });
        document.querySelectorAll('.blog-cards__header')[0].classList.remove('unloaded');
        container.classList.remove('unloaded');
      } catch (err) {
        console.error('Failed to load posts with error:', err);
      }
    }
  });
  xhr.send();
};

export { loadMediumPosts };
