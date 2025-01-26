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

    this.login(email, password);
    this.router.navigate(['/mis-documentos']);
  }

  login(email: string, password: string): void {
    this.userService.login(email, password).subscribe({
      next: (response: any) => {  // La respuesta ahora es un objeto que contiene 'jwtToken'
        const token = response.jwtToken;  // Extraemos el token de la respuesta
        if (token) {
          this.userService.guardarToken(token);  // Guardamos el token
        } else {
          console.error('El token no se encuentra en la respuesta');
        }
      },
      error: (err) => {
        console.error('Error en el login', err);
      }
    });
  }  
}
