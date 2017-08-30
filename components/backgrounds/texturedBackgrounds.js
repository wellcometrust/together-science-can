const loadTextures = background => {
  const image = background.querySelector('.background__image');
  if (!image) return;

  if (image.complete) {
    background.classList.add('background--textured');
  } else {
    image.addEventListener('load', e => background.classList.add('background--textured'));
  }
};

export { loadTextures };
