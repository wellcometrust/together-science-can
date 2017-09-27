import { nodeList } from 'utils';

const INVALID_CLASS = 'form-item--invalid';
const PROXY_ENDPOINT = 'https://wellcome.ac.uk/together-science-can-signup';

const disableSubmit = submit => {
  submit.disabled = true;
  submit.classList.add('button--loading');
};

const enableSubmit = submit => {
  submit.disabled = false;
  submit.classList.remove('button--loading');
};

/**
 * submits the form using XMLHttpRequest
 *
 * @param      {HTMLFormElement}  form       The form to submit
 * @param      {HTMLElement} submit    The submit button
 * @param      {function} callback     Function to call after the form has been submitted
 * @return     {void}
 */
const submitForm = (form, submit, callback) => {
  const data = nodeList(form.elements)
    .reduce((obj, el) => {
      obj[el.name] = el.value;
      return obj;
    }, {});

  // get only the information we need, strip hidden DM inputs
  const output = {
    first_name: data.cd_FIRSTNAME,
    country: data.cd_COUNTRY,
    email: data.Email
  };

  const xhr = new window.XMLHttpRequest();
  xhr.open('POST', PROXY_ENDPOINT, true);
  xhr.addEventListener('load', e => {
    if (xhr.status !== 200) {
      enableSubmit(submit);
      console.warn(JSON.parse(xhr.responseText));
      // this almost never happens, so we can just use alert
      window.alert('Could not submit the form. Please try again later.');
    } else {
      callback();
    }
  });

  xhr.send(JSON.stringify(output));
};

/**
 * sets up AJAX-like form submit functionality for a given wrapper element.
 * Assumes the presence of a <form>, a submit button inside, an iframe to execute submission and a separate element to show after the form has been submitted.
 *
 * @param      {HTMLElement}  formWrapper  The form wrapper element
 * @return     {void}
 */
const setupForm = formWrapper => {
  const form = formWrapper.querySelector('form');
  if (!form) return;

  const elements = nodeList(form.elements);
  const submit = elements.filter(el => el.type === 'submit')[0];

  const success = formWrapper.parentElement.querySelector('.form__success');

  elements.forEach(el => {
    el.addEventListener('invalid', e => el.classList.add(INVALID_CLASS));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    elements.forEach(el => el.classList.remove(INVALID_CLASS));

    if (form.checkValidity()) {
      disableSubmit(submit);

      submitForm(form, submit, () => {
        formWrapper.classList.add('form__content--success');
        success.classList.add('form__success--visible');
      });
    }
  });
};

export default setupForm;
