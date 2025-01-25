import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/Servicios/Usuario/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router){
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    const {email, password} = this.loginForm.value;
    // if (this.usuarioServicio.validarUsuario(usuario, contra)){
    //   this.router.navigate(['/categorias']);
    // } else {
    //   alert('Usuario o contraseña incorrectos');
    // }
    this.login(email, password);
  }

  login(email: string, password: string): void{
    this.userService.login(email, password).subscribe({
      next: (token: string) => {
        this.userService.guardarToken(token);
      },
      error: (err) => {
        // Manejo de error, si el login falla
        console.error('Error en el login', err);
      }
    });
  }
}
