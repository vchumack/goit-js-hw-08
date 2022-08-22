import throttle from 'lodash.throttle';

// вытащили ссылку на форму
const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

// слушатели на инпут и сабмит
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

let parsedData = null;
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// вызов функции с подставлением полей в форму из лок хранилища
getLocalStorageValues();

// создали объект, куда будут сохраняться данные, введенные пользователям
// если у parsedData есть email/message, тогда выполняй проверку дальше, если нет, сразу выходи
const formData = {
  email: parsedData?.email ? parsedData.email : '',
  message: parsedData?.message ? parsedData.message : '',
};

function onFormInput(event) {
  formData[event.target.name] = event.target.value;

  // полученные данные отправляю в локальное хранилище
  saveData();
}

// функция для получения данных из локального хранилища
function getLocalStorageValues() {
  parsedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  // если в лок хранилище были данные, то подставь их в наши поля формы
  if (parsedData) {
    parsedData.email ? (input.value = parsedData.email) : '';
    parsedData.message ? (textarea.value = parsedData.message) : '';
  }
}

function onFormSubmit(event) {
  // предотвратили перезагрузку от браузера по умолчанию
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Error! All fields must be filled!');
    return;
  }

  //очищаем поля формы, хранилище и консоль
  form.reset();
  removeLocalStorage(LOCAL_STORAGE_KEY);
  console.log(formData);

  resetFormData();
}

// функция для сохранения в локальное хранилище под нужным нам именем и в нужном формате
function saveData() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

//очищения локал стореж
function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

// очистка консоли после сабмита
function resetFormData() {
  formData.email = '';
  formData.message = '';
}
