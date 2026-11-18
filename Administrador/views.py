from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.db.models import ProtectedError
from django.db import transaction
from django.utils import timezone
from .models import Libros, Prestamos, Reservas
from .forms import CrearLibrosForm, CrearPrestamosForm, CrearUsuarioAdminForm, EditarUsuarioAdminForm
from Usuario.models import PerfilUsuario
from django.contrib.admin.views.decorators import staff_member_required


def sincronizar_disponibilidad_libro(libro):
    """Mantiene el indicador de disponibilidad coherente con préstamos y reservas."""
    prestamo_activo = Prestamos.objects.filter(
        libro=libro, fecha_devolucion__isnull=True, fecha_devolucion_real__isnull=True
    ).exists()
    if prestamo_activo:
        libro.disponibilidad = False
    else:
        siguiente_reserva = Reservas.objects.filter(
            libro=libro, estado='pendiente'
        ).order_by('fecha_reserva', 'id').first()
        if siguiente_reserva:
            siguiente_reserva.estado = 'disponible'
            siguiente_reserva.save(update_fields=['estado'])
            libro.disponibilidad = False
        else:
            libro.disponibilidad = True
    libro.save(update_fields=['disponibilidad'])


# ==========================
# PÁGINAS PRINCIPALES E INFORMATIVAS
# ==========================

def mostrar_index(request):
    libros = Libros.objects.all()
    return render(request, 'Administrador/index.html', {'libros': libros})

def mostrar_accesibilidad(request):
    return render(request, 'Administrador/accesibilidad.html')

def mostrar_registro(request):
    return render(request, 'Administrador/registro.html')

def mostrar_quienes_somos(request):
    return render(request, 'Administrador/quienes_somos.html')

def mostrar_audiolibros(request):
    return render(request, 'Administrador/audiolibros.html')

def mostrar_braille(request):
    return render(request, 'Administrador/braille.html')

def mostrar_talleres(request):
    return render(request, 'Administrador/talleres.html')

def mostrar_informatica(request):
    return render(request, 'Administrador/informatica.html')


# ==========================
# GESTIÓN DE LIBROS
# ==========================

@staff_member_required(login_url='login_admin')
def mostrar_libros(request):
    libros = Libros.objects.all()
    return render(request, 'Administrador/libros.html', {'libros': libros})

@staff_member_required(login_url='login_admin')
def crear_libro(request):
    if request.method == 'POST':
        form = CrearLibrosForm(request.POST)
        if form.is_valid():
            libro = form.save()
            messages.success(request, f'El libro "{libro.titulo_libro}" fue creado con éxito.')
            return redirect('libros')
    else:
        form = CrearLibrosForm()
    return render(request, 'Administrador/crear_libro.html', {'form': form})

@staff_member_required(login_url='login_admin')
def editar_libro(request, id):
    libro = get_object_or_404(Libros, id=id)
    if request.method == 'POST':
        form = CrearLibrosForm(request.POST, instance=libro)
        if form.is_valid():
            form.save()
            messages.success(request, f'El libro "{libro.titulo_libro}" fue actualizado correctamente.')
            return redirect('libros')
    else:
        form = CrearLibrosForm(instance=libro)
    return render(request, 'Administrador/actualizar_libro.html', {'form': form, 'libro': libro})

@staff_member_required(login_url='login_admin')
def eliminar_libro(request, id):
    libro = get_object_or_404(Libros, id=id)
    if request.method == 'POST':
        titulo = libro.titulo_libro
        try:
            libro.delete()
            messages.warning(request, f'El libro "{titulo}" fue eliminado correctamente.')
        except ProtectedError:
            messages.error(request, 'No se puede eliminar este libro porque tiene préstamos asociados.')
        return redirect('libros')
    return render(request, 'Administrador/eliminar_libro.html', {'libro': libro})

