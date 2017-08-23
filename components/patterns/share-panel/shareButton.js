const setupShareButton = button => {
  button.addEventListener('click', e => {
    if (button.href.indexOf('mailto:') === 0) return;

    e.preventDefault();
    // open a new window (dimensions similar to BBC's share popups)
    window.open(button.href, button.target, 'width=550, height=470, resizable=yes');
  });
};

export default setupShareButton;
