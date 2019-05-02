'use strict';

const register = document.getElementById('register-form');
const login = document.getElementById('login-form');

const openRegisterForm = () => {

  if (login.style.display === 'block') {
    login.style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
  } else {
    document.getElementById('register-form').style.display = 'block';
  }
};

const closeRegisterForm = () => {
  document.getElementById('register-form').style.display = 'none';
};

const openLoginForm = () => {
  if (register.style.display === 'block') {
    register.style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  }else {
    document.getElementById('login-form').style.display = 'block';
  }
};

const closeLoginForm = () => {
  document.getElementById('login-form').style.display = 'none';
};
