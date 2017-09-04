const POSTS_PER_PAGE = 4;
const POSTS_ENDPOINT = 'https://wellcome.ac.uk/together-science-can/instagram';
const CURRENT_POST_CLASS = 'social-feed__post--current';

/* 'previous page' handler */
const previous = (posts, prevButton, nextButton) => e => {
  // we find the first post element which is shown on the current page
  const firstCurrentIndex = posts
    .filter(p => p.classList.contains(CURRENT_POST_CLASS))
    .map((p, i) => {
      // we can already remove the 'current' class from all posts
      p.classList.remove(CURRENT_POST_CLASS);
      return posts.indexOf(p);
    })
    .shift();
  // find the first post on the previous page (bottom-clamp to 0)
  const firstPreviousIndex = Math.max(0, firstCurrentIndex - POSTS_PER_PAGE);
  if (firstPreviousIndex === 0) prevButton.classList.add('social-feed__button--hidden');
  nextButton.classList.remove('social-feed__button--hidden');
  // activate the previous page
  posts
    .slice(firstPreviousIndex, firstPreviousIndex + POSTS_PER_PAGE)
    .forEach(p => p.classList.add(CURRENT_POST_CLASS));
};

/* 'next page' handler - equivalent to previous() with slight algorithmic differences */
const next = (posts, prevButton, nextButton) => e => {
  const lastCurrentIndex = posts
    .filter(p => p.classList.contains(CURRENT_POST_CLASS))
    .map((p, i) => {
      p.classList.remove(CURRENT_POST_CLASS);
      return posts.indexOf(p);
    })
    .pop();

  const firstNextIndex = Math.min(posts.length, lastCurrentIndex + 1);

  if (firstNextIndex === posts.length - 1) nextButton.classList.add('social-feed__button--hidden');
  prevButton.classList.remove('social-feed__button--hidden');

  posts
    .slice(firstNextIndex, firstNextIndex + POSTS_PER_PAGE)
    .forEach(p => p.classList.add(CURRENT_POST_CLASS));
};

/**
 * Binds interactive 'carousel' functionality to a collection of Instagram post embeds
 *
 * @param      {array<HTMLElement>}  posts       An array of HTML post embeds
 * @param      {HTMLElement}  prevButton  The 'previous page' button
 * @param      {HTMLElement}  nextButton  The 'next page' button
 * @return     {void}
 */
const carousel = (posts, prevButton, nextButton) => {
  prevButton.addEventListener('click', previous(posts, prevButton, nextButton));
  nextButton.addEventListener('click', next(posts, prevButton, nextButton));
};

/**
 * returns a functor which renders an Instagram post into the given container
 *
 * @param      {HTMLElement}  container  The container to insert the HTML fragment into
 * @return     {Function}  the functor used to map over the posts data
 */
const renderPost = container => (post, index) => {
  const postContainer = document.createElement('div');
  postContainer.classList.add('social-feed__post');
  postContainer.innerHTML = post.html;
  // show first POSTS_PER_PAGE posts
  if (index < POSTS_PER_PAGE) postContainer.classList.add(CURRENT_POST_CLASS);

  container.appendChild(postContainer);

  return postContainer;
};

/**
 * Dynamically loads embedded posts from Instagram into a paginated feed.
 *
 * @param      {HTMLElement}  container   The container
 * @param      {HTMLElement}  prevButton  The 'previous page' button
 * @param      {HTMLElement}  nextButton  The 'next page' button
 * @return     {void}
 */
const loadSocialPosts = (container, prevButton, nextButton) => {
  if (!container || !prevButton || !nextButton) return;

  const xhr = new window.XMLHttpRequest();
  xhr.open('GET', POSTS_ENDPOINT);
  xhr.addEventListener('load', e => {
    if (xhr.status === 200) {
      try {
        const data = JSON.parse(xhr.responseText);
        // empty the container
        while (container.firstChild) container.removeChild(container.lastChild);

        const posts = data.map(renderPost(container));
        // interactivity
        carousel(posts, prevButton, nextButton);

        const processEmbeds = () => {
          // render all instagram embeds (relies on the instagram embeds.js script having been loaded)
          if ('instgrm' in window) window.instgrm.Embeds.process();
          else setTimeout(processEmbeds, 2000);
        };

        processEmbeds();
      } catch (err) {
        console.error('Failed to load posts with error:', err);
      }
    }
  });
  xhr.send();
};

export { loadSocialPosts };
