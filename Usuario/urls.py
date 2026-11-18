from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_usuario, name='index_usuario'),
    path('catalogo/', views.catalogo_usuario, name='usuario_catalogo'),
    path('catalogo/libro/<int:id>/', views.detalle_libro_usuario, name='usuario_detalle_libro'),
    path('catalogo/libro/<int:id>/solicitar/', views.solicitar_prestamo, name='solicitar_prestamo'),
    path('catalogo/libro/<int:id>/reservar/', views.reservar_libro, name='reservar_libro'),
    path('reservas/<int:id>/cancelar/', views.cancelar_reserva, name='cancelar_reserva'),
    path('reservas/<int:id>/retirar/', views.retirar_reserva, name='retirar_reserva'),
    path('prestamos/', views.prestamos_usuario, name='usuario_prestamos'),
    path('historial/', views.historial_usuario, name='usuario_historial'),
    path('comunidad/', views.comunidad_usuario, name='usuario_comunidad'),
    path('perfil/', views.perfil_usuario, name='usuario_perfil'),
    path('registro/', views.registrar_usuario, name='registro_usuario'),
    path('login/', views.login_usuario, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
