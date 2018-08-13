const POSTS_ENDPOINT = 'https://wellcome.ac.uk/tsc-medium-latest-content.json';
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
        const posts = data.reverse();
        const cards = container.querySelectorAll('.card-wrapper');
        cards.forEach((node, i) => {
          const post = posts[i];
          const date = new Date(post.date);
          node.querySelectorAll('img')[0].setAttribute('src', post.image_url);
          node.querySelectorAll('.card__subtitle')[0].innerText = post.title;
          node.querySelectorAll('.card__body')[0].innerText = post.description;
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
