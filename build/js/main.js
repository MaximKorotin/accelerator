(function () {
  const body = document.querySelector('.page-body');
  const navMain = body.querySelector('.main-nav');
  const navToggle = body.querySelector('.nav-toggle');
  const selectionForm = body.querySelector('.selection-form');
  const nameInput = selectionForm.querySelector('#name');
  const phoneInput = selectionForm.querySelector('#phone');
  const success = body.querySelector('.success');
  const overlay = body.querySelector('.overlay');
  const anchors = body.querySelectorAll('.main-nav__link');

  let storageName = '';
  let storagePhone = '';

  navToggle.classList.remove('nav-toggle--nojs');
  navMain.classList.remove('main-nav--nojs');

  storageName = localStorage.getItem('name');
  storagePhone = localStorage.getItem('phone');

  if (storageName) {
    nameInput.value = storageName;
  }

  if (storagePhone) {
    phoneInput.value = storagePhone;
  }

  for (const anchor of anchors) {
    anchor.addEventListener('click', (evt) => {
      evt.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  navToggle.addEventListener('click', () => {
    if (navMain.classList.contains('main-nav--closed')) {
      body.classList.add('mobile-menu');
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
      navToggle.classList.remove('nav-toggle--closed');
      navToggle.classList.add('nav-toggle--opened');
    } else {
      body.classList.remove('mobile-menu');
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
      navToggle.classList.add('nav-toggle--closed');
      navToggle.classList.remove('nav-toggle--opened');
    }
  });

  nameInput.addEventListener('input', () => {
    const valueLength = nameInput.value.length;
    const minNameLength = nameInput.minLength;

    if (nameInput.validity.valueMissing) {
      nameInput.classList.add('invalid');
      nameInput.setCustomValidity('Это поле обязательно для заполнения.');
    } else if (valueLength < minNameLength) {
      nameInput.classList.add('invalid');
      nameInput.setCustomValidity(`Имя должно содержать минимум
        ${minNameLength} символа. Добавьте ещё ${minNameLength - valueLength} симв.`);
    } else {
      nameInput.classList.remove('invalid');
      nameInput.setCustomValidity('');
    }
    nameInput.reportValidity();
  });

  phoneInput.addEventListener('input', () => {
    const pattern = /^[+-?\d?()?\s]{11,18}$/;

    if (phoneInput.validity.valueMissing) {
      phoneInput.classList.add('invalid');
      phoneInput.setCustomValidity('Это поле обязательно для заполнения.');
    } else if (pattern.test(phoneInput.value)) {
      phoneInput.classList.remove('invalid');
      phoneInput.setCustomValidity('');
    } else {
      phoneInput.classList.add('invalid');
      phoneInput.setCustomValidity('Номер не должен содержать букв и должен состоять из 11 цифр');
    }
    phoneInput.reportValidity();
  });

  selectionForm.addEventListener('submit', (evt) => {
    if (nameInput.value && phoneInput.value) {
      evt.preventDefault();
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('phone', phoneInput.value);
      success.classList.add('success--open');
      overlay.classList.add('overlay--open');
    } else {
      evt.preventDefault();
    }

    if (success) {
      const successButton = success.querySelector('.success__button');

      successButton.addEventListener('click', (event) => {
        event.preventDefault();
        success.classList.remove('success--open');
        overlay.classList.remove('overlay--open');
      });

      window.addEventListener('keydown', (event) => {
        if (event.keyCode === 27) {
          if (success.classList.contains('success--open')) {
            evt.preventDefault();
            success.classList.remove('success--open');
            overlay.classList.remove('overlay--open');
          }
        }
      });

      overlay.addEventListener('click', () => {
        success.classList.remove('success--open');
        overlay.classList.remove('overlay--open');
      });
    }
  });
})();
