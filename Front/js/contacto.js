document.addEventListener('DOMContentLoaded', function() {
    fetch('http://127.0.0.1:8000/api/cart/cart/')
    .then(response => response.json())
    .then(data => {
        data.forEach(cart => {
  
            var cantity = document.getElementById('cart-quantity');
            cantity.textContent = cart.items.length;
  
        });
    });
  });


  function Enviar(){

    Swal.fire(
        'Muy bien',
        'Requerimiento enviado exitosamente',
        'success'
    ).then((result) => {
        location.href="gallery.html"
    })
    
  }