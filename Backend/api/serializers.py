from rest_framework import serializers    # Importamos el serializador de Django REST Framework
from rest_framework import viewsets
from .models import *    # Importamos los modelos que queremos serializar

class LogUserSerializer(serializers.ModelSerializer):       # Creamos una clase que hereda de serializers.ModelSerializer para serializar el modelo LogUser con el obetivo de poder enviarlo en formato JSON
    class Meta:                                # Meta clase que contiene la información del modelo que queremos serializar y los campos que queremos serializar
        model = LogUser             # modelo que queremos serializar
        fields = '__all__'          # campos que queremos serializar (todos en este caso)


class LoginSerializer(serializers.Serializer):      # Creamos una clase que hereda de serializers.Serializer para serializar el modelo LogUser con el obetivo de poder enviarlo en formato JSON
    username = serializers.CharField()              # Campos que queremos serializar
    password = serializers.CharField()              # Campos que queremos serializar
    

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'imagen']
        
        

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductoSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total']

    def get_total(self, obj):
        return obj.total