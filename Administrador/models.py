from django.db import models
# Importamos el perfil de la app Usuario para conectar la multiapp
from Usuario.models import PerfilUsuario


class Libros(models.Model):
    titulo_libro = models.CharField(max_length=100)
    autor = models.CharField(max_length=100)
    anio = models.IntegerField()
    genero_categoria = models.CharField(max_length=50)
    editorial = models.CharField(max_length=100)
    isbn = models.CharField(max_length=20, blank=True)
    disponibilidad = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.titulo_libro} - {self.autor} ({self.anio})"


class Prestamos(models.Model):
    # Clave foránea hacia el usuario cliente de la app Usuario
    usuario = models.ForeignKey(PerfilUsuario, on_delete=models.PROTECT)
    libro = models.ForeignKey(Libros, on_delete=models.PROTECT)
    fecha_prestamo = models.DateField()

    # Campo antiguo conservado para compatibilidad
    fecha_devolucion = models.DateField(blank=True, null=True)

    # Fechas de seguimiento del préstamo
    fecha_devolucion_prevista = models.DateField(blank=True, null=True)
    fecha_devolucion_real = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.libro.titulo_libro} -> {self.usuario.alias}"

class Reservas(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('disponible', 'Disponible para retirar'),
        ('retirada', 'Convertida en préstamo'),
        ('cancelada', 'Cancelada'),
    ]

    usuario = models.ForeignKey(PerfilUsuario, on_delete=models.PROTECT, related_name='reservas')
    libro = models.ForeignKey(Libros, on_delete=models.PROTECT, related_name='reservas')
    fecha_reserva = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=12, choices=ESTADOS, default='pendiente')

    class Meta:
        ordering = ['fecha_reserva', 'id']

    def __str__(self):
        return f"Reserva de {self.libro.titulo_libro} - {self.usuario.alias} ({self.estado})"
