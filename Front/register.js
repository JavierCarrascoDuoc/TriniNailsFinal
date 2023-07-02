$("#frmRegistro").validate({

    debug: true,
    errorClass: "errorMessage",
    rules: {
      nombre: {
        required: true,
        minlength: 10
      },
      telefono: {
        required: true,
        minlength: 12
      },
      correo: {
        required: true,
        email: true
      },
      fechaNacimiento: {
        required: true,
        date: true,
        nacimiento: true
      },
      contrasena: {
        required: true
      },
      recontrasena: {
        equalTo: "#contrasena"
      }
  
    },
    messages: {
      nombre: {
        required: "El campo nombre no puede estar vacio.",
        minlength: jQuery.validator.format("El campo nombre debe tener como minimo {0} caracteres.")
      },
      telefono: {
        required: "El campo teléfono no puede estar vacio.",
        minlength: jQuery.validator.format("El campo teléfono debe tener un minimo de {0} caracteres."),
      }
    }
  });

  $(document).ready(function () {
    $('#register-form').validate({
      rules: {
        username: {
          required: true,
          minlength: 3
        },
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 8
        },
        confirm_password: {
          required: true,
          equalTo: '#password'
        }
      },
      messages: {
        username: {
          required: 'Por favor ingrese un nombre de usuario.',
          minlength: 'El nombre de usuario debe tener al menos 3 caracteres.'
        },
        email: {
          required: 'Por favor ingrese una dirección de correo electrónico válida.',
          email: 'Por favor ingrese una dirección de correo electrónico válida.'
        },
        password: {
          required: 'Por favor ingrese una contraseña.',
          minlength: 'La contraseña debe tener al menos 8 caracteres.'
        },
        confirm_password: {
          required: 'Por favor confirme su contraseña.',
          equalTo: 'Las contraseñas no coinciden.'
        }
      },
    });
  });

 // $('#password').focus(function () {
    $(document).on('click','#generaPass',function(){


    // Se ejecuta cuando se ingresa al campo de entrada
  
    // alert('Ingresando al campo de entrada...');
  
  
  
  
    var length = '16'
  
    $.ajax({
  
      method: 'GET',
  
      url: 'https://api.api-ninjas.com/v1/passwordgenerator?length=' + length,
  
      headers: {
  
        'X-Api-Key': 'eSKcS3zUWlvABJG82rN+2g==mNXmwOyBjm2rAJiX'
  
      },
  
      contentType: 'application/json',
  
      success: function (result) {
  
        console.log(result);
  
         alert("Contraseña nueva:  "+ result.random_password);
  
        // $('#confirm_password').val(JSON.stringify(result));
  
        //$('#confirm_password').val(result.random_password);
  
      },
  
      error: function ajaxError(jqXHR) {
  
        console.error('Error: ', jqXHR.responseText);
  
      }
  
    });
  
  
  
  
  });