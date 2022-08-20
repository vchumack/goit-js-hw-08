import throttle from 'lodash.throttle';

// вытащили ссылку на форму
const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');
// const buttonForm = document.querySelector('button');

// слушатели на инпут и сабмит
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

let parsedData = null;

// вызов функции с подставлением полей в форму из лок хранилища
getLocalValues();

// создали объект, куда будут сохраняться данные, введенные пользователям
// если у parsedData есть email/message, тогда выполняй проверку дальше, если нет, сразу выходи
const formData = {
  email: parsedData?.email ? parsedData.email : '',
  message: parsedData?.message ? parsedData.message : '',
};

// функция для сохранения в локальное хранилище под нужным нам именем и в нужном формате
function saveData() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;

  // полученные данные отправляю в локальное хранилище
  saveData();
}

// функция для получения данных из локального хранилища
function getLocalValues() {
  const savedData = localStorage.getItem('feedback-form-state');
  parsedData = JSON.parse(savedData);

  // если в лок хранилище были данные, то подставь их в наши поля формы
  if (parsedData) {
    console.log(parsedData);
    if (parsedData.email && parsedData.message) {
      input.value = parsedData.email;
      textarea.value = parsedData.message;
      return;
    }
    if (parsedData.email) {
      input.value = parsedData.email;
      return;
    }
    if (parsedData.message) {
      textarea.value = parsedData.message;
      return;
    }
  }
}

function onFormSubmit(event) {
  // предотвратили перезагрузку от браузера по умолчанию
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Error! All fields must be filled!');
    return;
  }

  //очищаем поля формы и хранилище
  form.reset();
  localStorage.removeItem('feedback-form-state');

  console.log(formData);
}
