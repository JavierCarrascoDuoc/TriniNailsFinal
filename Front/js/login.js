  document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/login/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        // El inicio de sesión fue exitoso
        window.location.href = 'http://127.0.0.1:5500/Front/bienvenido.html';
      } else {
        // El inicio de sesión falló
        alert("Inicio Fallido");
        document.getElementById('login-message').textContent = response.message;
      }
    };
    var data = JSON.stringify({ username: username, password: password });
    xhr.send(data);
  });

  document.getElementById('logout-link').addEventListener('click', function (event) {
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/logout/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        // El cierre de sesión fue exitoso
        window.location.href = 'http://127.0.0.1:5500/Front/login.html';
      } else {
        // El cierre de sesión falló
        alert("Cierre de sesión fallido");
      }
    };
    xhr.send();
  });
