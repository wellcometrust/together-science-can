const POSTS_ENDPOINT = 'http://dev.wmdev.ratliffe/tsc-medium-latest-content.json';

/**
 * Dynamically loads embedded posts from Instagram into a paginated feed.
 *
 * @param      {HTMLElement}  container   The container
 * @param      {HTMLElement}  prevButton  The 'previous page' button
 * @param      {HTMLElement}  nextButton  The 'next page' button
 * @return     {void}
 */
const loadMediumPosts = (container) => {
  const xhr = new window.XMLHttpRequest();
  xhr.open('GET', POSTS_ENDPOINT);
  xhr.addEventListener('load', e => {
    if (xhr.status === 200) {
      try {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        const cards = container.querySelectorAll('.card-wrapper');
        console.log(cards);
        cards.forEach((node, i) => {
          console.log(node);
          const post = data[i];
          node.querySelectorAll('img')[0].setAttribute('src', post.image_url);
          node.querySelectorAll('.card__title')[0].innerText = post.title || 'here is some text';
          node.querySelectorAll('.card__body')[0].innerText = post.description || 'here is some text';
        });
        container.classList.remove('unloaded');
      } catch (err) {
        console.error('Failed to load posts with error:', err);
      }
    }
  });
  xhr.send();
};

export { loadMediumPosts };
