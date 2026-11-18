from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from django.utils import timezone
from .models import PerfilUsuario
from Administrador.models import Libros, Prestamos, Reservas


class RegistroYPerfilTests(TestCase):
    def test_registro_guarda_password_hasheada_y_crea_perfil(self):
        response = self.client.post(reverse('registro_usuario'), {
            'username': 'lector_test',
            'email': 'lector@example.com',
            'first_name': 'Lector',
            'last_name': 'Prueba',
            'password': 'ClaveSegura2026!',
            'confirm_password': 'ClaveSegura2026!',
        })
        self.assertRedirects(response, reverse('login'))
        user = User.objects.get(username='lector_test')
        self.assertTrue(user.check_password('ClaveSegura2026!'))
        self.assertNotEqual(user.password, 'ClaveSegura2026!')
        self.assertTrue(PerfilUsuario.objects.filter(usuario=user).exists())

    def test_perfil_requiere_autenticacion_y_actualiza_datos(self):
        user = User.objects.create_user(username='lector', password='ClaveSegura2026!')
        perfil = PerfilUsuario.objects.create(
            usuario=user, nombre='Lector', email='lector@example.com',
            alias='lector', telefono='', direccion=''
        )
        response = self.client.get(reverse('usuario_perfil'))
        self.assertEqual(response.status_code, 302)
        self.client.login(username='lector', password='ClaveSegura2026!')
        response = self.client.post(reverse('usuario_perfil'), {
            'alias': 'nuevo_alias', 'telefono': '11223344',
            'direccion': 'Calle 123', 'avatar': ''
        })
        self.assertRedirects(response, reverse('usuario_perfil'))
        perfil.refresh_from_db()
        self.assertEqual(perfil.alias, 'nuevo_alias')
        self.assertEqual(perfil.telefono, '11223344')

    def test_logout_no_acepta_get(self):
        response = self.client.get(reverse('logout'))
        self.assertEqual(response.status_code, 405)


    def test_login_admin_tiene_un_unico_nombre_de_ruta(self):
        from django.urls import resolve
        match = resolve('/login-admin/')
        self.assertEqual(match.url_name, 'login_admin')
        self.assertEqual(match.func.__name__, 'iniciar_sesion_admin')


class CatalogoYPrestamosLectorTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='lector_catalogo', password='ClaveSegura2026!')
        self.perfil = PerfilUsuario.objects.create(
            usuario=self.user, nombre='Lector Catálogo', email='catalogo@example.com',
            alias='lector_catalogo', telefono='', direccion=''
        )
        self.libro = Libros.objects.create(
            titulo_libro='Libro disponible', autor='Autora', anio=2024,
            genero_categoria='Novela', editorial='SaBré', disponibilidad=True
        )

    def test_catalogo_es_publico_y_muestra_libros_reales(self):
        response = self.client.get(reverse('usuario_catalogo'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Libro disponible')

    def test_solicitar_prestamo_requiere_login(self):
        response = self.client.post(reverse('solicitar_prestamo', args=[self.libro.pk]))
        self.assertEqual(response.status_code, 302)
        self.assertFalse(Prestamos.objects.exists())

    def test_solicitud_crea_prestamo_y_actualiza_disponibilidad(self):
        self.client.force_login(self.user)
        response = self.client.post(reverse('solicitar_prestamo', args=[self.libro.pk]))
        self.assertRedirects(response, reverse('usuario_prestamos'))
        self.assertTrue(Prestamos.objects.filter(usuario=self.perfil, libro=self.libro).exists())
        self.libro.refresh_from_db()
        self.assertFalse(self.libro.disponibilidad)

    def test_reserva_se_registra_para_libro_no_disponible(self):
        self.libro.disponibilidad = False
        self.libro.save(update_fields=['disponibilidad'])
        self.client.force_login(self.user)
        response = self.client.post(reverse('reservar_libro', args=[self.libro.pk]))
        self.assertRedirects(response, reverse('usuario_prestamos'))
        self.assertTrue(Reservas.objects.filter(usuario=self.perfil, libro=self.libro, estado='pendiente').exists())

    def test_devolucion_habilita_siguiente_reserva(self):
        prestamo = Prestamos.objects.create(
            usuario=self.perfil, libro=self.libro, fecha_prestamo=timezone.localdate()
        )
        reserva_user = User.objects.create_user(username='lector_espera', password='ClaveSegura2026!')
        reserva_perfil = PerfilUsuario.objects.create(
            usuario=reserva_user, nombre='Lector Espera', email='espera@example.com',
            alias='lector_espera', telefono='', direccion=''
        )
        reserva = Reservas.objects.create(usuario=reserva_perfil, libro=self.libro, estado='pendiente')
        self.client.force_login(User.objects.create_user(username='admin_devolucion', password='ClaveSegura2026!', is_staff=True))
        response = self.client.post(reverse('registrar_devolucion', args=[prestamo.pk]))
        self.assertEqual(response.status_code, 302)
        reserva.refresh_from_db()
        self.assertEqual(reserva.estado, 'disponible')
        self.libro.refresh_from_db()
        self.assertFalse(self.libro.disponibilidad)
