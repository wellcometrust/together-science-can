const flipCard = cardWrapper => {
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
