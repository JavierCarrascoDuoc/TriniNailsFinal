from django.urls import path, include
from .views import *
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cartitems', CartItemViewSet)

urlpatterns = [
    path('logusers/', LogUserListCreateView.as_view(), name='loguser-list-create'),
    path('logusers/<int:pk>/', LogUserRetrieveUpdateDestroyView.as_view(), name='loguser-retrieve-update-destroy'),
    path('login/', login_view, name='login'),
    path('productos/<int:pk>/', ProductoDetail.as_view(), name='producto-detail'),  # Ruta modificada para obtener un producto por su ID
    path('productos/', ProductoList.as_view(), name='producto-list'),
    path('cart/', include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)