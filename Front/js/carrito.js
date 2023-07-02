//alert('inicio');
// http://127.0.0.1:8000/api/cart/cartitems/


var productos
fetch('http://127.0.0.1:8000/api/productos/')
  .then(response => response.json())
  .then(data => {
    // Manipula los datos recibidos (lista de productos)
    console.log(data);

    productos= data;

  })
  .catch(error => {
    console.error('Error:', error);
  });




// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://127.0.0.1:8000/api/cart/cart/')
    .then(response => response.json())
    .then(data => {
        var productList = document.getElementById('product-container');

        data.forEach(cart => {

            var cantity = document.getElementById('cart-quantity');
            cantity.textContent = cart.items.length;

            cart.items.forEach(item => {
                var productDiv = document.createElement('div');
                productDiv.classList.add("cart-item");
                var productImage = document.createElement("div");
                productImage.classList.add("item-thumbnail");

                var imagen;

                for(var i =0; i < productos.length; i++){
                    if(productos[i].id == item.product.id){
                        imagen = productos[i].imagen;
                        console.log(imagen)
                    }
                }

                var img = document.createElement('img');
                img.src = "http://127.0.0.1:8000/"+ imagen
                
                var productDetails = document.createElement("div");
                productDetails.classList.add("item-details");

                var productTitle = document.createElement("h3");
                productTitle.textContent = item.product.nombre;

                productDetails.appendChild(productTitle);
                
                var productPrice = document.createElement("div");
                var price = document.createElement("p");
                price.textContent= "$"+item.product.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                productPrice.classList.add("item-price")
                productPrice.appendChild(price);
                
                productImage.appendChild(img);
                productDiv.appendChild(productImage);
                productDiv.appendChild(productDetails);
                productDiv.appendChild(productPrice);
                //productDiv.textContent = `Producto: ${item.product.nombre}, Precio: ${item.product.precio} , Cantidad: ${item.quantity}`;
                //var totalPriceSpan = document.getElementById("total-price");
                //totalPriceSpan.textContent = cart.total;
                
                // productDiv.appendChild(addToCartButton);
                productList.appendChild(productDiv);
            });
        });
    });
});


var api_url="http://127.0.0.1:8000/api/";
// Agregar producto al carrito
function addToCart(productId) {
   
    fetch(api_url + 'carts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'product': productId,
            'quantity': 1,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto agregado al carrito');
        loadCart();
    });
}

// Eliminar producto del carrito
function removeFromCart(itemId) {
    fetch(api_url + 'cartitem/' + itemId + '/', {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 204) {
            console.log('Producto eliminado del carrito');
            loadCart();
        } else {
            console.error('Error eliminando producto del carrito');
        }
    });
}

// Cargar carrito
function loadCart() {
    fetch(api_url + 'carts/')
    .then(response => response.json())
    .then(data => {
        var cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';
        data.items.forEach(item => {
            var itemDiv = document.createElement('div');
            itemDiv.textContent = `Producto: ${item.product.name}, Cantidad: ${item.quantity}`;
            var removeFromCartButton = document.createElement('button');
            removeFromCartButton.textContent = 'Eliminar del carrito';
            removeFromCartButton.onclick = function() {
                removeFromCart(item.id);
            };
            itemDiv.appendChild(removeFromCartButton);
            cartList.appendChild(itemDiv);
        });
        document.getElementById('total-price').textContent = data.total;
        document.getElementById('cart-quantity').textContent = data.items.length;
    });
}

// Cargar carrito al iniciar la página
window.onload = function() {
    //loadCart();
};

function FinalizarCompra(){

    Swal.fire(
        'Muy bien',
        'Compra realizada exitosamente',
        'success'
    ).then((result) => {
        location.href="gallery.html"
    })
    
  }