@staff_member_required(login_url='login_admin')
def buscar_libros(request):
    query = request.GET.get('q', '').strip()
    libros = []
    respuesta = ""

    if query:
        libros = Libros.objects.filter(titulo_libro__icontains=query)
        if not libros.exists():
            respuesta = f'No se encontraron libros que coincidan con "{query}".'
    else:
        respuesta = 'Ingrese un título o palabra clave para realizar la búsqueda.'

    return render(request, 'Administrador/buscar_libros.html', {
        'libros': libros,
        'query': query,
        'respuesta': respuesta
    })


# ==========================
# GESTIÓN DE USUARIOS
# ==========================

@staff_member_required(login_url='login_admin')
def mostrar_usuarios(request):
    usuarios = PerfilUsuario.objects.select_related('usuario').all().order_by('id')
    return render(request, 'Administrador/usuarios.html', {'usuarios': usuarios, 'usuario': usuarios})


@staff_member_required(login_url='login_admin')
def crear_usuario(request):
    if request.method == 'POST':
        form = CrearUsuarioAdminForm(request.POST)
        if form.is_valid():
            with transaction.atomic():
                nuevo_usuario = form.save()
            messages.success(request, f'El usuario {nuevo_usuario.username} fue creado correctamente.')
            return redirect('usuarios')
    else:
        form = CrearUsuarioAdminForm()
    return render(request, 'Administrador/crear_usuarios.html', {'form': form})


@staff_member_required(login_url='login_admin')
def editar_usuario(request, id):
    perfil = get_object_or_404(PerfilUsuario.objects.select_related('usuario'), id=id)
    if request.method == 'POST':
        form = EditarUsuarioAdminForm(request.POST, instance=perfil)
        if form.is_valid():
            perfil = form.save()
            partes_nombre = perfil.nombre.split(maxsplit=1)
            perfil.usuario.first_name = partes_nombre[0] if partes_nombre else ''
            perfil.usuario.last_name = partes_nombre[1] if len(partes_nombre) > 1 else ''
            perfil.usuario.email = perfil.email
            perfil.usuario.save(update_fields=['first_name', 'last_name', 'email'])
            messages.success(request, f'El perfil de {perfil.alias} fue actualizado.')
            return redirect('usuarios')
    else:
        form = EditarUsuarioAdminForm(instance=perfil)
    return render(request, 'Administrador/editar_usuario.html', {'form': form, 'usuario': perfil})


@staff_member_required(login_url='login_admin')
def eliminar_usuario(request, id):
    perfil = get_object_or_404(PerfilUsuario, id=id)
    if request.method == 'POST':
        alias = perfil.alias
        try:
            with transaction.atomic():
                perfil.usuario.delete()
            messages.warning(request, f'El usuario "{alias}" fue eliminado correctamente.')
        except ProtectedError:
            messages.error(request, 'No se puede eliminar el perfil porque tiene préstamos asociados.')
        return redirect('usuarios')
    return render(request, 'Administrador/eliminar_usuario.html', {'usuario': perfil})


@staff_member_required(login_url='login_admin')
def buscar_usuarios(request):
    query = request.GET.get('q', request.GET.get('buscar', '')).strip()
    respuesta = ''
    if query:
        usuarios = PerfilUsuario.objects.select_related('usuario').filter(
            alias__icontains=query
        ) | PerfilUsuario.objects.select_related('usuario').filter(
            nombre__icontains=query
        ) | PerfilUsuario.objects.select_related('usuario').filter(
            email__icontains=query
        )
        if not usuarios.exists():
            respuesta = f'No se encontraron usuarios para "{query}".'
    else:
        usuarios = PerfilUsuario.objects.none()
        respuesta = 'Ingresá un alias, nombre o correo para buscar.'
    return render(request, 'Administrador/buscar_usuarios.html', {
        'usuarios': usuarios, 'usuario': usuarios, 'query': query, 'termino': query, 'respuesta': respuesta
    })


@staff_member_required(login_url='login_admin')
def mostrar_prestamos(request):
    # Trae todos los registros de la tabla Prestamos (CRUD - READ)[cite: 5, 7]
    prestamos = Prestamos.objects.all()
    context = {'prestamos': prestamos}
    return render(request, 'Administrador/prestamos.html', context)

