const closeMessage = message => () => {
  document.cookie = 'tsc_cookie_seen=true';
  message.parentElement.removeChild(message);
};

const cookieMessage = message => {
  const closeButton = message.querySelector('.cookie-message__close');
  if (!closeButton) return message;

  const close = closeMessage(message);
  if (/tsc_cookie_seen/.test(document.cookie)) close();

  closeButton.addEventListener('click', e => e.preventDefault() ^ close());
  return message;
};

export { cookieMessage };
