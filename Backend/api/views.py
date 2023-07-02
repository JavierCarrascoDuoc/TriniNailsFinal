from rest_framework import generics             # Importamos las vistas genéricas de Django REST Framework para crear vistas de listado y creación de objetos
from .models import *                    # Importamos el modelo LogUser de nuestro proyecto
from .serializers import *    # Importamos el serializador LogUserSerializer y de LoginSerializer de nuestro proyecto  
from django.contrib.auth import authenticate, login   # Importamos el método authenticate y login de django.contrib.auth para autenticar y loguear al usuario
from django.http import JsonResponse        
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny
from rest_framework.generics import RetrieveAPIView



# Create your views here.

class LogUserListCreateView(generics.ListCreateAPIView):   # Creamos una clase que hereda de generics.ListCreateAPIView para crear una vista de listado y creación de objetos
    queryset = LogUser.objects.all()                        # queryset que contiene todos los objetos de la tabla LogUser
    serializer_class = LogUserSerializer                    # serializador que vamos a utilizar para serializar los objetos de la tabla LogUser

class LogUserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):  # Creamos una clase que hereda de generics.RetrieveUpdateDestroyAPIView para crear una vista de detalle, actualización y borrado de objetos
    queryset = LogUser.objects.all()                        # queryset que contiene todos los objetos de la tabla LogUser
    serializer_class = LogUserSerializer                    # serializador que vamos a utilizar para serializar los objetos de la tabla LogUser



@api_view(['POST'])                             # Decoramos la función login_view con el decorador api_view para crear una vista de la API REST que solo acepta peticiones POST
def login_view(request):                        # Creamos la función login_view que recibe una petición request
    serializer = LoginSerializer(data=request.data)         # Creamos un objeto de la clase LoginSerializer que recibe los datos de la petición request
    if serializer.is_valid():                               # Si el serializador es válido
        username = serializer.validated_data['username']        # Obtenemos el nombre de usuario
        password = serializer.validated_data['password']        # Obtenemos la contraseña

        user = authenticate(request, username=username, password=password)      # Autenticamos al usuario con el método authenticate de Django

        if user is not None:                    # Si el usuario es válido
            login(request, user)                # Logueamos al usuario con el método login de Django
            return Response({'success': True})          # Devolvemos una respuesta con un JSON que contiene el campo success con valor True
        else:                   # Si el usuario no es válido
            return Response({'success': False, 'message': 'Invalid credentials.'}, status=400)          # Devolvemos una respuesta con un JSON que contiene el campo success con valor False y el campo message con valor 'Invalid credentials.' y el código de estado 400

    return Response(serializer.errors, status=400)      # Si el serializador no es válido devolvemos una respuesta con un JSON que contiene los errores del serializador y el código de estado 400



def generar_token(request):  # Creamos la función login_view que recibe una petición request 
    user = User.objects.get(username='abborgia')  # Reemplaza 'abborgia' con el nombre de usuario correcto
    refresh = RefreshToken.for_user(user)       # Creamos el token de actualización para el usuario con el método for_user de RefreshToken 

    return Response({                    # Devolvemos una respuesta con un JSON que contiene los campos 'refresh' y 'access' con los valores del token de actualización y el token de acceso
        'refresh': str(refresh),            # refresh es el token de actualización
        'access': str(refresh.access_token),        # access es el token de acceso
    })



class ProductoList(APIView):
    def get(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)
    
  
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Cart.objects.all()  

# class CartViewSet(viewsets.ModelViewSet):
#     serializer_class = CartSerializer
#     permission_classes = [AllowAny]
    
#     # @action(detail=True, methods=['get'])
#     def get_queryset(self):                                 # queryset que contiene todos los objetos de la tabla LogUser
#         return Cart.objects.filter(user=self.request.user)   # serializador que vamos a utilizar para serializar los objetos de la tabla LogUser donde user 

class CartItemViewSet(viewsets.ModelViewSet):

    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    



class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    @action(detail=False, methods=['get'])
    def get_by_id(self, request):
        product_id = request.query_params.get('id')
        if product_id:
            try:
                product = Producto.objects.get(id=product_id)
                serializer = ProductoSerializer(product)
                return Response(serializer.data)
            except Producto.DoesNotExist:
                return Response({'message': 'Product not found.'}, status=404)
        else:
            return Response({'message': 'Invalid request.'}, status=400)





class ProductoDetail(RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer