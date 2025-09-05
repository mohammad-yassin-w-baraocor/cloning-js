import throttle from 'lodash.throttle';

const form = document.querySelector('form.feedback-form');
const emailel = document.querySelector('label [type = "email"]');
const messsageel = document.querySelector('label [name="message"]');

const STORAGE_KEY = 'feedback-form-state';

function onReloadPage() {
  const savemessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savemessage) {
    emailel.value = savemessage.email;
    messsageel.value = savemessage.messages;
  }
}
onReloadPage();

function ontyp() {
  const email = emailel.value;
  const messages = messsageel.value;

  let messaged = {
    email,
    messages,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messaged));
}
form.addEventListener('input', throttle(ontyp, 500));
function onsubmit(event) {
  event.preventDefault();
  const email = emailel.value;
  const messages = messsageel.value;
  if (email == '' || messages == '') {
    alert('Enter both input parameter');
    form.reset();
  }
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}

form.addEventListener('submit', onsubmit);