@staff_member_required(login_url='login_admin')
def crear_prestamo(request):
    if request.method == 'POST':
        form = CrearPrestamosForm(request.POST)
        if form.is_valid():
            libro = form.cleaned_data['libro']
            if not libro.disponibilidad or Prestamos.objects.filter(
                libro=libro, fecha_devolucion__isnull=True, fecha_devolucion_real__isnull=True
            ).exists():
                messages.error(request, 'El libro seleccionado no está disponible para un nuevo préstamo.')
            else:
                prestamo = form.save()
                libro.disponibilidad = False
                libro.save(update_fields=['disponibilidad'])
                messages.success(request, 'El préstamo se registró correctamente.')
                return redirect('prestamos')
    else:
        form = CrearPrestamosForm()
    return render(request, 'Administrador/crear_prestamos.html', {'form': form})

@staff_member_required(login_url='login_admin')
def editar_prestamo(request, id):
    prestamo = get_object_or_404(Prestamos, id=id)
    if request.method == 'POST':
        # Uso de instance para actualizar el registro existente[cite: 8]
        form = CrearPrestamosForm(request.POST, instance=prestamo)
        if form.is_valid():
            libro_anterior = prestamo.libro
            prestamo_actualizado = form.save()
            sincronizar_disponibilidad_libro(libro_anterior)
            if prestamo_actualizado.libro_id != libro_anterior.id:
                sincronizar_disponibilidad_libro(prestamo_actualizado.libro)
            messages.success(request, 'El préstamo se actualizó correctamente.')
            return redirect('prestamos')
    else:
        form = CrearPrestamosForm(instance=prestamo)
    return render(request, 'Administrador/actualizar_prestamo.html', {'form': form, 'prestamo': prestamo})

@staff_member_required(login_url='login_admin')
def eliminar_prestamo(request, id):
    prestamo = get_object_or_404(Prestamos, id=id)
    if request.method == 'POST':
        libro = prestamo.libro
        prestamo.delete()
        sincronizar_disponibilidad_libro(libro)
        messages.warning(request, 'El registro de préstamo fue eliminado.')
        return redirect('prestamos')
    return render(request, 'Administrador/eliminar_prestamo.html', {'prestamo': prestamo})

@staff_member_required(login_url='login_admin')
def registrar_devolucion(request, id):
    prestamo = get_object_or_404(Prestamos.objects.select_related('libro', 'usuario'), id=id)
    if request.method == 'POST':
        if prestamo.fecha_devolucion_real:
            messages.info(request, 'La devolución ya estaba registrada.')
        else:
            prestamo.fecha_devolucion_real = timezone.localdate()
            prestamo.fecha_devolucion = prestamo.fecha_devolucion_real
            prestamo.save(update_fields=['fecha_devolucion_real', 'fecha_devolucion'])
            sincronizar_disponibilidad_libro(prestamo.libro)
            messages.success(request, f'Se registró la devolución de "{prestamo.libro.titulo_libro}".')
        return redirect('prestamos')
    return render(request, 'Administrador/registrar_devolucion.html', {'prestamo': prestamo})


def iniciar_sesion_admin(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect('libros')

    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)

            if user is not None and user.is_staff:
                login(request, user)
                messages.success(request, f'¡Bienvenido/a Administrador/a {username}!')
                return redirect('libros')
            else:
                messages.error(request, 'Acceso denegado: Esta cuenta no posee permisos de administrador.')
        else:
            messages.error(request, 'Usuario o contraseña de administrador incorrectos.')
    else:
        form = AuthenticationForm()

    return render(request, 'Administrador/login_admin.html', {'form': form})

# ==========================
# PÁGINAS LEGALES
# ==========================

# Política de Privacidad - Ley N.º 25.326
def mostrar_politica_privacidad(request):
    return render(
        request,
        'Administrador/politica_privacidad.html'
    )


# Términos y Condiciones
def mostrar_terminos_condiciones(request):
    return render(
        request,
        'Administrador/terminos_condiciones.html'
    )
