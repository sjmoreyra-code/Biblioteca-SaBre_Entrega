# Generated for Biblioteca SaBré.
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Administrador', '0006_alter_prestamos_usuario_delete_usuarios'),
        ('Usuario', '0003_alter_perfilusuario_usuario'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reservas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')) ,
                ('fecha_reserva', models.DateTimeField(auto_now_add=True)),
                ('estado', models.CharField(choices=[('pendiente', 'Pendiente'), ('disponible', 'Disponible para retirar'), ('retirada', 'Convertida en préstamo'), ('cancelada', 'Cancelada')], default='pendiente', max_length=12)),
                ('libro', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='reservas', to='Administrador.libros')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='reservas', to='Usuario.perfilusuario')),
            ],
            options={'ordering': ['fecha_reserva', 'id']},
        ),
    ]
