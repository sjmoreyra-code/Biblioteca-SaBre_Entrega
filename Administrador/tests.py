from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from django.utils import timezone
from Usuario.models import PerfilUsuario
from .models import Libros, Prestamos


class SeguridadYCrudAdministradorTests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username='admin_test', password='ClaveSegura2026!', is_staff=True
        )
        self.lector = User.objects.create_user(
            username='lector_test', password='ClaveSegura2026!'
        )
        self.perfil = PerfilUsuario.objects.create(
            usuario=self.lector, nombre='Lector', email='lector@example.com',
            alias='lector', telefono='', direccion=''
        )
        self.libro = Libros.objects.create(
            titulo_libro='Libro de prueba', autor='Autora', anio=2020,
            genero_categoria='Novela', editorial='Editorial', disponibilidad=True
        )

    def test_gestion_requiere_staff(self):
        response = self.client.get(reverse('libros'))
        self.assertEqual(response.status_code, 302)
        self.client.login(username='lector_test', password='ClaveSegura2026!')
        response = self.client.get(reverse('libros'))
        self.assertEqual(response.status_code, 302)
        self.client.logout()
        self.client.login(username='admin_test', password='ClaveSegura2026!')
        self.assertEqual(self.client.get(reverse('libros')).status_code, 200)

    def test_eliminacion_de_libro_en_dos_pasos(self):
        self.client.force_login(self.admin)
        url = reverse('eliminar_libro', args=[self.libro.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(Libros.objects.filter(pk=self.libro.pk).exists())
        response = self.client.post(url)
        self.assertEqual(response.status_code, 302)
        self.assertFalse(Libros.objects.filter(pk=self.libro.pk).exists())

    def test_devolucion_no_se_registra_por_get(self):
        prestamo = Prestamos.objects.create(
            usuario=self.perfil, libro=self.libro, fecha_prestamo=timezone.localdate()
        )
        self.client.force_login(self.admin)
        url = reverse('registrar_devolucion', args=[prestamo.pk])
        self.assertEqual(self.client.get(url).status_code, 200)
        prestamo.refresh_from_db()
        self.assertIsNone(prestamo.fecha_devolucion_real)
        self.client.post(url)
        prestamo.refresh_from_db()
        self.assertEqual(prestamo.fecha_devolucion_real, timezone.localdate())


class GestionUsuariosTests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username='admin_gestion', password='ClaveSegura2026!', is_staff=True
        )
        self.lector = User.objects.create_user(
            username='lector_gestion', password='ClaveSegura2026!', email='lector@example.com'
        )
        self.perfil = PerfilUsuario.objects.create(
            usuario=self.lector, nombre='Lector Gestion', email='lector@example.com',
            alias='lector_gestion', telefono='111', direccion='Calle 1'
        )
        self.libro = Libros.objects.create(
            titulo_libro='Libro Gestión', autor='Autora', anio=2021,
            genero_categoria='Novela', editorial='Editorial', disponibilidad=True
        )
        self.client.force_login(self.admin)

    def test_busqueda_sin_coincidencias_informa(self):
        response = self.client.get(reverse('buscar_usuarios'), {'buscar': 'no_existe_abc'})
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'No se encontraron usuarios')

    def test_alta_administrativa_crea_user_y_perfil(self):
        response = self.client.post(reverse('crear_usuarios'), {
            'username': 'nuevo_lector',
            'first_name': 'Nuevo',
            'last_name': 'Lector',
            'email': 'nuevo@example.com',
            'alias': 'nuevo_alias',
            'telefono': '222',
            'direccion': 'Calle 2',
            'password1': 'ClaveMuySegura2026!',
            'password2': 'ClaveMuySegura2026!',
        })
        self.assertRedirects(response, reverse('usuarios'))
        nuevo = User.objects.get(username='nuevo_lector')
        self.assertTrue(nuevo.check_password('ClaveMuySegura2026!'))
        self.assertTrue(PerfilUsuario.objects.filter(usuario=nuevo, alias='nuevo_alias').exists())

    def test_edicion_administrativa_actualiza_perfil_y_user(self):
        response = self.client.post(reverse('editar_usuario', args=[self.perfil.pk]), {
            'nombre': 'Nombre Actualizado',
            'email': 'actualizado@example.com',
            'alias': 'alias_actualizado',
            'telefono': '333',
            'direccion': 'Calle 3',
            'avatar': '',
            'activo': 'on',
        })
        self.assertRedirects(response, reverse('usuarios'))
        self.perfil.refresh_from_db()
        self.lector.refresh_from_db()
        self.assertEqual(self.perfil.nombre, 'Nombre Actualizado')
        self.assertEqual(self.lector.first_name, 'Nombre')
        self.assertEqual(self.lector.last_name, 'Actualizado')
        self.assertEqual(self.lector.email, 'actualizado@example.com')

    def test_eliminar_usuario_elimina_user_y_perfil(self):
        response = self.client.post(reverse('eliminar_usuario', args=[self.perfil.pk]))
        self.assertRedirects(response, reverse('usuarios'))
        self.assertFalse(User.objects.filter(pk=self.lector.pk).exists())
        self.assertFalse(PerfilUsuario.objects.filter(pk=self.perfil.pk).exists())


    def test_eliminar_usuario_con_prestamo_asociado_no_rompe_integridad(self):
        Prestamos.objects.create(
            usuario=self.perfil,
            libro=self.libro,
            fecha_prestamo=timezone.localdate()
        )
        response = self.client.post(reverse('eliminar_usuario', args=[self.perfil.pk]))
        self.assertRedirects(response, reverse('usuarios'))
        self.assertTrue(User.objects.filter(pk=self.lector.pk).exists())
        self.assertTrue(PerfilUsuario.objects.filter(pk=self.perfil.pk).exists())


    def test_vistas_crud_usuarios_cargan_sus_plantillas(self):
        self.assertEqual(self.client.get(reverse('usuarios')).status_code, 200)
        self.assertEqual(self.client.get(reverse('crear_usuarios')).status_code, 200)
        self.assertEqual(self.client.get(reverse('editar_usuario', args=[self.perfil.pk])).status_code, 200)
        self.assertEqual(self.client.get(reverse('eliminar_usuario', args=[self.perfil.pk])).status_code, 200)

    def test_login_admin_rechaza_usuario_no_staff_y_acepta_staff(self):
        self.client.logout()
        url = reverse('login_admin')
        response = self.client.post(url, {
            'username': 'lector_gestion',
            'password': 'ClaveSegura2026!'
        })
        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.wsgi_request.user.is_authenticated)
        response = self.client.post(url, {
            'username': 'admin_gestion',
            'password': 'ClaveSegura2026!'
        })
        self.assertRedirects(response, reverse('libros'))
