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


fetch('http://127.0.0.1:8000/api/productos/')
  .then(response => response.json())
  .then(data => {
    // Manipula los datos recibidos (lista de productos)
    console.log(data);

    // Ejemplo: Mostrar los productos en el HTML
    const productList = document.getElementById('list');

    data.forEach(producto => {


      const productCard = document.createElement('div');
      productCard.classList.add("product-card");

      // Crea el elemento de imagen y establece su atributo 'src' con la URL de la imagen del producto
      const productImage = document.createElement('img');
      productImage.classList.add('img-product');
      productImage.src = 'http://127.0.0.1:8000' + producto.imagen;;

      const productTitle =  document.createElement('h3');
      productTitle.textContent = producto.nombre;
      
      const productPrice = document.createElement('p');
      productPrice.textContent = "$"+producto.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      const buttonAdd = document.createElement("button");
      buttonAdd.textContent = "Agregar al carrito";


      productCard.appendChild(productImage);
      productCard.appendChild(productTitle);
      productCard.appendChild(productPrice);
      productCard.appendChild(buttonAdd);


      productList.appendChild(productCard);
      


    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
