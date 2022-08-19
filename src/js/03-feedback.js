import throttle from 'lodash.throttle';

// вытащили ссылку на форму
const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');
// const buttonForm = document.querySelector('button');

// слушатели на инпут и сабмит
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

// создали объект, куда будут сохраняться данные, введенные пользователям
const formData = {
  email: '',
  message: '',
};

// вызов функции с подставлением полей в форму из лок хранилища
getLocalValues();

// функция для сохранения в локальное хранилище под нужным нам именем и в нужном формате
function saveData() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;

  // полученные данные отправляю в локальное хранилище
  saveData();

  // console.log(formData);
}

// функция для получения данных из локального хранилища
function getLocalValues() {
  const savedData = localStorage.getItem('feedback-form-state');
  const parsedData = JSON.parse(savedData);

  // если в лок хранилище были данные, то подставь их в наши поля формы
  if (parsedData) {
    if (parsedData.email && parsedData.message) {
      input.value = parsedData.email;
      textarea.value = parsedData.message;
      return;
    }
  }
}

function onFormSubmit(event) {
  // предотвратили перезагрузку от браузера по умолчанию
  event.preventDefault();

  //очищаем поля формы и хранилище
  event.target.reset();
  localStorage.removeItem('feedback-form-state');

  console.log(formData);
}
