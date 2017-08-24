const flipCard = cardWrapper => {
  // do some preliminary feature checks
  if (!('CSS' in window)) return;
  if (!window.CSS.supports('transform', 'rotate3d(0,1,0,180deg)')) return;

  const tail = cardWrapper.querySelector('.card--tail');
  if (!tail) return;

  const button = cardWrapper.querySelector('.card--head .button');
  if (!button) return;

  button.addEventListener('click', e => {
    e.preventDefault();
    cardWrapper.classList.toggle('card-wrapper--flipped');
  });
};

export default flipCard;
