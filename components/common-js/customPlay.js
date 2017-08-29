const playVideo = (iframe, button) => e => {
  const message = JSON.stringify({
    event: 'command',
    func: 'playVideo',
    args: []
  });

  button.classList.remove('custom-play__button--visible');
  iframe.contentWindow.postMessage(message, '*');
};

const customPlayButton = wrapper => {
  const iframe = wrapper.querySelector('.custom-play__iframe');
  const button = wrapper.querySelector('.custom-play__button');
  if (!iframe || !button) return;

  button.classList.add('custom-play__button--visible');
  button.addEventListener('click', playVideo(iframe, button));
};

export default customPlayButton;
