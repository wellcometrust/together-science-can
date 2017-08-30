import { nodeList } from 'utils';
/**
 * Kicks off loading of the specified video
 *
 * @param      {HTMLVideoElement}  video   The video
 * @return     {void}
 */
const loadVideo = video => {
  const sources = nodeList(video.querySelectorAll('source'));
  sources.forEach(source => source.src = source.getAttribute('data-src'));

  const parent = video.parentNode;
  parent.removeChild(video);
  parent.appendChild(video);
  video.play();
};
/**
 * Loads the specified video only after the specified image has loaded.
 *
 * @param      {HTMLVideoElement}  video   The video
 * @param      {HTMLImageElement}  image   The image
 * @return     {void}
 */
const loadIntroVideoAfterImage = (video, image) => {
  if (image.complete) {
    loadVideo(video);
  } else {
    image.addEventListener('load', e => loadVideo(video));
  }
};

export { loadIntroVideoAfterImage };
