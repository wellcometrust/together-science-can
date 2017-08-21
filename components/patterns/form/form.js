import { nodeList } from 'utils';

const disableSubmit = submit => {
  submit.disabled = true;
  submit.classList.add('button--loading');
};

const submitForm = (form, callback) => {
  const data = new window.FormData(form);
  const xhr = new window.XMLHttpRequest();

  xhr.addEventListener('load', callback);

  xhr.open(form.method, form.action);
  xhr.send(data);
};

const setupForm = formWrapper => {
  const form = formWrapper.querySelector('form');
  if (!form) return;

  const submit = nodeList(form.elements).filter(el => el.type === 'submit')[0];

  const success = formWrapper.parentElement.querySelector('.form__success');

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (form.checkValidity()) {
      disableSubmit(submit);
      submitForm(form, () => {
        formWrapper.classList.add('form__content--success');
        success.classList.add('form_success--visible');
      });
    }
  });
};

export default setupForm;
