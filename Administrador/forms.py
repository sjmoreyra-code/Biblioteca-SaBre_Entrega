from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Libros, Prestamos
from Usuario.models import PerfilUsuario


class CrearLibrosForm(forms.ModelForm):
    class Meta:
        model = Libros
        fields = [
            'titulo_libro',
            'autor',
            'anio',
            'genero_categoria',
            'editorial',
            'isbn',
            'disponibilidad'
        ]
        labels = {
            'titulo_libro': 'Título del Libro',
            'autor': 'Autor',
            'anio': 'Año de Publicación',
            'genero_categoria': 'Género / Categoría',
            'editorial': 'Editorial',
            'isbn': 'ISBN',
            'disponibilidad': 'Disponible',
        }
        widgets = {
            'titulo_libro': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. Cien años de soledad'}),
            'autor': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. Gabriel García Márquez'}),
            'anio': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Ej. 1967'}),
            'genero_categoria': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. Novela'}),
            'editorial': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. Sudamericana'}),
            'isbn': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. 978-0307474728'}),
            'disponibilidad': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }


class CrearPrestamosForm(forms.ModelForm):
    class Meta:
        model = Prestamos
        fields = [
            'usuario',
            'libro',
            'fecha_prestamo',
            'fecha_devolucion_prevista'
        ]
        labels = {
            'usuario': 'Usuario (Perfil)',
            'libro': 'Libro',
            'fecha_prestamo': 'Fecha de Préstamo',
            'fecha_devolucion_prevista': 'Fecha Prevista de Devolución',
        }
        widgets = {
            'usuario': forms.Select(attrs={'class': 'form-select'}),
            'libro': forms.Select(attrs={'class': 'form-select'}),
            'fecha_prestamo': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'fecha_devolucion_prevista': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        }

class CrearUsuarioAdminForm(UserCreationForm):
    email = forms.EmailField(label='Correo electrónico')
    first_name = forms.CharField(label='Nombre', max_length=150)
    last_name = forms.CharField(label='Apellido', max_length=150)
    alias = forms.CharField(label='Alias', max_length=50)
    telefono = forms.CharField(label='Teléfono', max_length=20, required=False)
    direccion = forms.CharField(label='Dirección', max_length=150, required=False)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

    def save(self, commit=True):
        user = super().save(commit=commit)
        if commit:
            PerfilUsuario.objects.create(
                usuario=user,
                nombre=f"{user.first_name} {user.last_name}".strip() or user.username,
                email=user.email,
                alias=self.cleaned_data['alias'],
                telefono=self.cleaned_data.get('telefono', ''),
                direccion=self.cleaned_data.get('direccion', '')
            )
        return user


class EditarUsuarioAdminForm(forms.ModelForm):
    class Meta:
        model = PerfilUsuario
        fields = ['nombre', 'email', 'alias', 'telefono', 'direccion', 'avatar', 'activo']
        labels = {
            'nombre': 'Nombre completo',
            'email': 'Correo electrónico',
            'alias': 'Alias',
            'telefono': 'Teléfono',
            'direccion': 'Dirección',
            'avatar': 'Avatar (URL)',
            'activo': 'Perfil activo',
        }
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'alias': forms.TextInput(attrs={'class': 'form-control'}),
            'telefono': forms.TextInput(attrs={'class': 'form-control'}),
            'direccion': forms.TextInput(attrs={'class': 'form-control'}),
            'avatar': forms.TextInput(attrs={'class': 'form-control'}),
            'activo': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }
