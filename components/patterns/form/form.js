import { nodeList } from 'utils';

const INVALID_CLASS = 'form-item--invalid';

const disableSubmit = submit => {
  submit.disabled = true;
  submit.classList.add('button--loading');
};

/**
 * submits the form using a hidden <iframe> element to create an AJAX form-like experience.
 * The provided form is cloned in the <iframe> and submitted.
 * While this doesn't allow proper error handling, it's the only way to submit a cross-domain form without leaving the page.
 *
 * @param      {HTMLFormElement}  form       The form to submit
 * @param      {HTMLIFrameElement}  ajaxFrame  The <iframe> element to use for submission
 * @return     {void}
 */
const submitForm = (form, ajaxFrame) => {
  const formClone = ajaxFrame.contentDocument.importNode(form, true);
  ajaxFrame.contentDocument.body.appendChild(formClone);

  // ensure all values are the same (it's not guaranteed by importNode)
  nodeList(formClone.elements)
    .forEach((el, index) => el.value = form.elements[index].value);

  formClone.submit();
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

  const ajaxFrame = formWrapper.querySelector('.ajax-enabler');

  elements.forEach(el => {
    el.addEventListener('invalid', e => el.classList.add(INVALID_CLASS));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    elements.forEach(el => el.classList.remove(INVALID_CLASS));

    if (form.checkValidity()) {
      submitForm(form, ajaxFrame);
      disableSubmit(submit);
      formWrapper.classList.add('form__content--success');
      success.classList.add('form_success--visible');
    }
  });
};

export default setupForm;
