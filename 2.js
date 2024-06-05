// Оголошення поза будь-якими функціями об’єкт formData з полями email та message
let formData = {
    email: '',
    message: '',
  };
  
  // Функція збереження formData в локальне сховище
  function saveToLocalStorage() {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }
  
  // Функція завантаження formData з локального сховища
  function loadFromLocalStorage() {
    const savedData = localStorage.getItem('feedback-form-state');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  }
  
  // Функція ініціалізації форми
  function initializeForm() {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      document.querySelector('[name="email"]').value = savedData.email;
      document.querySelector('[name="message"]').value = savedData.message;
      formData = savedData;
    }
  }
  
  // Обробник події input для форми
  document.querySelector('form').addEventListener('input', event => {
    const { name, value } = event.target;
    formData[name] = value;
    saveToLocalStorage();
  });
  
  // Обробник події submit для форми
  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    if (!formData.email || !formData.message) {
      alert('Заповніть всі поля');
      return;
    }
    console.log('Submit:', formData);
    localStorage.removeItem('feedback-form-state');
    event.target.reset();
    formData.email = '';
    formData.message = '';
  });
  
  // Завантажуємо дані з локального сховища при завантаженні сторінки
  window.addEventListener('DOMContentLoaded', initializeForm);
  