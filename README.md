# Biblioteca SaBré — Entrega

## Requisitos
- Python 3.10 o superior
- Django 5.2.17

## Instalación en Windows
1. Crear y activar un entorno virtual:
   ```powershell
   py -m venv venv
   .\venv\Scripts\activate
   ```
2. Instalar dependencias:
   ```powershell
   pip install -r requirements.txt
   ```
3. Aplicar migraciones:
   ```powershell
   python manage.py migrate
   ```
4. Crear el usuario administrador:
   ```powershell
   python manage.py createsuperuser
   ```
5. Iniciar el servidor:
   ```powershell
   python manage.py runserver
   ```

Abrir `http://127.0.0.1:8000/`.

## Pruebas
Ejecutar:
```powershell
python manage.py check
python manage.py test Usuario Administrador
python manage.py makemigrations --check --dry-run
```

## Accesos
- Sitio público: `/`
- Registro de lectores: `/usuario/registro/`
- Inicio de sesión de lectores: `/usuario/login/`
- Inicio de sesión administrativo: `/login-admin/`
- Panel administrativo de Django: `/admin/`
- Catálogo público: `/usuario/catalogo/`
- Detalle de libro: `/usuario/catalogo/libro/<id>/`
- Solicitudes de préstamo y reservas: se gestionan desde el catálogo y requieren iniciar sesión.

La gestión administrativa de libros, usuarios y préstamos requiere una cuenta con `is_staff=True`. Los lectores autenticados pueden solicitar préstamos y reservar ejemplares no disponibles desde el catálogo.

## Base de datos
La entrega no incluye bases SQLite ni copias de seguridad. Al ejecutar `migrate`, Django crea `db.sqlite3` localmente. Los datos de prueba o de producción deben respaldarse por separado y no subirse al repositorio público.

## Estructura
- `Administrador/`: modelos, formularios, vistas y rutas de gestión.
- `Usuario/`: registro, autenticación y perfil de lectores.
- `MiProyecto/`: configuración y rutas principales.
- `templates/`: plantillas HTML organizadas por aplicación.
- `static/`: hojas de estilo, scripts e imágenes.

## Catálogo, préstamos y reservas (versión funcional)
- El catálogo público consulta los registros reales de `Libros`; no utiliza tarjetas ficticias de JavaScript.
- El detalle de cada libro se abre desde su identificador real de base de datos.
- Los lectores autenticados pueden solicitar préstamos de ejemplares disponibles.
- Si un ejemplar no está disponible, el lector puede incorporarse a la lista de reservas.
- Al registrar una devolución desde el panel administrativo, se actualiza la disponibilidad y, si hay una reserva pendiente, se habilita para el primer lector de la fila.
- El lector puede confirmar el retiro de una reserva habilitada o cancelarla.
- Las acciones de préstamo, reserva, cancelación y retiro se realizan mediante POST con CSRF.
- La lectura de fichas utiliza la voz del navegador (SpeechSynthesis); no se presenta como reproducción de un archivo de audiolibro.

### Actualización de esta versión
Al reemplazar una versión anterior del proyecto, conservá tu base de datos local. Luego ejecutá:
```powershell
python manage.py migrate
python manage.py runserver
```
La migración `Administrador.0007_reservas` agrega la tabla de reservas y no elimina los registros existentes.
