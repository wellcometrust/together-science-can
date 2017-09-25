import debounce from 'debounce';
import currentBreakpoint from '../../common-js/breakpoints.js';

const PAGE_SIZES = { s: 4, m: 3, l: 4 };
const POSTS_ENDPOINT = 'https://wellcome.ac.uk/together-science-can/instagram';
const CURRENT_POST_CLASS = 'social-feed__post--current';
const DEBOUNCE_INTERVAL = 200;

/**
 * Creates a function which will return the number of posts per page adaptively, based on breakpoints
 *
 * @param      {object}  sizes   Page sizes at each breakpoint (s, m, l)
 * @return     {function}  Function which returns posts per page
 */
const getPostsPerPage = sizes => {
  let currentPageSize = sizes[currentBreakpoint()];

  window.addEventListener('resize', debounce(e => {
    currentPageSize = sizes[currentBreakpoint()];
  }), DEBOUNCE_INTERVAL);

  return () => currentPageSize;
};

let postsPerPage = getPostsPerPage(PAGE_SIZES);

/**
 * Adaptively ensures that we always display the right number of posts across breakpoints
 *
 * @param      {Array<HTMLElement>}  posts   List of posts to observe
 * @return     {Array<HTMLElement>}  posts   Same as input for chaining
 */
const observeCurrentPageSize = posts => {
  window.addEventListener('resize', debounce(e => {
    const firstCurrentIndex = getFirstCurrentIndex(posts);
    const endOfPageIndex = Math.min(posts.length, firstCurrentIndex + postsPerPage());

    posts
      .slice(firstCurrentIndex, endOfPageIndex)
      .forEach(p => p.classList.add(CURRENT_POST_CLASS));
  }), DEBOUNCE_INTERVAL);

  return posts;
};

/* gets the index of the first currently visible post */
const getFirstCurrentIndex = posts => posts
  .filter(p => p.classList.contains(CURRENT_POST_CLASS))
  .map((p, i) => {
    // we can already remove the 'current' class from all posts
    p.classList.remove(CURRENT_POST_CLASS);
    return posts.indexOf(p);
  })
  .shift();

/* gets the index of the last currently visible post */
const getLastCurrentIndex = posts => posts
  .filter(p => p.classList.contains(CURRENT_POST_CLASS))
  .map((p, i) => {
    p.classList.remove(CURRENT_POST_CLASS);
    return posts.indexOf(p);
  })
  .pop();

/* 'previous page' handler */
const previous = (posts, prevButton, nextButton) => e => {
  // we find the first post element which is shown on the current page
  const firstCurrentIndex = getFirstCurrentIndex(posts);
  // find the first post on the previous page (bottom-clamp to 0)
  const firstPreviousIndex = Math.max(0, firstCurrentIndex - postsPerPage());
  if (firstPreviousIndex === 0) prevButton.classList.add('social-feed__button--hidden');
  nextButton.classList.remove('social-feed__button--hidden');
  // activate the previous page
  posts
    .slice(firstPreviousIndex, firstPreviousIndex + postsPerPage())
    .forEach(p => p.classList.add(CURRENT_POST_CLASS));
};

/* 'next page' handler - equivalent to previous() with slight algorithmic differences */
const next = (posts, prevButton, nextButton) => e => {
  const lastCurrentIndex = getLastCurrentIndex(posts);
  const firstNextIndex = Math.min(posts.length, lastCurrentIndex + 1);

  if (firstNextIndex + 4 >= posts.length - 1) nextButton.classList.add('social-feed__button--hidden');
  prevButton.classList.remove('social-feed__button--hidden');

  posts
    .slice(firstNextIndex, firstNextIndex + postsPerPage())
    .forEach(p => p.classList.add(CURRENT_POST_CLASS));
};

/**
 * Binds interactive 'carousel' functionality to a collection of Instagram post embeds
 *
 * @param      {array<HTMLElement>}  posts       An array of HTML post embeds
 * @param      {HTMLElement}  prevButton  The 'previous page' button
 * @param      {HTMLElement}  nextButton  The 'next page' button
 * @return     {array<HTMLElement>}   The posts array (for chaining)
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
  const postContainer = document.createElement('li');
  postContainer.classList.add('social-feed__post');
  postContainer.innerHTML = post.html;
  // show first `postsPerPage` posts
  if (index < postsPerPage()) postContainer.classList.add(CURRENT_POST_CLASS);

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

  const fallbackButton = container.querySelector('.social-feed__post--fallback');

  const xhr = new window.XMLHttpRequest();
  xhr.open('GET', POSTS_ENDPOINT);
  xhr.addEventListener('load', e => {
    if (xhr.status === 200) {
      try {
        const data = JSON.parse(xhr.responseText);
        container.removeChild(fallbackButton);
        container.classList.add('social-feed__feed--loaded');

        const posts = data
          .map(renderPost(container))
          .concat(fallbackButton ? [ fallbackButton ] : []);

        container.appendChild(fallbackButton);

        // interactivity
        carousel(
          observeCurrentPageSize(posts),
          prevButton, nextButton
        );

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
