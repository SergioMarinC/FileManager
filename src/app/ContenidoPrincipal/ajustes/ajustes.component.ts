import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/Servicios/Usuario/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/Modelo/User';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css'],
})
export class AjustesComponent implements OnInit {

  ajustesForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ajustesForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.loadUser();
  }

  loadUser(): void {
    this.userService.obtenerDatosUsuario().subscribe({
      next: (userData: User) => {
        this.ajustesForm.patchValue({
          userName: userData.userName,
          email: userData.email,
        });
      },
      error: (err) => {
        console.error('Error al cargar el usuario:', err);
      },
    });
  }

  updateUser(): void {
    if (this.ajustesForm.valid) {
      const formValues = this.ajustesForm.value;
      this.userService.updateUser(formValues.userName, formValues.email).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Los datos del usuario han sido actualizados.', 'success');
        },
        error: (err) => {
          console.error('Error al actualizar el usuario:', err);
          Swal.fire('Error', 'No se pudieron actualizar los datos.', 'error');
        },
      });
    } else {
      Swal.fire('Error', 'Por favor, completa correctamente los campos.', 'error');
    }
  }
  
  confirmDelete(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará tu cuenta permanentemente.',
      icon: 'warning',
      input: 'password',
      inputLabel: 'Confirma tu contraseña',
      inputPlaceholder: 'Ingresa tu contraseña',
      inputAttributes: {
        required: 'true',
      },
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const password = result.value;
        this.userService.deleteUser(password).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Tu cuenta ha sido eliminada.', 'success').then(() => {
              this.userService.eliminarToken();
              window.location.href = '/login';
            });
          },
          error: (err) => {
            console.error('Error al eliminar la cuenta:', err);
            Swal.fire('Error', 'No se pudo eliminar la cuenta. Verifica tu contraseña.', 'error');
          },
        });
      } else if (!result.value) {
        Swal.fire('Error', 'Debes ingresar tu contraseña para eliminar la cuenta.', 'error');
      }
    });
  }
  
  changePassword(): void {
    Swal.fire({
      title: 'Cambiar Contraseña',
      input: 'password',
      inputLabel: 'Nueva contraseña',
      inputPlaceholder: 'Ingresa tu nueva contraseña',
      inputAttributes: {
        minlength: '6',
        required: 'true',
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = localStorage.getItem('userId');
        this.userService.updatePassword(result.value ).subscribe({
          next: () => {
            Swal.fire('Éxito', 'La contraseña ha sido cambiada.', 'success');
            this.userService.eliminarToken();
            window.location.href = '/login';
          },
          error: (err) => {
            console.error('Error al cambiar la contraseña:', err);
            Swal.fire('Error', 'No se pudo cambiar la contraseña.', 'error');
          },
        });
      }
    });
  }
  
}
