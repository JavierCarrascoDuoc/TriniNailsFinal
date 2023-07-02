from django.contrib import admin
from .models import LogUser, Producto, Cart, CartItem

# Register your models here.

# admin.site.register(LogUser)
# admin.site.register(Carrito)
# admin.site.register(ItemCarrito)
admin.site.register(Producto)
admin.site.register(CartItem)
admin.site.register(Cart)

