from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.conf import settings



# Create your models here.


class LogUser(models.Model):   # LogUser es el nombre de la tabla que se crea en la base de datos (nailsapp_loguser) hereda de models.Model que es una clase de django
    id = models.AutoField(primary_key=True, unique=True, null=False)
    name = models.CharField(max_length=100, null=False, unique=True, blank=False)
    password = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(max_length=100)
    
    def __str__(self):      # metodo que devuelve el nombre del usuario en vez de "LogUser object (1)" 
        return self.name    # retorna el campo name de la tabla LogUser


class Producto(models.Model):       # tabla producto
    nombre = models.CharField(max_length=100)       # campo nombre de tipo char  
    precio = models.DecimalField(max_digits=10, decimal_places=0)   # campo precio de tipo decimal
    imagen = models.ImageField(upload_to='api/img_prod/')    # campo imagen de tipo imagen que se guarda en la carpeta api/img_prod/

    def __str__(self):      # metodo que devuelve el nombre del producto en vez de "Producto object (1)"
        return f'{self.nombre} -> {self.precio}'      # retorna el campo nombre de la tabla Producto
    

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=6, decimal_places=0, default=0)

class CartItem(models.Model):
    product = models.ForeignKey(Producto, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)

    def total(self):
        return self.product.precio * self.quantity

@receiver(post_save, sender=CartItem)  # Decorador que se ejecuta cuando se guarda un CartItem
def update_cart_total(sender, instance, **kwargs):
    cart = instance.cart
    cart.total = sum([item.total() for item in cart.items.all()])
    cart.save()
